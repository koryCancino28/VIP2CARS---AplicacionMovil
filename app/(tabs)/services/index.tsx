import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  useWindowDimensions,
  View,
} from "react-native";

// ─────────────────────────────────────────────────────────────────────────────
// Tipos y MOCK de datos (puedes moverlo a un .json o traerlo desde tu API)
// ─────────────────────────────────────────────────────────────────────────────
type EstadoItem = {
  id: string;
  label: string;
  status: "BUENO" | "PRECAUCIÓN" | "PELIGRO";
  color: string;
  progress: number; // 0..1
  comment: string;
};

type Vehicle = {
  id: string;
  nombre: string; // lo que se muestra en el dropdown
  placa: string;
  vin: string;
  marca: string;
  modelo: string;
  anio: number;
  color: string;
  estadoGeneral: EstadoItem[];
  tiempoEstimado?: string; 
};

const VEHICLES: Vehicle[] = [
  {
    id: "v1",
    nombre: "SUV HTM-2024",
    placa: "HTM-2024",
    vin: "JTDBR32E030123456",
    marca: "TOYOTA",
    modelo: "COROLLA",
    anio: 2024,
    color: "ROJO",
    estadoGeneral: [
      { id: "MOTOR", label: "MOTOR", status: "BUENO", color: "green", progress: 0.9, comment: "Sin fugas. Presión de aceite y temperatura OK. Próximo control a 5,000 km." },
      { id: "FRENOS", label: "FRENOS", status: "PRECAUCIÓN", color: "orange", progress: 0.5, comment: "Pastillas al 40%. Recomendar cambio y rectificado de discos." },
      { id: "LLANTAS", label: "LLANTAS", status: "BUENO", color: "green", progress: 0.8, comment: "Presión 33 PSI. Desgaste uniforme. Alinear en 10,000 km." },
      { id: "BATERIA", label: "BATERÍA", status: "PELIGRO", color: "red", progress: 0.3, comment: "11.7V en reposo. Reemplazo recomendado." },
      { id: "TRANSMISION", label: "TRANSMISIÓN", status: "BUENO", color: "green", progress: 0.85, comment: "ATF a nivel. Sin patinamientos." },
      { id: "SUSPENSION", label: "SUSPENSIÓN", status: "BUENO", color: "green", progress: 0.9, comment: "Amortiguadores firmes. Bujes OK." },
    ],
    tiempoEstimado: "1-2 días",
  },
  {
    id: "v2",
    nombre: "SEDÁN KXP-2019",
    placa: "KXP-2019",
    vin: "3FA6P0H73KR123987",
    marca: "FORD",
    modelo: "FUSION",
    anio: 2019,
    color: "AZUL",
    estadoGeneral: [
      { id: "MOTOR", label: "MOTOR", status: "PRECAUCIÓN", color: "orange", progress: 0.6, comment: "Ligera fuga en tapa de válvulas. Monitorear pérdida." },
      { id: "FRENOS", label: "FRENOS", status: "BUENO", color: "green", progress: 0.85, comment: "Discos nuevos, ABS OK." },
      { id: "LLANTAS", label: "LLANTAS", status: "PELIGRO", color: "red", progress: 0.25, comment: "Traseras lisas. Cambiar urgente." },
      { id: "BATERIA", label: "BATERÍA", status: "BUENO", color: "green", progress: 0.9, comment: "12.6V reposo / 14.2V marcha." },
      { id: "TRANSMISION", label: "TRANSMISIÓN", status: "BUENO", color: "green", progress: 0.9, comment: "Cambios suaves. Sin ruidos." },
      { id: "SUSPENSION", label: "SUSPENSIÓN", status: "PRECAUCIÓN", color: "orange", progress: 0.5, comment: "Bujes con juego leve. Reemplazo sugerido." },
    ],
    tiempoEstimado: "2 días",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────────────────────────────────────
export default function VehicleDetailsScreen() {
  const { width } = useWindowDimensions();

  // Habilitar animaciones en Android
  if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  // Dropdown / selección de vehículo
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>(VEHICLES[0].id);
  const selectedVehicle = VEHICLES.find((v) => v.id === selectedId)!;

  // Estados para UI
  const [expandedId, setExpandedId] = useState<string | null>(null); // barra expandida
  const [activeIndex, setActiveIndex] = useState(0); // slide de FlatList
  const [completed, setCompleted] = useState<string[]>([]); // checklist procesos

  const toggleProceso = (item: string) => {
    setCompleted((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]
    );
  };

  const onSelectVehicle = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedId(id);
    setIsOpen(false);
    setExpandedId(null); // colapsa cualquier detalle abierto
    setCompleted([]);    // limpia checklist si aplica
  };

  // ── Item expandible (estado general)
  const ExpandableBar = ({
    item,
    expanded,
    onToggle,
  }: {
    item: EstadoItem;
    expanded: boolean;
    onToggle: () => void;
  }) => {
    const pct = Math.round(item.progress * 100);
    return (
      <View style={{ marginBottom: 10 }}>
        <Pressable
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            onToggle();
          }}
          style={styles.row}
        >
          <Text style={styles.rowLabel}>{item.label}</Text>
          <Text
            style={[
              styles.rowStatus,
              item.status === "BUENO" && { color: "#37c837" },
              item.status === "PRECAUCIÓN" && { color: "#ff9f1a" },
              item.status === "PELIGRO" && { color: "#ff3b30" },
            ]}
          >
            {item.status}
          </Text>
        </Pressable>

        <View style={styles.track}>
          <View style={[styles.fill, { width: `${pct}%`, backgroundColor: item.color }]} />
        </View>

        {expanded && (
          <View style={styles.noteBox}>
            <Text style={styles.noteTitle}>Descripción técnico</Text>
            <Text style={styles.noteText}>{item.comment}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Dropdown Header (selector de vehículo) */}
      <View style={{ position: "relative", marginBottom: 20 }}>
        <TouchableOpacity style={styles.dropdown} onPress={() => setIsOpen((v) => !v)}>
          <Text style={styles.dropdownText}>{selectedVehicle.nombre}</Text>
          <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={20} color="#fff" />
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.dropdownMenu}>
            {VEHICLES.map((v) => (
              <Pressable key={v.id} style={styles.dropdownItem} onPress={() => onSelectVehicle(v.id)}>
                <Text
                  style={[
                    styles.dropdownItemText,
                    v.id === selectedId && { color: "#E1052A", fontWeight: "700" },
                  ]}
                >
                  {v.nombre}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* Títulos */}
      <Text style={styles.title}>PROGRESO DE SERVICIO</Text>
      <Text style={styles.subtitle}>MANTENIMIENTO CORRECTIVO</Text>

      {/* Selector de estado (pasos) */}
      <View style={styles.stateSelector}>
        <View style={styles.stateSteps}>
          <View style={styles.line} />
          <View style={[styles.circle, styles.active]} />
          <View style={styles.circle} />
          <View style={styles.circle} />
        </View>

        <View style={styles.labels}>
          <Text style={styles.label}>        INICIO       </Text>
          <Text style={styles.label}>EN PROCESO</Text>
          <Text style={styles.label}>COMPLETADO</Text>
        </View>
      </View>

      {/* Card Datos Vehículo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{selectedVehicle.nombre}</Text>

        <View style={styles.row}>
          <Text style={styles.labelLight}>PLACA</Text>
          <Text style={styles.labelDark}>{selectedVehicle.placa}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.labelLight}>VIN</Text>
          <Text style={styles.labelDark}>{selectedVehicle.vin}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.labelLight}>MARCA</Text>
          <Text style={styles.labelDark}>{selectedVehicle.marca}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.labelLight}>MODELO</Text>
          <Text style={styles.labelDark}>{selectedVehicle.modelo}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.labelLight}>AÑO</Text>
          <Text style={styles.labelDark}>{selectedVehicle.anio}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.labelLight}>COLOR</Text>
          <Text style={styles.labelDark}>{selectedVehicle.color}</Text>
        </View>
      </View>

        <View style={styles.timeCard}>
          <View style={styles.timeLeft}>
            <Ionicons name="time-outline" size={18} color="#E6BB57" style={{ marginRight: 8 }} />
            <Text style={styles.timeTitle}>Tiempo estimado</Text>
          </View>
          <Text style={styles.timeValue}>{selectedVehicle.tiempoEstimado}</Text>
        </View>

      {/* Card Estado General + Procesos (slides) */}
      <View style={{ height: 400 }}>
        <FlatList
          data={[{ key: "estado" }, { key: "procesos" }]}
          keyExtractor={(item) => item.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
          onMomentumScrollEnd={(ev) => {
            const index = Math.round(ev.nativeEvent.contentOffset.x / width);
            setActiveIndex(index);
          }}
          renderItem={({ item }) => (
            <View style={[styles.card, { width: width * 0.9, marginHorizontal: 10 }]}>
              {item.key === "estado" && (
                <>
                  <Text style={styles.cardTitle}>ESTADO GENERAL</Text>
                  {selectedVehicle.estadoGeneral.map((it) => (
                    <ExpandableBar
                      key={it.id}
                      item={it}
                      expanded={expandedId === it.id}
                      onToggle={() => setExpandedId(expandedId === it.id ? null : it.id)}
                    />
                  ))}
                </>
              )}

              {item.key === "procesos" && (
                <>
                  <Text style={styles.cardTitle}>PROCESOS</Text>
                  <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator>
                    {[
                      { title: "Recepción del vehículo" },
                      {
                        title: "Diagnóstico inicial",
                        sub: ["Escaneo computarizado", "Prueba en carretera"],
                      },
                      {
                        title: "Revisión de motor",
                        sub: ["Niveles de aceite", "Correas y mangueras"],
                      },
                      {
                        title: "Cambio de aceite y filtros",
                        sub: ["Filtro de aceite", "Filtro de aire"],
                      },
                    ].map((proc) => (
                      <View key={proc.title} style={{ marginBottom: 8 }}>
                        <TouchableOpacity
                          style={styles.procesoItem}
                          onPress={() => toggleProceso(proc.title)}
                        >
                          <View
                            style={[
                              styles.circleCheckList,
                              completed.includes(proc.title) && styles.circleCompleted,
                            ]}
                          >
                            {completed.includes(proc.title) && (
                              <Ionicons name="checkmark" size={14} color="#fff" />
                            )}
                          </View>
                          <Text
                            style={[
                              styles.procesoText,
                              completed.includes(proc.title) && styles.procesoTextDone,
                            ]}
                          >
                            {proc.title}
                          </Text>
                        </TouchableOpacity>

                        {proc.sub &&
                          proc.sub.map((sub) => (
                            <TouchableOpacity
                              key={sub}
                              style={[styles.procesoItem, { marginLeft: 35 }]}
                              onPress={() => toggleProceso(sub)}
                            >
                              <View
                                style={[
                                  styles.circleSmall,
                                  completed.includes(sub) && styles.circleCompletedSmall,
                                ]}
                              >
                                {completed.includes(sub) && (
                                  <Ionicons name="checkmark" size={12} color="#fff" />
                                )}
                              </View>
                              <Text
                                style={[
                                  styles.subProcesoText,
                                  completed.includes(sub) && styles.procesoTextDone,
                                ]}
                              >
                                {sub}
                              </Text>
                            </TouchableOpacity>
                          ))}
                      </View>
                    ))}
                  </ScrollView>
                </>
              )}
            </View>
          )}
        />

        {/* Dots indicadores */}
        <View style={styles.dotsContainer}>
          {[0, 1].map((i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === activeIndex ? { backgroundColor: "#ffff" } : { backgroundColor: "#888" },
              ]}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Estilos
// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2b2b2bff" },
  scrollContent: { padding: 8 },
  title: { color: "#fff", fontSize: 25, fontWeight: "bold", textAlign: "center" },
  subtitle: { color: "#aaa", textAlign: "center", marginBottom: 20 },
  // Dropdown
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 6,
    justifyContent: "space-between",
  },
  dropdownText: { color: "#fff", fontSize: 16 },
  dropdownMenu: {
    position: "absolute",
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: "#1f1f1f",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    overflow: "hidden",
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#333",
  },
  dropdownItemText: { color: "#fff", fontSize: 14 },

  // Steps / estado
  stateSelector: { marginBottom: 20 },
  stateSteps: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    position: "relative",
    paddingHorizontal: 20,
  },
  line: {
    position: "absolute",
    top: "50%",
    left: 35,
    right: 35,
    height: 2,
    backgroundColor: "#555",
    zIndex: 0,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#555",
    marginHorizontal: 10,
    zIndex: 1,
  },
  active: { backgroundColor: "#E1052A" },
  labels: { flexDirection: "row", justifyContent: "space-between" },
  label: { color: "#aaa", fontSize: 12 },

  // Cards
  card: { backgroundColor: "#222", borderRadius: 12, padding: 16, marginBottom: 20 },
  cardTitle: { color: "#fff", fontWeight: "bold", marginBottom: 10, fontSize: 16 },

  // Filas
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  rowLabel: { color: "#ddd", fontSize: 14, fontWeight: "600" },
  rowStatus: { fontSize: 12, fontWeight: "700" },
  labelLight: { color: "#aaa", fontSize: 12 },
  labelDark: { color: "#fff", fontSize: 14, fontWeight: "600" },

  // Progress bars
  track: {
    height: 6,
    backgroundColor: "#3a3a3a",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 8,
  },
  fill: { height: "100%", borderRadius: 6 },

  // Nota expandible
  noteBox: {
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    padding: 10,
    marginTop: 4,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#3a3a3a",
  },
  noteTitle: { color: "#9ad0ff", fontSize: 12, fontWeight: "700", marginBottom: 4 },
  noteText: { color: "#ddd", fontSize: 12, lineHeight: 16 },

  // Checklist procesos
  procesoItem: { flexDirection: "row", alignItems: "center", marginVertical: 8 },
  circleCheckList: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#888",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  circleCompleted: { backgroundColor: "#E1052A", borderColor: "#E1052A" },
  circleSmall: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#666",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  timeCard: {
    backgroundColor: "#222",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderLeftWidth: 3,
    borderLeftColor: "#E6BB57", // acento dorado tipo reloj
  },
  timeLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeTitle: { color: "#fff", fontSize: 13, fontWeight: "700", letterSpacing: 0.3 },
  timeValue: { color: "#E6BB57", fontSize: 15, fontWeight: "800" },
  circleCompletedSmall: { backgroundColor: "#E1052A", borderColor: "#E1052A" },
  subProcesoText: { color: "#ccc", fontSize: 13 },
  procesoText: { color: "#fff", fontSize: 14 },
  procesoTextDone: { color: "#aaa", textDecorationLine: "line-through" },

  // Dots
  dotsContainer: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
  dot: { width: 10, height: 10, borderRadius: 5, marginHorizontal: 5 },
});

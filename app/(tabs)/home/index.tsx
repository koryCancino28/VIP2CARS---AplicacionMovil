// app/(tabs)/home/index.tsx
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import CustomText from '../../../components/CustomText';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header con logo */}
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/logo-vip2cars.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <CustomText style={styles.welcomeTitle}>¡Bienvenido a VIP2CARS!</CustomText>
        <CustomText style={styles.subtitle}>Tu taller mecánico de confianza</CustomText>
      </View>

      {/* Sección de introducción */}
      <View style={styles.section}>
        <CustomText style={styles.sectionTitle}>¿Quiénes somos?</CustomText>
        <CustomText style={styles.description}>
          En VIP2CARS somos especialistas en el mantenimiento y reparación de vehículos.
          Nuestro equipo de mecánicos certificados está comprometido con brindarte el mejor
          servicio para mantener tu vehículo en óptimas condiciones.
        </CustomText>
      </View>

      {/* Servicios destacados */}
      <View style={styles.section}>
        <CustomText style={styles.sectionTitle}>Nuestros Servicios</CustomText>

        <View style={styles.serviceItem}>
          <Image
            source={require('../../../assets/images/primer_automovil.png')}
            style={styles.serviceImage}
            resizeMode="cover"
          />
          <View style={styles.serviceText}>
            <CustomText style={styles.serviceTitle}>Diagnóstico Computarizado</CustomText>
            <CustomText style={styles.serviceDescription}>
              Utilizamos tecnología de vanguardia para detectar problemas en tu vehículo
              de manera precisa y eficiente.
            </CustomText>
          </View>
        </View>

        <View style={styles.serviceItem}>
          <Image
            source={require('../../../assets/images/segundo_automovil.png')}
            style={styles.serviceImage}
            resizeMode="cover"
          />
          <View style={styles.serviceText}>
            <CustomText style={styles.serviceTitle}>Mantenimiento Preventivo</CustomText>
            <CustomText style={styles.serviceDescription}>
              Programamos y realizamos el mantenimiento preventivo de tu vehículo
              para evitar averías costosas.
            </CustomText>
          </View>
        </View>

        <View style={styles.serviceItem}>
          <Image
            source={require('../../../assets/images/tercer_automovil.png')}
            style={styles.serviceImage}
            resizeMode="cover"
          />
          <View style={styles.serviceText}>
            <CustomText style={styles.serviceTitle}>Reparaciones Especializadas</CustomText>
            <CustomText style={styles.serviceDescription}>
              Reparamos todo tipo de sistemas: motor, transmisión, suspensión,
              frenos y más.
            </CustomText>
          </View>
        </View>
      </View>

      {/* Sección de contacto/llamada a acción */}
      <View style={styles.section}>
        <CustomText style={styles.sectionTitle}>¿Necesitas ayuda?</CustomText>
        <CustomText style={styles.description}>
          Agenda tu cita o solicita un diagnóstico exprés. Nuestro equipo está
          listo para atenderte con la profesionalidad que mereces.
        </CustomText>
        <CustomText style={styles.contactText}>
          📞 Llámanos: (01) 123-4567{'\n'}
          📧 Email: info@vip2cars.com{'\n'}
          📍 Dirección: Av. Principal 123, Lima
        </CustomText>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <CustomText style={styles.footerText}>
          VIP2CARS - Excelencia en servicio automotriz
        </CustomText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  header: {
    backgroundColor: '#E4022E',
    padding: 20,
    alignItems: 'center',
    paddingTop: 40,
  },
  logo: {
    width: 200,
    height: 60,
    marginBottom: 15,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    padding: 20,
    backgroundColor: '#ffffffff',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E4022E',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'center',
  },
  serviceItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  serviceImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  serviceText: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E4022E',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 24,
  },
  footer: {
    backgroundColor: '#333',
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});
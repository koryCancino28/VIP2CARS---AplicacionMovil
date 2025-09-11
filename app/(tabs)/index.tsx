import { StyleSheet, View } from 'react-native';
import { CustomText } from '../_layout';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomText>Home Screen</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({

});

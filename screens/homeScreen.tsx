import { Button, View } from "react-native";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Animated API"
        onPress={() => navigation.navigate('Animated')}
      />
      <View style={{ margin: 10 }} />
      <Button
        title="Scroll Animated"
        onPress={() => navigation.navigate('ScrollAnimated')}
      />
      <View style={{ margin: 10 }} />
      <Button
        title="Gesture Handler"
        onPress={() => navigation.navigate('Gesture')} />
      <View style={{ margin: 10 }} />
      <Button
        title="Pan Responder"
        onPress={() => navigation.navigate('PanResponder')} />
    </View>
  );
};

export default HomeScreen;
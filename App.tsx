import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import StackNavigation from "@src/presentation/routes/StackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <StackNavigation />
    </NavigationContainer>
  );
}

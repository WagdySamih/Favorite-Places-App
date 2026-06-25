import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Plus } from "lucide-react-native";

import { AddPlace, AllPlaces } from "./src/screens";
import { IconButton } from "./src/components";
import { COLORS } from "./src/constants";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.primary500 },
            headerTintColor: COLORS.gray700,
            contentStyle: { backgroundColor: COLORS.gray700 },
            headerBlurEffect: "none",
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon={<Plus size={24} color={tintColor} />}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
              unstable_headerRightItems: () => [
                {
                  type: "button",
                  label: "",
                  icon: { type: "sfSymbol", name: "plus" },
                  hidesSharedBackground: true, // ← kills the liquid glass pill
                  onPress: () => navigation.navigate("AddPlace"),
                },
              ],
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add New Place",
              headerBackTitle: "Back",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}

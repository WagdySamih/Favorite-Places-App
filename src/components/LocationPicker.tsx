import { Alert, Pressable, StyleSheet, View, Image, Text } from "react-native";
import { Button } from "./Button";
import { LocateIcon, Map } from "lucide-react-native";
import { COLORS } from "../constants";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";

import { useState } from "react";
import { getMapPreview } from "../utils";

type Location = {
  latitude: number;
  longitude: number;
};

export const LocationPicker = () => {
  const [location, setLocation] = useState<Location>();
  const [permissions, requestPermissions] = useForegroundPermissions();

  const verifyPermissions = async () => {
    if (permissions?.status === PermissionStatus.UNDETERMINED) {
      const requestedPermission = await requestPermissions();

      return requestedPermission.granted;
    }
    if (permissions?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant location permission to continue",
      );
      return false;
    }

    return true;
  };

  const onLocateUser = async () => {
    const hasPermission = await verifyPermissions();
    console.log({ hasPermission });
    if (!hasPermission) {
      return;
    }

    const { coords } = await getCurrentPositionAsync();

    if (coords) {
      setLocation({
        longitude: coords.longitude,
        latitude: coords.latitude,
      });
    }
  };

  const onChooseLocationFromMap = () => {
    //
  };

  return (
    <Pressable style={({ pressed }) => [styles.container]}>
      <View>
        {location?.latitude && location?.longitude ? (
          <Image
            source={{
              uri: getMapPreview(location.latitude, location.longitude),
            }}
            style={styles.image}
          />
        ) : (
          <Text style={styles.fallbackText}>
            Pick Your Location to get started
          </Text>
        )}
      </View>
      <View style={styles.actions}>
        <Button
          text="Locate User"
          onPress={onLocateUser}
          icon={<LocateIcon size={20} color={COLORS.primary100} />}
          style={styles.button}
        />
        <Button
          text="Pick On Map"
          onPress={() => ""}
          icon={<Map size={20} color={COLORS.primary100} />}
          style={styles.button}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
  },
  pressed: { opacity: 0.75 },
  image: {
    width: "100%",
    borderRadius: 8,
    marginBottom: 12,
    height: 200,
  },
  fallbackText: {
    color: COLORS.gray700,
    textAlign: "center",
    marginBottom: 12,
    height: 200,
    paddingVertical: 85,
    backgroundColor: COLORS.primary100,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
  },
});

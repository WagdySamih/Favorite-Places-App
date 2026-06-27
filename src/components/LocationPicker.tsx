import { useEffect } from "react";
import { Alert, Pressable, StyleSheet, View, Image, Text } from "react-native";
import { LocateIcon, Map } from "lucide-react-native";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";

import { getAddress, getMapPreview } from "../utils";
import { COLORS } from "../constants";
import { Button } from "./Button";

type Location = {
  lat: number;
  lng: number;
};

type Props = {
  onLocationPick: (location: Location, address?: string) => void;
  location?: Location;
};

export const LocationPicker: React.FC<Props> = ({
  onLocationPick,
  location,
}) => {
  const [permissions, requestPermissions] = useForegroundPermissions();
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (!location) return;

    const confirmLocation = async () => {
      const address = await getAddress(location.lat, location.lng);
      onLocationPick(location, address);
    };

    confirmLocation();
  }, [location, getAddress]);

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
    try {
      const hasPermission = await verifyPermissions();

      if (!hasPermission) {
        return;
      }

      const { coords } = await getCurrentPositionAsync();
      onLocationPick({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onChooseLocationFromMap = () => {
    navigation.push("Map", {
      onLocationPick,
    });
  };

  return (
    <Pressable style={({ pressed }) => [styles.container]}>
      <View>
        {location?.lat && location?.lng ? (
          <Image
            source={{
              uri: getMapPreview(location.lat, location.lng),
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
          onPress={onChooseLocationFromMap}
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

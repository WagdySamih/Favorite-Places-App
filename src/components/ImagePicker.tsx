import { useState } from "react";
import { Alert, StyleSheet, View, Image, Text } from "react-native";
import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { Camera } from "lucide-react-native";

import { Button } from "./Button";
import { COLORS } from "../constants";

export const ImagePicker = () => {
  const [image, setImage] = useState<string>();
  const [permissions, requestPermissions] = useCameraPermissions();

  const verifyPermissions = async () => {
    if (permissions?.status === PermissionStatus.UNDETERMINED) {
      const requestedPermission = await requestPermissions();

      return requestedPermission.granted;
    }
    if (permissions?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant camera permission to continue",
      );
      return false;
    }

    return true;
  };

  const onTakePhoto = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const res = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImage(res.assets?.[0]?.uri);
  };

  return (
    <View style={styles.container}>
      <View>
        {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <Text style={styles.fallbackText}>
            Start uploading and record you places
          </Text>
        )}
      </View>
      <Button
        text="Take Photo"
        onPress={onTakePhoto}
        icon={<Camera color={COLORS.primary100} size={20} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
});

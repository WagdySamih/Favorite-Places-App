import { Alert, Button, StyleSheet, View, Image, Text } from "react-native";
import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { useState } from "react";

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
    console.log(JSON.stringify(res, null, 2));
    setImage(res.assets?.[0]?.uri);
  };

  return (
    <View style={styles.container}>
      <View>
        {" "}
        {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <Text style={styles.fallbackText}>
            Start uploading and record you places
          </Text>
        )}
      </View>
      <Button title="Take Photo" onPress={onTakePhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 8,
    marginBottom: 12,
  },
  fallbackText: {
    color: "white",
    textAlign: "center",
    marginVertical: 8,
  },
});

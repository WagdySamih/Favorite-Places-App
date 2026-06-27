import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Save } from "lucide-react-native";

import { IconButton } from "../../components";

type Location = {
  lat: number;
  lng: number;
};
type Props = {};

const Map: React.FC<Props> = () => {
  const [coordinate, setCoordinate] = useState<Location>();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const onLocationPick = route.params.onLocationPick;

  const initialRegion = {
    latitude: 31.2058,
    longitude: 29.9245,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const onLocationSelect = (event: MapPressEvent) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setCoordinate({ lat, lng });
  };

  const onSaveLocation = useCallback(() => {
    if (!coordinate?.lat || !coordinate.lng) {
      return Alert.alert(
        "Choose Location First",
        "You must choose location to continue",
      );
    }
    onLocationPick(coordinate);
    navigation.goBack();
  }, [navigation, coordinate]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }: any) => (
        <IconButton
          icon={<Save color={tintColor} />}
          onPress={onSaveLocation}
        />
      ),
    });
  }, [navigation, onSaveLocation]);

  return (
    <MapView
      style={styles.container}
      initialRegion={initialRegion}
      onPress={onLocationSelect}
    >
      {coordinate?.lat && coordinate?.lng && (
        <Marker
          coordinate={{ latitude: coordinate?.lat, longitude: coordinate?.lng }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

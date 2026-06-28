import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Map } from "lucide-react-native";

import { Place } from "../../models";
import { fetchPlaceById } from "../../utils";
import { Button, LoadingOverlay } from "../../components";
import { COLORS } from "../../constants";

const PlaceDetails = () => {
  const [place, setPlace] = useState<Place>();
  const [isLoading, setIsLoading] = useState<boolean>();

  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const id = route.params.id;

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    fetchPlaceById(id)
      .then((res) => {
        const place = new Place(
          res?.title || "",
          res?.imageUri || "",
          res?.address || "",
          {
            lat: res?.lat || 0,
            lng: res?.lng || 0,
          },
          res?.id.toString() || "",
        );
        setPlace(place);
      })
      .catch(() => Alert.alert("An error occurred"))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading || !place) return <LoadingOverlay />;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
        <Button
          text="View On Map"
          icon={<Map color={COLORS.primary100} />}
          onPress={() =>
            navigation.navigate("Map", { location: place.location })
          }
        />
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
  },
  info: {
    paddingVertical: 16,
    gap: 14,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  address: {
    color: "white",
    fontSize: 12,
  },
});

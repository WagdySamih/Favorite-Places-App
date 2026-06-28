import { FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Plus } from "lucide-react-native";

import { Place } from "../../models";
import { Button, PlaceItem } from "../../components";
import { COLORS } from "../../constants";
import { fetchPlaces } from "../../utils";

const AllPlaces = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    fetchPlaces().then((res) => setPlaces(res as unknown as Place[]));
  }, []);

  if (!places.length) {
    return (
      <View style={styles.noPlacesContainer}>
        <Text style={styles.text}>
          No places added yet - Start adding some!
        </Text>
        <Button
          icon={<Plus color={COLORS.primary100} size={16} />}
          text="Add Place"
          onPress={() => navigation.push("AddPlace")}
          variant="primary"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={places as Place[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceItem place={item} onPress={() => ""} />}
      />
    </View>
  );
};

export default AllPlaces;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  noPlacesContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 12,
    gap: 12,
  },
  text: {
    color: COLORS.primary100,
  },
});

import { FlatList, StyleSheet, View } from "react-native";
import { Place } from "../../models";
import { PlaceItem } from "../../components";

const AllPlaces = () => {
  return (
    <View>
      <FlatList
        data={[] as Place[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceItem place={item} onPress={() => ""} />}
      />
    </View>
  );
};

export default AllPlaces;

const styles = StyleSheet.create({
  container: {},
});

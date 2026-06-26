import { StyleSheet, Text, View, ScrollView } from "react-native";
import {} from "react-native";
import { ImagePicker, Input, LocationPicker } from "../../components";

const AddPlace = () => {
  return (
    <ScrollView style={styles.container}>
      <Input label="Title" />
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
};

export default AddPlace;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 20,
    flexDirection: "column",
  },
});

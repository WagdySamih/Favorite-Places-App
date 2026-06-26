import { StyleSheet, Text, View, ScrollView } from "react-native";
import {} from "react-native";
import { ImagePicker, Input } from "../../components";

const AddPlace = () => {
  return (
    <ScrollView style={styles.container}>
      <Input label="Title" />
      <ImagePicker />
    </ScrollView>
  );
};

export default AddPlace;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

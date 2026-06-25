import { StyleSheet, Text, View, ScrollView } from "react-native";
import {} from "react-native";
import { Input } from "../../components";

const AddPlace = () => {
  return (
    <ScrollView style={styles.container}>
      <Input label="Title" />
    </ScrollView>
  );
};

export default AddPlace;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

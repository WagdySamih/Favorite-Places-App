import { StyleSheet, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Location, Place } from "../../models";
import { Button, ImagePicker, Input, LocationPicker } from "../../components";

type Form = {
  title?: string;
  image?: string;
  location?: Location;
  address?: string;
};

const AddPlace = () => {
  const [form, setForm] = useState<Form>();
  const navigation = useNavigation<any>();

  const onFieldChange = <K extends keyof Form>(field: K, value: Form[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onImagePick = (image: string) => {
    onFieldChange("image", image);
  };

  const onLocationPick = (location: Form["location"], address?: string) => {
    onFieldChange("location", location);
    onFieldChange("address", address);
  };

  const onSubmit = () => {
    const { title, image, address, location } = form || {};

    if (!title) {
      Alert.alert("Missing Data", "Please enter title to continue");
      return;
    }

    if (!image) {
      Alert.alert("Missing Data", "Please take a photo to continue");
      return;
    }

    if (!location || !address) {
      Alert.alert("Missing Data", "Please pick a location to continue");
      return;
    }

    const place = new Place(title, image, address, location);

    navigation.navigate("AllPlaces", { place });
  };

  return (
    <ScrollView style={styles.container}>
      <Input
        label="Title"
        value={form?.title}
        onChangeText={(t) => onFieldChange("title", t)}
      />
      <ImagePicker onImagePick={onImagePick} />
      <LocationPicker
        onLocationPick={onLocationPick}
        location={form?.location}
      />
      <Button
        text="Add Place"
        onPress={onSubmit}
        variant="primary"
        style={styles.btn}
      />
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
  btn: {
    marginTop: 12,
  },
});

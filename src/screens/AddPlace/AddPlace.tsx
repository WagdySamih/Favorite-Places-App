import { StyleSheet, ScrollView } from "react-native";
import {} from "react-native";
import { Button, ImagePicker, Input, LocationPicker } from "../../components";
import { useState } from "react";

type Form = {
  title?: string;
  image?: string;
  location?: {
    lat: number;
    lng: number;
  };
  address?: string;
};

const AddPlace = () => {
  const [form, setForm] = useState<Form>();

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
    console.log(form);
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

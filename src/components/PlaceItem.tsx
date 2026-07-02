import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Place } from "../models";
import { COLORS } from "../constants";

type Props = {
  place: Place;
  onPress: () => void;
};

export const PlaceItem: React.FC<Props> = ({ place, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Image
        source={{ uri: place.imageUri }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,

    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 6,
  },
  pressed: {
    opacity: 0.75,
  },
  image: {
    flex: 1,
    borderRadius: 8,
    height: 100,
  },
  info: {
    flex: 2,
  },
  title: {
    color: COLORS.accent500,
    paddingVertical: 12,
    fontSize: 16,
  },
  address: {
    color: COLORS.primary100,
    paddingVertical: 12,
    fontSize: 12,
  },
});

import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Place } from "../models";

type Props = {
  place: Place;
  onPress: () => void;
};

export const PlaceItem: React.FC<Props> = ({ place, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={{ uri: place.imageURL }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({ container: {} });

import { Pressable, StyleSheet } from "react-native";

type Props = {
  icon: React.ReactNode;
  onPress: () => void;
};

export const IconButton: React.FC<Props> = ({ icon, onPress }) => (
  <Pressable
    style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    onPress={onPress}
    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
  >
    {icon}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});

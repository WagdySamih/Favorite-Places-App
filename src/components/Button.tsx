import { Pressable, StyleProp, StyleSheet, Text } from "react-native";
import { COLORS } from "../constants";

type Props = {
  text: string;
  icon?: React.ReactNode;
  onPress: () => void;
  variant?: "primary" | "outlined" | "text";
  style?: StyleProp<any>;
};

export const Button: React.FC<Props> = ({
  text,
  icon,
  onPress,
  variant = "outlined",
  style,
}) => (
  <Pressable
    style={({ pressed }) => [
      styles.container,
      pressed && styles.pressed,
      variant === "outlined" && styles.outlined,
      variant === "text" && styles.textBtn,
      style,
    ]}
    onPress={onPress}
  >
    {icon}
    <Text
      style={[
        styles.textDark,
        (variant === "outlined" || variant === "text") && styles.textLight,
      ]}
    >
      {text}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: COLORS.primary100,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  pressed: {
    opacity: 0.6,
  },
  primary: {},
  textBtn: {
    backgroundColor: "transparent",
  },
  outlined: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.primary100,
  },
  textLight: {
    color: COLORS.primary100,
  },
  textDark: {
    color: COLORS.gray700,
    fontSize: 16,
  },
});

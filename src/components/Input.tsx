import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { COLORS } from "../constants";

type Props = {
  label?: string;
  style?: StyleProp<any>;
  error?: string;
} & TextInputProps;

export const Input: React.FC<Props> = ({ label, style, error, ...rest }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...rest}
        style={[
          styles.input,
          rest.multiline && styles.multiline,
          !!error && styles.inputError,
        ]}
        placeholderTextColor={COLORS.gray700}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
    paddingVertical: 10,
    alignSelf: "flex-start",
    width: "100%",
  },
  label: {
    color: COLORS.primary100,
  },
  input: {
    backgroundColor: COLORS.primary100,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  error: {
    color: COLORS.error50,
  },
  inputError: {
    backgroundColor: COLORS.error50,
  },
});

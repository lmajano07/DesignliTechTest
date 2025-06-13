import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  iconName: keyof typeof MaterialIcons.glyphMap;
  onPressed: () => void;
  iconColor?: string;
}

const IconButton = ({ iconName, onPressed, iconColor }: Props) => {
  return (
    <TouchableOpacity onPress={onPressed} style={styles.button}>
      <MaterialIcons name={iconName} size={30} color={iconColor && "black"} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 10,
  },
});

export default IconButton;

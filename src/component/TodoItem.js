import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

const TodoItem = React.memo(({ todo, onUpdateStatus }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{todo.time}</Text>
      <Text style={styles.title}>{todo.description}</Text>
      <Text style={styles.title}>{todo.status}</Text>
      <Button
        title={todo.status === "Doing" ? "Selesai" : "Kembali"}
        onPress={onUpdateStatus}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    marginHorizontal: 16,
    backgroundColor: "#f2f2f2",
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TodoItem;

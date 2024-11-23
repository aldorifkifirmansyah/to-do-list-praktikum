import React, { useEfeect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Button,
  StyleSheet,
  RefreshControl,
} from "react-native";
import {
  collection,
  getDocs,
  updateDocs,
  doc,
} from "@react-native-firebase/firestore";
import { db } from "../config/firebaseConfig";
import TodoItem from "../component/TodoItem";

const ViewTodosScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const [refreshing, setRefreshing] = useState([]);

  const fetchTodo = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Todos"));
      const todosData = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setTodos(todosData);
    } catch (error) {
      console.error("error fetching data", error);
    }
  }, []);

  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  const HandleUpdateStatus = useCallback(async (id, currentStatus) => {
    const newStatus = currentStatus === "Doing" ? "Done" : "Doing";
    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, { status: newStatus });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, status: newStatus } : todo
        )
      );
    } catch (error) {
      console.error("Error updating data", error);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTodo();
    setRefreshing(false);
  }, [fetchTodo]);

  return (
    <View style={styles.container}>
      <Button
        title="Tambah To-Do Baru"
        onPress={() => navigation.navigate("AddTodo")}
      />
      <FlatList>
        data = {todos}
        keyExtractor = {(item) => item.id}
        renderItem ={" "}
        {({ item }) => (
          <TodoItem
            todo={item}
            onUpdateStatus={HandleUpdateStatus(item.id, item.status)}
          />
        )}
        RefreshControl ={" "}
        {<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent ={" "}
        {
          <View style={style.empty}>
            <Button title="Reload" onPress={fetchTodo} />
          </View>
        }
      </FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});

export default ViewTodosScreen;
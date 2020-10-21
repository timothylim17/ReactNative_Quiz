import { AsyncStorage } from "react-native";

const SAVE_KEY = "@plzwork";

// Saves Storage
export const saveData = async (item) => {
  try {
    await AsyncStorage.setItem(SAVE_KEY, item);
    console.log(item);
  } catch (e) {
    alert("Failed to save:", e);
  }
};

// Fetches Storage
export async function fetchData() {
  try {
    const value = await AsyncStorage.getItem(SAVE_KEY);
    // if (value !== null) alert("THERE IS DATA");

    const item = JSON.parse(value);
    return item;
  } catch (e) {
    console.log("Failed to read: ", e);
  }
  return null;
}

// Clears Storage
export const deleteData = async () => {
  try {
    const value = await AsyncStorage.removeItem(SAVE_KEY);
    if (value === null) console.log("Data is now cleared!");
  } catch (e) {
    console.log("Guess it's not deleted: ", e);
  }
};

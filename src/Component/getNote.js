import AsyncStorage from "@react-native-async-storage/async-storage"

const STORAGE_KEY = 'notes';

export const getNote = async () => {
    try {
      const notes = await AsyncStorage.getItem(STORAGE_KEY);
      return notes ? JSON.parse(notes) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des notes:', error);
      return [];
    }
};
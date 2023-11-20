import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { saveNote } from '../Component/saveNote'

const storage_key = 'notes';

export default function AjoutNote() {
    const navigation = useNavigation();

    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleSaveNote = async () => {
        const note = {
            titre,
            description,
            date,
        };

        await saveNote(note);

        setTitre('');
        setDescription('');
        setDate('');

        navigation.navigate('Home')
    };

    const insertSlash = (text) => {
        const cleanedText = text.replace(/[^\d]/g, '');
        if (cleanedText.length <= 2) {
            return cleanedText;
        } else if (cleanedText.length <= 4) {
            return `${cleanedText.slice(0, 2)}/${cleanedText.slice(2)}`;
        } else {
            return `${cleanedText.slice(0, 2)}/${cleanedText.slice(2, 4)}/${cleanedText.slice(4, 8)}`;
        }
    };

    return (
        <View style={styles.container}>
            <Text>Titre</Text>
            <TextInput style={styles.input}
                value={titre}
                onChangeText={(text) => setTitre(text)}
                placeholder="Titre"
            />
            <Text>Déscription</Text>
            <TextInput style={[styles.input, styles.descriptionInput]}
                value={description}
                onChangeText={(text) => setDescription(text)}
                placeholder="Description"
                multiline={true}
                textAlignVertical="top"
            />
            <Text>Date</Text>
            <TextInput style={styles.input}
                value={date}
                onChangeText={(text) => setDate(insertSlash(text))}
                placeholder="DD/MM/YYYY"
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={handleSaveNote} style={styles.Button}>
                <Text>Enregistrer</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        padding: 25,
    },
    input: {
        height: 40,
        width: "100%",
        margin: 15,
        borderWidth: 0,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 10,
    },
    descriptionInput: {
        minHeight: 200,
        height: "auto",
        textAlignVertical: "top",
    },
    Button: {
        width: '60%',
        backgroundColor: 'white',
        padding: 10,
        margin: 20,
        borderRadius: 15,
        alignItems: 'center',
    }
})
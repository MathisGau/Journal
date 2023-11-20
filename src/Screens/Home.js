import { StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { getNote } from '../Component/getNote';
import { deleteNote } from '../Component/deleteNote';

export default function Home() {
    const navigation = useNavigation();
    const [notes, setNotes] = useState([]);
    const isFocused = useIsFocused();
    const [deleteMode, setDeleteMode] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            const fetchedNotes = await getNote();
            setNotes(fetchedNotes);
        };

        if (isFocused) {
            fetchNotes();
        }
    }, [isFocused]);

    const handleDeleteNote = async (noteIndex) => {
        await deleteNote(noteIndex);
        const updatedNotes = await getNote();
        setNotes(updatedNotes);
    };

    const toggleDeleteMode = () => {
        setDeleteMode(!deleteMode);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => navigation.navigate('AjoutNote')}
                >
                    <Text style={styles.textNoteButton}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.Button, deleteMode && styles.deleteButton]}
                    onPress={toggleDeleteMode}
                >
                    <Text style={[styles.textNoteButton, deleteMode && styles.deleteButton]}>{deleteMode ? 'Annuler' : '-'}</Text>
                </TouchableOpacity>
            </View>
            {deleteMode && (
                <View style={styles.deleteModeMessage}>
                    <Text style={styles.deleteModeText}>Mode suppression activé</Text>
                </View>
            )}
            <FlatList
                data={notes}
                style={styles.FlatList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => {
                            if (deleteMode) {
                                handleDeleteNote(index);
                            } else {
                                navigation.navigate('Note', { note: item });
                            }
                        }}
                        style={styles.noteButton}
                    >
                        <Text style={styles.textNoteButton}>{item.titre}</Text>
                        <Text style={styles.textNoteButton}>{item.date}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    topBar: {
        flexDirection: "row",
        padding: 20,
    },
    Button: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        margin: 5,
        borderRadius: 15,
    },
    deleteButton: {
        backgroundColor: "red",
        color: "white",
    },
    FlatList: {
        width: '90%',
        borderTopWidth: 1,
        borderTopColor: 'gray',
        paddingTop: 30,
    },
    noteButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: 'white',
        alignItems: "center",
        padding: 20,
        marginBottom: 30,
        borderRadius: 15,
    },
    textNoteButton: {
        color: "grey",
    },
    deleteModeMessage: {
        marginBottom: 20,
        alignItems: 'center',
    },
    deleteModeText: {
        color: 'rgba(255, 0, 0, 0.4)',
    },
    
});

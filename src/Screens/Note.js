import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NoteDetails({ route, navigation }) {
    const { note } = route.params;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: note.titre || 'Détails de la note',
        });
    }, [navigation, note]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{note.titre}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.date}>{note.date}</Text>
                <Text style={styles.description}>{note.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    date: {
        fontSize: 16,
        marginBottom: 20,
        color: '#555',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
    },
});
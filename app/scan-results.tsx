import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Config';

export default function ScanResultsScreen() {
    const router = useRouter();

    // TODO: Get actual scan results from route params or context
    const mockItems = [
        {
            id: '1',
            name: 'Pollo asado',
            translation: 'Roasted chicken',
            confidence: 0.92,
        },
        {
            id: '2',
            name: 'Ensalada mixta',
            translation: 'Mixed salad',
            confidence: 0.88,
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Recognized Items</Text>
                <Text style={styles.subtitle}>{mockItems.length} items found</Text>
            </View>

            <ScrollView style={styles.content}>
                {mockItems.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.itemCard}
                        onPress={() => router.push(`/item-detail?id=${item.id}`)}
                    >
                        <View style={styles.itemImage}>
                            <Ionicons name="image-outline" size={40} color={Colors.textSecondary} />
                        </View>

                        <View style={styles.itemContent}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemTranslation}>{item.translation}</Text>

                            <View style={styles.itemFooter}>
                                <View style={styles.confidenceBadge}>
                                    <Text style={styles.confidenceText}>
                                        {Math.round(item.confidence * 100)}% confident
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        padding: 24,
        paddingTop: 16,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    content: {
        flex: 1,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    itemContent: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    itemTranslation: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 8,
    },
    itemFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    confidenceBadge: {
        backgroundColor: Colors.surface,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    confidenceText: {
        fontSize: 12,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
});

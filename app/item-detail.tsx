import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Config } from '../constants/Config';

const { width } = Dimensions.get('window');

export default function ItemDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [isFavorite, setIsFavorite] = useState(false);

    // Get item data from params
    const itemText = params.itemText as string || 'Unknown Item';
    const itemId = params.itemId as string;

    // Parse the item text (first line is usually the name)
    const lines = itemText.split('\n').filter(line => line.trim());
    const itemName = lines[0] || itemText;
    const itemDescription = lines.slice(1).join(' ');

    const handleFeedback = (type: 'like' | 'dislike') => {
        // TODO: Submit feedback to backend
        console.log('Feedback:', type);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Image Placeholder */}
                <View style={styles.imageContainer}>
                    <View style={styles.imagePlaceholder}>
                        <Ionicons name="restaurant-outline" size={80} color={Config.Colors.textSecondary} />
                        <Text style={styles.imagePlaceholderText}>
                            Image search coming soon
                        </Text>
                    </View>

                    <View style={styles.imageControls}>
                        <TouchableOpacity
                            style={styles.favoriteButton}
                            onPress={() => setIsFavorite(!isFavorite)}
                        >
                            <Ionicons
                                name={isFavorite ? 'heart' : 'heart-outline'}
                                size={24}
                                color={isFavorite ? Config.Colors.error : 'white'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Item Details */}
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.name}>{itemName}</Text>
                            {itemDescription && (
                                <Text style={styles.translation}>{itemDescription}</Text>
                            )}
                        </View>
                    </View>

                    {/* Raw OCR Text */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Detected Text</Text>
                        <View style={styles.textBox}>
                            <Text style={styles.detectedText}>{itemText}</Text>
                        </View>
                    </View>

                    {/* Info Message */}
                    <View style={styles.section}>
                        <View style={styles.infoBadge}>
                            <Ionicons name="information-circle" size={20} color={Config.Colors.primary} />
                            <Text style={styles.infoText}>
                                Ingredient analysis and allergen detection coming soon with LLM integration
                            </Text>
                        </View>
                    </View>

                    {/* Share Button */}
                    <TouchableOpacity style={styles.shareButton}>
                        <Ionicons name="share-outline" size={20} color="white" />
                        <Text style={styles.shareButtonText}>Share Item</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Config.Colors.background,
    },
    imageContainer: {
        width: width,
        height: width * 0.75,
        backgroundColor: Config.Colors.surface,
        position: 'relative',
    },
    imagePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        marginTop: 12,
        fontSize: 14,
        color: Config.Colors.textSecondary,
    },
    imageControls: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    favoriteButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Config.Colors.text,
        marginBottom: 4,
    },
    translation: {
        fontSize: 18,
        color: Config.Colors.textSecondary,
    },
    confidenceBadge: {
        backgroundColor: Config.Colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    confidenceText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Config.Colors.text,
        marginBottom: 12,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Config.Colors.surface,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    badgeText: {
        fontSize: 14,
        fontWeight: '600',
        color: Config.Colors.primary,
        marginLeft: 6,
        textTransform: 'capitalize',
    },
    ingredientList: {
        gap: 8,
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ingredientText: {
        fontSize: 16,
        color: Config.Colors.text,
        marginLeft: 8,
        textTransform: 'capitalize',
    },
    allergenBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Config.Colors.surface,
        padding: 12,
        borderRadius: 8,
    },
    allergenText: {
        fontSize: 14,
        color: Config.Colors.text,
        marginLeft: 8,
    },
    feedbackButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    feedbackButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 2,
    },
    feedbackButtonLike: {
        borderColor: Config.Colors.success,
        backgroundColor: `${Config.Colors.success}10`,
    },
    feedbackButtonDislike: {
        borderColor: Config.Colors.error,
        backgroundColor: `${Config.Colors.error}10`,
    },
    feedbackButtonText: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Config.Colors.primary,
        padding: 16,
        borderRadius: 12,
        marginTop: 8,
    },
    shareButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        marginLeft: 8,
    },
    textBox: {
        backgroundColor: Config.Colors.surface,
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Config.Colors.border,
    },
    detectedText: {
        fontSize: 14,
        color: Config.Colors.text,
        lineHeight: 20,
    },
    infoBadge: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: `${Config.Colors.primary}15`,
        padding: 12,
        borderRadius: 8,
        gap: 8,
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        color: Config.Colors.text,
        lineHeight: 20,
    },
});

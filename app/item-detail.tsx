import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Config';

const { width } = Dimensions.get('window');

export default function ItemDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [isFavorite, setIsFavorite] = useState(false);

    // TODO: Fetch actual item data based on params.id
    const mockItem = {
        id: params.id,
        name: 'Pollo asado',
        translation: 'Roasted chicken',
        ingredients: ['chicken', 'garlic', 'olive oil', 'herbs'],
        cooking: 'roasted',
        allergens: ['none'],
        confidence: 0.92,
        images: [
            { url: 'https://via.placeholder.com/400', source: 'unsplash' },
            { url: 'https://via.placeholder.com/400', source: 'pexels' },
        ],
    };

    const handleFeedback = (type: 'like' | 'dislike') => {
        // TODO: Submit feedback to backend
        console.log('Feedback:', type);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Image Gallery */}
                <View style={styles.imageContainer}>
                    <View style={styles.imagePlaceholder}>
                        <Ionicons name="image-outline" size={80} color={Colors.textSecondary} />
                        <Text style={styles.imagePlaceholderText}>Image loading...</Text>
                    </View>

                    <View style={styles.imageControls}>
                        <TouchableOpacity
                            style={styles.favoriteButton}
                            onPress={() => setIsFavorite(!isFavorite)}
                        >
                            <Ionicons
                                name={isFavorite ? 'heart' : 'heart-outline'}
                                size={24}
                                color={isFavorite ? Colors.error : 'white'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Item Details */}
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.name}>{mockItem.name}</Text>
                            <Text style={styles.translation}>{mockItem.translation}</Text>
                        </View>
                        <View style={styles.confidenceBadge}>
                            <Text style={styles.confidenceText}>
                                {Math.round(mockItem.confidence * 100)}%
                            </Text>
                        </View>
                    </View>

                    {/* Cooking Method */}
                    {mockItem.cooking && (
                        <View style={styles.section}>
                            <View style={styles.badge}>
                                <Ionicons name="flame-outline" size={16} color={Colors.primary} />
                                <Text style={styles.badgeText}>{mockItem.cooking}</Text>
                            </View>
                        </View>
                    )}

                    {/* Ingredients */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ingredients</Text>
                        <View style={styles.ingredientList}>
                            {mockItem.ingredients.map((ingredient, index) => (
                                <View key={index} style={styles.ingredientItem}>
                                    <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                                    <Text style={styles.ingredientText}>{ingredient}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Allergens */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Allergens</Text>
                        <View style={styles.allergenBadge}>
                            <Ionicons name="shield-checkmark" size={20} color={Colors.success} />
                            <Text style={styles.allergenText}>No common allergens detected</Text>
                        </View>
                    </View>

                    {/* Image Feedback */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Is this image accurate?</Text>
                        <View style={styles.feedbackButtons}>
                            <TouchableOpacity
                                style={[styles.feedbackButton, styles.feedbackButtonLike]}
                                onPress={() => handleFeedback('like')}
                            >
                                <Ionicons name="thumbs-up-outline" size={20} color={Colors.success} />
                                <Text style={[styles.feedbackButtonText, { color: Colors.success }]}>
                                    Yes
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.feedbackButton, styles.feedbackButtonDislike]}
                                onPress={() => handleFeedback('dislike')}
                            >
                                <Ionicons name="thumbs-down-outline" size={20} color={Colors.error} />
                                <Text style={[styles.feedbackButtonText, { color: Colors.error }]}>
                                    No
                                </Text>
                            </TouchableOpacity>
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
        backgroundColor: Colors.background,
    },
    imageContainer: {
        width: width,
        height: width * 0.75,
        backgroundColor: Colors.surface,
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
        color: Colors.textSecondary,
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
        color: Colors.text,
        marginBottom: 4,
    },
    translation: {
        fontSize: 18,
        color: Colors.textSecondary,
    },
    confidenceBadge: {
        backgroundColor: Colors.primary,
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
        color: Colors.text,
        marginBottom: 12,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    badgeText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.primary,
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
        color: Colors.text,
        marginLeft: 8,
        textTransform: 'capitalize',
    },
    allergenBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        padding: 12,
        borderRadius: 8,
    },
    allergenText: {
        fontSize: 14,
        color: Colors.text,
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
        borderColor: Colors.success,
        backgroundColor: `${Colors.success}10`,
    },
    feedbackButtonDislike: {
        borderColor: Colors.error,
        backgroundColor: `${Colors.error}10`,
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
        backgroundColor: Colors.primary,
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
});

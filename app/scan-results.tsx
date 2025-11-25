import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Config } from '../constants/Config';
import { GroupedMenuItem } from '@/types/OCR';
import { useAuthContext } from '@/providers/AuthProvider';
import { getScan } from '@/services/firebase/firestore';

export default function ScanResultsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { user } = useAuthContext();

    const [ocrData, setOcrData] = useState<GroupedMenuItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load scan data
    useEffect(() => {
        async function loadScan() {
            const scanId = params.scanId as string;

            if (scanId && user) {
                // Load from Firestore
                setLoading(true);
                try {
                    const scan = await getScan(user.id, scanId);
                    if (scan) {
                        setOcrData(scan.items);
                    } else {
                        setError('Scan not found');
                    }
                } catch (err) {
                    console.error('Error loading scan:', err);
                    setError('Failed to load scan');
                } finally {
                    setLoading(false);
                }
            } else if (params.ocrData) {
                // Use OCR data from params (new scan)
                setOcrData(JSON.parse(params.ocrData as string) as GroupedMenuItem[]);
            }
        }

        loadScan();
    }, [params.scanId, params.ocrData, user]);

    // Loading state
    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.emptyState}>
                    <ActivityIndicator size="large" color={Config.Colors.primary} />
                    <Text style={styles.emptyText}>Loading scan...</Text>
                </View>
            </View>
        );
    }

    // Error state
    if (error) {
        return (
            <View style={styles.container}>
                <View style={styles.emptyState}>
                    <Ionicons name="alert-circle-outline" size={80} color={Config.Colors.error} />
                    <Text style={styles.emptyTitle}>Error</Text>
                    <Text style={styles.emptyText}>{error}</Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.retryButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Empty state
    if (ocrData.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.emptyState}>
                    <Ionicons name="document-text-outline" size={80} color={Config.Colors.textSecondary} />
                    <Text style={styles.emptyTitle}>No Items Found</Text>
                    <Text style={styles.emptyText}>
                        Could not detect any menu items. Please try again.
                    </Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.retryButtonText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Recognized Items</Text>
                <Text style={styles.subtitle}>{ocrData.length} items found</Text>
            </View>

            <ScrollView style={styles.content}>
                {ocrData.map((item, index) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.itemCard}
                        onPress={() => router.push({
                            pathname: '/item-detail',
                            params: {
                                itemText: item.text,
                                itemId: item.id,
                            },
                        })}
                    >
                        <View style={styles.itemImage}>
                            <Ionicons name="restaurant-outline" size={40} color={Config.Colors.textSecondary} />
                        </View>

                        <View style={styles.itemContent}>
                            <Text style={styles.itemName} numberOfLines={2}>
                                {item.text.split('\n')[0]}
                            </Text>
                            {item.price && (
                                <Text style={styles.itemPrice}>{item.price}</Text>
                            )}

                            <View style={styles.itemFooter}>
                                <View style={styles.confidenceBadge}>
                                    <Text style={styles.confidenceText}>
                                        {Math.round(item.confidence * 100)}% confident
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <Ionicons name="chevron-forward" size={20} color={Config.Colors.textSecondary} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Config.Colors.background,
    },
    header: {
        padding: 24,
        paddingTop: 16,
        backgroundColor: Config.Colors.background,
        borderBottomWidth: 1,
        borderBottomColor: Config.Colors.border,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Config.Colors.text,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: Config.Colors.textSecondary,
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
        borderBottomColor: Config.Colors.border,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: Config.Colors.background,
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
        color: Config.Colors.text,
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Config.Colors.success,
        marginBottom: 8,
    },
    itemFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    confidenceBadge: {
        backgroundColor: Config.Colors.background,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    confidenceText: {
        fontSize: 12,
        color: Config.Colors.textSecondary,
        fontWeight: '500',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Config.Colors.text,
        marginTop: 16,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: Config.Colors.textSecondary,
        textAlign: 'center',
        marginBottom: 24,
    },
    retryButton: {
        backgroundColor: Config.Colors.primary,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

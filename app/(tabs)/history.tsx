import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Config } from '../../constants/Config';
import { useAuthContext } from '@/providers/AuthProvider';
import { getScans } from '@/services/firebase/firestore';
import { Scan } from '@/types/Scan';

export default function HistoryScreen() {
    const router = useRouter();
    const { user } = useAuthContext();
    const [scans, setScans] = useState<Scan[]>([]);
    const [loading, setLoading] = useState(true);

    const loadScans = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const userScans = await getScans(user.id);
            setScans(userScans);
        } catch (error) {
            console.error('Error loading scans:', error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Reload scans when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadScans();
        }, [loadScans])
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Scan History</Text>
                    <Text style={styles.subtitle}>Your recent menu scans</Text>
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Config.Colors.primary} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Scan History</Text>
                <Text style={styles.subtitle}>
                    {scans.length} {scans.length === 1 ? 'scan' : 'scans'}
                </Text>
            </View>

            <ScrollView style={styles.content}>
                {scans.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="document-text-outline" size={64} color={Config.Colors.textSecondary} />
                        <Text style={styles.emptyText}>No scans yet</Text>
                        <Text style={styles.emptySubtext}>
                            Start by scanning a menu with the camera
                        </Text>
                    </View>
                ) : (
                    <View style={styles.scanList}>
                        {scans.map((scan) => {
                            // Get first few item names for the header
                            const itemNames = scan.items
                                .slice(0, 2)
                                .map(item => item.text.split('\n')[0])
                                .join(', ');
                            const moreCount = scan.itemCount - 2;
                            const moreItems = scan.itemCount > 2 ? ' +' + moreCount + ' more' : '';

                            return (
                                <TouchableOpacity
                                    key={scan.id}
                                    style={styles.scanCard}
                                    onPress={() => router.push('/scan-results?scanId=' + scan.id)}
                                >
                                    <View style={styles.scanInfo}>
                                        <Text style={styles.scanTitle} numberOfLines={1}>
                                            {itemNames}{moreItems}
                                        </Text>
                                        <View style={styles.scanMeta}>
                                            <Text style={styles.scanDate}>
                                                {new Date(scan.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </Text>
                                            <Text style={styles.scanMetaSeparator}>•</Text>
                                            <Text style={styles.scanTime}>
                                                {new Date(scan.createdAt).toLocaleTimeString('en-US', {
                                                    hour: 'numeric',
                                                    minute: '2-digit',
                                                })}
                                            </Text>
                                        </View>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color={Config.Colors.textSecondary} />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
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
        paddingTop: 60,
        backgroundColor: Config.Colors.background,
        borderBottomWidth: 1,
        borderBottomColor: Config.Colors.border,
    },
    title: {
        fontSize: 28,
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyState: {
        padding: 48,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: Config.Colors.textSecondary,
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: Config.Colors.textSecondary,
        textAlign: 'center',
    },
    scanList: {
        padding: 16,
    },
    scanCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Config.Colors.border,
    },
    scanInfo: {
        flex: 1,
    },
    scanTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Config.Colors.text,
        marginBottom: 6,
    },
    scanMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    scanDate: {
        fontSize: 14,
        color: Config.Colors.textSecondary,
    },
    scanMetaSeparator: {
        fontSize: 14,
        color: Config.Colors.textSecondary,
    },
    scanTime: {
        fontSize: 14,
        color: Config.Colors.textSecondary,
    },
    scanDetails: {
        marginRight: 12,
    },
    scanStat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    scanStatText: {
        fontSize: 14,
        color: Config.Colors.textSecondary,
    },
});

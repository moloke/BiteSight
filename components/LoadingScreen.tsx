import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Config } from '@/constants/Config';

export function LoadingScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>BiteSight</Text>
            <ActivityIndicator size="large" color={Config.Colors.primary} style={styles.spinner} />
            <Text style={styles.subtitle}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Config.Colors.background,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Config.Colors.primary,
        marginBottom: 24,
    },
    spinner: {
        marginVertical: 16,
    },
    subtitle: {
        fontSize: 16,
        color: Config.Colors.textSecondary,
    },
});

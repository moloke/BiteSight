import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Config';

export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
            </View>

            <ScrollView style={styles.content}>
                {/* Account Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="person-outline" size={24} color={Colors.text} />
                            <Text style={styles.settingText}>Sign In</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* Preferences Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="language-outline" size={24} color={Colors.text} />
                            <Text style={styles.settingText}>Translation Language</Text>
                        </View>
                        <View style={styles.settingRight}>
                            <Text style={styles.settingValue}>English</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="cloud-upload-outline" size={24} color={Colors.text} />
                            <Text style={styles.settingText}>Upload Images</Text>
                        </View>
                        <View style={styles.settingRight}>
                            <Text style={styles.settingValue}>Off</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* About Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About</Text>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="information-circle-outline" size={24} color={Colors.text} />
                            <Text style={styles.settingText}>Version</Text>
                        </View>
                        <Text style={styles.settingValue}>1.0.0</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="shield-outline" size={24} color={Colors.text} />
                            <Text style={styles.settingText}>Privacy Policy</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
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
    header: {
        padding: 24,
        paddingTop: 60,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
    },
    content: {
        flex: 1,
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 8,
        marginLeft: 24,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        paddingHorizontal: 24,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingText: {
        fontSize: 16,
        color: Colors.text,
        marginLeft: 16,
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingValue: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginRight: 8,
    },
});

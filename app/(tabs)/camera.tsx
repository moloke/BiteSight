import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Config';
import { useRouter } from 'expo-router';

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [isProcessing, setIsProcessing] = useState(false);
    const [autoOCR, setAutoOCR] = useState(false);
    const cameraRef = useRef<CameraView>(null);
    const router = useRouter();

    if (!permission) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Ionicons name="camera-outline" size={80} color={Colors.textSecondary} />
                <Text style={styles.permissionTitle}>Camera Access Required</Text>
                <Text style={styles.permissionText}>
                    BiteSight needs camera access to scan menu items and recognize text.
                </Text>
                <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                    <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleCapture = async () => {
        if (!cameraRef.current || isProcessing) return;

        setIsProcessing(true);
        try {
            // TODO: Implement OCR capture logic
            // const photo = await cameraRef.current.takePictureAsync();
            // Process OCR and navigate to results

            // For now, just navigate to results (placeholder)
            setTimeout(() => {
                setIsProcessing(false);
                router.push('/scan-results');
            }, 1000);
        } catch (error) {
            console.error('Capture error:', error);
            setIsProcessing(false);
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing="back"
            >
                {/* Header Controls */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.autoOCRToggle}
                        onPress={() => setAutoOCR(!autoOCR)}
                    >
                        <Ionicons
                            name={autoOCR ? 'scan' : 'scan-outline'}
                            size={24}
                            color="white"
                        />
                        <Text style={styles.autoOCRText}>
                            Auto OCR {autoOCR ? 'ON' : 'OFF'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* OCR Overlay - TODO: Add detected text boxes */}
                <View style={styles.overlay}>
                    {/* Placeholder for OCR overlay boxes */}
                </View>

                {/* Bottom Controls */}
                <View style={styles.controls}>
                    <View style={styles.captureContainer}>
                        <TouchableOpacity
                            style={[
                                styles.captureButton,
                                isProcessing && styles.captureButtonDisabled
                            ]}
                            onPress={handleCapture}
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <ActivityIndicator size="large" color="white" />
                            ) : (
                                <View style={styles.captureButtonInner} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.hint}>
                        {autoOCR
                            ? 'Point at menu to detect items'
                            : 'Tap to capture and scan menu'}
                    </Text>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: Colors.background,
    },
    permissionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginTop: 24,
        marginBottom: 12,
    },
    permissionText: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
    },
    permissionButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 12,
    },
    permissionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    camera: {
        flex: 1,
    },
    header: {
        padding: 16,
        paddingTop: 60,
    },
    autoOCRToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    autoOCRText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    overlay: {
        flex: 1,
    },
    controls: {
        padding: 24,
        paddingBottom: 40,
        alignItems: 'center',
    },
    captureContainer: {
        marginBottom: 16,
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'white',
    },
    captureButtonDisabled: {
        opacity: 0.5,
    },
    captureButtonInner: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'white',
    },
    hint: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
});

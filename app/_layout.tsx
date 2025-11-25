import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuthContext } from '@/providers/AuthProvider';
import { LoadingScreen } from '@/components/LoadingScreen';

function AppNavigator() {
    const { loading } = useAuthContext();

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="scan-results"
                options={{
                    title: 'Scan Results',
                    headerBackTitle: 'Camera'
                }}
            />
            <Stack.Screen
                name="item-detail"
                options={{
                    title: 'Item Details',
                    presentation: 'modal'
                }}
            />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <AuthProvider>
                    <AppNavigator />
                </AuthProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

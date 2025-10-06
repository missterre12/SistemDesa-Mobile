import AppNavigator from './navigation/index';
import { SocketProvider } from './context/SocketContext';
import { AuthProvider } from './context/AuthContext';

export function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppNavigator />
      </SocketProvider>
    </AuthProvider>
  );
}

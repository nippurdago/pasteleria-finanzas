import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Auth from './components/Auth';
import FinanceDashboard from './components/FinanceDashboard';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AuthGate />
        </AuthProvider>
    );
};

const AuthGate: React.FC = () => {
    const { session } = useAuth();
    // Este console.log nos ayudó a depurar, lo podemos dejar o quitar.
    console.log('AuthGate: Decidiendo vista con sesión:', session);
    return session ? <FinanceDashboard /> : <Auth />;
};

export default App;
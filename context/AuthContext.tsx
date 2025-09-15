import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';
import { CakeIcon } from '../components/icons/CakeIcon';

interface AuthContextType {
    session: Session | null;
    user: User | null;
}

export const AuthContext = createContext<AuthContextType>({ session: null, user: null });

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            // Este console.log nos ayudó a depurar.
            console.log('AuthContext: Sesión inicial obtenida:', session);
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 text-gray-800"
                style={{ backgroundImage: `radial-gradient(circle at 10% 20%, rgb(253, 203, 222) 0%, rgb(255, 223, 217) 90%)` }}>
                <CakeIcon className="h-16 w-16 text-pink-500 animate-pulse" />
                <p className="mt-4 text-xl text-pink-700 font-serif">Cargando...</p>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ session, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
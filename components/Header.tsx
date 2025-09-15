import React from 'react';
import { supabase } from '../supabaseClient';
import { CakeIcon } from './icons/CakeIcon';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
    const { user } = useAuth();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <header className="py-6 relative">
            <div className="container mx-auto flex items-center justify-center">
                <div className="flex items-center gap-4">
                    <CakeIcon className="h-10 w-10 text-pink-500" />
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-700 tracking-tight">
                        Pastelería Finanzas
                    </h1>
                </div>
                {user && (
                    <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
                        <span className="text-sm text-gray-600 hidden sm:block">{user.email}</span>
                        <button
                            onClick={handleSignOut}
                            className="bg-pink-500 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow hover:bg-pink-600 transition-colors"
                        >
                            Salir
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
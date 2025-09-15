import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { CakeIcon } from './icons/CakeIcon';

const Auth: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        
        if (error) {
            setError("Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.");
            console.error("Error de inicio de sesión:", error.message);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4"
             style={{ backgroundImage: `radial-gradient(circle at 10% 20%, rgb(253, 203, 222) 0%, rgb(255, 223, 217) 90%)` }}>
            <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="flex flex-col items-center mb-6">
                    <CakeIcon className="h-12 w-12 text-pink-500" />
                    <h1 className="text-3xl font-bold text-gray-700 mt-2 font-serif">Pastelería Finanzas</h1>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-2 font-serif">
                    Acceso para Empleados
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Ingresa con tus credenciales para continuar.
                </p>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Correo Electrónico</label>
                        <input
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="tu@correo.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Contraseña</label>
                        <input
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 mt-2 text-white font-bold bg-pink-500 rounded-lg shadow-md hover:bg-pink-600 transition-colors disabled:bg-pink-300"
                        >
                            {loading ? 'Cargando...' : 'Ingresar'}
                        </button>
                    </div>
                </form>

                {error && <p className="mt-4 text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
                
            </div>
        </div>
    );
};

export default Auth;

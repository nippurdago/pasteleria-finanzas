
import React from 'react';
import { CakeIcon } from './icons/CakeIcon';

const Header: React.FC = () => {
    return (
        <header className="py-6">
            <div className="container mx-auto flex items-center justify-center gap-4">
                <CakeIcon className="h-10 w-10 text-pink-500" />
                <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-700 tracking-tight">
                    Pastelería Finanzas
                </h1>
            </div>
        </header>
    );
};

export default Header;
   
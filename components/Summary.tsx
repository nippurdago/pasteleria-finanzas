import React from 'react';
import { ArrowUpIcon } from './icons/ArrowUpIcon';
import { ArrowDownIcon } from './icons/ArrowDownIcon';
import { BalanceIcon } from './icons/BalanceIcon';

interface SummaryProps {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
}

const Summary: React.FC<SummaryProps> = ({ totalIncome, totalExpenses, balance }) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(amount);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-green-200">
                <div className="flex items-center justify-center gap-3">
                    <ArrowUpIcon className="h-8 w-8 text-green-500"/>
                    <h2 className="text-xl font-semibold text-gray-600">Ingresos Totales</h2>
                </div>
                <p className="text-3xl font-bold text-green-600 mt-2">{formatCurrency(totalIncome)}</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-red-200">
                <div className="flex items-center justify-center gap-3">
                    <ArrowDownIcon className="h-8 w-8 text-red-500"/>
                    <h2 className="text-xl font-semibold text-gray-600">Gastos Totales</h2>
                </div>
                <p className="text-3xl font-bold text-red-600 mt-2">{formatCurrency(totalExpenses)}</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-blue-200">
                <div className="flex items-center justify-center gap-3">
                    <BalanceIcon className="h-8 w-8 text-blue-500"/>
                    <h2 className="text-xl font-semibold text-gray-600">Balance Actual</h2>
                </div>
                <p className={`text-3xl font-bold mt-2 ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    {formatCurrency(balance)}
                </p>
            </div>
        </div>
    );
};

export default Summary;
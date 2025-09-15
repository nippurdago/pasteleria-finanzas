import React from 'react';
import { Transaction, TransactionType } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { ArrowUpIcon } from './icons/ArrowUpIcon';
import { ArrowDownIcon } from './icons/ArrowDownIcon';

interface TransactionListProps {
    transactions: Transaction[];
    onDeleteTransaction: (id: number) => void;
    activeFilter: 'all' | 'income' | 'expense';
    onSetFilter: (filter: 'all' | 'income' | 'expense') => void;
    loading: boolean;
    error: string | null;
}

const TransactionItem: React.FC<{ transaction: Transaction; onDelete: (id: number) => void }> = ({ transaction, onDelete }) => {
    const isIncome = transaction.type === TransactionType.Income;
    const amountColor = isIncome ? 'text-green-600' : 'text-red-600';
    const borderColor = isIncome ? 'border-green-200' : 'border-red-200';
    const Icon = isIncome ? ArrowUpIcon : ArrowDownIcon;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        const localDate = new Date(date.getTime() + userTimezoneOffset);
        return localDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <li className={`flex items-center p-3 bg-white rounded-lg shadow-sm border-l-4 ${borderColor} mb-3`}>
            <div className={`p-2 rounded-full mr-4 ${isIncome ? 'bg-green-100' : 'bg-red-100'}`}>
                <Icon className={`h-5 w-5 ${isIncome ? 'text-green-500' : 'text-red-500'}`} />
            </div>
            <div className="flex-grow">
                <p className="font-semibold text-gray-800">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.category} • {formatDate(transaction.date)}</p>
            </div>
            <div className="text-right mx-4">
                 <p className={`font-bold text-lg ${amountColor}`}>
                    {isIncome ? '+' : '-'} {new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(transaction.amount)}
                </p>
            </div>
            <button 
                onClick={() => onDelete(transaction.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                aria-label={`Eliminar transacción ${transaction.description}`}
            >
                <TrashIcon className="h-5 w-5" />
            </button>
        </li>
    );
};


const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction, activeFilter, onSetFilter, loading, error }) => {
    const getButtonClass = (filter: 'all' | 'income' | 'expense') => {
        return `px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            activeFilter === filter 
                ? 'bg-pink-500 text-white shadow-md' 
                : 'text-gray-600 bg-white hover:bg-pink-100'
        }`;
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center py-16">
                    <p className="text-gray-500">Cargando transacciones...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center py-16 bg-red-50 rounded-lg">
                    <p className="text-red-600 font-semibold">¡Error!</p>
                    <p className="text-red-500 mt-2">{error}</p>
                </div>
            );
        }

        if (transactions.length === 0) {
            return (
                <div className="text-center py-16">
                    <p className="text-gray-500">No hay transacciones para este mes.</p>
                    <p className="text-sm text-gray-400 mt-2">Añade una nueva transacción para empezar.</p>
                </div>
            );
        }

        return (
            <ul>
                {transactions.map(transaction => (
                    <TransactionItem 
                        key={transaction.id} 
                        transaction={transaction} 
                        onDelete={onDeleteTransaction} 
                    />
                ))}
            </ul>
        );
    };

    return (
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                 <h3 className="text-2xl font-bold text-gray-700 mb-4 sm:mb-0 font-serif">Historial de Transacciones</h3>
                 <div className="flex items-center space-x-2 p-1 bg-gray-100 rounded-full">
                     <button onClick={() => onSetFilter('all')} className={getButtonClass('all')}>Todos</button>
                     <button onClick={() => onSetFilter('income')} className={getButtonClass('income')}>Ingresos</button>
                     <button onClick={() => onSetFilter('expense')} className={getButtonClass('expense')}>Gastos</button>
                 </div>
            </div>
            
            <div className="h-[450px] overflow-y-auto pr-2">
                {renderContent()}
            </div>
        </div>
    );
};

export default TransactionList;
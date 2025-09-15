import React, { useState } from 'react';
import { Transaction, TransactionType, IncomeCategory, ExpenseCategory } from '../types';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../constants';

interface TransactionFormProps {
    onAddTransaction: (transaction: Omit<Transaction, 'id' | 'created_at' | 'user_id'>) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [type, setType] = useState<TransactionType>(TransactionType.Income);
    const [category, setCategory] = useState<IncomeCategory | ExpenseCategory>(INCOME_CATEGORIES[0]);

    const handleTypeChange = (newType: TransactionType) => {
        setType(newType);
        setCategory(newType === TransactionType.Income ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount || !date || !category) {
            alert('Por favor, complete todos los campos.');
            return;
        }
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            alert('Por favor, ingrese un monto válido y positivo.');
            return;
        }

        onAddTransaction({
            description,
            amount: numericAmount,
            date,
            type,
            category,
        });

        // Reset form
        setDescription('');
        setAmount('');
        setDate(new Date().toISOString().slice(0, 10));
    };

    const categories = type === TransactionType.Income ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    return (
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 h-full">
            <h3 className="text-2xl font-bold text-gray-700 mb-6 text-center font-serif">Añadir Transacción</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-2 rounded-lg bg-pink-100 p-1">
                    <button
                        type="button"
                        onClick={() => handleTypeChange(TransactionType.Income)}
                        className={`w-full py-2 rounded-md text-sm font-medium transition-colors ${type === 'income' ? 'bg-green-500 text-white shadow' : 'text-green-700 hover:bg-green-100'}`}
                    >
                        Ingreso
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTypeChange(TransactionType.Expense)}
                        className={`w-full py-2 rounded-md text-sm font-medium transition-colors ${type === 'expense' ? 'bg-red-500 text-white shadow' : 'text-red-700 hover:bg-red-100'}`}
                    >
                        Gasto
                    </button>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">Descripción</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ej: Venta de tarta de chocolate"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white text-gray-700"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-600 mb-1">Monto (S/)</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        min="0.01"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white text-gray-700"
                        required
                    />
                </div>
                 <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-600 mb-1">Categoría</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as IncomeCategory | ExpenseCategory)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                        required
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-600 mb-1">Fecha</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white text-gray-700"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 mt-4 text-white font-bold bg-pink-500 rounded-lg shadow-md hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                    Añadir
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Summary from './components/Summary';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import MonthYearPicker from './components/MonthYearPicker';
import { useTransactions } from './hooks/useTransactions';
import { Transaction, TransactionType } from './types';

const App: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
    
    const { 
        transactions, 
        loading, 
        error, 
        addTransaction, 
        deleteTransaction 
    } = useTransactions(selectedDate);

    const filteredTransactions = useMemo(() => {
        if (filter === 'all') return transactions;
        return transactions.filter(t => t.type === filter);
    }, [transactions, filter]);
    
    const { totalIncome, totalExpenses, balance } = useMemo(() => {
        return transactions.reduce((acc, transaction) => {
            if (transaction.type === TransactionType.Income) {
                acc.totalIncome += transaction.amount;
            } else {
                acc.totalExpenses += transaction.amount;
            }
            acc.balance = acc.totalIncome - acc.totalExpenses;
            return acc;
        }, { totalIncome: 0, totalExpenses: 0, balance: 0 });
    }, [transactions]);

    const handleAddTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at'>) => {
        await addTransaction(transaction);
    };

    const handleDeleteTransaction = async (id: number) => {
        await deleteTransaction(id);
    };

    return (
        <div 
            className="min-h-screen bg-pink-50 text-gray-800"
            style={{ 
                backgroundImage: `
                    radial-gradient(circle at 10% 20%, rgb(253, 203, 222) 0%, rgb(255, 223, 217) 90%)
                ` 
            }}
        >
            <Header />
            <main className="container mx-auto p-4 md:p-6">
                <Summary 
                    totalIncome={totalIncome} 
                    totalExpenses={totalExpenses} 
                    balance={balance} 
                />
                
                <MonthYearPicker selectedDate={selectedDate} onChange={setSelectedDate} />

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <TransactionForm onAddTransaction={handleAddTransaction} />
                    </div>
                    <div className="lg:col-span-2">
                        <TransactionList
                            transactions={filteredTransactions}
                            onDeleteTransaction={handleDeleteTransaction}
                            activeFilter={filter}
                            onSetFilter={setFilter}
                            loading={loading}
                            error={error}
                        />
                    </div>
                </div>
            </main>
             <footer className="text-center py-6 text-pink-400">
                <p>&copy; {new Date().getFullYear()} Pastelería Finanzas. Hecho con ♡.</p>
            </footer>
        </div>
    );
};

export default App;
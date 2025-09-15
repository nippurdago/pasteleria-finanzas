import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { Transaction } from '../types';

type NewTransaction = Omit<Transaction, 'id' | 'created_at'>;

export const useTransactions = (selectedDate: Date) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Usuario no autenticado.");

            const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).toISOString().slice(0, 10);
            const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).toISOString().slice(0, 10);

            const { data, error: fetchError } = await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', user.id)
                .gte('date', firstDay)
                .lte('date', lastDay)
                .order('date', { ascending: false })
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;

            setTransactions(data || []);
        } catch (e: any) {
            console.error("Error al cargar transacciones:", e);
            setError("No se pudieron cargar las transacciones. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    }, [selectedDate]);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                fetchTransactions();
            } else {
                setLoading(false);
                setTransactions([]);
            }
        };
        checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
                fetchTransactions();
            } else if (event === 'SIGNED_OUT') {
                setTransactions([]);
            }
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };

    }, [fetchTransactions]);

    const addTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at' | 'user_id'>) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Usuario no autenticado.");

            const newTransaction = { ...transaction, user_id: user.id };

            const { data: insertedData, error: insertError } = await supabase
                .from('transactions')
                .insert([newTransaction])
                .select();

            if (insertError) throw insertError;

            if (insertedData) {
                setTransactions(prev => [insertedData[0], ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() || new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()));
            }

        } catch (e: any) {
            console.error("Error al añadir transacción:", e);
            setError("No se pudo añadir la transacción.");
        }
    };

    const deleteTransaction = async (id: number) => {
        try {
            const { error: deleteError } = await supabase
                .from('transactions')
                .delete()
                .match({ id });

            if (deleteError) throw deleteError;

            setTransactions(prev => prev.filter(t => t.id !== id));
        } catch (e: any) {
            console.error("Error al eliminar transacción:", e);
            setError("No se pudo eliminar la transacción.");
        }
    };

    return { transactions, loading, error, addTransaction, deleteTransaction };
};
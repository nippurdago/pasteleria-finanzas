import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { Transaction } from '../types';

export const useTransactions = (selectedDate: Date) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTransactions = useCallback(async () => {
        if (!supabase) {
            setError("La conexión con la base de datos no está configurada.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).toISOString();
            const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).toISOString();

            const { data, error: fetchError } = await supabase
                .from('transactions')
                .select('*')
                .gte('date', firstDay)
                .lte('date', lastDay)
                .order('date', { ascending: false })
                .order('created_at', { ascending: false });

            if (fetchError) {
                throw fetchError;
            }

            setTransactions(data || []);
        } catch (e: any) {
            console.error("Error al cargar transacciones:", e);
            setError("No se pudieron cargar las transacciones. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    }, [selectedDate]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const addTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at'>) => {
        if (!supabase) return;
        
        try {
            const { data, error: insertError } = await supabase
                .from('transactions')
                .insert([transaction])
                .select()
                .single();

            if (insertError) {
                throw insertError;
            }

            // Refrescamos la lista para mostrar la nueva transacción
            fetchTransactions();

        } catch (e: any) {
            console.error("Error al añadir transacción:", e);
            setError("No se pudo añadir la transacción.");
        }
    };

    const deleteTransaction = async (id: number) => {
        if (!supabase) return;

        try {
            const { error: deleteError } = await supabase
                .from('transactions')
                .delete()
                .eq('id', id);

            if (deleteError) {
                throw deleteError;
            }

            setTransactions(prev => prev.filter(t => t.id !== id));
        } catch (e: any) {
            console.error("Error al eliminar transacción:", e);
            setError("No se pudo eliminar la transacción.");
        }
    };

    return { transactions, loading, error, addTransaction, deleteTransaction, refetch: fetchTransactions };
};

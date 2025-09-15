export enum TransactionType {
    Income = 'income',
    Expense = 'expense',
}

export enum IncomeCategory {
    Pastries = 'Pasteles y Tartas',
    Cakes = 'Bollería',
    Beverages = 'Bebidas',
    CustomOrders = 'Pedidos Personalizados',
    Other = 'Otros',
}

export enum ExpenseCategory {
    Ingredients = 'Ingredientes',
    Utilities = 'Servicios Públicos',
    Rent = 'Alquiler',
    Salaries = 'Salarios',
    Marketing = 'Marketing',
    Supplies = 'Suministros',
    Other = 'Otros',
}

export interface Transaction {
    id: number;
    description: string;
    amount: number;
    date: string;
    type: TransactionType;
    category: IncomeCategory | ExpenseCategory;
    created_at?: string;
    user_id: string;
}
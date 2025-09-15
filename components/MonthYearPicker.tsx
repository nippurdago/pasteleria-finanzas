import React from 'react';

interface MonthYearPickerProps {
    selectedDate: Date;
    onChange: (date: Date) => void;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ selectedDate, onChange }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(e.target.value, 10);
        const newDate = new Date(selectedDate);
        newDate.setFullYear(newYear);
        onChange(newDate);
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(e.target.value, 10);
        const newDate = new Date(selectedDate);
        newDate.setMonth(newMonth);
        onChange(newDate);
    };

    return (
        <div className="mt-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-200 flex justify-center items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-600">Ver resumen de:</h3>
            <div className="flex gap-4">
                <select
                    value={selectedDate.getMonth()}
                    onChange={handleMonthChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                >
                    {months.map((month, index) => (
                        <option key={index} value={index}>
                            {month}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedDate.getFullYear()}
                    onChange={handleYearChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                >
                    {years.map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default MonthYearPicker;
import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    description: string;
    iconBgColor: string;
    icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, description, iconBgColor, icon }) => {
    return (
        <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
            <div className="flex items-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconBgColor} text-white`}>
                    {icon}
                </div>
                <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                    <div className="flex items-baseline">
                        <p className="text-2xl font-semibold text-gray-900">{value}</p>
                        <p className="ml-2 text-sm text-gray-500">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
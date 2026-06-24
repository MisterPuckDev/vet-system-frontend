import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { navigationConfig } from '../config/navigation';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const { user } = useAuth();

    // Filter routes based on user's role
    const authorizedNavigation = navigationConfig.filter(
        (item) => user && item.allowedRoles.includes(user.role)
    );

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 transition-opacity lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar container */}
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 overflow-y-auto transition duration-300 ease-in-out lg:static lg:inset-0 lg:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-center h-16 border-b border-gray-200 bg-indigo-600">
                    <span className="text-xl font-bold text-white tracking-wider">VetSystem</span>
                </div>

                <nav className="mt-6 px-4 space-y-2">
                    {authorizedNavigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${
                                    isActive
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            <item.icon className="h-5 w-5 mr-3" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    );
};
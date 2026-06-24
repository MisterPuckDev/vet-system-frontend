import React from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { MenuIcon, UserIcon } from './Icons';

interface HeaderProps {
    toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const { user, logout } = useAuth();

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
            <div className="flex items-center">
                <button
                    onClick={toggleSidebar}
                    className="text-gray-500 focus:outline-none lg:hidden hover:text-indigo-600 transition-colors"
                >
                    <MenuIcon className="h-6 w-6" />
                </button>
                <h1 className="hidden sm:block ml-4 text-xl font-semibold text-gray-800">
                    Dashboard Overview
                </h1>
            </div>

            <div className="flex items-center">
                <div className="flex items-center space-x-3">
                    <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-medium text-gray-900">
              {user?.firstName} {user?.lastName}
            </span>
                        <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wide">
              {user?.role}
            </span>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        <UserIcon className="h-6 w-6" />
                    </div>
                    <button
                        onClick={logout}
                        className="ml-4 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </header>
    );
};
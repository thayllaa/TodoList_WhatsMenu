'use client';

import React from 'react';

interface FilterButtonProps {
  filter: 'all' | 'completed' | 'incomplete';
  setFilter: (filter: 'all' | 'completed' | 'incomplete') => void;
}

const FilterButtons: React.FC<FilterButtonProps> = ({ filter, setFilter }) => {
  const commonClasses =
    'px-4 py-2 rounded-lg font-semibold transition-colors duration-300';
  const activeClasses = 'bg-blue-600 text-white';
  const inactiveClasses =
    'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600';
  return (
    <div className="flex justify-center space-x-2 mb-8">
      <button
        onClick={() => setFilter('all')}
        className={`${commonClasses} ${
          filter === 'all' ? activeClasses : inactiveClasses
        }`}
      >
        Todas
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={`${commonClasses} ${
          filter === 'completed' ? activeClasses : inactiveClasses
        }`}
      >
        Completas
      </button>
      <button
        onClick={() => setFilter('incomplete')}
        className={`${commonClasses} ${
          filter === 'incomplete' ? activeClasses : inactiveClasses
        }`}
      >
        Incompletas
      </button>
    </div>
  );
};

export default FilterButtons;

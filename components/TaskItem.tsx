'use client';

import React from 'react';
import { Task } from '../types/index';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}) => {
  return (
    <li
      className={`
        flex items-center justify-between p-4 rounded-lg shadow-md transition-all duration-300
        ${
          task.completed
            ? 'bg-green-100 dark:bg-green-800'
            : 'bg-white dark:bg-gray-800'
        }
      `}
    >
      <div className="flex-1 min-w-0 mr-4">
        <h3
          className={`
            font-semibold text-lg transition-all duration-300
            ${
              task.completed
                ? 'line-through text-gray-500 dark:text-gray-400'
                : 'text-gray-900 dark:text-gray-100'
            }
          `}
        >
          {task.title}
        </h3>
        <p
          className={`
            text-sm text-gray-600 dark:text-gray-300 transition-all duration-300
            ${task.completed ? 'line-through' : ''}
          `}
        >
          {task.description || 'Sem descrição.'}
        </p>
      </div>
      <div className="flex space-x-2 text-gray-500 dark:text-gray-400">
        <button
          onClick={() => onEdit(task)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          title="Editar tarefa"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-7.228 7.228a2 2 0 01-.762.59l-3.376 1.125a.5.5 0 01-.634-.634l1.125-3.376a2 2 0 01.59-.762l7.228-7.228zM15 5l1.5 1.5-6.5 6.5-1.5-1.5 6.5-6.5z" />
          </svg>
        </button>
        <button
          onClick={() => onToggle(task.id)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          title={
            task.completed ? 'Marcar como incompleta' : 'Marcar como completa'
          }
        >
          {task.completed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          title="Excluir tarefa"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default TaskItem;

'use client';
import { Inter } from 'next/font/google';
import React, { useState, useEffect, useMemo } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterButtons from '../components/FilterButton';
import { Task } from '../types/index';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>(
    'all'
  );
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // 🔹 Carrega do localStorage ao montar
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Erro ao carregar tarefas do localStorage', error);
      }
    }

    if (savedDarkMode) {
      try {
        setDarkMode(JSON.parse(savedDarkMode));
      } catch (error) {
        console.error('Erro ao carregar tema do localStorage', error);
      }
    }
  }, []);

  // 🔹 Sempre que mudar tasks, salva
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // 🔹 Sempre que mudar darkMode, salva
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSaveTask = (taskData: { title: string; description: string }) => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                title: taskData.title,
                description: taskData.description,
              }
            : task
        )
      );
      setEditingTask(null);
    } else {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: taskData.title,
        description: taskData.description,
        completed: false,
        createdAt: Date.now(),
      };
      setTasks([newTask, ...tasks]);
    }
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    if (filter === 'incomplete') {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  }, [tasks, filter]);

  return (
    <div className={`${darkMode ? 'dark' : ''} ${inter.className}`}>
      <div
        className={`min-h-screen p-8 font-sans transition-colors duration-500 ${
          darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
        }`}
      >
        <div className="max-w-xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Lista de Tarefas
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
              title="Alternar modo claro/escuro"
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </header>

          <TaskForm
            onSave={handleSaveTask}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
          />
          <FilterButtons filter={filter} setFilter={setFilter} />
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggleComplete}
            onDelete={handleDeleteTask}
            onEdit={setEditingTask}
          />
        </div>
      </div>
    </div>
  );
}

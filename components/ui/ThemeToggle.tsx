"use client";

import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, resolvedTheme, toggleTheme, setTheme } = useTheme();

  const getIcon = () => {
    if (theme === 'light') return <Sun size={16} />;
    if (theme === 'dark') return <Moon size={16} />;
    return <Monitor size={16} />;
  };

  const getLabel = () => {
    if (theme === 'light') return 'Light';
    if (theme === 'dark') return 'Dark';
    return 'System';
  };

  const getNextTheme = () => {
    if (theme === 'light') return 'dark';
    if (theme === 'dark') return 'system';
    return 'light';
  };

  return (
    <motion.div
      className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/20 dark:bg-gray-200/20 backdrop-blur-sm border border-gray-700/30 dark:border-gray-300/30"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Theme options */}
      <div className="flex items-center gap-1">
        {(['light', 'dark', 'system'] as const).map((themeOption) => (
          <motion.button
            key={themeOption}
            onClick={() => setTheme(themeOption)}
            className={`p-2 rounded-md transition-all duration-200 ${
              theme === themeOption
                ? 'bg-violet-500/20 text-violet-400 dark:bg-violet-400/20 dark:text-violet-300'
                : 'text-gray-400 hover:text-gray-200 dark:text-gray-500 dark:hover:text-gray-300'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={`${themeOption.charAt(0).toUpperCase() + themeOption.slice(1)} mode`}
          >
            {themeOption === 'light' && <Sun size={14} />}
            {themeOption === 'dark' && <Moon size={14} />}
            {themeOption === 'system' && <Monitor size={14} />}
          </motion.button>
        ))}
      </div>

      {/* Current theme indicator */}
      <motion.div
        className="flex items-center gap-2 px-3 py-1 rounded-md bg-violet-500/10 dark:bg-violet-400/10 border border-violet-500/20 dark:border-violet-400/20"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        key={theme}
      >
        {getIcon()}
        <span className="text-xs font-medium text-violet-400 dark:text-violet-300">
          {getLabel()}
        </span>
      </motion.div>

      {/* Quick toggle button */}
      <motion.button
        onClick={toggleTheme}
        className="p-2 rounded-md text-gray-400 hover:text-violet-400 dark:text-gray-500 dark:hover:text-violet-300 transition-colors duration-200"
        whileHover={{ rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        title={`Switch to ${getNextTheme()} mode`}
      >
        <Sun size={16} className="hidden dark:block" />
        <Moon size={16} className="block dark:hidden" />
      </motion.button>
    </motion.div>
  );
}

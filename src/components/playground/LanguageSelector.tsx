import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Language } from './PlaygroundView';

interface LanguageSelectorProps {
  language: Language;
  onChange: (language: Language) => void;
}

const languages: { value: Language; label: string; color: string }[] = [
  { value: 'python', label: 'Python', color: 'text-blue-600' },
  { value: 'javascript', label: 'JavaScript', color: 'text-yellow-600' },
];

export function LanguageSelector({ language, onChange }: LanguageSelectorProps) {
  const currentLanguage = languages.find(lang => lang.value === language);

  return (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => onChange(e.target.value as Language)}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}
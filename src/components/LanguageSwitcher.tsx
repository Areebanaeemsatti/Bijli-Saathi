import React from 'react';
import { Language } from '../types/bill';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  onLanguageChange
}) => {
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ur', label: 'اردو', flag: '🇵🇰' },
    { code: 'roman_ur', label: 'Roman Urdu', flag: '🇵🇰' }
  ];

  return (
    <div className="flex items-center gap-1 bg-[#12261F] p-1 rounded-full border border-[#1B392F]">
      <Globe className="w-4 h-4 text-emerald-400 ml-2 mr-1" />
      <div className="flex items-center gap-1">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
              currentLang === lang.code
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                : 'text-gray-300 hover:text-white hover:bg-emerald-900/30'
            }`}
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

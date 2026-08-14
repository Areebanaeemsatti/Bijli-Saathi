import React from 'react';
import { Zap, BarChart3, Search, Lightbulb } from 'lucide-react';
import { Language } from '../types/bill';
import { TRANSLATIONS } from '../i18n/translations';

interface FeatureSectionProps {
  currentLang: Language;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].features;

  const features = [
    {
      icon: Zap,
      title: t.f1Title,
      desc: t.f1Desc,
      color: 'from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/30'
    },
    {
      icon: BarChart3,
      title: t.f2Title,
      desc: t.f2Desc,
      color: 'from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30'
    },
    {
      icon: Search,
      title: t.f3Title,
      desc: t.f3Desc,
      color: 'from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/30'
    },
    {
      icon: Lightbulb,
      title: t.f4Title,
      desc: t.f4Desc,
      color: 'from-teal-500/20 to-teal-600/10 text-teal-300 border-teal-500/30'
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 relative border-t border-[#1B392F]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Core Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t.sectionTitle}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            {t.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-[#12261F] border border-[#1B392F] hover:border-emerald-500/40 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-xl glass-panel-hover flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} border flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#1B392F]/60 flex items-center justify-between text-xs text-emerald-400 font-medium">
                  <span>AI Powered</span>
                  <span>100% Instant</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

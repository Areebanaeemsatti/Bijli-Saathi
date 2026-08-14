import React, { useState, useEffect } from 'react';
import { Language, BillData } from './types/bill';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeatureSection } from './components/FeatureSection';
import { HowItWorks } from './components/HowItWorks';
import { BillUploader } from './components/BillUploader';
import { AnalysisLoader } from './components/AnalysisLoader';
import { ResultsDashboard } from './components/ResultsDashboard';
import { Footer } from './components/Footer';
import { analyzeBillFile } from './services/aiService';
import { DEMO_PRESETS } from './data/demoBills';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [viewState, setViewState] = useState<'home' | 'loading' | 'results'>('home');
  const [loadingStep, setLoadingStep] = useState<number>(1);
  const [activeBill, setActiveBill] = useState<BillData | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Set RTL direction attribute on root html element when Urdu language is active
  useEffect(() => {
    if (currentLang === 'ur') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ur';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = currentLang;
    }
  }, [currentLang]);

  const handleNavigateHome = () => {
    setViewState('home');
    setUploadError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToUpload = () => {
    if (viewState !== 'home') {
      setViewState('home');
    }
    setTimeout(() => {
      const element = document.getElementById('upload-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleTryDemoDirectly = () => {
    // Instantly load preset 1 demo
    handleStartAnalysis(null, DEMO_PRESETS[0].id);
  };

  const handleStartAnalysis = async (file: File | null, presetId?: string) => {
    setUploadError(null);
    setViewState('loading');
    setLoadingStep(1);

    console.log('=== handleStartAnalysis INVOKED ===', { file: file?.name, presetId });

    try {
      const result = await analyzeBillFile(file, presetId, (step) => {
        console.log(`[ANALYSIS STEP ${step}]`);
        setLoadingStep(step);
      });
      console.log('=== ANALYSIS SUCCESSFUL === Result Data:', result);
      setActiveBill(result);
      setViewState('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('=== ANALYSIS FAILED IN APP ===', err);
      const rawMsg = err?.message || String(err);
      // Directly expose exact error message
      setUploadError(rawMsg);
      setViewState('home');
      setTimeout(() => {
        const element = document.getElementById('upload-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleUpdateBill = (updated: BillData) => {
    setActiveBill(updated);
  };

  return (
    <div className="min-h-screen bg-[#081410] text-gray-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onNavigateHome={handleNavigateHome}
        onTryDemoClick={handleTryDemoDirectly}
        onAnalyzeClick={handleScrollToUpload}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {viewState === 'home' && (
          <>
            <HeroSection
              currentLang={currentLang}
              onAnalyzeClick={handleScrollToUpload}
              onTryDemoClick={handleTryDemoDirectly}
            />
            
            <BillUploader
              currentLang={currentLang}
              onAnalyzeFile={handleStartAnalysis}
              externalError={uploadError}
            />

            <FeatureSection currentLang={currentLang} />

            <HowItWorks currentLang={currentLang} />
          </>
        )}

        {viewState === 'loading' && (
          <AnalysisLoader
            currentLang={currentLang}
            currentStep={loadingStep}
          />
        )}

        {viewState === 'results' && activeBill && (
          <ResultsDashboard
            bill={activeBill}
            currentLang={currentLang}
            onReset={handleNavigateHome}
            onUpdateBill={handleUpdateBill}
          />
        )}
      </main>

      {/* Startup Footer */}
      <Footer currentLang={currentLang} />
    </div>
  );
}

export default App;

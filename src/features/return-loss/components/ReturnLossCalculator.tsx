import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { OrderInput, Platform } from '../types';
import { DEFAULT_SHOPEE_INPUT, DEFAULT_TIKTOK_INPUT } from '../constants';
import { calculateReturnLoss } from '../engine/calculateReturnLoss';
import { serializeStateToUrl, deserializeStateFromUrl } from '../../../lib/url';
import { saveToStorage, loadFromStorage } from '../../../lib/storage';

import { Header } from '../../../components/layout/Header';
import { Container } from '../../../components/layout/Container';
import { Footer } from '../../../components/layout/Footer';

import { PresetsBar } from '../../../components/calculator/PresetsBar';
import { CalculatorForm } from '../../../components/calculator/CalculatorForm';
import { ResultPanel } from '../../../components/calculator/ResultPanel';
import { CostBreakdown } from '../../../components/calculator/CostBreakdown';
import { FutureTeaserCard } from './FutureTeaserCard';

import { ArrowDown, AlertCircle } from 'lucide-react';

export const ReturnLossCalculator: React.FC = () => {
  // Initialize state with priority: URL query params > LocalStorage > Default Shopee preset
  const [input, setInput] = useState<OrderInput>(() => {
    const urlState = deserializeStateFromUrl();
    if (urlState && Object.keys(urlState).length > 0) {
      return {
        ...DEFAULT_SHOPEE_INPUT,
        ...urlState,
      };
    }

    const storageState = loadFromStorage();
    if (storageState && Object.keys(storageState).length > 0) {
      return {
        ...DEFAULT_SHOPEE_INPUT,
        ...storageState,
      };
    }

    return DEFAULT_SHOPEE_INPUT;
  });

  const [isCopied, setIsCopied] = useState(false);

  // Sync state changes to localStorage & URL query params
  useEffect(() => {
    saveToStorage(input);

    if (typeof window !== 'undefined') {
      const urlPathWithParams = serializeStateToUrl(input);
      window.history.replaceState(null, '', urlPathWithParams);
    }
  }, [input]);

  // Memoized financial analysis
  const analysis = useMemo(() => {
    return calculateReturnLoss(input);
  }, [input]);

  // Platform switch handler
  const handlePlatformChange = (platform: Platform) => {
    if (platform === input.platform) return;

    if (platform === 'shopee') {
      setInput((prev) => ({
        ...prev,
        platform: 'shopee',
        platformFeePercent: prev.platformFeePercent === DEFAULT_TIKTOK_INPUT.platformFeePercent ? DEFAULT_SHOPEE_INPUT.platformFeePercent : prev.platformFeePercent,
      }));
    } else {
      setInput((prev) => ({
        ...prev,
        platform: 'tiktok',
        platformFeePercent: prev.platformFeePercent === DEFAULT_SHOPEE_INPUT.platformFeePercent ? DEFAULT_TIKTOK_INPUT.platformFeePercent : prev.platformFeePercent,
      }));
    }
  };

  // Preset select handler
  const handleSelectPreset = (presetInput: OrderInput) => {
    setInput(presetInput);
  };

  // Reset to default platform preset
  const handleReset = () => {
    if (input.platform === 'tiktok') {
      setInput(DEFAULT_TIKTOK_INPUT);
    } else {
      setInput(DEFAULT_SHOPEE_INPUT);
    }
  };

  // Copy shareable link
  const handleCopyLink = useCallback(() => {
    if (typeof window === 'undefined') return;
    const fullUrl = `${window.location.origin}${serializeStateToUrl(input)}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [input]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-lime-400 selection:text-neutral-950">
      {/* HEADER NAVBAR */}
      <Header
        platform={input.platform}
        onPlatformChange={handlePlatformChange}
        onCopyLink={handleCopyLink}
        onReset={handleReset}
        isCopied={isCopied}
      />

      <Container className="flex-1 flex flex-col gap-8">
        {/* HERO SECTION */}
        <div className="flex flex-col items-center text-center gap-3 pt-4 pb-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono font-medium text-lime-400">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span>MÁY TÍNH KIỂM SOÁT TỔN THẤT ĐƠN HOÀN SÀN</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Một đơn hoàn <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-300">
              làm shop mất bao nhiêu tiền?
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
            Tính lợi nhuận thực tế khi giao thành công và số tiền chính xác bị âm nếu khách trả hàng. Phát hiện các chi phí rò rỉ âm thầm ăn mòn cửa hàng của bạn.
          </p>

          <a
            href="#calculator-form"
            className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-lime-400 hover:text-lime-300 transition-colors"
          >
            <span>Tính ngay bên dưới</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>

        {/* PRESETS BAR */}
        <PresetsBar onSelectPreset={handleSelectPreset} />

        {/* MAIN CALCULATOR GRID */}
        {/* On desktop: Form | Result. On mobile: Form -> Result */}
        <div id="calculator-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Form (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <CalculatorForm input={input} onChange={setInput} />
            <CostBreakdown analysis={analysis} input={input} />
          </div>

          {/* Right Column: High-Impact Result Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ResultPanel analysis={analysis} input={input} />
          </div>
        </div>

        {/* FUTURE TEASER CARD */}
        <FutureTeaserCard />
      </Container>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

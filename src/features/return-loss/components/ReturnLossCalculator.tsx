import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { OrderInput, Platform } from '../types';
import { DEFAULT_SHOPEE_INPUT, DEFAULT_TIKTOK_INPUT } from '../constants';
import { calculateReturnLoss } from '../engine/calculateReturnLoss';
import { serializeStateToUrl, deserializeStateFromUrl } from '../../../lib/url';
import { saveToStorage, loadFromStorage } from '../../../lib/storage';
import {
  FeeSelector,
  type FeeMode,
} from '../../fee-engine/components/FeeSelector';
import type { SellerType } from '../../fee-engine/types';

import { Header } from '../../../components/layout/Header';
import { Container } from '../../../components/layout/Container';
import { Footer } from '../../../components/layout/Footer';

import { PresetsBar } from '../../../components/calculator/PresetsBar';
import { CalculatorForm } from '../../../components/calculator/CalculatorForm';
import { ResultPanel } from '../../../components/calculator/ResultPanel';
import { CostBreakdown } from '../../../components/calculator/CostBreakdown';
import { FutureTeaserCard } from './FutureTeaserCard';

import { ArrowDown } from 'lucide-react';

export const ReturnLossCalculator: React.FC = () => {
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

  const [feeMode, setFeeMode] = useState<FeeMode>(() =>
    input.platformFeePercent > 0 || input.platformOrderFee > 0
      ? 'manual'
      : 'auto',
  );
  const [sellerType, setSellerType] = useState<SellerType>('standard');
  const [categoryId, setCategoryId] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    saveToStorage(input);

    if (typeof window !== 'undefined') {
      const urlPathWithParams = serializeStateToUrl(input);
      window.history.replaceState(null, '', urlPathWithParams);
    }
  }, [input]);

  const analysis = useMemo(() => calculateReturnLoss(input), [input]);

  const handleApplyFee = useCallback(
    (totalVariableRate: number, orderProcessingFee: number) => {
      setInput((prev) => ({
        ...prev,
        platformFeePercent: totalVariableRate,
        platformOrderFee: orderProcessingFee,
      }));
    },
    [],
  );

  const handleFeeModeChange = (mode: FeeMode) => {
    setFeeMode(mode);
    if (mode === 'auto' && !categoryId) {
      setInput((prev) => ({
        ...prev,
        platformFeePercent: 0,
        platformOrderFee: 0,
      }));
    }
  };

  const handlePlatformChange = (platform: Platform) => {
    if (platform === input.platform) return;

    setCategoryId('');
    setSellerType('standard');
    setInput((prev) => ({
      ...prev,
      platform,
      platformFeePercent: 0,
      platformOrderFee: 0,
    }));
  };

  const handleSelectPreset = (presetInput: OrderInput) => {
    setFeeMode('manual');
    setCategoryId('');
    setSellerType('standard');
    setInput(presetInput);
  };

  const handleReset = () => {
    setFeeMode('auto');
    setCategoryId('');
    setSellerType('standard');
    setInput(input.platform === 'tiktok' ? DEFAULT_TIKTOK_INPUT : DEFAULT_SHOPEE_INPUT);
  };

  const handleCopyLink = useCallback(() => {
    if (typeof window === 'undefined') return;

    const fullUrl = `${window.location.origin}${serializeStateToUrl(input)}`;
    void navigator.clipboard.writeText(fullUrl).then(() => {
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 2000);
    });
  }, [input]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-lime-400 selection:text-neutral-950">
      <Header
        platform={input.platform}
        onPlatformChange={handlePlatformChange}
        onCopyLink={handleCopyLink}
        onReset={handleReset}
        isCopied={isCopied}
      />

      <Container className="flex-1 flex flex-col gap-8">
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
            Chọn sàn, loại shop và ngành hàng để ShopGuard tự áp biểu phí đã lưu. Bạn vẫn có thể chuyển sang nhập thủ công nếu shop có ưu đãi hoặc chương trình riêng.
          </p>

          <a
            href="#calculator-form"
            className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-lime-400 hover:text-lime-300 transition-colors"
          >
            <span>Tính ngay bên dưới</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>

        <PresetsBar onSelectPreset={handleSelectPreset} />

        <div id="calculator-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <FeeSelector
              platform={input.platform}
              mode={feeMode}
              sellerType={sellerType}
              categoryId={categoryId}
              onModeChange={handleFeeModeChange}
              onSellerTypeChange={setSellerType}
              onCategoryChange={setCategoryId}
              onApplyFee={handleApplyFee}
            />
            <CalculatorForm
              input={input}
              feeMode={feeMode}
              onChange={setInput}
            />
            <CostBreakdown analysis={analysis} input={input} />
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <ResultPanel analysis={analysis} input={input} />
          </div>
        </div>

        <FutureTeaserCard />
      </Container>

      <Footer />
    </div>
  );
};

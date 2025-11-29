import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchInput } from './components/SearchInput';
import { ReportDisplay } from './components/ReportDisplay';
import { analyzeStock } from './services/geminiService';
import { AnalysisResult } from './types';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSearch = async (ticker: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeStock(ticker);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi không xác định');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8">
        <SearchInput onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg animate-fade-in">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {result && (
            <ReportDisplay data={result} />
        )}

        {!result && !loading && !error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900">Sẵn sàng phân tích</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
              Nhập mã chứng khoán để xem dòng tiền khối ngoại, nhận định kỹ thuật và tin tức mới nhất từ 24HMoney.
            </p>
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-xs text-slate-400">
                Lưu ý: Dữ liệu được tổng hợp tự động từ Google Search và 24HMoney. Khuyến nghị chỉ mang tính chất tham khảo.
            </p>
        </div>
      </footer>
    </div>
  );
}
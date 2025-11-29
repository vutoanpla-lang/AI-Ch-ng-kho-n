import React, { useState, useCallback } from 'react';

interface SearchInputProps {
  onSearch: (ticker: string) => void;
  isLoading: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading }) => {
  const [ticker, setTicker] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (ticker.trim() && !isLoading) {
      onSearch(ticker);
    }
  }, [ticker, isLoading, onSearch]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Nhập mã cổ phiếu cần phân tích</h2>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm uppercase font-semibold tracking-wide"
              placeholder="Ví dụ: HPG, VCB, FPT..."
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              disabled={isLoading}
              maxLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !ticker.trim()}
            className={`px-6 py-3 rounded-lg font-medium text-white transition-colors duration-200 flex items-center gap-2 ${
              isLoading || !ticker.trim()
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xử lý...
              </>
            ) : (
              'Phân tích'
            )}
          </button>
        </div>
      </form>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-sm text-slate-500 whitespace-nowrap">Gợi ý:</span>
        {['HPG', 'VCB', 'SSI', 'MWG', 'FPT'].map((t) => (
          <button
            key={t}
            onClick={() => {
                setTicker(t);
                if(!isLoading) onSearch(t);
            }}
            className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors font-medium"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};
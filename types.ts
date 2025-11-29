export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

export interface AnalysisResult {
  text: string;
  groundingChunks: GroundingChunk[];
}

export interface StockData {
  symbol: string;
  analysis: AnalysisResult | null;
  loading: boolean;
  error: string | null;
}
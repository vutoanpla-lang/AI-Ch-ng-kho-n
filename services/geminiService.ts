import { GoogleGenAI, Tool } from "@google/genai";
import { AnalysisResult } from "../types";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is missing in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export const analyzeStock = async (ticker: string): Promise<AnalysisResult> => {
  const modelId = "gemini-2.5-flash";
  
  // Clean ticker
  const cleanTicker = ticker.trim().toUpperCase();

  const prompt = `
  Bạn là chuyên gia phân tích kỹ thuật chứng khoán chuyên sâu trên nền tảng 24HMoney.
  
  Người dùng đang yêu cầu phân tích mã cổ phiếu: ${cleanTicker}.

  Nhiệm vụ của bạn:
  1. TÌM KIẾM DỮ LIỆU:
  - Sử dụng công cụ tìm kiếm Google để tìm thông tin mới nhất.
  - Ưu tiên tìm kiếm với cú pháp: 'site:24hmoney.vn ${cleanTicker} giao dịch khối ngoại', 'site:24hmoney.vn ${cleanTicker} phân tích kỹ thuật', 'site:24hmoney.vn ${cleanTicker} tin tức'.
  
  2. TRẢ VỀ BÁO CÁO (Tuân thủ cấu trúc sau đây, sử dụng Markdown):

  👉 **LINK TRUY CẬP NHANH (24HMoney):**
  - Tạo đường link: https://24hmoney.vn/stock/${cleanTicker}
  
  **A. DÒNG TIỀN LỚN:**
  - Khối ngoại: Mua/Bán ròng bao nhiêu? (Dữ liệu phiên gần nhất).
  - Tự doanh (nếu có): Hành động ra sao?

  **B. GÓC NHÌN KỸ THUẬT & XU HƯỚNG:**
  - Tổng hợp các bài phân tích kỹ thuật mới nhất trên 24HMoney về mã này.
  - Các vùng hỗ trợ/kháng cự đang được nhắc đến.

  **C. TIN TỨC ĐÁNG CHÚ Ý:**
  - Liệt kê tin tức từ nguồn 24HMoney liên quan trực tiếp đến giá.

  **D. KẾT LUẬN:**
  - Xu hướng chính: Tăng / Giảm / Đi ngang.
  - Hành động khuyến nghị.

  Lưu ý: Chỉ sử dụng thông tin tìm thấy thực tế. Nếu không tìm thấy số liệu cụ thể cho mục nào, hãy ghi "Chưa có dữ liệu cập nhật trên 24HMoney".
  `;

  const tools: Tool[] = [{ googleSearch: {} }];

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: tools,
        temperature: 0.3, // Low temperature for factual analysis
      },
    });

    const text = response.text || "Không thể tạo báo cáo. Vui lòng thử lại.";
    
    // Extract grounding chunks if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      text,
      groundingChunks,
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Đã xảy ra lỗi khi kết nối với chuyên gia phân tích.");
  }
};
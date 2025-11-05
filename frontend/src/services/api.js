/**
 * Enhanced API Service for AmazeWorth Smart Price Engine v2.1
 */
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001';
const API_V1 = `${API_BASE}/api/v1`;

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.response?.status} ${error.config?.url}`, error.response?.data);
    return Promise.reject(error);
  }
);

class ApiService {
  // Health and Status
  async healthCheck() {
    const response = await apiClient.get('/health');
    return response.data;
  }

  async getSystemStatus() {
    const response = await apiClient.get(`${API_V1}/predict/status`);
    return response.data;
  }

  // Prediction Services
  async predictPrice(productData) {
    const response = await apiClient.post('/predict', {
      title: productData.title,
      description: productData.description || ''
    });
    
    return {
      predicted_price: response.data.predicted_price,
      confidence_score: response.data.confidence,
      key_features: response.data.key_features || [],
      model_used: response.data.prediction_method || 'Simple',
      response_time: response.data.response_time || 0,
      timestamp: new Date().toISOString(),
      cached: false
    };
  }

  async batchPredict(products) {
    const response = await apiClient.post(`${API_V1}/predict/batch`, { products });
    return response.data;
  }

  // Analytics Services
  async getModelStats() {
    const response = await apiClient.get(`${API_V1}/analytics/model-stats`);
    return response.data;
  }

  async getFeatureImportance() {
    const response = await apiClient.get(`${API_V1}/analytics/feature-importance`);
    return response.data;
  }

  async getPerformanceData() {
    const response = await apiClient.get(`${API_V1}/analytics/performance`);
    return response.data;
  }

  async getDashboardData() {
    const response = await apiClient.get(`${API_V1}/analytics/dashboard`);
    return response.data;
  }

  async getRealTimeMetrics() {
    const response = await apiClient.get(`${API_V1}/analytics/real-time-metrics`);
    return response.data;
  }

  async getPredictionHistory(limit = 20) {
    const response = await apiClient.get(`${API_V1}/analytics/prediction-history?limit=${limit}`);
    return response.data;
  }

  async getModelInfo() {
    const response = await apiClient.get(`${API_V1}/analytics/model-info`);
    return response.data;
  }

  async getSystemOverview() {
    const response = await apiClient.get(`${API_V1}/analytics/system-overview`);
    return response.data;
  }

  // Admin Services
  async clearCache() {
    const response = await apiClient.post(`${API_V1}/predict/cache/clear`);
    return response.data;
  }

  async resetMetrics() {
    const response = await apiClient.post(`${API_V1}/predict/metrics/reset`);
    return response.data;
  }

  // Comprehensive Dashboard Data
  async getCompleteDashboardData() {
    try {
      const [dashboard, realTime, history, modelInfo] = await Promise.all([
        this.getDashboardData(),
        this.getRealTimeMetrics(),
        this.getPredictionHistory(10),
        this.getModelInfo()
      ]);
      
      return {
        dashboard,
        realTime,
        history,
        modelInfo,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to fetch complete dashboard data:', error);
      throw error;
    }
  }

  // Utility Methods
  async testConnection() {
    try {
      await this.healthCheck();
      return { status: 'connected', timestamp: new Date().toISOString() };
    } catch (error) {
      return { status: 'disconnected', error: error.message, timestamp: new Date().toISOString() };
    }
  }
}

export const apiService = new ApiService();
export default apiService;
import { useState, useCallback, useEffect } from 'react';
import { apiService } from '../services/api';

export const usePrediction = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const predict = useCallback(async (productData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Making prediction request:', productData);
      const result = await apiService.predictPrice(productData);
      console.log('Prediction result:', result);
      
      setPrediction(result);
      
      // Add to history
      const historyItem = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        input: productData,
        result: result
      };
      setHistory(prev => [historyItem, ...prev.slice(0, 9)]); // Keep last 10
      
      return result;
    } catch (err) {
      console.error('Prediction error:', err);
      const errorMsg = err.response?.data?.detail || err.message || 'Network connection failed. Please check if backend is running.';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setPrediction(null);
    setError(null);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    prediction,
    loading,
    error,
    history,
    predict,
    reset,
    clearHistory
  };
};

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [modelStats, featureImportance, performanceData] = await Promise.all([
        apiService.getModelStats(),
        apiService.getFeatureImportance(),
        apiService.getPerformanceData()
      ]);
      
      setAnalytics({
        modelStats,
        featureImportance,
        performanceData
      });
      
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Analytics fetch failed';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analytics,
    loading,
    error,
    refetch: fetchAnalytics
  };
};

export const useSystemHealth = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkHealth = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/health');
      const healthData = await response.json();
      setHealth(healthData);
    } catch (err) {
      setHealth({ status: 'unhealthy', error: err.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, [checkHealth]);

  return { health, loading, checkHealth };
};

export default usePrediction;
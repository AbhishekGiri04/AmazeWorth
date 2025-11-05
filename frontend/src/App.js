import React, { useState, useEffect } from 'react';
import PricePredictor from './components/PricePredictor';
import Dashboard from './components/Dashboard';
import AboutPage from './components/AboutPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { usePrediction } from './hooks/useApi';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [systemHealth, setSystemHealth] = useState(null);
  const { prediction, loading, error } = usePrediction();

  // System health monitoring
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('http://localhost:5001/health');
        const health = await response.json();
        setSystemHealth(health);
      } catch (err) {
        setSystemHealth({ status: 'unhealthy', error: err.message });
      }
    };
    
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    try {
      switch(activeTab) {
        case 'home':
          return <PricePredictor systemHealth={systemHealth} />;
        case 'dashboard':
          return <Dashboard systemHealth={systemHealth} />;
        case 'about':
          return <AboutPage />;
        default:
          return <PricePredictor systemHealth={systemHealth} />;
      }
    } catch (error) {
      console.error('Error rendering content:', error);
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h2>
          <p className="text-gray-600">{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Reload Page
          </button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        systemHealth={systemHealth}
      />
      <main className="flex-1 container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
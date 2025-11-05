import React from 'react';
import { Home, BarChart3, Info, Activity, Zap } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab, systemHealth }) => {
  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src="https://media.istockphoto.com/id/1174549062/vector/shopping-bag-logo-design-icon-online-shop-symbol-vector-illustrations.jpg?s=612x612&w=0&k=20&c=Zgtz4Nom60--7vsHa54bkKP7waE7pQeMC0dJcggrT8k=" 
                alt="AmazeWorth Logo" 
                className="h-12 w-12 rounded-2xl shadow-lg hover:scale-110 transition-transform duration-300 object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                AmazeWorth
              </h1>
              <p className="text-xs text-amazon-orange font-semibold tracking-wide">SMART PRICE ENGINE</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-6 py-3 rounded-xl transition-all duration-200 font-medium ${
                activeTab === 'home' 
                  ? 'bg-gradient-to-r from-amazon-orange to-orange-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:text-amazon-orange hover:bg-orange-50'
              }`}
            >
              <span>Home</span>
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-3 rounded-xl transition-all duration-200 font-medium ${
                activeTab === 'dashboard' 
                  ? 'bg-gradient-to-r from-amazon-orange to-orange-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:text-amazon-orange hover:bg-orange-50'
              }`}
            >
              <span>Analytics Dashboard</span>
            </button>
            
            <button
              onClick={() => setActiveTab('about')}
              className={`px-6 py-3 rounded-xl transition-all duration-200 font-medium ${
                activeTab === 'about' 
                  ? 'bg-gradient-to-r from-amazon-orange to-orange-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:text-amazon-orange hover:bg-orange-50'
              }`}
            >
              <span className="hidden lg:inline">About</span>
            </button>
            
            <div className="ml-4 flex items-center space-x-3">
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
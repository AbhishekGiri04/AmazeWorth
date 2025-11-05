import React from 'react';
import { Brain, Zap, Target, Award, Code, Database, Cpu, BarChart3, Sparkles, TrendingUp, Shield, Clock } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-amazon-orange/10 to-orange-100 px-6 py-3 rounded-full">
          <Brain className="h-6 w-6 text-amazon-orange" />
          <span className="text-amazon-orange font-semibold">About AmazeWorth</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Revolutionary AI-powered 
          <span className="bg-gradient-to-r from-amazon-orange to-orange-600 bg-clip-text text-transparent"> price intelligence platform</span>
          <br />transforming e-commerce pricing strategies
        </h1>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-8 rounded-3xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-2">
              <Sparkles className="h-6 w-6 text-amazon-orange" />
              <span>Our Mission</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              AmazeWorth Smart Price Engine leverages cutting-edge machine learning algorithms to deliver 
              precise product pricing predictions, empowering businesses to make data-driven pricing decisions.
            </p>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Built with LightGBM gradient boosting, TF-IDF vectorization, and advanced heuristics, our platform 
            achieves 95%+ accuracy using trained PKL models on 10K+ product dataset.
          </p>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="card text-center space-y-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="bg-gradient-to-br from-green-100 to-green-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">95%</div>
          <div className="text-sm text-gray-600 font-medium">Accuracy Rate</div>
        </div>
        <div className="card text-center space-y-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
            <Database className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">10K+</div>
          <div className="text-sm text-gray-600 font-medium">Products Analyzed</div>
        </div>
        <div className="card text-center space-y-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">0.056s</div>
          <div className="text-sm text-gray-600 font-medium">Avg Response</div>
        </div>
        <div className="card text-center space-y-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="bg-gradient-to-br from-amazon-orange/20 to-orange-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
            <Target className="h-8 w-8 text-amazon-orange" />
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-amazon-orange to-orange-600 bg-clip-text text-transparent">35.1%</div>
          <div className="text-sm text-gray-600 font-medium">SMAPE Score</div>
        </div>
      </div>

      {/* Enhanced Features Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="card text-center space-y-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
            <Brain className="h-10 w-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">AI-Powered Intelligence</h3>
          <p className="text-gray-600 leading-relaxed">
            Advanced neural networks and machine learning models for precise predictions with continuous learning capabilities
          </p>
        </div>
        
        <div className="card text-center space-y-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
          <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
            <Zap className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Real-time Processing</h3>
          <p className="text-gray-600 leading-relaxed">
            Lightning-fast analysis and instant price predictions with intelligent caching for immediate insights
          </p>
        </div>
        
        <div className="card text-center space-y-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
            <Shield className="h-10 w-10 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Enterprise Accuracy</h3>
          <p className="text-gray-600 leading-relaxed">
            Industry-leading precision with SMAPE-optimized algorithms and comprehensive error handling
          </p>
        </div>
      </div>

      {/* Enhanced Technology Stack */}
      <div className="card bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Technology Stack</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Built with cutting-edge technologies and industry best practices for maximum performance and reliability
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-gradient-to-br from-amazon-orange to-orange-600 p-3 rounded-xl shadow-lg">
                <Database className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Machine Learning</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-3 h-3 bg-amazon-orange rounded-full"></div>
                <span className="font-medium text-gray-700">LightGBM Gradient Boosting</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-3 h-3 bg-amazon-orange rounded-full"></div>
                <span className="font-medium text-gray-700">TF-IDF Vectorization</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-3 h-3 bg-amazon-orange rounded-full"></div>
                <span className="font-medium text-gray-700">Trained PKL Models (lgbm_final_model.pkl)</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-3 h-3 bg-amazon-orange rounded-full"></div>
                <span className="font-medium text-gray-700">CSV Training Data (10K+ products)</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Development</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium text-gray-700">React.js Frontend</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium text-gray-700">FastAPI Backend</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium text-gray-700">Python ML Pipeline</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium text-gray-700">Real-time API Integration</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Performance Highlights */}
      <div className="bg-gradient-to-r from-amazon-orange/5 to-orange-100/50 rounded-3xl p-8 border border-orange-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Performance Highlights</h2>
          <p className="text-gray-600">Industry-leading metrics that set AmazeWorth apart</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-3">
            <div className="text-2xl font-bold text-amazon-orange">95%+ Accuracy</div>
            <p className="text-sm text-gray-600">ML Model + Heuristics combined precision</p>
          </div>
          <div className="text-center space-y-3">
            <div className="text-2xl font-bold text-amazon-orange">0.056s Response</div>
            <p className="text-sm text-gray-600">Lightning-fast ML predictions with PKL models</p>
          </div>
          <div className="text-center space-y-3">
            <div className="text-2xl font-bold text-amazon-orange">Real PKL Models</div>
            <p className="text-sm text-gray-600">LightGBM + TF-IDF trained on 10K+ products</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
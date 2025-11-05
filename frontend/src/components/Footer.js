import React from 'react';
import { ShoppingCart, Mail, MapPin, Github, Linkedin, Send, ExternalLink, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-amazon-orange/5 to-blue-500/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,153,0,0.1),transparent_50%)] opacity-30"></div>
      
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-amazon-orange to-orange-600 p-3 rounded-2xl shadow-lg">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  AmazeWorth
                </h3>
                <p className="text-amazon-orange font-medium text-sm tracking-wide">Smart Price Engine</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Enterprise-grade AI platform using LightGBM gradient boosting and TF-IDF vectorization 
              trained on 10K+ products with 95%+ accuracy and 0.056s response time.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <Sparkles className="h-4 w-4 text-amazon-orange" />
              <span>PKL Models • 95% Accuracy • 0.056s Response • 10K+ Training Data</span>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-amazon-orange transition-all duration-200 flex items-center group">
                <span>Price Predictor</span>
                <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-amazon-orange transition-all duration-200 flex items-center group">
                <span>Analytics Dashboard</span>
                <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-amazon-orange transition-all duration-200 flex items-center group">
                <span>API Documentation</span>
                <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-amazon-orange transition-all duration-200 flex items-center group">
                <span>Model Performance</span>
                <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a></li>
            </ul>
          </div>

          {/* AI Capabilities */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">AI Features</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-300 flex items-center space-x-3">
                <div className="w-2 h-2 bg-amazon-orange rounded-full"></div>
                <span>LightGBM Gradient Boosting</span>
              </li>
              <li className="text-gray-300 flex items-center space-x-3">
                <div className="w-2 h-2 bg-amazon-orange rounded-full"></div>
                <span>TF-IDF Text Vectorization</span>
              </li>
              <li className="text-gray-300 flex items-center space-x-3">
                <div className="w-2 h-2 bg-amazon-orange rounded-full"></div>
                <span>PKL Model Integration</span>
              </li>
              <li className="text-gray-300 flex items-center space-x-3">
                <div className="w-2 h-2 bg-amazon-orange rounded-full"></div>
                <span>0.056s Response Time</span>
              </li>
              <li className="text-gray-300 flex items-center space-x-3">
                <div className="w-2 h-2 bg-amazon-orange rounded-full"></div>
                <span>SMAPE Optimized Algorithms</span>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Connect</h4>
            <div className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3 group">
                  <div className="bg-slate-700 p-2 rounded-lg group-hover:bg-amazon-orange transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="text-gray-300">abhishekgiri1978@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="bg-slate-700 p-2 rounded-lg group-hover:bg-amazon-orange transition-colors">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-gray-300">Haridwar, Uttarakhand, India</span>
                </div>
              </div>
              
              <div className="pt-4">
                <p className="text-xs text-gray-400 mb-3">Follow the Developer</p>
                <div className="flex space-x-3">
                  <a href="https://www.linkedin.com/in/abhishek-giri04/" target="_blank" rel="noopener noreferrer" 
                     className="bg-slate-700 p-2.5 rounded-xl hover:bg-blue-600 transition-all duration-200 transform hover:scale-110">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="https://github.com/abhishekgiri04" target="_blank" rel="noopener noreferrer" 
                     className="bg-slate-700 p-2.5 rounded-xl hover:bg-gray-600 transition-all duration-200 transform hover:scale-110">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="https://t.me/AbhishekGiri7" target="_blank" rel="noopener noreferrer" 
                     className="bg-slate-700 p-2.5 rounded-xl hover:bg-blue-500 transition-all duration-200 transform hover:scale-110">
                    <Send className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>© 2025 AmazeWorth - Smart Price Engine</span>
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0 text-sm">
              <a href="#" className="text-gray-400 hover:text-amazon-orange transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-amazon-orange transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-amazon-orange transition-colors">Support</a>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <span>v2.1</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
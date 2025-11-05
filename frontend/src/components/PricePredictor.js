import React, { useState, useEffect } from 'react';
import { Upload, DollarSign, Brain, Image as ImageIcon, FileText, Clock, Target, Zap, History, Trash2 } from 'lucide-react';
import { apiService } from '../services/api';
import { usePrediction } from '../hooks/useApi';

const PricePredictor = ({ systemHealth }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState(null);
  const [batchMode, setBatchMode] = useState(false);
  const [batchProducts, setBatchProducts] = useState([{ title: '', description: '' }]);
  const { prediction, loading, error, history, predict, reset, clearHistory } = usePrediction();

  const handlePredict = async () => {
    if (!productName.trim()) {
      alert('Please fill in product name');
      return;
    }

    try {
      const productData = {
        title: productName,
        description: description || '',
        category: category || undefined,
        brand: brand || undefined,
        image_url: image ? 'uploaded' : ''
      };
      
      await predict(productData);
    } catch (error) {
      console.error('Prediction error:', error);
    }
  };

  const handleBatchPredict = async () => {
    const validProducts = batchProducts.filter(p => p.title.trim());
    if (validProducts.length === 0) {
      alert('Please add at least one product with a title');
      return;
    }

    try {
      const result = await apiService.batchPredict(validProducts);
      console.log('Batch prediction result:', result);
      // Handle batch results - could show in a modal or separate section
    } catch (error) {
      console.error('Batch prediction error:', error);
    }
  };

  const addBatchProduct = () => {
    if (batchProducts.length < 10) {
      setBatchProducts([...batchProducts, { title: '', description: '' }]);
    }
  };

  const removeBatchProduct = (index) => {
    setBatchProducts(batchProducts.filter((_, i) => i !== index));
  };

  const updateBatchProduct = (index, field, value) => {
    const updated = [...batchProducts];
    updated[index][field] = value;
    setBatchProducts(updated);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          AI-Powered Price Prediction
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload product details and get instant price predictions using our advanced machine learning model
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-amazon-orange" />
              <h3 className="text-lg font-semibold">Product Information</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., Samsung Galaxy S23 Ultra"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed product description including features, specifications, color, size, material, etc."
                  rows={3}
                  className="input-field resize-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category (Optional)
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Electronics, Clothing"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand (Optional)
                  </label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g., Apple, Samsung"
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <ImageIcon className="h-5 w-5 text-amazon-orange" />
              <h3 className="text-lg font-semibold">Product Image (Optional)</h3>
            </div>
            
            {!image ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-amazon-orange transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drop image here or click to upload</p>
                  <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                </label>
              </div>
            ) : (
              <div className="relative">
                <img src={image} alt="Product" className="w-full h-48 object-cover rounded-lg" />
                <button
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={batchMode}
                  onChange={(e) => setBatchMode(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Batch Mode (Multiple Products)</span>
              </label>
            </div>
            
            {!batchMode ? (
              <button
                onClick={handlePredict}
                disabled={loading || !productName.trim()}
                className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Predicting...</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5" />
                    <span>Predict Price</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleBatchPredict}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Brain className="h-5 w-5" />
                <span>Batch Predict ({batchProducts.filter(p => p.title.trim()).length} products)</span>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {batchMode ? (
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Batch Products</h3>
                <button
                  onClick={addBatchProduct}
                  disabled={batchProducts.length >= 10}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
                >
                  Add Product
                </button>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {batchProducts.map((product, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-700">Product {index + 1}</span>
                      {batchProducts.length > 1 && (
                        <button
                          onClick={() => removeBatchProduct(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={product.title}
                      onChange={(e) => updateBatchProduct(index, 'title', e.target.value)}
                      placeholder="Product title"
                      className="input-field mb-2"
                    />
                    <textarea
                      value={product.description}
                      onChange={(e) => updateBatchProduct(index, 'description', e.target.value)}
                      placeholder="Product description"
                      rows={2}
                      className="input-field resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {prediction ? (
                <div className="space-y-6">
                  <div className="card bg-gradient-to-r from-amazon-orange to-orange-500 text-white">
                    <div className="text-center">
                      <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-90" />
                      <h3 className="text-2xl font-bold mb-2">Predicted Price</h3>
                      <div className="text-4xl font-bold mb-2">₹{prediction.predicted_price?.toLocaleString()}</div>
                      <p className="text-orange-100">
                        {(prediction.confidence_score * 100).toFixed(1)}% confidence
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="card text-center">
                      <Clock className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-lg font-bold">{prediction.response_time}s</div>
                      <div className="text-xs text-gray-600">Response Time</div>
                    </div>
                    <div className="card text-center">
                      <Target className="h-6 w-6 text-green-500 mx-auto mb-2" />
                      <div className="text-lg font-bold">{prediction.model_used?.includes('ML') ? 'AI' : 'Heuristic'}</div>
                      <div className="text-xs text-gray-600">Method</div>
                    </div>
                    <div className="card text-center">
                      <Zap className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                      <div className="text-lg font-bold">{prediction.cached ? 'Yes' : 'No'}</div>
                      <div className="text-xs text-gray-600">Cached</div>
                    </div>
                  </div>

                  <div className="card">
                    <h4 className="text-lg font-semibold mb-4">Key Features Detected</h4>
                    <div className="flex flex-wrap gap-2">
                      {prediction.key_features?.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {feature}
                        </span>
                      )) || (
                        <span className="text-gray-500 text-sm">No specific features detected</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={reset}
                    className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    Clear Result
                  </button>
                </div>
              ) : error ? (
                <div className="card text-center py-12 border-red-200 bg-red-50">
                  <div className="text-red-500 mb-4">⚠️ Prediction Error</div>
                  <p className="text-red-600 text-sm mb-4">{error}</p>
                  <button
                    onClick={reset}
                    className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="card text-center py-12">
                  <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">Ready to Predict</h3>
                  <p className="text-gray-400">
                    Fill in the product details and click "Predict Price" to see results
                  </p>
                  {systemHealth && (
                    <div className={`mt-4 inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                      systemHealth.status === 'healthy' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        systemHealth.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span>AI System {systemHealth.status === 'healthy' ? 'Ready' : 'Issue'}</span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Prediction History */}
          {history.length > 0 && (
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold flex items-center space-x-2">
                  <History className="h-5 w-5" />
                  <span>Recent Predictions</span>
                </h4>
                <button
                  onClick={clearHistory}
                  className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Clear History
                </button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {history.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div className="flex-1">
                      <div className="text-sm font-medium truncate">{item.input.title}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">₹{item.result.predicted_price?.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">
                        {(item.result.confidence_score * 100).toFixed(0)}% conf.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricePredictor;
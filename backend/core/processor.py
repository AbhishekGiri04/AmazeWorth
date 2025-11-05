"""
Data processing utilities for AmazeWorth Smart Price Engine
"""
import pandas as pd
import numpy as np
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
import pickle

class DataProcessor:
    def __init__(self):
        self.tfidf_vectorizer = None
        self.brand_encoder = None
        
    def clean_text(self, text):
        """Clean and preprocess text data"""
        if pd.isna(text):
            return ""
        
        text = str(text).lower()
        # Remove special characters but keep spaces
        text = re.sub(r'[^a-zA-Z0-9\s]', ' ', text)
        # Remove extra whitespaces
        text = re.sub(r'\s+', ' ', text).strip()
        
        return text
    
    def extract_features(self, df):
        """Extract features from product data"""
        # Clean text
        df['title_clean'] = df['title'].apply(self.clean_text)
        df['description_clean'] = df['description'].fillna('').apply(self.clean_text)
        
        # Combine text
        df['combined_text'] = df['title_clean'] + ' ' + df['description_clean']
        
        # Text features
        df['text_length'] = df['combined_text'].str.len()
        df['word_count'] = df['combined_text'].str.split().str.len()
        df['title_length'] = df['title_clean'].str.len()
        
        # Brand extraction (simple approach)
        df['brand'] = df['title_clean'].str.extract(r'(apple|samsung|sony|nike|adidas|lg|hp|dell|lenovo|asus)', expand=False)
        df['brand'] = df['brand'].fillna('unknown')
        
        # Quality indicators
        quality_words = ['premium', 'luxury', 'professional', 'pro', 'ultra', 'max', 'deluxe', 'elite']
        df['has_quality_word'] = df['combined_text'].str.contains('|'.join(quality_words)).astype(int)
        
        # Storage indicators
        storage_pattern = r'(\d+)(gb|tb)'
        df['has_storage'] = df['combined_text'].str.contains(storage_pattern).astype(int)
        
        return df
    
    def prepare_training_data(self, df):
        """Prepare data for model training"""
        # Extract features
        df = self.extract_features(df)
        
        # TF-IDF vectorization
        if self.tfidf_vectorizer is None:
            self.tfidf_vectorizer = TfidfVectorizer(
                max_features=10000,
                ngram_range=(1, 2),
                min_df=2,
                stop_words='english'
            )
            X_text = self.tfidf_vectorizer.fit_transform(df['combined_text'])
        else:
            X_text = self.tfidf_vectorizer.transform(df['combined_text'])
        
        # Brand encoding
        if self.brand_encoder is None:
            self.brand_encoder = LabelEncoder()
            X_brand = self.brand_encoder.fit_transform(df['brand']).reshape(-1, 1)
        else:
            X_brand = self.brand_encoder.transform(df['brand']).reshape(-1, 1)
        
        # Numerical features
        numerical_cols = ['text_length', 'word_count', 'title_length', 'has_quality_word', 'has_storage']
        X_numerical = df[numerical_cols].values
        
        return X_text, X_brand, X_numerical, df
    
    def calculate_smape(self, y_true, y_pred):
        """Calculate SMAPE (Symmetric Mean Absolute Percentage Error)"""
        return 100 * np.mean(2 * np.abs(y_pred - y_true) / (np.abs(y_pred) + np.abs(y_true)))
    
    def save_processors(self, tfidf_path, brand_encoder_path):
        """Save preprocessing objects"""
        with open(tfidf_path, 'wb') as f:
            pickle.dump(self.tfidf_vectorizer, f)
        
        with open(brand_encoder_path, 'wb') as f:
            pickle.dump(self.brand_encoder, f)
    
    def load_processors(self, tfidf_path, brand_encoder_path):
        """Load preprocessing objects"""
        with open(tfidf_path, 'rb') as f:
            self.tfidf_vectorizer = pickle.load(f)
        
        with open(brand_encoder_path, 'rb') as f:
            self.brand_encoder = pickle.load(f)

def load_and_preprocess_data(train_path, test_path=None):
    """Load and preprocess training and test data"""
    processor = DataProcessor()
    
    # Load data
    train_df = pd.read_csv(train_path)
    print(f"✅ Loaded training data: {train_df.shape}")
    
    if test_path:
        test_df = pd.read_csv(test_path)
        print(f"✅ Loaded test data: {test_df.shape}")
    else:
        test_df = None
    
    # Preprocess training data
    X_text_train, X_brand_train, X_num_train, train_processed = processor.prepare_training_data(train_df)
    
    result = {
        'processor': processor,
        'train_data': {
            'X_text': X_text_train,
            'X_brand': X_brand_train,
            'X_numerical': X_num_train,
            'df': train_processed,
            'y': np.log1p(train_df['price'].values) if 'price' in train_df.columns else None
        }
    }
    
    # Preprocess test data if provided
    if test_df is not None:
        X_text_test, X_brand_test, X_num_test, test_processed = processor.prepare_training_data(test_df)
        result['test_data'] = {
            'X_text': X_text_test,
            'X_brand': X_brand_test,
            'X_numerical': X_num_test,
            'df': test_processed
        }
    
    return result

if __name__ == "__main__":
    # Example usage
    processor = DataProcessor()
    print("✅ DataProcessor initialized successfully!")
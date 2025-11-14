
import React from 'react';
import ImageGenerator from './components/ImageGenerator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-5xl mb-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          AI Image Generator
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Bring your ideas to life with the power of Gemini.
        </p>
      </header>
      <main className="w-full flex-grow">
        <ImageGenerator />
      </main>

      <footer className="w-full max-w-5xl mt-12 pt-8 border-t border-gray-800">
        <div className="flex flex-col items-start justify-start w-full text-left">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-2 font-serif">
            عبدالله
          </h2>
          <div className="text-gray-400 font-serif italic text-lg leading-relaxed opacity-90">
            <p>بريشةٍ تُحيلُ الصمتَ بوحاً</p>
            <p>وترسمُ من خيالِ الروحِ لوحاً</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

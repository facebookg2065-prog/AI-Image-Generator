
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
    </div>
  );
};

export default App;

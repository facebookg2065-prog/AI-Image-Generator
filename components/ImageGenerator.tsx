
import React, { useState, useCallback } from 'react';
import { generateImage } from '../services/geminiService';
import { AspectRatio } from '../types';
import { Spinner } from './Spinner';
import { ImagePlaceholderIcon, ErrorIcon } from './icons';

const aspectRatios: AspectRatio[] = ["1:1", "16:9", "9:16", "4:3", "3:4"];

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const resultUrl = await generateImage(prompt, aspectRatio);
      setImageUrl(resultUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio, isLoading]);

  const getAspectRatioClass = (ratio: AspectRatio) => {
    switch (ratio) {
      case '16:9': return 'aspect-video';
      case '9:16': return 'aspect-[9/16]';
      case '4:3': return 'aspect-[4/3]';
      case '3:4': return 'aspect-[3/4]';
      case '1:1':
      default: return 'aspect-square';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto">
      {/* Image Display Area */}
      <div className="flex-1 flex items-center justify-center bg-gray-800/50 border border-gray-700 rounded-2xl p-4 min-h-[300px] lg:min-h-0 lg:max-w-2xl">
        <div className={`relative w-full max-w-full rounded-lg overflow-hidden transition-all duration-300 ${getAspectRatioClass(aspectRatio)}`}>
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10">
              <Spinner />
              <p className="mt-4 text-gray-300">Generating your vision...</p>
            </div>
          )}
          {error && !isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/20 p-4">
              <ErrorIcon className="w-12 h-12 text-red-400 mb-4" />
              <p className="text-red-400 text-center font-medium">Generation Failed</p>
              <p className="text-red-500 text-sm text-center mt-1">{error}</p>
            </div>
          )}
          {!imageUrl && !isLoading && !error && (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
               <ImagePlaceholderIcon className="w-16 h-16 mb-4" />
               <p>Your generated image will appear here</p>
             </div>
          )}
          {imageUrl && (
            <img src={imageUrl} alt={prompt} className="object-contain w-full h-full" />
          )}
        </div>
      </div>

      {/* Controls Area */}
      <form onSubmit={handleGenerate} className="w-full lg:max-w-md flex flex-col gap-6 p-6 bg-gray-800 rounded-2xl border border-gray-700">
        <div>
          <label htmlFor="prompt" className="block text-lg font-semibold mb-2 text-gray-200">
            Enter your prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A photorealistic image of a cat wearing a space helmet, cinematic lighting"
            className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 resize-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-lg font-semibold mb-3 text-gray-200">
            Aspect Ratio
          </label>
          <div className="grid grid-cols-5 gap-2">
            {aspectRatios.map((ratio) => (
              <button
                key={ratio}
                type="button"
                onClick={() => setAspectRatio(ratio)}
                className={`py-2 px-1 text-sm font-medium rounded-md transition-all duration-200 border-2 ${
                  aspectRatio === ratio
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full py-3 px-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>
    </div>
  );
};

export default ImageGenerator;

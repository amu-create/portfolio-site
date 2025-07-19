"use client";

import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="flex items-center justify-center gap-2 text-gray-300 text-sm sm:text-base">
            © {currentYear} 전서기. Made with 
            <Heart size={14} className="text-red-500 fill-current sm:w-4 sm:h-4" />
            and AI
          </p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
            AI와 사람을 연결하는 개발자
          </p>
        </div>
      </div>
    </footer>
  );
}
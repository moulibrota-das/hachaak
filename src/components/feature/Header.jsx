
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold" style={{ fontFamily: '"Pacifico", serif' }}>
              logo
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-900 hover:text-gray-600 font-medium">Home</a>
            <a href="/shop" className="text-gray-900 hover:text-gray-600 font-medium">Shop</a>
            <a href="/collections" className="text-gray-900 hover:text-gray-600 font-medium">Collections</a>
            <a href="/about" className="text-gray-900 hover:text-gray-600 font-medium">About</a>
            <a href="/contact" className="text-gray-900 hover:text-gray-600 font-medium">Contact</a>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="w-6 h-6 flex items-center justify-center text-gray-900 hover:text-gray-600 cursor-pointer">
              <i className="ri-search-line text-xl"></i>
            </button>
            <button className="w-6 h-6 flex items-center justify-center text-gray-900 hover:text-gray-600 cursor-pointer">
              <i className="ri-user-line text-xl"></i>
            </button>
            <button className="w-6 h-6 flex items-center justify-center text-gray-900 hover:text-gray-600 cursor-pointer relative">
              <i className="ri-shopping-bag-line text-xl"></i>
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </button>

            {/* Mobile menu button */}
            <button 
              className="md:hidden w-6 h-6 flex items-center justify-center cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-gray-900 hover:text-gray-600 font-medium">Home</a>
              <a href="/shop" className="text-gray-900 hover:text-gray-600 font-medium">Shop</a>
              <a href="/collections" className="text-gray-900 hover:text-gray-600 font-medium">Collections</a>
              <a href="/about" className="text-gray-900 hover:text-gray-600 font-medium">About</a>
              <a href="/contact" className="text-gray-900 hover:text-gray-600 font-medium">Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

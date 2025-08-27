import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Bell, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  
  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Latest', href: '/latest' },
    { name: 'National', href: '/national' },
    { name: 'World', href: '/world' },
    { name: 'Business', href: '/business' },
    { name: 'Sports', href: '/sports' },
    { name: 'Technology', href: '/technology' },
    { name: 'Entertainment', href: '/entertainment' },
    { name: 'Health', href: '/health' },
    { name: 'Opinion', href: '/opinion' },
    { name: 'Videos', href: '/videos' }
  ];

  // Function to check if a navigation item is active
  const isActiveItem = (href) => {
    // Handle home page separately
    if (href === '/' && location.pathname === '/') return true;
    // For other pages, check if current path starts with the href
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* Breaking News Ticker */}
      <div className="bg-red-500 text-white py-2 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center">
            <span className="bg-white text-red-500 px-3 py-1 rounded text-xs font-bold mr-4 whitespace-nowrap">
              BREAKING
            </span>
            <div className="animate-pulse">
              <span className="text-sm">
                Rain batters Karachi again • Pakistan hit by major internet outage • Chinese FM Wang Yi to co-chair strategic talks
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Top bar - Date and Live indicator */}
          <div className="hidden md:flex items-center justify-between py-2 border-b border-gray-200">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{new Date().toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              })}</span>
              <span>•</span>
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span>Breaking News</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-600 transition-colors duration-200">
                LIVE
              </button>
              <button className="text-gray-500 hover:text-red-500 transition-colors duration-200">
                <Bell className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Main navigation */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent">
                  PK NEWS
                </h1>
                <div className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded font-semibold">
                  TRUSTED
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                    isActiveItem(item.href)
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
            
            {/* Search and Mobile Menu */}
            <div className="flex items-center space-x-3">
              {/* Desktop Search */}
              <div className="hidden md:flex items-center space-x-3">
                {isSearchOpen ? (
                  <div className="flex items-center bg-gray-50 rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
                    <input
                      type="text"
                      placeholder="Search news..."
                      className="bg-transparent px-4 py-2 focus:outline-none text-sm w-64"
                      autoFocus
                      value={searchValue}
                      onChange={e => setSearchValue(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && searchValue.trim()) {
                          setIsSearchOpen(false);
                          navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
                        }
                      }}
                    />
                    <button 
                      className="px-3 py-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* User Account */}
              <button className="hidden md:flex p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
                <User className="w-5 h-5" />
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="xl:hidden p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="xl:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 py-4">
              {/* Mobile Search */}
              <div className="mb-4 md:hidden">
                <div className="flex items-center bg-gray-50 rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                  <Search className="w-4 h-4 text-gray-500 ml-3" />
                  <input
                    type="text"
                    placeholder="Search news..."
                    className="bg-transparent px-3 py-2 focus:outline-none text-sm flex-1"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && searchValue.trim()) {
                        setIsMenuOpen(false);
                        navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
                      }
                    }}
                  />
                </div>
              </div>
              
              {/* Mobile Navigation Links */}
              <div className="grid grid-cols-2 gap-2">
                {navigationItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 text-center ${
                      isActiveItem(item.href)
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 border border-transparent'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              
              {/* Mobile User Actions */}
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Account</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition-colors duration-200">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm">Notifications</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
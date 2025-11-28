import React from 'react';

export default function BentoGrid() {
  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[280px]">
          {/* Large card - spans 2 rows */}
          <div className="md:row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
              alt="New Release Fashion"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-purple-300 text-sm font-medium mb-2">
                  Premium Collection
                </p>
                <h2 className="text-4xl font-bold text-white mb-3">
                  New Release
                </h2>
                {/* <p className="text-gray-300 mb-6">
                  Presenting the latest trends of 2025
                </p>
                <div className="flex gap-3">
                  <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                    2025 Lookbook
                  </button>
                  <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                    <span>▶</span> Watch Trending
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          {/* Top right card */}
          <div className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-2xl">
            <img
              src="https://plus.unsplash.com/premium_photo-1706806943409-614e0d9861dc?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Trendy Fashion"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <p className="text-white text-sm flex items-center gap-2">
                  <span>▶</span> Watch Trending
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Trendy Fashion
                </h3>
              </div>
            </div>
          </div>

          {/* Bottom right card */}
          <div className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-2xl bg-gradient-to-br from-orange-500 to-orange-600">
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="bg-white rounded-full px-5 py-2">
                  <p className="text-orange-600 font-bold">SUMMER</p>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-purple-400 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-blue-400 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-pink-400 border-2 border-white"></div>
                </div>
              </div>
              
              <div>
                <h3 className="text-white text-2xl font-bold mb-2">
                  Subscribe newsletter and get
                </h3>
                <p className="text-white text-xl font-semibold mb-4">
                  news and deals offer
                </p>
                <button className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
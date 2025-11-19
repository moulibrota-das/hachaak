import React, { useState } from "react";
import { Star, ChevronRight } from "lucide-react";

function ProductComponent({ product }) {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("S");
  const [mainImage, setMainImage] = useState(0);

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb - Mobile */}
      <nav className="lg:hidden px-4 py-3 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <span>Clothing</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Basic Tee</span>
        </div>
      </nav>

      {/* Breadcrumb - Desktop */}
      <nav className="hidden lg:block px-8 py-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600 max-w-7xl mx-auto">
          <span>Clothing</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Basic Tee</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Image Section */}
          <div className="lg:sticky lg:top-8">
            {/* Mobile Header */}
            <div className="lg:hidden mb-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                {product.name}
              </h1>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">{product.rating}</span>
                  <div className="flex gap-0.5">
                    {renderStars(product.rating)}
                  </div>
                </div>
                <button className="text-indigo-600 text-sm font-medium">
                  See all {product.reviews} reviews
                </button>
              </div>
              <p className="text-2xl font-semibold text-gray-900 mt-3">
                ${product.price}
              </p>
            </div>

            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[mainImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images - Desktop */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(idx)}
                  className={`relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden ${
                    mainImage === idx ? "ring-2 ring-indigo-600" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="mt-8 lg:mt-0">
            {/* Desktop Header */}
            <div className="hidden lg:block mb-6">
              <h1 className="text-3xl font-semibold text-gray-900">
                {product.name}
              </h1>
              <p className="text-3xl font-semibold text-gray-900 mt-2">
                ${product.price}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">{product.rating}</span>
                  <div className="flex gap-0.5">
                    {renderStars(product.rating)}
                  </div>
                </div>
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                  See all {product.reviews} reviews
                </button>
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color.name
                        ? "border-gray-900 ring-2 ring-offset-2 ring-gray-900"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
                  See sizing chart
                </button>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 text-sm font-medium rounded-md border ${
                      selectedSize === size
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-900 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-indigo-600 text-white py-4 px-6 rounded-md font-medium text-base hover:bg-indigo-700 transition-colors mb-8">
              Add to cart
            </button>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-900 mb-3">
                Description
              </h3>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                {product.description.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Fabric & Care */}
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-900 mb-3">
                Fabric & Care
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-gray-600"
                  >
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Info Cards - Desktop */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-6 text-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  International delivery
                </h4>
                <p className="text-xs text-gray-600">
                  Get your order in 2 years
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 text-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Loyalty rewards
                </h4>
                <p className="text-xs text-gray-600">
                  Don't look at other tees
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductComponent;

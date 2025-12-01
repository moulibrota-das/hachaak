import React, { useState } from "react";
import { Star, ChevronRight, ChevronLeft, X } from "lucide-react";
import { Link } from "react-router-dom";

function ProductComponent({ product }) {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("S");
  const [mainImage, setMainImage] = useState(0);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

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

  const handleBuyNow = () => {
    const message = `I want to buy ${product.name}\nColor: ${selectedColor}\nSize: ${selectedSize}`;
    const url = `https://wa.me/+918584075771?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const nextImage = () => {
    setMainImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setMainImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Size Chart Modal */}
      {isSizeChartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto relative">
            <button
              onClick={() => setIsSizeChartOpen(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <div className="p-4">
              <img
                src="/size_chart.jpeg"
                alt="Size Chart"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb - Mobile */}
      <nav className="lg:hidden px-4 py-3 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Link to="/">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span>Products</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 truncate">{product.name}</span>
        </div>
      </nav>

      {/* Breadcrumb - Desktop */}
      <nav className="hidden lg:block ml-16 px-8 py-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600 max-w-7xl mx-auto">
          <Link to="/" className="hover:text-gray-900">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>Products</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{product.name}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Image Section */}
          <div className="lg:sticky lg:top-8">
            {/* Mobile Header */}
            <div className="lg:hidden mb-4">
              <h1 className="text-xl font-semibold text-gray-700">
                {product.name}
              </h1>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">{product.rating}</span>
                  <div className="flex gap-0.5">
                    {renderStars(product.rating)}
                  </div>
                </div>
                <button className="text-orange-600 text-sm font-medium">
                  See all {product.reviews} reviews
                </button>
              </div>
              <p className="text-3xl font-semibold text-gray-900 mt-3 flex items-center gap-3">
                <span>₹{product.price}</span>
                <span className="text-gray-500 line-through text-xl">
                  ₹{Math.round(product.price / 0.8)}
                </span>
                <span className="text-green-600 text-lg font-medium">
                  (20% OFF)
                </span>
              </p>
            </div>

            {/* Main Image with Carousel */}
            <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4 group">
              <img
                src={product.images[mainImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Carousel Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 max-lg:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 max-lg:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-900" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images - Desktop */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(idx)}
                  className={`relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden ${
                    mainImage === idx ? "ring-2 ring-orange-600" : ""
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
              <h1 className="text-2xl font-semibold text-gray-700">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">{product.rating}</span>
                  <div className="flex gap-0.5">
                    {renderStars(product.rating)}
                  </div>
                </div>
                <button className="text-orange-600 text-sm font-medium hover:text-orange-700">
                  See all {product.reviews} reviews
                </button>
              </div>
              <p className="text-4xl font-semibold text-gray-900 mt-2 flex items-center gap-4">
                <span>₹{product.price}</span>
                <span className="text-gray-500 line-through text-2xl">
                  ₹{Math.round(product.price / 0.8)}
                </span>
                <span className="text-green-600 text-xl font-medium">
                  (20% OFF)
                </span>
              </p>
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
                <button
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-sm text-orange-600 font-medium hover:text-orange-700"
                >
                  See sizing chart
                </button>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 lg:py-3 lg:px-4 text-sm font-medium rounded-md border ${
                      selectedSize === size
                        ? "bg-orange-600 text-white border-orange-600"
                        : "bg-white text-gray-900 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="w-full bg-orange-600 text-white py-4 px-6 rounded-md font-medium text-base hover:bg-orange-700 transition-colors mb-8"
            >
              Buy Now
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductComponent;

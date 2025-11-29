import React, { useState, useEffect } from "react";
import { ArrowLeft, Edit } from "lucide-react";
import supabase from "../../../../lib/supabaseClient";

export default function ProductDetail({ product, onBack, onEdit }) {
  const [mainImage, setMainImage] = useState(0);
  const [categoryMap, setCategoryMap] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("Categories")
        .select("name, value");
      if (!error && data) {
        const map = {};
        data.forEach((c) => {
          map[c.value] = c.name;
        });
        setCategoryMap(map);
      }
    };
    fetchCategories();
  }, []);

  if (!product) return null;

  // Helper to safely get array fields
  const getArray = (val) => (Array.isArray(val) ? val : []);

  return (
    <div className="bg-white rounded shadow min-h-[600px]">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Products</span>
        </button>
        <button
          onClick={() => onEdit && onEdit(product)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          <Edit size={16} />
          <span>Edit Product</span>
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images Section */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 border">
            {getArray(product.images).length > 0 ? (
              <img
                src={product.images[mainImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          {getArray(product.images).length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(idx)}
                  className={`aspect-square border rounded overflow-hidden ${
                    mainImage === idx ? "ring-2 ring-black" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="text-xl font-semibold text-gray-900 mt-1">
              ₹{product.price ? Number(product.price).toFixed(2) : "N/A"}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {getArray(product.category).map((cat, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium"
                >
                  {categoryMap[cat] || cat}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {product.description || "No description provided."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                Sizes
              </h3>
              <div className="flex flex-wrap gap-2">
                {getArray(product.size).length > 0 ? (
                  getArray(product.size).map((s, i) => (
                    <span
                      key={i}
                      className="border border-gray-300 px-3 py-1 rounded text-sm font-medium"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">N/A</span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                Colors
              </h3>
              <div className="flex flex-wrap gap-2">
                {getArray(product.color).length > 0 ? (
                  getArray(product.color).map((c, i) => (
                    <span
                      key={i}
                      className="border border-gray-300 px-3 py-1 rounded text-sm font-medium"
                    >
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">N/A</span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div>
              <span className="block font-medium text-gray-900">
                Created At
              </span>
              {product.created_at
                ? new Date(product.created_at).toLocaleDateString() +
                  " " +
                  new Date(product.created_at).toLocaleTimeString()
                : "N/A"}
            </div>
            <div>
              <span className="block font-medium text-gray-900">
                Product ID
              </span>
              <span className="font-mono text-xs">{product.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

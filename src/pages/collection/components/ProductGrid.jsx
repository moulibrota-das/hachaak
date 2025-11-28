import React, { useState, useMemo } from "react";
import { Filter, X } from "lucide-react";
import ProductCard from "../../../components/base/Card";
// Sample product data
const PRODUCTS = [
  {
    id: 1,
    name: "Classic White Tee",
    category: "tshirt",
    price: 29.99,
    size: ["S", "M", "L", "XL"],
    color: "White",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Black Graphic Tee",
    category: "tshirt",
    price: 34.99,
    size: ["M", "L", "XL"],
    color: "Black",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Navy Hoodie",
    category: "hoodie",
    price: 59.99,
    size: ["S", "M", "L", "XL", "XXL"],
    color: "Navy",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Grey Zip Hoodie",
    category: "hoodie",
    price: 64.99,
    size: ["M", "L", "XL"],
    color: "Grey",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Blue Crew Tee",
    category: "tshirt",
    price: 32.99,
    size: ["S", "M", "L"],
    color: "Blue",
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Black Pullover Hoodie",
    category: "hoodie",
    price: 54.99,
    size: ["S", "M", "L", "XL"],
    color: "Black",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Red Graphic Tee",
    category: "tshirt",
    price: 36.99,
    size: ["M", "L", "XL"],
    color: "Red",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    name: "White Hoodie",
    category: "hoodie",
    price: 62.99,
    size: ["S", "M", "L", "XL", "XXL"],
    color: "White",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop",
  },
];

const FilterSection = ({
  title,
  options,
  selected,
  onChange,
  type = "checkbox",
}) => (
  <div className="mb-6">
    <h3 className="font-semibold text-sm text-gray-900 mb-3">{title}</h3>
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center cursor-pointer">
          <input
            type={type}
            checked={selected.includes(option)}
            onChange={() => onChange(option)}
            className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
          />
          <span className="ml-2 text-sm text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export default function ProductGrid() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState("featured");

  const categories = ["tshirt", "hoodie"];
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const colors = [...new Set(PRODUCTS.map((p) => p.color))];

  const toggleFilter = (selected, setSelected, value) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = PRODUCTS.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const sizeMatch =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) => product.size.includes(size));
      const colorMatch =
        selectedColors.length === 0 || selectedColors.includes(product.color);
      return categoryMatch && sizeMatch && colorMatch;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    return sorted;
  }, [selectedCategories, selectedSizes, selectedColors, sortBy]);

  const activeFilterCount =
    selectedCategories.length + selectedSizes.length + selectedColors.length;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-7 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop All</h1>
          <p className="text-gray-600">Premium t-shirts and hoodies</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs bg-gray-900 text-white rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {filteredAndSortedProducts.length} products
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`${showFilters ? "block" : "hidden"} w-64 flex-shrink-0`}
          >
            <div className="sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-gray-600 hover:text-gray-900 underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <FilterSection
                title="Category"
                options={categories}
                selected={selectedCategories}
                onChange={(val) =>
                  toggleFilter(selectedCategories, setSelectedCategories, val)
                }
              />

              <FilterSection
                title="Size"
                options={sizes}
                selected={selectedSizes}
                onChange={(val) =>
                  toggleFilter(selectedSizes, setSelectedSizes, val)
                }
              />

              <FilterSection
                title="Color"
                options={colors}
                selected={selectedColors}
                onChange={(val) =>
                  toggleFilter(selectedColors, setSelectedColors, val)
                }
              />
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  No products found matching your filters
                </p>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gray-900 underline hover:no-underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

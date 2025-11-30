import { useState, useEffect } from "react";
import Card from "../../../components/base/Card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import supabase from "../../../lib/supabaseClient";

export default function BestsellerSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Products")
      .select("*")
      .eq("isActive", true)
      .limit(8);

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      const formattedProducts = data.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category || [],
        type: p.type || "", // Assuming type exists or defaulting to empty
        image: p.images && p.images.length > 0 ? p.images[0] : null,
      }));
      setProducts(formattedProducts);
    }
    setLoading(false);
  };

  const filteredProducts = products.filter((product) => {
    if (activeTab === "all") return true;
    if (activeTab === "tshirts")
      return Array.isArray(product.category)
        ? product.category.includes("tshirt")
        : product.category === "tshirt";
    if (activeTab === "hoodies")
      return Array.isArray(product.category)
        ? product.category.includes("hoodie")
        : product.category === "hoodie";
    if (activeTab === "oversized") return product.type === "oversized";
    return true;
  });

  // Mobile: 1 item, Tablet: 2 items, Desktop: 3 items
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerSlide(3);
      } else if (window.innerWidth >= 640) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(1);
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  useEffect(() => {
    // Reset to first slide when items per slide changes
    setCurrentSlide(0);
  }, [itemsPerSlide, activeTab]);

  const getCurrentProducts = () => {
    const start = currentSlide * itemsPerSlide;
    return filteredProducts;
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Best Seller
            </h2>
            <Link
              to="/collection"
              className=" flex items-center gap-2 text-sm  text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
            >
              View Collection
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        {/* <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto pb-2">
          <div className="flex bg-white rounded-full p-1 shadow-sm min-w-max">
            {[
              { id: "all", label: "All Products" },
              { id: "tshirts", label: "T-Shirts" },
              { id: "hoodies", label: "Hoodies" },
              { id: "oversized", label: "Oversized" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentSlide(0);
                }}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-black text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div> */}

        {/* Carousel Container */}
        {/* Products Grid */}
        <div
          className="grid grid-cols-2 place-items-center sm:grid-cols-3  lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8"
          data-product-shop
        >
          {getCurrentProducts().map((product) => (
            <Card product={product} />
          ))}
        </div>

        {/* <div className="text-center mt-8 sm:mt-12">
          <button className="bg-black text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded font-medium hover:bg-gray-800 transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base w-full sm:w-auto">
            View All Products
          </button>
        </div> */}
      </div>
    </section>
  );
}

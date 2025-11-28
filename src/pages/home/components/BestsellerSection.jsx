import { useState, useEffect } from "react";
import Card from "../../../components/base/Card";
import { ArrowRight } from "lucide-react";

export default function BestsellerSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      id: 1,
      name: "Essential Black Tee",
      price: 29.99,
      originalPrice: 39.99,
      category: "tshirt",
      type: "regular",
      image:
        "https://readdy.ai/api/search-image?query=Black%20cotton%20t-shirt%20on%20clean%20white%20background%2C%20essential%20basic%20design%2C%20premium%20fabric%20quality%2C%20classic%20regular%20fit%2C%20minimalist%20style%2C%20everyday%20casual%20wear%2C%20high%20quality%20product%20photography%2C%20soft%20natural%20lighting&width=300&height=400&seq=black-tee-001&orientation=portrait",
      badge: "Bestseller",
    },
    {
      id: 2,
      name: "Oversized White Tee",
      price: 34.99,
      category: "tshirt",
      type: "oversized",
      image:
        "https://readdy.ai/api/search-image?query=White%20oversized%20cotton%20t-shirt%20on%20clean%20background%2C%20relaxed%20loose%20fit%2C%20premium%20quality%20fabric%2C%20street%20style%20fashion%2C%20modern%20urban%20wear%2C%20comfortable%20oversized%20clothing%2C%20professional%20product%20photography&width=300&height=400&seq=white-over-001&orientation=portrait",
      badge: "New",
    },
    {
      id: 3,
      name: "Classic Gray Hoodie",
      price: 59.99,
      category: "hoodie",
      image:
        "https://readdy.ai/api/search-image?query=Gray%20cotton%20hoodie%20on%20clean%20white%20background%2C%20classic%20comfortable%20fit%2C%20premium%20fabric%20texture%2C%20modern%20streetwear%20style%2C%20cozy%20warm%20clothing%2C%20urban%20fashion%2C%20soft%20natural%20lighting%2C%20professional%20photography&width=300&height=400&seq=gray-hoodie-001&orientation=portrait",
      badge: "Popular",
    },
    {
      id: 4,
      name: "Vintage Navy Tee",
      price: 32.99,
      category: "tshirt",
      type: "regular",
      image:
        "https://readdy.ai/api/search-image?query=Navy%20blue%20cotton%20t-shirt%20on%20clean%20background%2C%20vintage%20inspired%20design%2C%20premium%20fabric%20quality%2C%20classic%20regular%20fit%2C%20retro%20casual%20style%2C%20comfortable%20everyday%20wear%2C%20professional%20product%20photography&width=300&height=400&seq=navy-tee-001&orientation=portrait",
    },
    {
      id: 5,
      name: "Black Oversized Hoodie",
      price: 69.99,
      category: "hoodie",
      type: "oversized",
      image:
        "https://readdy.ai/api/search-image?query=Black%20oversized%20hoodie%20on%20clean%20white%20background%2C%20relaxed%20comfortable%20fit%2C%20premium%20cotton%20fabric%2C%20street%20style%20fashion%2C%20modern%20urban%20wear%2C%20cozy%20warm%20clothing%2C%20professional%20product%20photography&width=300&height=400&seq=black-hoodie-001&orientation=portrait",
      badge: "Limited",
    },
    {
      id: 6,
      name: "Cream Oversized Tee",
      price: 36.99,
      category: "tshirt",
      type: "oversized",
      image:
        "https://readdy.ai/api/search-image?query=Cream%20colored%20oversized%20cotton%20t-shirt%20on%20clean%20background%2C%20soft%20neutral%20tone%2C%20relaxed%20loose%20fit%2C%20premium%20quality%20fabric%2C%20modern%20casual%20style%2C%20comfortable%20streetwear%2C%20professional%20photography&width=300&height=400&seq=cream-over-001&orientation=portrait",
    },
    {
      id: 7,
      name: "Cream Oversized Tee",
      price: 36.99,
      category: "tshirt",
      type: "oversized",
      image:
        "https://veirdo.in/cdn/shop/files/b_0119493a-9927-4550-8323-baefe5f625c0.jpg?v=1759917565",
    },
    {
      id: 8,
      name: "Cream Oversized Tee",
      price: 36.99,
      category: "tshirt",
      type: "oversized",
      image:
        "https://pronk.in/cdn/shop/files/49_2e3b3e43-98fa-44eb-a06a-6c6c79a43ffa.jpg?v=1708776622&width=1080",
    },
  ];

  const filteredProducts = products.filter((product) => {
    if (activeTab === "all") return true;
    if (activeTab === "tshirts") return product.category === "tshirt";
    if (activeTab === "hoodies") return product.category === "hoodie";
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
    return products;
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Best Seller
            </h2>
            <a
              href="#"
              className=" flex items-center gap-2 text-sm  text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
            >
              View Collection
              <ArrowRight className="w-5 h-5" />
            </a>
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

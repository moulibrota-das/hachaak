import { ArrowRight } from "lucide-react";
import Card from "../../../components/base/Card";

function NewarrivalSection() {
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
  ];
  return (
    <section className="py-12 px-4 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            New Arrivals
          </h2>
          <a
            href="#"
            className=" flex items-center gap-2 text-sm  text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
          >
            View Collection
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Products Grid/Scroll */}
        <div className="relative">
          {/* Mobile: Horizontal Scroll */}
          <div className=" overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-8 pb-4">
              {products.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-[280px]">
                  <Card product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Grid */}
          {/* <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div> */}
        </div>

        {/* Mobile Shop Link */}
        {/* <div className="lg:hidden mt-6 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
          >
            Shop the collection
            <ArrowRight className="w-5 h-5" />
          </a>
        </div> */}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

export default NewarrivalSection;

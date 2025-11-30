import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../../components/base/Card";
import supabase from "../../../lib/supabaseClient";

function NewarrivalSection({ headerText = "New Arrivals", category }) {
  const link = category ? `/collection?category=${category}` : "/collection";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    let query = supabase
      .from("Products")
      .select("*")
      .eq("isActive", true)
      .limit(6);

    if (category) {
      query = query.contains("category", [category]);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      const formattedProducts = data.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category || [],
        image: p.images && p.images.length > 0 ? p.images[0] : null,
        // Add other fields if needed by Card component
      }));
      setProducts(formattedProducts);
    }
  };
  return (
    <section className="pb-10 sm:pb-12  bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {headerText}
          </h2>
          <Link
            to={link}
            className=" flex items-center gap-2 text-sm  text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
          >
            View Collection
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Products Grid/Scroll */}
        <div className="relative">
          {/* Mobile: Horizontal Scroll */}
          <div className=" overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-8 lg:gap-12 pb-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[200px] lg:w-[240px]"
                >
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

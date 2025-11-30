import { useNavigate } from "react-router-dom";
export default function CategorySection() {
  const navigate = useNavigate();
  const categories = [
    {
      id: 1,
      name: "Regular T-Shirts",
      description: "Classic fit for everyday comfort",
      image:
        "https://readdy.ai/api/search-image?query=Premium%20cotton%20t-shirt%20on%20clean%20white%20background%2C%20classic%20regular%20fit%2C%20high%20quality%20fabric%20texture%2C%20minimalist%20product%20photography%2C%20soft%20natural%20lighting%2C%20modern%20casual%20wear%2C%20comfortable%20everyday%20clothing%2C%20neutral%20colors%2C%20professional%20fashion%20photography&width=400&height=500&seq=tshirt-reg-001&orientation=portrait",
      href: "/collection?category=tshirt",
    },
    {
      id: 2,
      name: "Oversized T-Shirts",
      description: "Relaxed fit for street style",
      image:
        "https://readdy.ai/api/search-image?query=Oversized%20cotton%20t-shirt%20on%20clean%20white%20background%2C%20relaxed%20loose%20fit%2C%20premium%20fabric%20quality%2C%20street%20style%20fashion%2C%20modern%20urban%20wear%2C%20comfortable%20oversized%20clothing%2C%20trendy%20casual%20style%2C%20professional%20product%20photography&width=400&height=500&seq=tshirt-over-001&orientation=portrait",
      href: "/collection?category=tshirt",
    },
    {
      id: 3,
      name: "Hoodies",
      description: "Cozy warmth meets urban style",
      image:
        "https://readdy.ai/api/search-image?query=Premium%20cotton%20hoodie%20on%20clean%20white%20background%2C%20comfortable%20fit%2C%20high%20quality%20fabric%20texture%2C%20modern%20streetwear%20style%2C%20cozy%20warm%20clothing%2C%20urban%20fashion%2C%20soft%20natural%20lighting%2C%20professional%20product%20photography&width=400&height=500&seq=hoodie-001&orientation=portrait",
      href: "/collection?category=hoodie",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collection of premium streetwear essentials
          </p>
        </div> */}

        <div className="grid grid-cols-3 gap-8 items-center justify-items-center">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer w-32 lg:w-64"
              data-product-shop
              onClick={() => navigate(category.href)}
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[16/9] mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              {/* <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <a 
                href={category.href}
                className="inline-flex items-center text-black font-medium hover:text-gray-600 cursor-pointer"
              >
                Shop Now
                <i className="ri-arrow-right-line ml-2"></i>
              </a> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

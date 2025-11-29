export default function FeaturesSection() {
  const features = [
    {
      icon: "ri-truck-line",
      title: "Free Shipping",
      description: "Free shipping on orders over ₹750",
    },
    {
      icon: "ri-arrow-go-back-line",
      title: "Easy Returns",
      description: "30-day hassle-free returns",
    },
    {
      icon: "ri-shield-check-line",
      title: "Quality Guarantee",
      description: "Premium materials and craftsmanship",
    },
    {
      icon: "ri-customer-service-2-line",
      title: "24/7 Support",
      description: "Always here to help you",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
                <i className={`${feature.icon} text-2xl text-black`}></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

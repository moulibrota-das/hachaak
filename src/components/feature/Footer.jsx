import logo2 from "../../../public/logo2.png";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="mb-4">
              <img src={logo2} alt="Logo" className="h-11 w-auto" />
            </div>
            <p className="text-gray-600 mb-4">
              Premium quality streetwear for the modern lifestyle. Comfort meets
              style in every piece.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black cursor-pointer"
              >
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black cursor-pointer"
              >
                <i className="ri-facebook-line text-xl"></i>
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black cursor-pointer"
              >
                <i className="ri-twitter-line text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/shop"
                  className="text-gray-600 hover:text-black cursor-pointer"
                >
                  Shop All
                </a>
              </li>
              <li>
                <a
                  href="/tshirts"
                  className="text-gray-600 hover:text-black cursor-pointer"
                >
                  T-Shirts
                </a>
              </li>
              <li>
                <a
                  href="/hoodies"
                  className="text-gray-600 hover:text-black cursor-pointer"
                >
                  Hoodies
                </a>
              </li>
              <li>
                <a
                  href="/oversized"
                  className="text-gray-600 hover:text-black cursor-pointer"
                >
                  Oversized
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/contact"
                  className="text-gray-600 hover:text-black cursor-pointer"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="text-gray-600 hover:text-black cursor-pointer"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="/returns"
                  className="text-gray-600 hover:text-black cursor-pointer"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="/size-guide"
                  className="text-gray-600 hover:text-black cursor-pointer"
                >
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Stay Updated</h4>
            <p className="text-gray-600 mb-4">
              Subscribe for new arrivals and exclusive offers
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
              <button className="px-4 py-2 bg-black text-white rounded-r-md hover:bg-gray-800 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2024 logo. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a
              href="/privacy"
              className="text-gray-600 hover:text-black text-sm cursor-pointer"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-600 hover:text-black text-sm cursor-pointer"
            >
              Terms of Service
            </a>
            <a
              href="https://readdy.ai/?origin=logo"
              className="text-gray-600 hover:text-black text-sm cursor-pointer"
            >
              Website Builder
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

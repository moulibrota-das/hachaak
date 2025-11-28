import { useEffect, useState } from "react";
import { Heart, User, ShoppingCart } from "lucide-react";
import logo from "../../../public/logo.png";
import logo2 from "../../../public/logo2.png";
import logo2_white from "../../../public/logo2_white.png";

export default function Header({ position = "fixed", sx = "" }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${position} ${sx} w-full  top-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-white shadow-sm text-gray-900"
          : "bg-transparent text-gray-200"
      } ${position === "block" && "text-gray-900"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <a href="/">
              <img
                src={isScrolled || position === "block" ? logo2 : logo2_white}
                alt="Logo"
                className="h-11 w-auto"
              />
            </a>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="w-6 h-6 flex items-center justify-center  hover:text-gray-600 cursor-pointer">
              <Heart />
            </button>
            <button className="w-6 h-6 flex items-center justify-center  hover:text-gray-600 cursor-pointer">
              <User />
            </button>
            {/* cart */}
            {/* <button className="w-6 h-6 flex items-center justify-center  hover:text-gray-600 cursor-pointer relative">
              <ShoppingCart />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
}

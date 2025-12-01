import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

function Card({ product }) {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const exists = wishlist.some((item) => item.id === product.id);
    setIsWishlisted(exists);
  }, [product.id]);

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    let newWishlist;

    if (isWishlisted) {
      newWishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      newWishlist = [...wishlist, product];
    }

    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div
      key={product.id}
      className="group relative w-full max-w-60 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          alt={product.imageAlt}
          src={product.image}
          className="aspect-3/4 w-full rounded-xl bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-3/4"
        />
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors z-10"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-sm text-gray-700">
          <span className="truncate block">{product.name}</span>
        </h3>
        <p className="mt-1 text-sm font-medium text-gray-900 flex items-center gap-2">
          <span>₹ {product.price}</span>
          <span className="text-gray-500 line-through text-xs">
            ₹ {Math.round(product.price / 0.8)}
          </span>
          <span className="text-green-600 text-xs">(20% OFF)</span>
        </p>
        {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
      </div>
    </div>
  );
}

export default Card;

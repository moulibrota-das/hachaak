import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ product }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <div key={product.id} className="group relative" onClick={handleClick}>
      <img
        alt={product.imageAlt}
        src={product.image}
        className="aspect-3/4 w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75  lg:aspect-3/4"
      />
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={product.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
    </div>
  );
}

export default Card;

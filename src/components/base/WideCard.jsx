import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function WideCard({ image, text }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  // useEffect(() => {
  //   const el = ref.current;
  //   if (!el) return;
  //   const obs = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((e) => {
  //         if (e.isIntersecting) {
  //           setInView(true);
  //           obs.unobserve(el); // fire once
  //         }
  //       });
  //     },
  //     {
  //       root: null,
  //       threshold: 0.2,
  //     }
  //   );
  //   obs.observe(el);
  //   return () => obs.disconnect();
  // }, []);

  return (
    <div
      ref={ref}
      className="pb-12 px-4 group relative max-w-7xl mx-auto lg:px-8"
      onClick={handleClick}
    >
      <img
        src={image}
        // className={`w-full aspect-[16/9] lg:aspect-[18/9] object-cover rounded-xl
        //     transition-transform duration-[900ms] ease-out will-change-transform
        //     ${inView ? "scale-100" : "scale-[1.12]"}
        //   `}

        className={`w-full aspect-[16/9] lg:aspect-[18/9] object-cover rounded-xl
          `}
      />
      {/* <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={product.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
      </div> */}
    </div>
  );
}

export default WideCard;

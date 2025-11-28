import React from "react";
import ProductGrid from "./components/ProductGrid";
import Header from "../../components/feature/Header";

function page() {
  return (
    <>
    <Header position="block" />
      <ProductGrid />
    </>
  );
}

export default page;

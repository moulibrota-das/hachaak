import Header from "../../components/feature/Header";
import ProductComponent from "./components/ProductComponent";

const ProductPage = () => {
  const product = {
    name: "Basic Tee",
    price: 35,
    rating: 3.9,
    reviews: 512,
    colors: [
      { name: "black", value: "#000000" },
      { name: "gray", value: "#6B7280" },
    ],
    sizes: ["XXS", "XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop",
    ],
    description: [
      "The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.",
      "Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.",
    ],
    features: [
      "Only the best materials",
      "Ethically and locally made",
      "Pre-washed and pre-shrunk",
      "Machine wash cold with similar colors",
    ],
  };

  return (
    <>
      <Header position="block" />
      <ProductComponent product={product} />
    </>
  );
};

export default ProductPage;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/feature/Header";
import ProductComponent from "./components/ProductComponent";
import supabase from "../../lib/supabaseClient";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
        setError("Product not found");
      } else {
        // Map Supabase data to component format
        const formattedProduct = {
          name: data.name,
          price: data.price,
          rating: 4.5, // Default rating as it's not in DB yet
          reviews: 120, // Default reviews
          colors:
            data.color && Array.isArray(data.color)
              ? data.color.map((c) => ({ name: c, value: c })) // Using name as value for now
              : [],
          sizes: data.size || [],
          images: data.images || [],
          description: data.description
            ? data.description.split("\n").filter((p) => p.trim() !== "")
            : [],
          features: [
            "Premium quality material",
            "Comfortable fit",
            "Durable stitching",
            "Machine washable",
          ], // Default features
        };
        setProduct(formattedProduct);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header position="block" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl">Loading product...</div>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header position="block" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl text-red-600">
            {error || "Product not found"}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header position="block" />
      <ProductComponent product={product} />
    </>
  );
};

export default ProductPage;

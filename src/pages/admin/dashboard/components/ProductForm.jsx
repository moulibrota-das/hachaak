import { useState, useRef, useEffect } from "react";
import supabase from "../../../../lib/supabaseClient";
import MultiSelect from "../../../../components/base/MultiSelect";

// Expects env vars: VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function ProductForm({ onSuccess, onCancel, initialData }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const uploadToCloudinary = async (file) => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      throw new Error("Cloudinary env vars not configured");
    }

    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(url, { method: "POST", body: fd });
    if (!res.ok) throw new Error("Cloudinary upload failed");
    const data = await res.json();
    return data.secure_url;
  };

  const handleFiles = (e) => {
    const list = e?.target?.files ?? e;
    const arr = Array.from(list || []);
    const p = arr.map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
      isExisting: false,
    }));

    setPreviews((old) => [...old, ...p]);
  };

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setCategories(
        Array.isArray(initialData.category) ? initialData.category : []
      );
      setSizes(Array.isArray(initialData.size) ? initialData.size : []);
      setColors(
        Array.isArray(initialData.color) ? initialData.color.join(", ") : ""
      );

      // Handle existing images
      if (initialData.images && Array.isArray(initialData.images)) {
        setPreviews(
          initialData.images.map((url) => ({
            file: null,
            url,
            isExisting: true,
          }))
        );
      }
    }
  }, [initialData]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("Categories")
        .select("name, value");
      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategoryOptions(
          data.map((c) => ({ label: c.name, value: c.value }))
        );
      }
    };
    fetchCategories();
  }, []);

  const openFilePicker = () => fileInputRef.current?.click();

  const removeImage = (index) => {
    setPreviews((s) => {
      const removed = s[index];
      if (removed && !removed.isExisting) URL.revokeObjectURL(removed.url);
      const newPreviews = s.filter((_, i) => i !== index);

      if (!removed.isExisting) {
        // Find which file this was in the `files` array
        // This is hard because we don't map 1:1 easily if we mix.
        // Simplified approach: Re-sync files from previews is hard.
        // Let's just filter `files` by index if we assume `files` corresponds to `previews` filtering out existing.
        // Actually, let's just keep `files` as is and filter it at submit time? No, user expects removal.
        // Better: `files` only tracks NEW files. `previews` tracks ALL.
        // When removing a preview, if it's new, we need to remove from `files`.
        // But we don't know the index in `files`.
        // Let's change `files` to be `newFiles`.
      }
      return newPreviews;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    // validation: all fields except description mandatory
    if (!name.trim()) {
      setMessage({ type: "error", text: "Name is required" });
      setLoading(false);
      return;
    }
    if (!categories || categories.length === 0) {
      setMessage({
        type: "error",
        text: "Please select at least one category",
      });
      setLoading(false);
      return;
    }
    if (!sizes || sizes.length === 0) {
      setMessage({ type: "error", text: "Please select at least one size" });
      setLoading(false);
      return;
    }
    if (!colors.trim()) {
      setMessage({
        type: "error",
        text: "Please provide colors (comma-separated)",
      });
      setLoading(false);
      return;
    }
    if (!previews || previews.length === 0) {
      setMessage({ type: "error", text: "Please choose at least one image" });
      setLoading(false);
      return;
    }

    try {
      // 1) Upload new images to Cloudinary
      const finalImages = [];
      for (const p of previews) {
        if (p.isExisting) {
          finalImages.push(p.url);
        } else if (p.file) {
          const url = await uploadToCloudinary(p.file);
          finalImages.push(url);
        }
      }

      // 2) Prepare arrays
      const sizeArr = sizes; // already an array from MultiSelect
      const colorArr = colors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

      const productData = {
        name,
        description,
        images: finalImages,
        size: sizeArr,
        color: colorArr,
        category: categories
      };

      if (!initialData) {
        productData.avg_rating = null;
        productData.clicks = 0;
      }

      // 3) Insert or Update into Supabase
      let error;
      if (initialData) {
        const { error: updateError } = await supabase
          .from("Products")
          .update(productData)
          .eq("id", initialData.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("Products")
          .insert([productData]);
        error = insertError;
      }

      if (error) throw error;

      if (error) throw error;

      setMessage({
        type: "success",
        text: initialData ? "Product updated" : "Product created",
      });
      // reset form
      setName("");
      setDescription("");
      setCategories([]);
      setSizes([]);
      setColors("");

      // revoke and clear previews & files
      previews.forEach((p) => {
        if (!p.isExisting) URL.revokeObjectURL(p.url);
      });
      setPreviews([]);
      setFiles([]);

      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">
        {initialData ? "Edit Product" : "Create Product"}
      </h2>

      {message && (
        <div
          className={`mb-3 text-sm ${
            message.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {message.text}
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 bg-white/60 z-40 flex items-center justify-center rounded">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
            className="w-full border rounded px-3 py-3 md:py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            className="w-full border rounded px-3 py-3 md:py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Categories</label>
          <MultiSelect
            options={categoryOptions}
            value={categories}
            onChange={setCategories}
            placeholder="Select categories"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sizes</label>
          <MultiSelect
            options={["XS", "S", "M", "L", "XL", "XXL"]}
            value={sizes}
            onChange={setSizes}
            placeholder="Select sizes"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Colors (comma-separated)
          </label>
          <input
            value={colors}
            onChange={(e) => setColors(e.target.value)}
            disabled={loading}
            placeholder="red, blue"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Images</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => !loading && openFilePicker()}
              disabled={loading}
              className={`bg-white border border-gray-300 rounded px-4 py-3 md:py-2 text-sm w-full md:w-auto ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
            >
              Choose images
            </button>
            <div className="text-sm text-gray-500">
              {previews.length} selected
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFiles}
            accept="image/*"
          />

          {previews.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {previews.map((p, i) => (
                <div key={p.url} className="relative">
                  <img
                    src={p.url}
                    alt={`preview-${i}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => !loading && removeImage(i)}
                    disabled={loading}
                    className={`absolute top-1 right-1 bg-white rounded-full p-1 text-xs ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-2 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-4 py-3 md:py-2 rounded w-full sm:w-auto text-center"
          >
            {loading
              ? initialData
                ? "Updating..."
                : "Creating..."
              : initialData
              ? "Update Product"
              : "Create Product"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="bg-gray-200 text-gray-800 px-4 py-3 md:py-2 rounded hover:bg-gray-300 w-full sm:w-auto text-center"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

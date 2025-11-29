import { useState, useRef, useEffect } from "react";
import supabase from "../../../../lib/supabaseClient";
import MultiSelect from "../../../../components/base/MultiSelect";

// Expects env vars: VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
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
    setFiles(arr);

    // create previews
    const p = arr.map((f) => ({ file: f, url: URL.createObjectURL(f) }));
    // revoke old previews
    setPreviews((old) => {
      old.forEach((o) => URL.revokeObjectURL(o.url));
      return p;
    });
  };

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  const openFilePicker = () => fileInputRef.current?.click();

  const removeImage = (index) => {
    setFiles((s) => s.filter((_, i) => i !== index));
    setPreviews((s) => {
      const removed = s[index];
      if (removed) URL.revokeObjectURL(removed.url);
      return s.filter((_, i) => i !== index);
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
    if (!files || files.length === 0) {
      setMessage({ type: "error", text: "Please choose at least one image" });
      setLoading(false);
      return;
    }

    try {
      // 1) Upload images to Cloudinary
      const uploaded = [];
      for (const f of files) {
        const url = await uploadToCloudinary(f);
        uploaded.push(url);
      }

      // 2) Prepare arrays
      const sizeArr = sizes; // already an array from MultiSelect
      const colorArr = colors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

      // 3) Insert into Supabase
      const { data, error } = await supabase.from("Products").insert([
        {
          name,
          description,
          images: uploaded,
          size: sizeArr,
          color: colorArr,
          category: categories,
          avg_rating: null,
          clicks: 0,
        },
      ]);

      if (error) throw error;

      setMessage({ type: "success", text: "Product created" });
      // reset form
      setName("");
      setDescription("");
      setCategories([]);
      setSizes([]);
      setColors("");

      // revoke and clear previews & files
      previews.forEach((p) => URL.revokeObjectURL(p.url));
      setPreviews([]);
      setFiles([]);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Create Product</h2>

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
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Categories</label>
          <MultiSelect
            options={["T-Shirts", "Hoodies", "Accessories", "Footwear", "Sale"]}
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
              className={`bg-white border border-gray-300 rounded px-4 py-2 text-sm ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
            >
              Choose images
            </button>
            <div className="text-sm text-gray-500">{files.length} selected</div>
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

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

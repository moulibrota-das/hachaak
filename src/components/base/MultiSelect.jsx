import { useState, useRef, useEffect } from "react";

export default function MultiSelect({
  options = [],
  value = [],
  onChange = () => {},
  placeholder = "Select...",
  disabled = false,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const toggle = () => {
    if (disabled) return;
    setOpen((s) => !s);
  };

  const handleCheck = (opt) => {
    if (disabled) return;
    if (value.includes(opt)) onChange(value.filter((v) => v !== opt));
    else onChange([...value, opt]);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        role="button"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={(e) => e.key === "Enter" && toggle()}
        className={`w-full border rounded px-3 py-2 flex items-center gap-2 ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <div className="flex-1 flex flex-wrap gap-2">
          {value.length === 0 ? (
            <span className="text-gray-400">{placeholder}</span>
          ) : (
            value.map((v) => (
              <span
                key={v}
                className="inline-flex items-center gap-2 bg-gray-100 px-2 py-1 rounded"
              >
                <span className="text-sm">{v}</span>
                <button
                  type="button"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    handleCheck(v);
                  }}
                  className="text-xs text-red-600"
                >
                  ✕
                </button>
              </span>
            ))
          )}
        </div>
        <div className="text-gray-500">▾</div>
      </div>

      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-auto">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={value.includes(opt)}
                onChange={() => handleCheck(opt)}
                disabled={disabled}
              />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

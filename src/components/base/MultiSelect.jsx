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

  const getVal = (opt) => (typeof opt === "object" ? opt.value : opt);
  const getLabel = (opt) => (typeof opt === "object" ? opt.label : opt);

  const handleCheck = (opt) => {
    if (disabled) return;
    const val = getVal(opt);
    if (value.includes(val)) onChange(value.filter((v) => v !== val));
    else onChange([...value, val]);
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
            value.map((v) => {
              const opt = options.find((o) => getVal(o) === v);
              const label = opt ? getLabel(opt) : v;
              return (
                <span
                  key={v}
                  className="inline-flex items-center gap-2 bg-gray-100 px-2 py-1 rounded"
                >
                  <span className="text-sm">{label}</span>
                  <button
                    type="button"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      // Find the option object again to pass to handleCheck if needed,
                      // or just pass the value if handleCheck supports it.
                      // Actually handleCheck expects the option object to extract value.
                      // But here we have 'v' which IS the value.
                      // Let's just call onChange directly for removal.
                      onChange(value.filter((val) => val !== v));
                    }}
                    className="text-xs text-red-600"
                  >
                    ✕
                  </button>
                </span>
              );
            })
          )}
        </div>
        <div className="text-gray-500">▾</div>
      </div>

      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-auto">
          {options.map((opt) => {
            const val = getVal(opt);
            const label = getLabel(opt);
            const isChecked = value.includes(val);
            return (
              <label
                key={val}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheck(opt)}
                  disabled={disabled}
                />
                <span className="text-sm">{label}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

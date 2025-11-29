import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Stack, Tooltip, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import supabase from "../../../../lib/supabaseClient";

export default function ProductList({ onCreate, onEdit, onView }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryMap, setCategoryMap] = useState({});

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("Categories")
      .select("name, value");
    if (!error && data) {
      const map = {};
      data.forEach((c) => {
        map[c.value] = c.name;
      });
      setCategoryMap(map);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    const { error } = await supabase.from("Products").delete().eq("id", id);
    if (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    } else {
      fetchProducts();
    }
  };

  const handleEdit = (product) => {
    if (onEdit) onEdit(product);
  };

  const handleView = (product) => {
    if (onView) onView(product);
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const images = params.row.images;
        const firstImage =
          Array.isArray(images) && images.length > 0 ? images[0] : null;
        return (
          <div className="flex items-center justify-center h-full w-full">
            {firstImage ? (
              <img
                src={firstImage}
                alt="Product"
                className="h-10 w-10 object-cover rounded"
              />
            ) : (
              <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                No Img
              </div>
            )}
          </div>
        );
      },
    },
    { field: "name", headerName: "Name", flex: 1, minWidth: 160 },
    {
      field: "category",
      headerName: "Category",
      width: 160,
      valueGetter: (value, row) => {
        const cat = value || row?.category;
        if (Array.isArray(cat)) {
          return cat.map((c) => categoryMap[c] || c).join(", ");
        }
        return categoryMap[cat] || cat || "";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center" height="100%">
          <Tooltip title="View">
            <IconButton size="small" onClick={() => handleView(params.row)}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEdit(params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <div className="bg-white md:p-4 rounded ">
      <div className="flex  justify-between items-center mb-4 gap-4">
        <h2 className="text-xl text-left font-semibold">Products</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreate}
          fullWidth={false}
          className="w-auto"
          sx={{
            bgcolor: "black",
            "&:hover": { bgcolor: "#333" },
            textTransform: "none",
          }}
        >
          Add New
        </Button>
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </div>
    </div>
  );
}

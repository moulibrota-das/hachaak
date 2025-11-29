import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ProductForm from "./ProductForm";

export default function CreateProductDialog({ open, onClose, onCreated }) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="md" fullWidth>
      <DialogTitle className="flex items-center justify-between">
        Create Product
        <IconButton onClick={() => onClose()} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ProductForm
          onSuccess={() => {
            // parent may refresh grid
            onCreated?.();
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

// admin/components/orders/OrderStatusChip.tsx
import { Chip } from "@mui/material";

const statusColors: Record<string, "success" | "warning" | "error" | "default"> =
{
  paid: "success",
  unpaid: "warning",
  failed: "error",
  refunded: "default"
};

const OrderStatusChip = ({ status }: { status: string }) => {
  return (
    <Chip
      label={status.toUpperCase()}
      color={statusColors[status]}
      size="small"
    />
  );
};

export default OrderStatusChip;

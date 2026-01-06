// // admin/components/orders/OrderSummaryCard.tsx
// import { Paper, Typography, Divider } from "@mui/material";
// import type { Order } from "../types/OrderTypes";
// import OrderStatusChip from "./OrderStatusChip";

// const OrderSummaryCard = ({ order }: { order: Order }) => {
//   return (
//     <Paper sx={{ p: 3 }}>
//       <Typography variant="h6">Summary</Typography>
//       <Divider sx={{ my: 2 }} />

//       <Typography>
//         Customer: <strong>{order.customerName}</strong>
//       </Typography>

//       <Typography>Email: {order.customerEmail}</Typography>

//       <Typography mt={2}>
//         Total: ${(order.amount_total / 100).toFixed(2)}
//       </Typography>

//       <Typography mt={1}>
//         Status: <OrderStatusChip status={order.payment_status} />
//       </Typography>

//       <Typography mt={1}>
//         Payment Intent: {order.paymentIntentId}
//       </Typography>
//     </Paper>
//   );
// };

// export default OrderSummaryCard;

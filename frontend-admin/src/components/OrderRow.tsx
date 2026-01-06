// // admin/components/orders/OrderRow.tsx
// import { TableRow, TableCell, Button } from "@mui/material";
// import { Link } from "react-router-dom";
// import type { Order } from "../types/OrderTypes";
// import OrderStatusChip from "./OrderStatusChip";

// const OrderRow = ({ order }: { order: Order }) => {
//   return (
//     <TableRow hover>
//       <TableCell>
//         #{order._id.slice(-6)}
//       </TableCell>

//       <TableCell>
//         <strong>{order.customerName}</strong>
//         <br />
//         <small>{order.customerEmail}</small>
//       </TableCell>

//       <TableCell>
//         ${(order.amount_total / 100).toFixed(2)} {order.currency.toUpperCase()}
//       </TableCell>

//       <TableCell>
//         <OrderStatusChip status={order.payment_status} />
//       </TableCell>

//       <TableCell>
//         {new Date(order.createdAt).toLocaleDateString()}
//       </TableCell>

//       <TableCell align="right">
//         <Button
//           component={Link}
//           to={`/admin/orders/${order._id}`}
//           size="small"
//           variant="outlined"
//         >
//           View
//         </Button>
//       </TableCell>
//     </TableRow>
//   );
// };

// export default OrderRow;

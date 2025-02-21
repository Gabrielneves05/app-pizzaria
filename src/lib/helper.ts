import { OrderItemProps } from "@/providers/order";

export function calculateTotalOrder(orders: OrderItemProps[]) {
  return orders.reduce((total, item) => {
    const totalItem = item.product.price * item.amount;
    return total + totalItem;
  }, 0);
}
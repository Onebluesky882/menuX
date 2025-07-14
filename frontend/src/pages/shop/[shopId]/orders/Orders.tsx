import useOrderListener from "@/hooks/useOrderListener";

const Orders = () => {
  useOrderListener((order) => {
    console.log("New order received", order);
  });
  return <div>Orders</div>;
};
export default Orders;

import Order from "@/app/pre-load/Order";

type PageProps = {
  params: { orderId: string };
};

export default async function Page({ params }: PageProps) {
  const { orderId } = params;
  console.log("id Order", orderId);
  return (
    <div>
      <Order orderId={orderId} />
    </div>
  );
}

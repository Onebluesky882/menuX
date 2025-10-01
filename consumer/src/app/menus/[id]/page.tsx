import ShopMenu from "@/pre-load/ShopMenu";

export default async function MenuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("shop id id menuApi 70eace24-3038-4c89-b66e-6c5af038eb0b :", id);
  return (
    <div>
      <ShopMenu shopId={id} />;
    </div>
  );
}

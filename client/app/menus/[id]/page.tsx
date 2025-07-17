import ShopMenus from "@/app/pre-load/ShopMenus";

type PageProps = {
  params: { id: string };
};
export default async function Page({ params }: PageProps) {
  const { id } = await params;
  console.log("id ", id);
  return (
    <div>
      <ShopMenus shopId={id} />
    </div>
  );
}

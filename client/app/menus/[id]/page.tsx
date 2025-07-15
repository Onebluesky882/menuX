import ShopMenus from "@/app/pre-load/ShopMenus";

type PageProps = {
  params: { id: string };
};

const page = ({ params }: PageProps) => {
  const { id } = params;
  return (
    <div>
      {" "}
      shop {id}
      <ShopMenus shopId={id} />
    </div>
  );
};
export default page;

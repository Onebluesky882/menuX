import ShopPage from "../../../pre-load/menu";

type PageProps = {
  params: {
    shopId: string;
  };
};

export default function Page({ params }: PageProps) {
  const { shopId } = params;
  return (
    <div>
      <ShopPage shopId={shopId} />
    </div>
  );
}

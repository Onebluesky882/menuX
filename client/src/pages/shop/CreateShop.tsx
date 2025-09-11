import RestaurantForm from "@/components/shops/newShop/RestaurantForm/RestaurantForm";
import useShop from "@/hooks/useShop";
import { newShopSchema, type NewShopFormField } from "@/schema/newShopForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateShop = () => {
  const { createShop } = useShop();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<NewShopFormField>({
    resolver: zodResolver(newShopSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<NewShopFormField> = async data => {
    const newShop = await createShop(data);

    if (newShop.data.length > 0) {
      reset();

      const shopId = newShop.data[0];

      navigate(`/shops/${shopId.id}`);
    }
  };

  return (
    <div>
      <RestaurantForm
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        isValid={isValid}
        isSubmitting={isSubmitting}
        handleReset={reset}
      />
    </div>
  );
};

export default CreateShop;

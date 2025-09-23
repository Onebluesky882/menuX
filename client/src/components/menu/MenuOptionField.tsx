import { toast } from "sonner";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const MenuOptionField = ({
  fields,
  register,
  remove,
}: {
  fields: any[];
  register: any;
  remove: (index: number) => void;
}) => {
  return (
    <div className="flex-col   border-dotted border-gray-100 justify-center rounded-2xl  p-5  flex gap-5 ">
      {fields.length == 0 && (
        <p>
          <span className="text-red-500">*</span> เลือกอ็อฟชั่น
        </p>
      )}

      {fields.length > 0 && (
        <div className="space-y-4 ">
          {fields.map((field: any, index: any) => (
            <div key={field.id} className="flex gap-3">
              <Input
                {...register(`options.${index}.label`)}
                placeholder="ex. 3 ชิ้น"
                className="flex-1 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
              />
              <Input
                {...register(`options.${index}.price`)}
                placeholder="Price"
                type="number"
                className="w-24 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                ลบ
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const AddMenuOptions = ({
  append,
  selectedShop,
  errors,
}: {
  append: (val: any) => void;
  selectedShop: { id: string } | null;
  errors: any;
}) => {
  return (
    <div className="flex justify-center gap-4">
      <Button
        type="button"
        onClick={() => append({ label: "", price: 0 })}
        className="  hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
      >
        Add Option
      </Button>
      <Button
        type="submit"
        className={cn(
          "  bg-blue-600  text-white hover:bg-blue-700 transition-colors duration-200 rounded-lg shadow-sm ",
          !selectedShop && "bg-blue-300 cursor-not-allowed hover:bg-blue-300"
        )}
        disabled={!selectedShop}
      >
        Add Menu
      </Button>
      <div className="hidden">
        {errors && errors.options && toast.error(`${errors.options.message}}`)}
      </div>
    </div>
  );
};

export const SaveAll = ({
  loading,
  saveAll,
}: {
  loading: boolean;
  saveAll: () => void;
}) => {
  return (
    <div className="mt-6 text-center">
      <Button
        disabled={loading}
        onClick={saveAll}
        className={cn(
          "px-6 py-2 rounded-full shadow text-white",
          loading
            ? "bg-blue-600/40 cursor-wait"
            : "bg-blue-600 hover:bg-blue-700"
        )}
      >
        {loading ? "Saving…" : "Save All"}
      </Button>
    </div>
  );
};

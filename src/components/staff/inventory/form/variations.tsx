import ServingField from "./serving-field";
import PriceField from "./price-field";
import BeverageTempField from "./beverage/temp-field";
import BeverageConcentrateField from "./beverage/concentrate-field";
import { useItemTypeContext } from "@context/itemType";
import { UseFormReturn, FieldArrayWithId } from "react-hook-form";
import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";

export default function Variations({
  form,
  field,
  index,
}: {
  form: UseFormReturn<Food | Beverage | any | undefined>;
  field: FieldArrayWithId<Food | Beverage | any | undefined>;
  index: number;
}) {
  const { itemType } = useItemTypeContext();
  const cols = itemType === "beverage" ? "grid-cols-4" : "grid-cols-2";

  return (
    <div className={`grid ${cols} gap-x-2 p-1`} key={field.id}>
      <ServingField form={form} index={index} />
      <PriceField form={form} index={index} />
      {itemType === "beverage" && (
        <>
          <BeverageTempField form={form} index={index} />
          <BeverageConcentrateField form={form} index={index} />
        </>
      )}
    </div>
  );
}

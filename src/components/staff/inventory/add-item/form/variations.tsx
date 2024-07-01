import ServingField from "./serving-field";
import PriceField from "./price-field";
import BeverageTempField from "./beverage/temp-field";
import BeverageConcentrateField from "./beverage/concentrate-field";
import { useItemTypeContext } from "@hooks/itemTypeContext";

export default function Variations({
  form,
  field,
  index,
}: {
  form: any;
  field: any;
  index: number;
}) {
  const { itemType } = useItemTypeContext();
  const cols = itemType === "beverage" ? "4" : "2";

  return (
    <div className={"grid grid-cols-" + cols + " gap-x-2 p-1"} key={field.id}>
      <div>
        <ServingField form={form} index={index} />
      </div>
      <div>
        <PriceField form={form} index={index} />
      </div>
      {itemType === "beverage" && (
        <>
          <BeverageTempField form={form} index={index} />
          <BeverageConcentrateField form={form} index={index} />
        </>
      )}
    </div>
  );
}

import { inferTemperatureEmoji } from "@lib/customer-utils";
import { ItemDetails } from "@models/Cart";
import { capitalize } from "@lib/utils";
import CoffeeBean from "@components/bean";

export default function CartList({ item }: { item: ItemDetails }) {
  return (
    <div className="px-4">
      <div className={`grid grid-cols-[40%_40%_20%] items-center py-2`}>
        <div className="text-left">
          <h1 className="text-gold">{item.name}</h1>
        </div>
        <div>
          {item.itemType === "beverage" && (
            <>
              <p className="text-xs">
                {item.hot_cold ?? "Concentrate"}{" "}
                {inferTemperatureEmoji(
                  item?.hot_cold as "hot" | "cold",
                  item.concentrate
                )}
              </p>
              <p className="text-xs">
                {item.concentrate ? "" : `${item.sugar_level} Sugar Level`}
              </p>
              {item.roast && (
                <p className="text-xs flex gap-1">
                  {capitalize(item.roast)} Roast
                  <span>
                    <CoffeeBean
                      color={item.roast === "dark" ? "#5B4642" : "#986339"}
                      size={15}
                    />
                  </span>
                </p>
              )}
            </>
          )}
          <p className="text-xs">{item.serving}</p>
        </div>
        <div className="flex justify-center">
          <span className="text-center border border-[--gold] w-10 h-10 rounded-full flex items-center justify-center">
            {item.quantity}
          </span>
        </div>
      </div>
      <hr />
    </div>
  );
}

import { inferTemperatureEmoji } from "@lib/customer-utils";
import { ItemDetails } from "@models/Cart";

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
            </>
          )}
          <p className="text-xs">{item.serving}</p>
        </div>
        <div>
          <span className={`"line-through`}>{item.quantity}</span>
        </div>
      </div>
      <hr />
    </div>
  );
}

import Image from "next/image";
import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";

export default function ItemCard({ item }: { item: Beverage | Food }) {
  return (
    <div className="w-[150px] m-2 rounded-md">
      <div className="w-full relative pt-[100%]">
        <Image
          fill={true}
          src={item.image}
          alt={`Image of ${item.name}`}
          className="w-full h-full top-0 left-0 object-cover rounded-md"
        />
      </div>
      <div>
        <h1 className="text-gold text-bold text-italic px-2 pt-1 pb-2 text-center">
          {item.name}
        </h1>
        <p className="text-center text-xs px-2 pb-3">
          ₱ {item.variations[0].price}
        </p>
      </div>
    </div>
  );
}

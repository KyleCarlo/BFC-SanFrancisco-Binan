"use client";

import { Switch } from "@components/ui/switch";
import { FoodVariation } from "@models/Menu/Food";
import { BeverageVariation } from "@models/Menu/Beverage";
import { ItemType } from "@models/Menu";
import { useState } from "react";
import toggleAvailability from "@hooks/setItemAvailability";

export default function Availibility({
  variation,
  itemType,
}: {
  variation: FoodVariation | BeverageVariation;
  itemType: ItemType;
}) {
  const [svariations, setSVariation] = useState(variation);

  return (
    <Switch
      checked={svariations.available}
      onCheckedChange={(available) => {
        toggleAvailability(
          available,
          (svariations as FoodVariation).food_id ??
            (svariations as BeverageVariation).beverage_id,
          svariations.id,
          itemType,
          svariations,
          setSVariation
        );
      }}
    />
  );
}

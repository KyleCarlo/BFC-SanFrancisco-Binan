"use client";

import { Switch } from "@components/ui/switch";
import { MOP } from "@models/MOP";
import toggleAvailability from "@hooks/setMOPAvailability";

import { useState } from "react";

export default function Availibility({ MOP }: { MOP: MOP }) {
  const [available, setAvailable] = useState(MOP.available);

  return (
    <Switch
      checked={available}
      onCheckedChange={(available) => {
        toggleAvailability(available, MOP.id, setAvailable);
      }}
    />
  );
}

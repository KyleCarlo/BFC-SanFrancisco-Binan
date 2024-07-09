"use client";

import { useState } from "react";

export default function QuantityField() {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="flex w-full justify-center gap-5">
      <div
        className={`text-bold border-2 border-white w-7 text-center rounded-lg ${
          quantity === 0
            ? "text-gray-400 border-gray-400 cursor-not-allowed"
            : "cursor-pointer"
        }`}
        onClick={() => {
          if (quantity > 0) setQuantity(quantity - 1);
        }}
      >
        -
      </div>
      <div className="text-bold w-8 text-center">{quantity}</div>
      <div
        className="text-bold border-2 border-white w-7 text-center rounded-lg cursor-pointer"
        onClick={() => {
          setQuantity(quantity + 1);
        }}
      >
        +
      </div>
    </div>
  );
}

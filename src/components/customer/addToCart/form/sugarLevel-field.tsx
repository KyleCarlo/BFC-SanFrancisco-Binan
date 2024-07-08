import { SugarLevel } from "@models/Cart";
import { useState, useEffect, use } from "react";

import { UseFormReturn } from "react-hook-form";
import { CartItem } from "@models/Cart";

const styles = {
  wrapper: {
    border: "2px solid white",
    borderRadius: "1rem",
    height: "1.5rem",
    width: "100%",
    padding: "2.5px",
    display: "flex",
  },
  thumb_wrapper: {
    height: "100%",
    width: "calc(25% + 4.5px)",
    marginRight: "-6px",
  },
  thumb: {
    height: "100%",
    borderRadius: "1rem",
    position: "relative" as const,
    zIndex: "5",
  },
  thumb_gap: {
    backgroundColor: "black",
    height: "calc(100% + 3px)",
    borderRadius: "1rem",
    position: "relative" as const,
    bottom: "calc(100% + 1.25px)",
    left: "6px",
    marginRight: "1px",
  },
};

export default function SugarLevelField({
  form,
}: {
  form: UseFormReturn<CartItem | any | undefined>;
}) {
  const [sugarLevel, setSugarLevel] = useState<SugarLevel>(
    form.getValues("sugar_level")
  );
  const level = { "25%": 1, "50%": 2, "75%": 3, "100%": 4 };
  useEffect(() => {
    form.setValue("sugar_level", sugarLevel);
  }, [sugarLevel, form]);

  return (
    <div className="flex gap-2">
      <h1 className="text-bold text-xs text-nowrap pt-1">SUGAR LEVEL</h1>
      <div style={styles.wrapper} className="mb-5">
        <div style={styles.thumb_wrapper} className="z-40">
          <div
            style={styles.thumb}
            onClick={() => setSugarLevel("25%")}
            className="bg-white"
          ></div>
          <div style={styles.thumb_gap}></div>
          <p className="relative bottom-3 text-xs text-center">25%</p>
        </div>
        <div style={styles.thumb_wrapper} className="z-30">
          <div
            style={styles.thumb}
            onClick={() => setSugarLevel("50%")}
            className={`${level[sugarLevel] < 2 ? "bg-gray-800" : "bg-white"}`}
          ></div>
          <div style={styles.thumb_gap}></div>
          <p className="relative bottom-3 text-xs text-center">50%</p>
        </div>
        <div style={styles.thumb_wrapper} className="z-20">
          <div
            style={styles.thumb}
            className={`${level[sugarLevel] < 3 ? "bg-gray-800" : "bg-white"}`}
            onClick={() => setSugarLevel("75%")}
          ></div>
          <div style={styles.thumb_gap}></div>
          <p className="relative bottom-3 text-xs text-center">75%</p>
        </div>
        <div style={styles.thumb_wrapper} className="z-10">
          <div
            style={styles.thumb}
            className={`${level[sugarLevel] < 4 ? "bg-gray-800" : "bg-white"}`}
            onClick={() => setSugarLevel("100%")}
          ></div>
          <div style={styles.thumb_gap} className="invisible"></div>
          <p className="relative bottom-3 text-xs text-center">100%</p>
        </div>
      </div>
    </div>
  );
}

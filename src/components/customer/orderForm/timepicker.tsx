"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@components/ui/carousel";

import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

dayjs.extend(timezone);
dayjs.extend(utc);

export default function TimePicker({
  baseTime,
  currentHour,
  currentMinute,
  AMPM,
  setBaseTime,
  setCurrentHour,
  setCurrentMinute,
  setAMPM,
}: {
  baseTime: Dayjs;
  currentHour: number;
  currentMinute: number;
  AMPM: "AM" | "PM";
  setBaseTime: Dispatch<SetStateAction<Dayjs>>;
  setCurrentHour: Dispatch<SetStateAction<number>>;
  setCurrentMinute: Dispatch<SetStateAction<number>>;
  setAMPM: Dispatch<SetStateAction<"AM" | "PM">>;
}) {
  const [apiHour, setApiHour] = useState<CarouselApi>();
  const [apiMinute, setApiMinute] = useState<CarouselApi>();
  const [apiAMPM, setApiAMPM] = useState<CarouselApi>();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBaseTime(dayjs().tz("Asia/Manila"));
    }, 2000); // Update every 60000 milliseconds (1 minute)

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!apiHour) {
      return;
    }

    apiHour.scrollTo(currentHour - 1);
    setCurrentHour(apiHour.selectedScrollSnap() + 1);

    apiHour.on("select", () => {
      setCurrentHour(apiHour.selectedScrollSnap() + 1);
    });
  }, [apiHour]);

  useEffect(() => {
    if (!apiMinute) {
      return;
    }

    apiMinute.scrollTo(currentMinute);
    setCurrentMinute(apiMinute.selectedScrollSnap());

    apiMinute.on("select", () => {
      setCurrentMinute(apiMinute.selectedScrollSnap());
    });
  }, [apiMinute]);

  useEffect(() => {
    if (!apiAMPM) {
      return;
    }

    apiAMPM.scrollTo(AMPM === "AM" ? 0 : 1);
    setAMPM(AMPM);

    apiAMPM.on("select", () => {
      setAMPM(apiAMPM.selectedScrollSnap() === 0 ? "AM" : "PM");
    });
  });

  return (
    <div className="flex justify-around">
      <Carousel
        opts={{
          align: "start",
        }}
        setApi={setApiHour}
        orientation="vertical"
        className="w-[50px]"
      >
        <CarouselContent className="-mt-1 h-[50px] ">
          {Array.from({ length: 12 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pt-1 md:basis-1/2 flex justify-center items-center"
            >
              <div className="p-1">
                <span className="text-3xl font-semibold">
                  {index < 9 && "0"}
                  {index + 1}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <span className="text-3xl">:</span>
      <Carousel
        setApi={setApiMinute}
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-[50px]"
      >
        <CarouselContent className="-mt-1 h-[50px]">
          {Array.from({ length: 60 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pt-1 md:basis-1/2 flex justify-center items-center"
            >
              <div className="p-1">
                <span className="text-3xl font-semibold">
                  {index < 10 && "0"}
                  {index}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <span className="text-3xl relative top-1">|</span>
      <Carousel
        setApi={setApiAMPM}
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-[50px]"
      >
        <CarouselContent className="-mt-1 h-[50px] ">
          <CarouselItem className="pt-1 md:basis-1/2 flex justify-center">
            <div className="p-1">
              <span className="text-3xl font-semibold">AM</span>
            </div>
          </CarouselItem>
          <CarouselItem className="pt-1 md:basis-1/2 flex justify-center">
            <div className="p-1">
              <span className="text-3xl font-semibold">PM</span>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}

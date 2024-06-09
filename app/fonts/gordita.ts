import localFont from "next/font/local";

const gordita = localFont({
  src: [
    {
      path: "./Gordita-Black.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./Gordita-BlackItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "./Gordita-Bold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Gordita-BoldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./Gordita-Light.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./Gordita-LightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./Gordita-Medium.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Gordita-MediumItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Gordita-Regular.otf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "./Gordita-RegularItalic.otf",
      weight: "normal",
      style: "italic",
    },
  ],
  variable: "--gordita",
});

export default gordita;

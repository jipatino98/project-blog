import React from "react";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";

import {
  LIGHT_TOKENS,
  DARK_TOKENS,
  COLOR_THEME_COOKIE_NAME,
} from "@/constants";
import { cookies } from "next/headers";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./styles.css";
import RespectMotionPreferences from "@/components/RespectMotionPreferences/RespectMotionPreferences";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

function RootLayout({ children }) {
  const savedTheme = cookies().get(COLOR_THEME_COOKIE_NAME);
  // {name: 'color-theme', value: 'light'}
  //
  const theme = savedTheme?.value || "light";
  return (
    <RespectMotionPreferences>
      <html
        lang="en"
        className={clsx(mainFont.variable, monoFont.variable)}
        data-color-theme={theme}
        style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
      >
        <body>
          <Header initalTheme={theme} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </RespectMotionPreferences>
  );
}

export default RootLayout;

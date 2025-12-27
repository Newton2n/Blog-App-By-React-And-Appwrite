"use client"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTheme } from "@/store/themeSlice";
export default function ThemeProvider(){
    const dispatch = useDispatch()
const userLocalTheme = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  if (userLocalTheme) dispatch(setTheme("dark"));
return null
}
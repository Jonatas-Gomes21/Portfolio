"use client";

import { createContext, useContext } from "react";

/* Lista de arquivos de /public que realmente existem, calculada no servidor (app/page.tsx). */
const AssetsContext = createContext<Record<string, boolean>>({});

export const AssetsProvider = AssetsContext.Provider;

export function useAsset(path: string) {
  return useContext(AssetsContext)[path] === true;
}

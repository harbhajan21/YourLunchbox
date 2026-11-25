"use client";

import { useEffect } from "react";
import { useLunchbox } from "@/store/useLunchbox";

/** Loads the persisted store after first paint so server and client markup match. */
export function StoreHydrator() {
  useEffect(() => {
    void useLunchbox.persist.rehydrate();
  }, []);
  return null;
}

import type { AddOn } from "./types";

const photo = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const addOns: AddOn[] = [
  { id: "green-press", name: "Green Press Juice", detail: "Kale, apple, cucumber, ginger · 355 ml", category: "Juice", price: 6.49, image: photo("1610970881699-44a5587cabec") },
  { id: "citrus-press", name: "Citrus Turmeric Juice", detail: "Orange, carrot, turmeric · 355 ml", category: "Juice", price: 6.49, image: photo("1600271886742-f049cd451bba") },
  { id: "recovery-smoothies", name: "Recovery Smoothie Four-Pack", detail: "25 g protein each, four flavours", category: "Juice", price: 24.99, image: photo("1622597467836-f3285f2131b8") },
  { id: "cocoa-bites", name: "Cocoa Crunch Protein Bites", detail: "12 g protein per pair, six pieces", category: "Protein bites", price: 8.99, image: photo("1590080875515-8a3a8dc5735e") },
  { id: "strawberry-oats", name: "Strawberry Overnight Oats", detail: "22 g protein, skyr, chia · 280 g", category: "Breakfast", price: 7.49, image: photo("1488477181946-6428a0291777") },
  { id: "sparkling-adaptogen", name: "Mint Lime Adaptogen Sparkler", detail: "Ashwagandha, zero sugar · 355 ml", category: "Sparkling", price: 4.99, image: photo("1513558161293-cdaf765ed2fd") },
];

export const getAddOn = (id: string): AddOn | undefined => addOns.find((a) => a.id === id);

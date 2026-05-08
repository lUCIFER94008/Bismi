export const CATEGORIES = [
  { name: "Toys", icon: "🧸" },
  { name: "Metal Cars", icon: "🏎️" },
  { name: "Diecast Cars", icon: "🚗" },
  { name: "Stationery", icon: "📝" },
  { name: "RC Cars", icon: "🎮" },
  { name: "Watches", icon: "⌚" },
  { name: "Wall Clocks", icon: "⏰" },
  { name: "Sunglasses", icon: "🕶️" },
  { name: "Dolls", icon: "👗" },
  { name: "Balls", icon: "⚽" },
  { name: "Perfumes", icon: "🧴" },
];

export const getCategoryIcon = (name: string) => {
  return CATEGORIES.find(cat => cat.name === name)?.icon || "✨";
};

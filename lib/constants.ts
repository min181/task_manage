import { 
  Briefcase, 
  Home, 
  User, 
  ShoppingCart, 
  Book, 
  Code, 
  Heart, 
  Plane, 
  Music, 
  Coffee 
} from "lucide-react";

export const CATEGORY_COLORS = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Red", value: "#EF4444" },
  { name: "Green", value: "#10B981" },
  { name: "Yellow", value: "#F59E0B" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Gray", value: "#6B7280" },
];

export const CATEGORY_ICONS = [
  { name: "Work", value: "briefcase", icon: Briefcase },
  { name: "Home", value: "home", icon: Home },
  { name: "Personal", value: "user", icon: User },
  { name: "Shopping", value: "shopping-cart", icon: ShoppingCart },
  { name: "Study", value: "book", icon: Book },
  { name: "Project", value: "code", icon: Code },
  { name: "Health", value: "heart", icon: Heart },
  { name: "Travel", value: "plane", icon: Plane },
  { name: "Hobby", value: "music", icon: Music },
  { name: "Relax", value: "coffee", icon: Coffee },
];

export function getIconComponent(value: string) {
  const icon = CATEGORY_ICONS.find((i) => i.value === value);
  return icon ? icon.icon : Briefcase;
}

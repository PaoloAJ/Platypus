import {
  Anchor,
  ClipboardCheck,
  ClipboardList,
  Droplets,
  Home as HomeIcon,
  Leaf,
  ShieldCheck,
  SprayCan,
} from "lucide-react";

export const SERVICE_ICONS = {
  anchor: Anchor,
  home: HomeIcon,
  spray: SprayCan,
};

export const SERVICE_ICON_OPTIONS = [
  { value: "anchor", label: "Anchor (lakefront)" },
  { value: "home", label: "Home (house/roof)" },
  { value: "spray", label: "Spray can (pressure wash)" },
];

export const PROCESS_ICONS = {
  "clipboard-list": ClipboardList,
  "clipboard-check": ClipboardCheck,
  home: HomeIcon,
  leaf: Leaf,
  droplets: Droplets,
  shield: ShieldCheck,
};

export const PROCESS_ICON_OPTIONS = [
  { value: "clipboard-list", label: "Clipboard list (quote)" },
  { value: "home", label: "Home (assessment)" },
  { value: "leaf", label: "Leaf (eco)" },
  { value: "clipboard-check", label: "Clipboard check (guarantee)" },
  { value: "droplets", label: "Droplets (water)" },
  { value: "shield", label: "Shield (warranty)" },
];

export const GALLERY_CATEGORIES = [
  { id: "lakefront", label: "Lakefront & Shoreline" },
  { id: "pressure-wash", label: "Pressure Washing" },
  { id: "exterior", label: "Exterior Cleaning" },
  { id: "driveway", label: "Driveways & Patios" },
];

export const GALLERY_CATEGORY_OPTIONS = GALLERY_CATEGORIES.map((c) => ({
  value: c.id,
  label: c.label,
}));

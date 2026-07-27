import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CalendarCheck,
  Cog,
  Droplets,
  Factory,
  Gauge,
  Handshake,
  HardHat,
  Mountain,
  Package,
  Pickaxe,
  ShieldCheck,
  Shovel,
  Tractor,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";

// Structure lives here (ids, anchors, icons, images, ordering); all
// human-readable copy lives in messages/{az,en,ru}.json under matching keys.
// Service ids double as URL anchors (/services#<id>) and message keys
// (services.items.<id>), so home cards and detail sections can never drift.

export type Service = {
  id: "excavator" | "maintenance" | "hydraulics" | "engine" | "field" | "parts";
  icon: LucideIcon;
  image: string;
};

export const SERVICES: Service[] = [
  { id: "excavator", icon: Wrench, image: "/images/service-excavator.jpg" },
  { id: "maintenance", icon: CalendarCheck, image: "/images/service-maintenance.jpg" },
  { id: "hydraulics", icon: Droplets, image: "/images/service-hydraulics.jpg" },
  { id: "engine", icon: Cog, image: "/images/service-engine.jpg" },
  { id: "field", icon: Truck, image: "/images/service-field.jpg" },
  { id: "parts", icon: Package, image: "/images/service-parts.jpg" },
];

// Home "Machines We Service" tiles — copy under home.machines.items.<id>
export const MACHINES: { id: string; icon: LucideIcon }[] = [
  { id: "excavators", icon: Shovel },
  { id: "loaders", icon: Tractor },
  { id: "dozers", icon: Mountain },
  { id: "construction", icon: Building2 },
  { id: "caterpillar", icon: Cog },
  { id: "mining", icon: Pickaxe },
];

// Home "Why Choose Us" points — copy under home.whyUs.points.<id>
export const WHY_US: { id: string; icon: LucideIcon }[] = [
  { id: "technicians", icon: HardHat },
  { id: "response", icon: Zap },
  { id: "diagnostics", icon: Gauge },
  { id: "parts", icon: ShieldCheck },
  { id: "expertise", icon: Factory },
  { id: "reliability", icon: Handshake },
];

// Stats band — labels under home.stats.<id>; values are language-neutral.
// TODO: adjust the numbers to the company's real track record.
export const STATS: { id: string; value: string }[] = [
  { id: "years", value: "10+" },
  { id: "machines", value: "500+" },
  { id: "support", value: "24/7" },
  { id: "team", value: "20+" },
];

// Equipment catalog — copy under equipment.categories.<id>;
// brand names are language-neutral and stay here.
export const EQUIPMENT: { id: string; image: string; brands: string }[] = [
  {
    id: "excavators",
    image: "/images/equipment-excavator.jpg",
    brands: "Caterpillar · Komatsu · Hitachi · Volvo · Doosan · Hyundai",
  },
  {
    id: "loaders",
    image: "/images/equipment-loader.jpg",
    brands: "Caterpillar · Komatsu · Volvo · JCB · XCMG · SDLG",
  },
  {
    id: "dozers",
    image: "/images/equipment-dozer.jpg",
    brands: "Caterpillar · Komatsu · Shantui · Liebherr",
  },
  {
    id: "trucks",
    image: "/images/equipment-truck.jpg",
    brands: "Caterpillar · Komatsu · Volvo · MAN · Kamaz",
  },
];

// Machinery brands strip on the home page (references placeholder).
// TODO: replace with real customer/partner logos when available.
export const BRANDS = [
  "Caterpillar",
  "Komatsu",
  "Hitachi",
  "Volvo CE",
  "JCB",
  "Doosan",
];

// Projects gallery — captions under projects.captions.<id>
export const GALLERY: { id: string; image: string }[] = [
  { id: "g01", image: "/images/gallery-01.jpg" },
  { id: "g02", image: "/images/gallery-02.jpg" },
  { id: "g03", image: "/images/gallery-03.jpg" },
  { id: "g04", image: "/images/gallery-04.jpg" },
  { id: "g05", image: "/images/gallery-05.jpg" },
  { id: "g06", image: "/images/gallery-06.jpg" },
  { id: "g07", image: "/images/gallery-07.jpg" },
  { id: "g08", image: "/images/gallery-08.jpg" },
];

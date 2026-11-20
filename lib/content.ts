import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ClipboardCheck,
  Cog,
  Cylinder,
  Droplets,
  Fan,
  Forklift,
  Mountain,
  Package,
  Shovel,
  Tractor,
  Zap,
} from "lucide-react";

// Structure lives here (ids, anchors, icons, images, ordering); all
// human-readable copy lives in messages/{az,en,ru}.json under matching keys.
// Service ids double as URL anchors (/services#<id>) and message keys
// (services.items.<id>), so home cards and detail sections can never drift.
//
// Every photo and video on the site was shot in the Kaya Makina workshop.

export type ServiceId =
  | "engine"
  | "transmission"
  | "hydraulics"
  | "pumps"
  | "diagnostics"
  | "electrical"
  | "maintenance"
  | "parts";

export type Service = {
  id: ServiceId;
  icon: LucideIcon;
  image: string;
  /** CSS object-position for the 4:3 crop on the services page */
  position?: string;
};

export const SERVICES: Service[] = [
  { id: "engine", icon: Cylinder, image: "/images/engine-rebuilt.jpg" },
  { id: "transmission", icon: Cog, image: "/images/component-4.jpg", position: "50% 38%" },
  { id: "hydraulics", icon: Droplets, image: "/images/hydraulic-cylinder.jpg", position: "50% 30%" },
  { id: "pumps", icon: Fan, image: "/images/component-1.jpg", position: "50% 30%" },
  { id: "diagnostics", icon: Activity, image: "/images/diagnostics.jpg", position: "80% 50%" },
  { id: "electrical", icon: Zap, image: "/images/engine-wiring.jpg" },
  { id: "maintenance", icon: ClipboardCheck, image: "/images/workshop-floor.jpg" },
  { id: "parts", icon: Package, image: "/images/workshop-hall.jpg", position: "70% 60%" },
];

// Hero "data plate" — copy under home.plate.items.<id>.{label,value}
export const PLATE = ["workshop", "repair", "diagnostics", "parts"] as const;

// Home "From diagnosis to test run" — copy under home.process.steps.<id>.
// The last step plays a short muted loop of an engine on the test stand.
export const PROCESS: {
  id: "diagnosis" | "teardown" | "rebuild" | "test";
  image: string;
  position?: string;
  video?: string;
}[] = [
  { id: "diagnosis", image: "/images/diagnostics.jpg", position: "92% 50%" },
  { id: "teardown", image: "/images/block-liners.jpg", position: "76% 50%" },
  { id: "rebuild", image: "/images/crankshaft.jpg" },
  {
    id: "test",
    image: "/images/test-run-poster.jpg",
    video: "/video/test-run-loop.mp4",
    position: "34% 50%",
  },
];

// Machine types — copy under home.machines.items.<id> (short label) and
// equipment.categories.<id> (name, description, services).
export const MACHINES: { id: "excavators" | "loaders" | "dozers" | "other"; icon: LucideIcon }[] = [
  { id: "excavators", icon: Shovel },
  { id: "loaders", icon: Tractor },
  { id: "dozers", icon: Mountain },
  { id: "other", icon: Forklift },
];

// Workshop gallery — captions under gallery.captions.<id>.
// Width/height are the real pixel sizes, so the masonry never shifts.
export const GALLERY: { id: string; w: number; h: number }[] = [
  { id: "workshop-floor", w: 1108, h: 739 },
  { id: "engine-front", w: 739, h: 924 },
  { id: "block-liners", w: 1108, h: 739 },
  { id: "crankshaft", w: 739, h: 924 },
  { id: "pistons-rods", w: 1108, h: 739 },
  { id: "engine-rebuilt", w: 975, h: 650 },
  { id: "overhead-crane", w: 1108, h: 739 },
  { id: "cylinder-bores", w: 739, h: 924 },
  { id: "teardown-parts", w: 1108, h: 739 },
  { id: "component-1", w: 739, h: 924 },
  { id: "workshop-hall", w: 1108, h: 739 },
  { id: "engine-flywheel", w: 739, h: 924 },
  { id: "block-pistons", w: 1108, h: 739 },
  { id: "hydraulic-cylinder", w: 1108, h: 739 },
  { id: "component-4", w: 739, h: 924 },
  { id: "teardown-block", w: 1108, h: 739 },
  { id: "engine-hall", w: 739, h: 924 },
  { id: "diagnostics", w: 854, h: 480 },
  { id: "yard", w: 900, h: 600 },
  { id: "component-3", w: 739, h: 924 },
  { id: "engine-dismantled", w: 1108, h: 739 },
  { id: "yard-crane", w: 739, h: 985 },
  { id: "test-run-start", w: 854, h: 480 },
];

// Full test-run clip shown on the gallery page.
export const TEST_RUN_VIDEO = {
  src: "/video/test-run.mp4",
  poster: "/images/test-run-poster.jpg",
};

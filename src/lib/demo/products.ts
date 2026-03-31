export interface DemoProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  artist: string;
  category:
    | "Painting"
    | "Ceramics"
    | "Jewelry"
    | "Textiles"
    | "Sculpture"
    | "Photography"
    | "Mixed Media";
  medium: string;
  dimensions: string;
  price: number;
  images: string[];
  available: boolean;
  createdAt: string;
}

export const demoProducts: DemoProduct[] = [
  {
    id: "prod-001",
    handle: "morning-light-on-the-blue-ridge",
    title: "Morning Light on the Blue Ridge",
    description:
      "Soft golden light spills across layered mountain ridges in this contemplative landscape. Painted en plein air from a overlook near the Blue Ridge Parkway, this piece captures the fleeting warmth of an early autumn sunrise.",
    artist: "Margaret Chen",
    category: "Painting",
    medium: "Oil on linen canvas",
    dimensions: '30" x 40"',
    price: 1200,
    images: [
      "https://picsum.photos/seed/blueridge-morning/800/1000",
      "https://picsum.photos/seed/blueridge-morning2/800/1000",
    ],
    available: true,
    createdAt: "2025-11-15T10:00:00Z",
  },
  {
    id: "prod-002",
    handle: "carved-stoneware-vessel",
    title: "Carved Stoneware Vessel",
    description:
      "A generous, round-bellied vessel with deep carved lines that trace the form like contour lines on a map. Wood-fired for four days in an anagama kiln, the ash glaze has settled into rich amber and moss tones that shift in different light.",
    artist: "Thomas Blackwood",
    category: "Ceramics",
    medium: "Wood-fired stoneware",
    dimensions: '12" H x 9" W',
    price: 340,
    images: [
      "https://picsum.photos/seed/stoneware-vessel/800/1000",
      "https://picsum.photos/seed/stoneware-vessel2/800/1000",
    ],
    available: true,
    createdAt: "2025-12-03T10:00:00Z",
  },
  {
    id: "prod-003",
    handle: "hand-forged-silver-leaf-earrings",
    title: "Hand-Forged Silver Leaf Earrings",
    description:
      "Delicate sterling silver earrings shaped into gently curving leaf forms. Each pair is hand-forged and lightly hammered to catch the light, finished with a brushed satin patina. Comfortable for all-day wear.",
    artist: "Sarah Riddle",
    category: "Jewelry",
    medium: "Sterling silver",
    dimensions: '1.5" drop',
    price: 85,
    images: [
      "https://picsum.photos/seed/silver-leaf-earrings/800/1000",
      "https://picsum.photos/seed/silver-leaf-earrings2/800/1000",
    ],
    available: true,
    createdAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "prod-004",
    handle: "fog-in-the-valley",
    title: "Fog in the Valley",
    description:
      "A moody, atmospheric painting of morning fog pooling in a mountain valley below Craggy Gardens. Cool blues and grays dissolve into warm undertones as the mist begins to lift, revealing the dark shapes of evergreens below.",
    artist: "Margaret Chen",
    category: "Painting",
    medium: "Oil on canvas",
    dimensions: '24" x 36"',
    price: 950,
    images: [
      "https://picsum.photos/seed/fog-valley/800/1000",
      "https://picsum.photos/seed/fog-valley2/800/1000",
    ],
    available: true,
    createdAt: "2025-10-22T10:00:00Z",
  },
  {
    id: "prod-005",
    handle: "woven-ridge-wall-hanging",
    title: "Woven Ridge Wall Hanging",
    description:
      "An intricately hand-woven wall piece inspired by the layered ridgelines visible from the Appalachian Trail. Natural indigo and walnut-dyed wool yarns create a gradient from deep navy to warm brown, evoking dusk settling over the mountains.",
    artist: "Nora Pemberton",
    category: "Textiles",
    medium: "Hand-dyed wool on maple dowel",
    dimensions: '28" W x 36" H',
    price: 680,
    images: [
      "https://picsum.photos/seed/woven-ridge/800/1000",
      "https://picsum.photos/seed/woven-ridge2/800/1000",
    ],
    available: true,
    createdAt: "2025-12-18T10:00:00Z",
  },
  {
    id: "prod-006",
    handle: "tobacco-barn-in-winter",
    title: "Tobacco Barn in Winter",
    description:
      "A stark, quietly beautiful photograph of a weathered tobacco barn standing alone in a snow-covered Madison County field. Printed by hand on silver gelatin paper, the rich tonal range captures every plank and shadow with remarkable clarity.",
    artist: "James Whitfield",
    category: "Photography",
    medium: "Silver gelatin print",
    dimensions: '16" x 20", unframed',
    price: 450,
    images: [
      "https://picsum.photos/seed/tobacco-barn/800/1000",
      "https://picsum.photos/seed/tobacco-barn2/800/1000",
    ],
    available: true,
    createdAt: "2025-11-30T10:00:00Z",
  },
  {
    id: "prod-007",
    handle: "roots-and-remembrance",
    title: "Roots and Remembrance",
    description:
      "A layered mixed media piece combining hand-dyed cotton, beeswax encaustic, and pressed botanical specimens gathered from the artist's garden. The work explores themes of memory, migration, and the way landscape becomes part of who we are.",
    artist: "Elena Vasquez",
    category: "Mixed Media",
    medium: "Encaustic, fiber, and botanicals on panel",
    dimensions: '24" x 24"',
    price: 875,
    images: [
      "https://picsum.photos/seed/roots-remembrance/800/1000",
      "https://picsum.photos/seed/roots-remembrance2/800/1000",
    ],
    available: true,
    createdAt: "2026-01-05T10:00:00Z",
  },
  {
    id: "prod-008",
    handle: "yunomi-tea-cup-set",
    title: "Yunomi Tea Cup Set",
    description:
      "A set of four wood-fired yunomi tea cups, each one unique. The natural ash glaze creates a palette of warm earth tones — honey, slate, and umber — that make every cup in the set a quiet discovery. Perfectly sized for daily use.",
    artist: "Thomas Blackwood",
    category: "Ceramics",
    medium: "Wood-fired stoneware",
    dimensions: '3.5" H x 3" W each',
    price: 180,
    images: [
      "https://picsum.photos/seed/yunomi-set/800/1000",
      "https://picsum.photos/seed/yunomi-set2/800/1000",
    ],
    available: true,
    createdAt: "2026-02-14T10:00:00Z",
  },
  {
    id: "prod-009",
    handle: "river-stone-cuff-bracelet",
    title: "River Stone Cuff Bracelet",
    description:
      "A bold, sculptural cuff bracelet in oxidized sterling silver, set with a smooth river stone collected from the banks of the French Broad. The band is hand-forged with a subtle hammered texture that catches light beautifully.",
    artist: "Sarah Riddle",
    category: "Jewelry",
    medium: "Oxidized sterling silver and river stone",
    dimensions: '1.25" W, adjustable',
    price: 265,
    images: [
      "https://picsum.photos/seed/river-cuff/800/1000",
      "https://picsum.photos/seed/river-cuff2/800/1000",
    ],
    available: true,
    createdAt: "2026-01-28T10:00:00Z",
  },
  {
    id: "prod-010",
    handle: "the-old-bridge-at-hot-springs",
    title: "The Old Bridge at Hot Springs",
    description:
      "The iron truss bridge at Hot Springs, NC stands in quiet silhouette against a pale winter sky. This hand-printed silver gelatin photograph invites the viewer to pause and consider the structures we build and the landscapes that outlast them.",
    artist: "James Whitfield",
    category: "Photography",
    medium: "Silver gelatin print",
    dimensions: '20" x 24", unframed',
    price: 525,
    images: [
      "https://picsum.photos/seed/hotsprings-bridge/800/1000",
      "https://picsum.photos/seed/hotsprings-bridge2/800/1000",
    ],
    available: false,
    createdAt: "2025-09-12T10:00:00Z",
  },
  {
    id: "prod-011",
    handle: "autumn-fire-triptych",
    title: "Autumn Fire Triptych",
    description:
      "Three panels of blazing fall color, painted from the same vantage point on three consecutive October mornings. Cadmium reds, burnt sienna, and gold ochre ignite against cool blue-gray distance. A signature piece that anchors any room.",
    artist: "Margaret Chen",
    category: "Painting",
    medium: "Oil on canvas, three panels",
    dimensions: '36" x 72" total (three 36" x 24" panels)',
    price: 2400,
    images: [
      "https://picsum.photos/seed/autumn-triptych/800/1000",
      "https://picsum.photos/seed/autumn-triptych2/800/1000",
    ],
    available: true,
    createdAt: "2025-10-01T10:00:00Z",
  },
  {
    id: "prod-012",
    handle: "nesting-forms-fiber-sculpture",
    title: "Nesting Forms",
    description:
      "A freestanding fiber sculpture composed of three coiled and stitched vessels that nest inside one another. Made from hand-spun wool dyed with black walnut and goldenrod foraged near the artist's Black Mountain studio.",
    artist: "Nora Pemberton",
    category: "Sculpture",
    medium: "Hand-spun and naturally dyed wool",
    dimensions: '14" H x 10" W (outer form)',
    price: 520,
    images: [
      "https://picsum.photos/seed/nesting-forms/800/1000",
      "https://picsum.photos/seed/nesting-forms2/800/1000",
    ],
    available: true,
    createdAt: "2026-02-20T10:00:00Z",
  },
  {
    id: "prod-013",
    handle: "between-two-worlds",
    title: "Between Two Worlds",
    description:
      "A striking wall-mounted mixed media assemblage that combines hand-woven Colombian chumbe textile fragments with Appalachian sourced birch bark and encaustic medium. The piece speaks to the artist's experience of holding two homelands at once.",
    artist: "Elena Vasquez",
    category: "Mixed Media",
    medium: "Textile, birch bark, and encaustic on panel",
    dimensions: '30" x 20"',
    price: 1100,
    images: [
      "https://picsum.photos/seed/between-worlds/800/1000",
      "https://picsum.photos/seed/between-worlds2/800/1000",
    ],
    available: true,
    createdAt: "2026-03-01T10:00:00Z",
  },
  {
    id: "prod-014",
    handle: "turquoise-stacking-ring-set",
    title: "Turquoise Stacking Ring Set",
    description:
      "A set of three slender sterling silver stacking rings, one set with a small bezel-mounted turquoise stone. Designed to be worn together or separately, each ring is hand-forged with a slightly organic, imperfect quality that makes it unmistakably handmade.",
    artist: "Sarah Riddle",
    category: "Jewelry",
    medium: "Sterling silver and turquoise",
    dimensions: "Available in sizes 5-9",
    price: 45,
    images: [
      "https://picsum.photos/seed/turquoise-rings/800/1000",
      "https://picsum.photos/seed/turquoise-rings2/800/1000",
    ],
    available: true,
    createdAt: "2026-03-10T10:00:00Z",
  },
];

export interface DemoArtist {
  id: string;
  name: string;
  slug: string;
  bio: string;
  headshot: string;
  shopifyVendorTag: string;
  website?: string;
  instagram?: string;
}

export const demoArtists: DemoArtist[] = [
  {
    id: "artist-001",
    name: "Margaret Chen",
    slug: "margaret-chen",
    bio: "Margaret Chen has been painting the landscapes of Western North Carolina for over two decades. Her luminous oil paintings capture the quiet drama of mountain light, drawing collectors from across the Southeast. She works from a sun-filled studio overlooking the French Broad River.",
    headshot: "https://picsum.photos/seed/margaret-chen/400/400",
    shopifyVendorTag: "margaret-chen",
    website: "https://margaretchenart.com",
    instagram: "margaretchenart",
  },
  {
    id: "artist-002",
    name: "Thomas Blackwood",
    slug: "thomas-blackwood",
    bio: "Thomas Blackwood is a wood-fire ceramicist whose work is deeply rooted in the Appalachian pottery tradition. He fires his pieces in a hand-built anagama kiln outside Marshall, NC, where each firing lasts four days. His vessels celebrate the unpredictable beauty of ash glaze and open flame.",
    headshot: "https://picsum.photos/seed/thomas-blackwood/400/400",
    shopifyVendorTag: "thomas-blackwood",
    instagram: "blackwood.ceramics",
  },
  {
    id: "artist-003",
    name: "Sarah Riddle",
    slug: "sarah-riddle",
    bio: "Sarah Riddle is a metalsmith and jewelry designer based in Weaverville, NC. Trained at Penland School of Craft, she hand-forges each piece using traditional silversmithing techniques and locally sourced stones. Her work explores the intersection of organic forms and precise craftsmanship.",
    headshot: "https://picsum.photos/seed/sarah-riddle/400/400",
    shopifyVendorTag: "sarah-riddle",
    website: "https://sarahriddle.studio",
    instagram: "sarahriddle.studio",
  },
  {
    id: "artist-004",
    name: "Elena Vasquez",
    slug: "elena-vasquez",
    bio: "Elena Vasquez creates richly layered mixed media works that weave together textile traditions from her Colombian heritage with the natural forms of the Southern Appalachians. Her wall pieces and sculptures incorporate hand-dyed fibers, found objects, and encaustic wax. She has exhibited throughout the Southeast and teaches workshops at regional craft schools.",
    headshot: "https://picsum.photos/seed/elena-vasquez/400/400",
    shopifyVendorTag: "elena-vasquez",
    instagram: "elenavasquezart",
  },
  {
    id: "artist-005",
    name: "James Whitfield",
    slug: "james-whitfield",
    bio: "James Whitfield is a fine art photographer who documents the vanishing rural landscapes of the Blue Ridge. Working exclusively in black and white, he prints each image by hand in his Asheville darkroom using archival silver gelatin processes. His photographs are held in private collections across the country.",
    headshot: "https://picsum.photos/seed/james-whitfield/400/400",
    shopifyVendorTag: "james-whitfield",
    website: "https://jameswhitfieldphoto.com",
    instagram: "jwhitfield.photo",
  },
  {
    id: "artist-006",
    name: "Nora Pemberton",
    slug: "nora-pemberton",
    bio: "Nora Pemberton is a sculptor and textile artist whose work draws on the rich weaving heritage of the Appalachian mountains. She creates large-scale fiber installations and intimate hand-woven wall pieces from her studio in Black Mountain. Her practice is grounded in natural dyes foraged from the surrounding forests.",
    headshot: "https://picsum.photos/seed/nora-pemberton/400/400",
    shopifyVendorTag: "nora-pemberton",
    instagram: "norapemberton.fiber",
  },
];

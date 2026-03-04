import { getSupabasePublicUrl } from "@/lib/supabaseStorage";

export interface ProjectReferenceImage {
  src: string;
  alt: string;
  caption?: string;
}

export type ProjectDetailBlock =
  | {
      id: string;
      type: "text";
      title: string;
      body: string[];
    }
  | {
      id: string;
      type: "image";
      title?: string;
      image: ProjectReferenceImage;
    }
  | {
      id: string;
      type: "gallery";
      title: string;
      description?: string;
      images: ProjectReferenceImage[];
    };

export interface Project {
  id: string;
  videoUrl: string;
  posterUrl: string;
  title: string;
  description: string;
  category: string;
  tools: string[];
  detailBlocks: ProjectDetailBlock[];
}

const resolveUrl = (envUrl: string | undefined, fallbackAssetPath: string) => {
  return envUrl?.trim() || getSupabasePublicUrl(fallbackAssetPath);
};

const createReferenceGallery = (title: string, posterUrl: string): ProjectDetailBlock => ({
  id: "reference-gallery",
  type: "gallery",
  title: "Reference Frames",
  description:
    "Replace these starter frames with WIP stills, clay renders, breakdown images, or mood references.",
  images: [
    {
      src: posterUrl,
      alt: `${title} hero frame reference`,
      caption: "Hero frame",
    },
    {
      src: posterUrl,
      alt: `${title} lighting reference frame`,
      caption: "Lighting reference",
    },
    {
      src: posterUrl,
      alt: `${title} detail reference frame`,
      caption: "Detail pass",
    },
  ],
});

const neonGenesisPoster = resolveUrl(import.meta.env.VITE_PROJECT_POSTER_1_URL, "posters/neon-genesis.jpg");
const mechanicalHeartPoster = resolveUrl(import.meta.env.VITE_PROJECT_POSTER_2_URL, "posters/mechanical-heart.jpg");
const ancientRuinsPoster = resolveUrl(import.meta.env.VITE_PROJECT_POSTER_3_URL, "posters/ancient-ruins.jpg");
const characterRigPoster = resolveUrl(import.meta.env.VITE_PROJECT_POSTER_4_URL, "posters/character-rig-demo.jpg");
const fluidSimulationPoster = resolveUrl(import.meta.env.VITE_PROJECT_POSTER_5_URL, "posters/fluid-simulation.jpg");
const abstractMotionPoster = resolveUrl(import.meta.env.VITE_PROJECT_POSTER_6_URL, "posters/abstract-motion.jpg");

export const projects: Project[] = [
  {
    id: "1",
    videoUrl: resolveUrl(import.meta.env.VITE_PROJECT_VIDEO_1_URL, "work/neon-genesis.mp4"),
    posterUrl: neonGenesisPoster,
    title: "Neon Genesis",
    description: "A cyberpunk cityscape rendered in real-time. Exploring volumetric lighting and atmospheric fog to create a moody, rain-soaked metropolis.",
    category: "Environment",
    tools: ["Blender", "Unreal Engine"],
    detailBlocks: [
      {
        id: "direction",
        type: "text",
        title: "Creative Direction",
        body: [
          "The scene was built around high-contrast urban lighting and deep perspective layers to sell city scale.",
          "Rain streaks, volumetric fog, and emissive signage were balanced to keep the focal lane readable without losing mood.",
        ],
      },
      createReferenceGallery("Neon Genesis", neonGenesisPoster),
      {
        id: "notes",
        type: "text",
        title: "Iteration Notes",
        body: [
          "Add your shot-by-shot notes here, including camera lens values and post-process tweaks.",
          "You can keep expanding this block list with additional text and image entries as references grow.",
        ],
      },
    ],
  },
  {
    id: "2",
    videoUrl: resolveUrl(import.meta.env.VITE_PROJECT_VIDEO_2_URL, "work/mechanical-heart.mp4"),
    posterUrl: mechanicalHeartPoster,
    title: "Mechanical Heart",
    description: "An intricate mechanical heart animation showcasing hard-surface modeling techniques and procedural texturing.",
    category: "Animation",
    tools: ["Maya", "Substance Painter"],
    detailBlocks: [
      {
        id: "direction",
        type: "text",
        title: "Creative Direction",
        body: [
          "The animation emphasizes layered mechanisms with asynchronous timing to avoid robotic uniformity.",
          "Material breakup relied on roughness variation and edge wear to push believable scale.",
        ],
      },
      createReferenceGallery("Mechanical Heart", mechanicalHeartPoster),
      {
        id: "notes",
        type: "text",
        title: "Iteration Notes",
        body: [
          "Track rig changes, constraint decisions, and export settings in this section.",
          "Add more reference images below for topology snapshots and texture pass comparisons.",
        ],
      },
    ],
  },
  {
    id: "3",
    videoUrl: resolveUrl(import.meta.env.VITE_PROJECT_VIDEO_3_URL, "work/ancient-ruins.mp4"),
    posterUrl: ancientRuinsPoster,
    title: "Ancient Ruins",
    description: "Photorealistic ancient temple ruins overgrown with vegetation. Focus on photogrammetry and PBR materials.",
    category: "Environment",
    tools: ["Blender", "Quixel Mixer"],
    detailBlocks: [
      {
        id: "direction",
        type: "text",
        title: "Creative Direction",
        body: [
          "This project targets grounded realism by blending scanned assets with hand-authored terrain dressing.",
          "Vegetation density and moss masks were tuned to lead the eye through the temple path.",
        ],
      },
      createReferenceGallery("Ancient Ruins", ancientRuinsPoster),
      {
        id: "notes",
        type: "text",
        title: "Iteration Notes",
        body: [
          "Use this area for biomes, decal sets, and material variant notes.",
          "Append extra text/image blocks whenever you want to preserve breakdowns for future revisions.",
        ],
      },
    ],
  },
  {
    id: "4",
    videoUrl: resolveUrl(import.meta.env.VITE_PROJECT_VIDEO_4_URL, "work/character-rig-demo.mp4"),
    posterUrl: characterRigPoster,
    title: "Character Rig Demo",
    description: "Full character rigging and animation cycle demonstration with IK/FK blending and facial expressions.",
    category: "Character",
    tools: ["Maya", "ZBrush"],
    detailBlocks: [
      {
        id: "direction",
        type: "text",
        title: "Creative Direction",
        body: [
          "The rig prioritizes animator-friendly controls, especially in shoulder deformation and facial expression arcs.",
          "Clean hierarchy and naming conventions were kept strict for retargeting and rapid shot setup.",
        ],
      },
      createReferenceGallery("Character Rig Demo", characterRigPoster),
      {
        id: "notes",
        type: "text",
        title: "Iteration Notes",
        body: [
          "Capture solver edge cases and skinning fixes here for future rig versions.",
          "Drop in viewport captures and control-rig screenshots as additional image blocks.",
        ],
      },
    ],
  },
  {
    id: "5",
    videoUrl: resolveUrl(import.meta.env.VITE_PROJECT_VIDEO_5_URL, "work/fluid-simulation.mp4"),
    posterUrl: fluidSimulationPoster,
    title: "Fluid Simulation",
    description: "FLIP fluid simulation interacting with rigid bodies. High-resolution water splashing across geometric shapes.",
    category: "VFX",
    tools: ["Houdini", "Blender"],
    detailBlocks: [
      {
        id: "direction",
        type: "text",
        title: "Creative Direction",
        body: [
          "The simulation was art-directed to retain energetic splash silhouettes while controlling solver noise.",
          "Secondary droplets and foam were introduced in stages so each pass stayed tunable.",
        ],
      },
      createReferenceGallery("Fluid Simulation", fluidSimulationPoster),
      {
        id: "notes",
        type: "text",
        title: "Iteration Notes",
        body: [
          "Use this section to log cache versions, particle counts, and meshing thresholds.",
          "Add comparison stills from low-res and final sims so future optimizations are easier.",
        ],
      },
    ],
  },
  {
    id: "6",
    videoUrl: resolveUrl(import.meta.env.VITE_PROJECT_VIDEO_6_URL, "work/abstract-motion.mp4"),
    posterUrl: abstractMotionPoster,
    title: "Abstract Motion",
    description: "Procedurally generated abstract forms driven by audio-reactive parameters. Exploring the boundary between art and code.",
    category: "Motion Graphics",
    tools: ["Cinema 4D", "After Effects"],
    detailBlocks: [
      {
        id: "direction",
        type: "text",
        title: "Creative Direction",
        body: [
          "This piece explores audio-to-visual translation using modular timing systems and procedural offsets.",
          "The composition leans on rhythm continuity while varying form language across bars.",
        ],
      },
      createReferenceGallery("Abstract Motion", abstractMotionPoster),
      {
        id: "notes",
        type: "text",
        title: "Iteration Notes",
        body: [
          "Add parameter snapshots, beat-map notes, and render settings here for repeatability.",
          "You can keep extending the detail blocks with additional references as the project evolves.",
        ],
      },
    ],
  },
];

export const skills = [
  { name: "Blender", level: 95 },
  { name: "Maya", level: 88 },
  { name: "Unreal Engine", level: 82 },
  { name: "ZBrush", level: 78 },
  { name: "Substance Painter", level: 85 },
  { name: "Houdini", level: 70 },
  { name: "After Effects", level: 75 },
  { name: "Cinema 4D", level: 72 },
];

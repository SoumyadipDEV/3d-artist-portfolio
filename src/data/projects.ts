import { getSupabasePublicUrl } from "@/lib/supabaseStorage";

export interface Project {
  id: string;
  videoUrl: string;
  posterUrl: string;
  title: string;
  description: string;
  category: string;
  tools: string[];
}

const resolveUrl = (envUrl: string | undefined, fallbackAssetPath: string) => {
  return envUrl?.trim() || getSupabasePublicUrl(fallbackAssetPath);
};

export const projects: Project[] = [
  {
    id: "1",
    videoUrl: resolveUrl(import.meta.env.VITE_PROJECT_VIDEO_1_URL, "work/neon-genesis.mp4"),
    posterUrl: resolveUrl(import.meta.env.VITE_PROJECT_POSTER_1_URL, "posters/neon-genesis.jpg"),
    title: "Neon Genesis",
    description: "A cyberpunk cityscape rendered in real-time. Exploring volumetric lighting and atmospheric fog to create a moody, rain-soaked metropolis.",
    category: "Environment",
    tools: ["Blender", "Unreal Engine"],
  },
  {
    id: "2",
    videoUrl: resolveUrl(import.meta.env.VITE_PROJECT_VIDEO_2_URL, "work/mechanical-heart.mp4"),
    posterUrl: resolveUrl(import.meta.env.VITE_PROJECT_POSTER_2_URL, "posters/mechanical-heart.jpg"),
    title: "Mechanical Heart",
    description: "An intricate mechanical heart animation showcasing hard-surface modeling techniques and procedural texturing.",
    category: "Animation",
    tools: ["Maya", "Substance Painter"],
  },
  {
    id: "3",
    videoUrl: resolveUrl(import.meta.env.VITE_PROJECT_VIDEO_3_URL, "work/ancient-ruins.mp4"),
    posterUrl: resolveUrl(import.meta.env.VITE_PROJECT_POSTER_3_URL, "posters/ancient-ruins.jpg"),
    title: "Ancient Ruins",
    description: "Photorealistic ancient temple ruins overgrown with vegetation. Focus on photogrammetry and PBR materials.",
    category: "Environment",
    tools: ["Blender", "Quixel Mixer"],
  },
  {
    id: "4",
    videoUrl: resolveUrl(import.meta.env.VITE_PROJECT_VIDEO_4_URL, "work/character-rig-demo.mp4"),
    posterUrl: resolveUrl(import.meta.env.VITE_PROJECT_POSTER_4_URL, "posters/character-rig-demo.jpg"),
    title: "Character Rig Demo",
    description: "Full character rigging and animation cycle demonstration with IK/FK blending and facial expressions.",
    category: "Character",
    tools: ["Maya", "ZBrush"],
  },
  {
    id: "5",
    videoUrl: resolveUrl(import.meta.env.VITE_PROJECT_VIDEO_5_URL, "work/fluid-simulation.mp4"),
    posterUrl: resolveUrl(import.meta.env.VITE_PROJECT_POSTER_5_URL, "posters/fluid-simulation.jpg"),
    title: "Fluid Simulation",
    description: "FLIP fluid simulation interacting with rigid bodies. High-resolution water splashing across geometric shapes.",
    category: "VFX",
    tools: ["Houdini", "Blender"],
  },
  {
    id: "6",
    videoUrl: resolveUrl(import.meta.env.VITE_PROJECT_VIDEO_6_URL, "work/abstract-motion.mp4"),
    posterUrl: resolveUrl(import.meta.env.VITE_PROJECT_POSTER_6_URL, "posters/abstract-motion.jpg"),
    title: "Abstract Motion",
    description: "Procedurally generated abstract forms driven by audio-reactive parameters. Exploring the boundary between art and code.",
    category: "Motion Graphics",
    tools: ["Cinema 4D", "After Effects"],
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

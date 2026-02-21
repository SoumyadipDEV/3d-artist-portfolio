export interface Project {
  id: string;
  driveFileId: string;
  title: string;
  description: string;
  category: string;
  tools: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    driveFileId: "1pQLML8Iy9Dgb_chNEb3Ve8ybQxnAgJdY",
    title: "Neon Genesis",
    description: "A cyberpunk cityscape rendered in real-time. Exploring volumetric lighting and atmospheric fog to create a moody, rain-soaked metropolis.",
    category: "Environment",
    tools: ["Blender", "Unreal Engine"],
  },
  {
    id: "2",
    driveFileId: "1ofIUyPW3_iIchWCi5sWo1M3hbF08f_qd",
    title: "Mechanical Heart",
    description: "An intricate mechanical heart animation showcasing hard-surface modeling techniques and procedural texturing.",
    category: "Animation",
    tools: ["Maya", "Substance Painter"],
  },
  {
    id: "3",
    driveFileId: "1nkCYE9PtbLJT-VD3aaJs3dqrWAydtWmc",
    title: "Ancient Ruins",
    description: "Photorealistic ancient temple ruins overgrown with vegetation. Focus on photogrammetry and PBR materials.",
    category: "Environment",
    tools: ["Blender", "Quixel Mixer"],
  },
  {
    id: "4",
    driveFileId: "1ynL9MBvqyxVeioGpClwAi1edwAYYoB67",
    title: "Character Rig Demo",
    description: "Full character rigging and animation cycle demonstration with IK/FK blending and facial expressions.",
    category: "Character",
    tools: ["Maya", "ZBrush"],
  },
  {
    id: "5",
    driveFileId: "1m_o2uZlceTIXHnXit1zoBnIGLhHInoO_",
    title: "Fluid Simulation",
    description: "FLIP fluid simulation interacting with rigid bodies. High-resolution water splashing across geometric shapes.",
    category: "VFX",
    tools: ["Houdini", "Blender"],
  },
  {
    id: "6",
    driveFileId: "6FgH_iJkLmNoPqRsTuVwXyZaBcDe",
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

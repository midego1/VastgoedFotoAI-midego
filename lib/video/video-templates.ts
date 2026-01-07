import type { VideoRoomType } from "@/lib/db/schema"

export interface VideoTemplateSlot {
  roomType: VideoRoomType
  label: string
  description?: string
  icon?: string // Optional icon override
  placeholderImage?: string // URL to example image for this slot
}

export interface VideoTemplate {
  id: string
  name: string
  description: string
  thumbnailUrl: string
  previewVideoUrl?: string // For hover autoplay
  slots: VideoTemplateSlot[]
  defaultMusicTrackId?: string
  estimatedDuration: number // in seconds
}

export const VIDEO_TEMPLATES: VideoTemplate[] = [
  {
    id: "classic-tour",
    name: "Classic Home Tour",
    description: "A comprehensive walkthrough perfect for most residential properties.",
    thumbnailUrl: "https://images.unsplash.com/photo-1600596542815-22b5c1221b8a?w=800&q=80", // Placeholder
    previewVideoUrl: "https://cdn.coverr.co/videos/coverr-interior-design-living-room-2646/1080p.mp4", // Placeholder
    estimatedDuration: 35,
    slots: [
      {
        roomType: "exterior-front",
        label: "Front Exterior",
        description: "The hero shot of the home from the street",
      },
      {
        roomType: "entryway",
        label: "Entryway",
        description: "Welcome viewers into the home",
      },
      {
        roomType: "living-room",
        label: "Living Room",
        description: "The main gathering space",
      },
      {
        roomType: "kitchen",
        label: "Kitchen",
        description: "Show off the heart of the home",
      },
      {
        roomType: "dining-room",
        label: "Dining Room",
        description: "Where meals are shared",
      },
      {
        roomType: "bedroom",
        label: "Primary Bedroom",
        description: "A relaxing retreat",
      },
      {
        roomType: "bathroom",
        label: "Primary Bathroom",
        description: "Spa-like features",
      },
      {
        roomType: "exterior-back",
        label: "Backyard / Patio",
        description: "Outdoor living space",
      },
    ],
  },
  {
    id: "highlight-reel",
    name: "Quick Highlights",
    description: "Fast-paced teaser focusing on the property's best features.",
    thumbnailUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", // Placeholder
    previewVideoUrl: "https://coverr.co/videos/ground-floor-of-a-house-lh10imqcar", // Placeholder
    estimatedDuration: 20,
    slots: [
      {
        roomType: "exterior-front",
        label: "Exterior",
        description: "Catch attention immediately",
      },
      {
        roomType: "living-room",
        label: "Living Space",
        description: "The most impressive room",
      },
      {
        roomType: "kitchen",
        label: "Kitchen",
        description: "Modern appliances and finishes",
      },
      {
        roomType: "bedroom",
        label: "Bedroom",
        description: "Comfort and style",
      },
    ],
  },
]

export function getVideoTemplateById(id: string): VideoTemplate | undefined {
  return VIDEO_TEMPLATES.find((t) => t.id === id)
}

import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Old Venetian Port of Chania - Visitor Guide & Location',
    short_name: 'Chania Old Port',
    description:
      'Visitor guide to the Old Venetian Port of Chania, the iconic historic harbor in Chania, Crete, Greece.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#faf8f4',
    theme_color: '#3a7a8d',
    icons: [
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}

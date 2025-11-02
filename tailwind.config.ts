import type { Config } from 'tailwindcss';

const config = {
     content: [
          './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
          './src/components/**/*.{js,ts,jsx,tsx,mdx}',
          './src/app/**/*.{js,ts,jsx,tsx,mdx}',
     ],
     theme: {
          extend: {
               colors: {
                    primary: {
                         '0': '#91926d',
                         '10': '#838362',
                         '20': '#747557',
                         '30': '#66664c',
                         '40': '#575841',
                         '50': '#494937',
                         '60': '#3a3a2c',
                         '70': '#2b2c21',
                         '80': '#1d1d16',
                         '90': '#0e0f0b',
                         '100': '#000000',
                    },
               },
               fontFamily: {
                    cinzel: ['Cinzel', 'serif'],
                    'cinzel-decorative': ['Cinzel Decorative', 'serif'],
               },
          },
     },
     plugins: [],
} satisfies Config;

export default config;

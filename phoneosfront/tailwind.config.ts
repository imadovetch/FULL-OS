import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'dark': 'var(--dark)',
        'dark-t': 'var(--dark-t)',
        '--light': 'var(--light)',
        '--primary': 'var(--primary)',
        '--shadow': 'var(--shadow)',
      }
    },
  },
  plugins: [],
};
export default config;

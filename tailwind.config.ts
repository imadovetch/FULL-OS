import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./APPS/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'dark': 'var(--dark)',
        'dark-t': 'var(--dark-t)',
        'light': 'var(--light)',
        'shadow-light': 'var(--shadow-light)',
        'shadow-dark': 'var(--shadow-dark)',
        'primary': 'var(--primary)',
      }
    },
  },
  plugins: [],
};
export default config;

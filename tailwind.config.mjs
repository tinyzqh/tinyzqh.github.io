/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        bg: 'oklch(var(--bg) / <alpha-value>)',
        'bg-elevated': 'oklch(var(--bg-elevated) / <alpha-value>)',
        'bg-subtle': 'oklch(var(--bg-subtle) / <alpha-value>)',
        fg: 'oklch(var(--fg) / <alpha-value>)',
        muted: 'oklch(var(--muted) / <alpha-value>)',
        border: 'oklch(var(--border) / <alpha-value>)',
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          hover: 'oklch(var(--accent-hover) / <alpha-value>)',
          subtle: 'oklch(var(--accent-subtle) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', '"Songti SC"', 'serif'],
        mono: ['"Geist Mono"', 'ui-monospace', '"JetBrains Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3.5rem, 9vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-xl': ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.5rem, 2.4vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      maxWidth: {
        prose: '68ch',
        wide: '1200px',
      },
      boxShadow: {
        glow: '0 0 0 1px oklch(var(--accent) / 0.2), 0 8px 30px -12px oklch(var(--accent) / 0.4)',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // Premium Health Palette
                sage: {
                    50: '#f4f7f3',
                    100: '#e6ede3',
                    200: '#cddbc7',
                    300: '#abc09f',
                    400: '#8aa579',
                    500: '#4F7942', // Primary sage green
                    600: '#406338',
                    700: '#344f2e',
                    800: '#2b4026',
                    900: '#253522',
                },
                cream: {
                    50: '#fdfcfb',
                    100: '#F9F7F2', // Primary cream background
                    200: '#f5f1e8',
                    300: '#ebe5d7',
                    400: '#ddd5c3',
                    500: '#cdc3ac',
                    600: '#b8ab92',
                    700: '#9d8f78',
                    800: '#847763',
                    900: '#6e6354',
                },
                charcoal: {
                    50: '#f6f6f6',
                    100: '#e7e7e7',
                    200: '#d1d1d1',
                    300: '#b0b0b0',
                    400: '#888888',
                    500: '#6d6d6d',
                    600: '#5d5d5d',
                    700: '#4f4f4f',
                    800: '#454545',
                    900: '#1A1A1A', // Primary charcoal text
                },
            },
            fontFamily: {
                sans: [
                    'Inter',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'Arial',
                    'sans-serif',
                ],
            },
            fontSize: {
                // Premium typography scale
                '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
                xs: ['0.75rem', { lineHeight: '1rem' }],
                sm: ['0.875rem', { lineHeight: '1.25rem' }],
                base: ['1rem', { lineHeight: '1.5rem' }],
                lg: ['1.125rem', { lineHeight: '1.75rem' }],
                xl: ['1.25rem', { lineHeight: '1.875rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1' }],
            },
            boxShadow: {
                'soft': '0 2px 8px rgba(79, 121, 66, 0.06)',
                'soft-lg': '0 4px 16px rgba(79, 121, 66, 0.08)',
                'sage': '0 4px 12px rgba(79, 121, 66, 0.12)',
            },
        },
    },
    plugins: [],
}

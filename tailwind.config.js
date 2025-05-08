/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
			'neon-green': '#2CFF05', // Our primary accent color (from example)
			'brand-black': '#000000', // Base black (from example)
			'brand-white': '#FFFFFF', // Base white (from example)
  			'twisted-black': '#121212',
  			'twisted-darker': '#0a0a0a',
  			'twisted-white': '#f5f5f5',
  			'twisted-neon': '#00ff66',
  			'twisted-violet': '#9933ff',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
        // Replace with actual font names after importing/configuring them
        heading: ['PixelFontName1', 'sans-serif'], // (from example)
        body: ['PixelFontName2', 'sans-serif'], // (from example)
  			sans: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			cyber: [
  				'Impact',
  				'Arial Black',
  				'sans-serif'
  			],
  			mono: [
  				'Space Mono',
  				'Monaco',
  				'monospace'
  			]
  		},
      backgroundImage: {
        // Define the hero background image (from example)
        'hero-pattern': "url('/path/to/noisy-bw-bar.jpg')",
      },
      aspectRatio: {
        '9/16': '9 / 16', // For the featured event poster (from example)
      },
      keyframes: {
        // Simple buzz effect for hover states (from example)
        buzz: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-1px, 1px)' },
          '50%': { transform: 'translate(1px, -1px)' },
          '75%': { transform: 'translate(1px, 1px)' },
        },
        // Subtle text distortion effect (from example)
        'vhs-text': {
          '0%, 100%': {
            textShadow: '1px 1px 0px rgba(0, 255, 255, 0.5), -1px -1px 0px rgba(255, 0, 255, 0.5)',
          },
          '50%': {
            textShadow: '-1px 1px 0px rgba(0, 255, 255, 0.5), 1px -1px 0px rgba(255, 0, 255, 0.5)',
          },
        },
      },
  		animation: {
        buzz: 'buzz 0.1s infinite linear', // (from example)
        'vhs-text': 'vhs-text 0.2s infinite linear', // (from example)
  			'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			float: 'float 6s ease-in-out infinite'
  		},
      boxShadow: {
        // Custom neon glow effect (from example)
        'neon-glow': '0 0 5px theme(colors.neon-green), 0 0 15px theme(colors.neon-green), 0 0 25px theme(colors.neon-green)',
      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
		
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
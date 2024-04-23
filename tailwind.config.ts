import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        gg: {
          50: '#fef5ee',
          100: '#fde9d7',
          200: '#f9cfaf',
          300: '#f5ad7c',
          400: '#f08147',
          500: '#ed682e',
          600: '#dd4719',
          700: '#b83416',
          800: '#922b1a',
          900: '#762618',
          950: '#40100a'
        }
      }
    }
  }
}

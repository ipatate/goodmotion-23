const usePreflightFront = false

module.exports = {
  // use preflight (reset CSS) override fonts size from theme.json
  corePlugins: {
    preflight: process.env.IS_EDITOR ? false : usePreflightFront,
  },
  content: ['./**/*.{php,twig,html,json}', './assets/*.{js,jsx,ts,tsx,vue}'],
  safelist: [],
  theme: {
    fontFamily: {
      display: ['PlayfairDisplay'],
      body: ['Roboto'],
    },
    extend: {
      gridTemplateColumns: {
        main: '8rem 1fr 8rem',
        'main-small': '1rem 1fr 1rem',
      },
      backgroundImage: (theme) => ({
        'wp-performance': "url('/assets/media/wp-performance.png')",
        "button":"linear-gradient(60deg, #0c7190, #08556c, #063a4a, #0c7190)"
      }),
      animation: {
          button: "animatedbg 2s ease alternate infinite"
      },
      keyframes: {
        animatedbg: {
          '0%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
          '100%': {
            'background-position': '0% 50%'
          }
        }
      }
    },
  },
  plugins: [require('@_tw/themejson')(require('./theme.json'))],
}

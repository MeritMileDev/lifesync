/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,vue,svelte}', './**/*.{liquid,json}'],
  theme: {
    fontFamily: {
      sans: ['"Raleway"', 'sans-serif'],
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '16px',
          md: '24px',
        },
      },
      screens: {
        large: '1366px',
        '2xl': '1500px',
        '2.5xl': '1632px',
        '3xl': '1808px',
      },
      fontFamily: {
        body: 'Raleway',
      },

      fontSize: {
        sm: [
          '0.875rem',
          {
            lineHeight: '1.375rem',
            letterSpacing: '-0.028em',
            fontWeight: '400',
          },
        ],
        base: [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '-0.025em',
            fontWeight: '400',
          },
        ],
        xl: [
          '1.25rem',
          {
            lineHeight: '1.75rem',
            letterSpacing: '-0.02em',
            fontWeight: '500',
          },
        ],
        '2xl': [
          '1.5rem',
          {
            lineHeight: '2rem',
            letterSpacing: '-0.016em',
            fontWeight: '500',
          },
        ],
        32: [
          '2rem',
          {
            lineHeight: '2.5rem',
            letterSpacing: '-0.0125em',
            fontWeight: '500',
          },
        ],
        40: [
          '2.5rem',
          {
            lineHeight: '3rem',
            letterSpacing: '-0.0125em',
            fontWeight: '500',
          },
        ],
        '5xl': [
          '3rem',
          {
            lineHeight: '3.5rem',
            letterSpacing: '-0.04em',
            fontWeight: '500',
          },
        ],
        64: [
          '4rem',
          {
            lineHeight: '4.5rem',
            letterSpacing: '-0.046875em',
            fontWeight: '500',
          },
        ],
      },
      spacing: {
        1.25: '0.3125rem', // 5px
        1.5: '0.375rem', // 6px
        1.75: '0.4375rem', // 7px
        2.25: '0.5625rem', // 9px
        2.5: '0.625rem', // 10px
        3.25: '0.875rem', // 14px
        3.5: '0.9375rem', // 15px
        4.25: '1.0625rem', // 17px
        4.5: '1.125rem', // 18px
        4.75: '1.1875rem', // 19px
        5.5: '1.375rem', // 22px
        6.5: '1.625rem', // 26px
        7.5: '1.875rem', // 30px
        8.5: '2.125rem', // 34px
        9.5: '2.375rem', // 38px
        10.5: '2.625rem', // 42px
        12.5: '3.125rem', // 50px
        12.75: '3.25rem', // 52px
        13: '3.25rem', // 52px
        13.5: '3.375rem', // 54px
        14: '3.5rem', // 56px
        14.5: '3.625rem', // 58px
        15: '3.75rem', // 60px
        16.5: '4.125rem', // 66px
        17: '4.25rem', // 68px
        17.5: '4.375rem', // 70px
        18: '4.5rem', // 72px
        19: '4.75rem', //76px
        19.5: '4.875rem', // 78px
        21: '5.25rem', // 84px
        21.5: '5.375rem', // 86px
        22: '5.625rem', // 90px
        25: '6.25rem', // 100px
        26: '6.5rem', // 104px
        29: '7.25rem', // 116px
        30: '7.5rem', // 120px
        35: '8.75rem', //140px
        34: '8.5rem', // 136px
        37.5: '9.375rem', // 150px
        44: '11rem', // 176px
        45.5: '11.375rem', // 182px
        75: '18.75rem', // 300px
        105: '26.25rem', // 420px
        113.5: '28.375rem', // 454px
        120: '30rem', // 480px
        152.5: '38.125rem', // 610px
        162: '40.5rem', // 648px
        170: '42.5rem', // 680px
        200: '50rem', // 800px
      },
      backgroundPosition: {
        'right-2': 'right 0.75rem center',
        'right-1': 'right 0.5rem center',
      },
      backgroundImage: {
        'select-arrow': "url('/assets/chevron-down.svg')",
        'select-arrow--small': "url('/assets/chevron-down--small.svg')",
        checkmark: "url('/assets/checkmark.svg')",
        'arrow-right': "url('/assets/arrow-right.svg')",
        'arrow-right-grey': "url('/assets/arrow-right-grey.svg')",
        'gradient-bright-gray':
          'linear-gradient(180deg, #F1F7FB 0%, #FFF 40.17%)',
        'arrow-right-dark-blue': "url('/assets/arrow-right-dark-blue.svg')",
        'play-light-blue-round': "url('/assets/play-light-blue-round.svg')",
        'blue-accent-arrow-right': "url('/assets/icon-police-accent-white-arrow-right.svg')",
      },
      colors: {
        yellow: '#FFD100',
        'police-accent': '#0B8ADC',
        'police-blue': '#0D0D63',
        'police-blue-20': 'rgba(13, 13, 99, 0.2)',
        'police-blue-70': '#0d0d63b3',
        'bright-gray': 'rgba(196, 204, 227, 1)',
        'bright-gray-50': 'rgba(196, 204, 227, 0.5)',
        'bright-gray-20': 'rgba(196, 204, 227, 0.2)',
        'persian-blue': '#0062AB',
        'dark-yellow': '#DFBA14',
        red: '#D80004',
      },
      scale: {
        102: '1.02',
      },
      letterSpacing: {
        tighter: '-0.125rem',
        tight: '-0.125rem',
        normal: '-0.025rem',
        wide: '0.063rem',
      },
      maxWidth: {
        50: '12.5rem', // 200px
        65: '16.25rem', // 260px
        69: '17.25rem', // 280px
        70: '17.5rem', // 280px
        75: '18.75rem', // 300px
        82: '20.5rem', // 328px
        142.5: '35.625rem', // 570px
        150: '37.5rem', // 600px
        165: '41.25rem', // 660px
        217: '54.25rem', // 868px
        275: '68.75rem', // 1100px
        480: '120rem', // 1920px
      },
      boxShadow: {
        'shadow-right': '4px 0px 4px 0px rgba(0, 0, 0, 0.25)',
        'shadow-bottom': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  safelist: ['2.5xl:block'],
};

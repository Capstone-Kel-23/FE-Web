import colors from 'vuetify/es5/util/colors'

const colorPallete = {
  white: {
    light: colors.shades.white,
    dark: colors.shades.white
  },
  black: {
    light: colors.shades.black,
    dark: colors.shades.black
  },
  grey: {
    light: '#E3E3E3',
    dark: '#E3E3E3'
  },
  blue: {
    light: '#386190',
    dark: '#386190'
  },
  blue100: {
    light: '#DAEEF9',
    dark: '#DAEEF9'
  },
  blue200: {
    light: '#B8DCF3',
    dark: '#B8DCF3'
  },
  blue300: {
    light: '#8CB9DD',
    dark: '#8CB9DD'
  },
  blue400: {
    light: '#6692BC',
    dark: '#6692BC'
  },
  blue500: {
    light: '#386190',
    dark: '#386190'
  },
  blue600: {
    light: '#284B7B',
    dark: '#284B7B'
  },
  blue700: {
    light: '#1C3867',
    dark: '#1C3867'
  },
  blue800: {
    light: '#112753',
    dark: '#112753'
  },
  blue900: {
    light: '#0A1B45',
    dark: '#0A1B45'
  },
  neutral100: {
    light: '#FFFFFF',
    dark: '#FFFFFF'
  },
  neutral200: {
    light: '#FDFDFD',
    dark: '#FDFDFD'
  },
  neutral300: {
    light: '#F9F9F9',
    dark: '#F9F9F9'
  },
  neutral400: {
    light: '#F6F6F6',
    dark: '#F6F6F6'
  },
  neutral500: {
    light: '#E3E3E3',
    dark: '#E3E3E3'
  },
  neutral600: {
    light: '#CACACA',
    dark: '#CACACA'
  },
  neutral700: {
    light: '#A6A6A6',
    dark: '#A6A6A6'
  },
  neutral800: {
    light: '#777777',
    dark: '#777777'
  },
  neutral900: {
    light: '#000000',
    dark: '#000000'
  }
}

export const lightPallete = {}
export const darkPallete = {}

for (const key in colorPallete) {
  if (colorPallete[key].light != null && colorPallete[key].dark != null) {
    lightPallete[key] = colorPallete[key].light
    darkPallete[key] = colorPallete[key].dark
  } else if (colorPallete[key].light != null) {
    lightPallete[key] = colorPallete[key].light
  } else if (colorPallete[key].dark != null) {
    darkPallete[key] = colorPallete[key].dark
  } else if (colorPallete[key].light == null && colorPallete[key].dark == null) {
    lightPallete[key] = colorPallete[key]
    darkPallete[key] = colorPallete[key]
  }
}

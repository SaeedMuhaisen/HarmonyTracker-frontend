import { createTamagui } from '@tamagui/core'
import { animations } from './animations'
import { fonts } from './fonts'
import { media } from './media'
import { tokens } from './tokens'
import { CreateTamaguiProps } from 'tamagui'


const config = createTamagui({
  defaultFont: 'body',
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  animations,
  fonts,
  themes:{
    light:{
      'Stack/BackgroundColor':'white',
      'bg':'purple',
    },
    dark:{
      'Stack/BackgroundColor':'white',
      'bg':'blue',
    },
  },
  tokens,
  media,
  
})


type AppConfig = typeof config

declare module 'tamagui' {
  // overrides TamaguiCustomConfig so that custom types
  // work everywhere `tamagui` is imported
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config

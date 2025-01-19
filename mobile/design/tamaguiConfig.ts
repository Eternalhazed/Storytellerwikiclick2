import {
  blue,
  blueDark,
  gray,
  grayDark,
  green,
  greenDark,
  orange,
  orangeDark,
  pink,
  pinkDark,
  purple,
  purpleDark,
  red,
  redDark,
  yellow,
  yellowDark,
} from "@tamagui/colors"
import { createThemeBuilder } from "@tamagui/theme-builder"
import { createTokens } from "@tamagui/web"
import defaultConfig from "@tamagui/config/v3"
import { createFont, createTamagui } from "tamagui"

const colorTokens = {
  paperWhite: {
    blue,
    gray,
    green,
    orange,
    pink,
    purple,
    red,
    yellow,
  },
  nightBlack: {
    blue: blueDark,
    gray: grayDark,
    green: greenDark,
    orange: orangeDark,
    pink: pinkDark,
    purple: purpleDark,
    red: redDark,
    yellow: yellowDark,
  },
}

const lightShadowColor = "rgba(0,0,0,0.04)"
const lightShadowColorStrong = "rgba(0,0,0,0.085)"
const darkShadowColor = "rgba(0,0,0,0.2)"
const darkShadowColorStrong = "rgba(0,0,0,0.3)"

const darkColors = {
  ...colorTokens.nightBlack.blue,
  ...colorTokens.nightBlack.gray,
  ...colorTokens.nightBlack.green,
  ...colorTokens.nightBlack.orange,
  ...colorTokens.nightBlack.pink,
  ...colorTokens.nightBlack.purple,
  ...colorTokens.nightBlack.red,
  ...colorTokens.nightBlack.yellow,
}

const lightColors = {
  ...colorTokens.paperWhite.blue,
  ...colorTokens.paperWhite.gray,
  ...colorTokens.paperWhite.green,
  ...colorTokens.paperWhite.orange,
  ...colorTokens.paperWhite.pink,
  ...colorTokens.paperWhite.purple,
  ...colorTokens.paperWhite.red,
  ...colorTokens.paperWhite.yellow,
}

const color = {
  white0: "rgba(255,255,255,0)",
  white075: "rgba(255,255,255,0.75)",
  white05: "rgba(255,255,255,0.5)",
  white025: "rgba(255,255,255,0.25)",
  black0: "rgba(10,10,10,0)",
  black075: "rgba(10,10,10,0.75)",
  black05: "rgba(10,10,10,0.5)",
  black025: "rgba(10,10,10,0.25)",
  white1: "#fff",
  white2: "#f8f8f8",
  white3: "hsl(0, 0%, 96.3%)",
  white4: "hsl(0, 0%, 94.1%)",
  white5: "hsl(0, 0%, 92.0%)",
  white6: "hsl(0, 0%, 90.0%)",
  white7: "hsl(0, 0%, 88.5%)",
  white8: "hsl(0, 0%, 81.0%)",
  white9: "hsl(0, 0%, 56.1%)",
  white10: "hsl(0, 0%, 50.3%)",
  white11: "hsl(0, 0%, 42.5%)",
  white12: "hsl(0, 0%, 9.0%)",
  black1: "#050505",
  black2: "#151515",
  black3: "#191919",
  black4: "#232323",
  black5: "#282828",
  black6: "#323232",
  black7: "#424242",
  black8: "#494949",
  black9: "#545454",
  black10: "#626262",
  black11: "#a5a5a5",
  black12: "#fff",
  brand1: "#fff1e7",
  brand2: "#fbe2d3",
  brand3: "#f6c2a5",
  brand4: "#f1a173",
  brand5: "#ed8449",
  brand6: "#eb722f",
  brand7: "#ea6920",
  brand8: "#d15815",
  brand9: "#ba4d0f",
  brand10: "#a34106",
  ...postfixObjKeys(lightColors, "Light"),
  ...postfixObjKeys(darkColors, "Dark"),
}

export const defaultPalettes = (() => {
  const transparent = (hsl: string, opacity = 0) =>
    hsl.replace(`%)`, `%, ${opacity})`).replace(`hsl(`, `hsla(`)

  const getColorPalette = (
    colors: Record<string, string>,
    accentColors: Record<string, string>,
  ): string[] => {
    const colorPalette = Object.values(colors)
    // make the transparent color vibrant and towards the middle
    const colorI = colorPalette.length - 4

    // accents!
    const accentPalette = Object.values(accentColors)
    const accentBackground = accentPalette[0]!
    const accentColor = accentPalette[accentPalette.length - 1]!

    // add our transparent colors first/last
    // and make sure the last (foreground) color is white/black rather than colorful
    // this is mostly for consistency with the older theme-base
    return [
      accentBackground,
      transparent(colorPalette[0]!, 0),
      transparent(colorPalette[0]!, 0.25),
      transparent(colorPalette[0]!, 0.5),
      transparent(colorPalette[0]!, 0.75),
      ...colorPalette,
      transparent(colorPalette[colorI]!, 0.75),
      transparent(colorPalette[colorI]!, 0.5),
      transparent(colorPalette[colorI]!, 0.25),
      transparent(colorPalette[colorI]!, 0),
      accentColor,
    ]
  }

  const brandColor = {
    paperWhite: color.brand9,
    nightBlack: color.brand9,
  }

  const lightPalette = [
    brandColor.paperWhite,
    color.white0,
    color.white025,
    color.white05,
    color.white075,
    color.white1,
    color.white2,
    color.white3,
    color.white4,
    color.white5,
    color.white6,
    color.white7,
    color.white8,
    color.white9,
    color.white10,
    color.white11,
    color.white12,
    color.black075,
    color.black05,
    color.black025,
    color.black0,
    brandColor.nightBlack,
  ]

  const darkPalette = [
    brandColor.nightBlack,
    color.black0,
    color.black025,
    color.black05,
    color.black075,
    color.black1,
    color.black2,
    color.black3,
    color.black4,
    color.black5,
    color.black6,
    color.black7,
    color.black8,
    color.black9,
    color.black10,
    color.black11,
    color.black12,
    color.white075,
    color.white05,
    color.white025,
    color.white0,
    brandColor.paperWhite,
  ]

  const lightColorNames = objectKeys(colorTokens.paperWhite)
  const lightPalettes = objectFromEntries(
    lightColorNames.map(
      (key, index) =>
        [
          `paperWhite_${key}`,
          getColorPalette(
            colorTokens.paperWhite[key],
            colorTokens.paperWhite[
              lightColorNames[(index + 1) % lightColorNames.length]!
            ],
          ),
        ] as const,
    ),
  )

  const darkColorNames = objectKeys(colorTokens.nightBlack)
  const darkPalettes = objectFromEntries(
    darkColorNames.map(
      (key, index) =>
        [
          `nightBlack_${key}`,
          getColorPalette(
            colorTokens.nightBlack[key],
            colorTokens.paperWhite[
              darkColorNames[(index + 1) % darkColorNames.length]!
            ],
          ),
        ] as const,
    ),
  )

  const colorPalettes = {
    ...lightPalettes,
    ...darkPalettes,
  }

  return {
    paperWhite: lightPalette,
    nightBlack: darkPalette,
    ...colorPalettes,
  }
})()

const getTemplates = () => {
  const getBaseTemplates = (scheme: "nightBlack" | "paperWhite") => {
    const isLight = scheme === "paperWhite"

    // our palettes have 4 things padding each end until you get to bg/color:
    // [accentBg, transparent1, transparent2, transparent3, transparent4, background, ...]
    const bgIndex = 5
    const lighten = isLight ? -1 : 1
    const darken = -lighten
    const borderColor = bgIndex + 3

    // templates use the palette and specify index
    // negative goes backwards from end so -1 is the last item
    const base = {
      accentBackground: 0,
      accentColor: -0,

      background0: 1,
      background025: 2,
      background05: 3,
      background075: 4,
      color1: bgIndex,
      color2: bgIndex + 1,
      color3: bgIndex + 2,
      color4: bgIndex + 3,
      color5: bgIndex + 4,
      color6: bgIndex + 5,
      color7: bgIndex + 6,
      color8: bgIndex + 7,
      color9: bgIndex + 8,
      color10: bgIndex + 9,
      color11: bgIndex + 10,
      color12: bgIndex + 11,
      color0: -1,
      color025: -2,
      color05: -3,
      color075: -4,
      // the background, color, etc keys here work like generics - they make it so you
      // can publish components for others to use without mandating a specific color scale
      // the @tamagui/button Button component looks for `$background`, so you set the
      // dark_red_Button theme to have a stronger background than the dark_red theme.
      background: bgIndex,
      backgroundHover: bgIndex + lighten, // always lighten on hover no matter the scheme
      backgroundPress: bgIndex + darken, // always darken on press no matter the theme
      backgroundFocus: bgIndex + darken,
      borderColor,
      borderColorHover: borderColor + lighten,
      borderColorPress: borderColor + darken,
      borderColorFocus: borderColor,
      color: -bgIndex,
      colorHover: -bgIndex - 1,
      colorPress: -bgIndex,
      colorFocus: -bgIndex - 1,
      colorTransparent: -1,
      placeholderColor: -bgIndex - 3,
      outlineColor: -2,
      brandColor: 21,
    }

    const surface1 = {
      background: base.background + 1,
      backgroundHover: base.backgroundHover + 1,
      backgroundPress: base.backgroundPress + 1,
      backgroundFocus: base.backgroundFocus + 1,
      borderColor: base.borderColor + 1,
      borderColorHover: base.borderColorHover + 1,
      borderColorFocus: base.borderColorFocus + 1,
      borderColorPress: base.borderColorPress + 1,
    }

    const surface2 = {
      background: base.background + 2,
      backgroundHover: base.backgroundHover + 2,
      backgroundPress: base.backgroundPress + 2,
      backgroundFocus: base.backgroundFocus + 2,
      borderColor: base.borderColor + 2,
      borderColorHover: base.borderColorHover + 2,
      borderColorFocus: base.borderColorFocus + 2,
      borderColorPress: base.borderColorPress + 2,
    }

    const surface3 = {
      background: base.background + 3,
      backgroundHover: base.backgroundHover + 3,
      backgroundPress: base.backgroundPress + 3,
      backgroundFocus: base.backgroundFocus + 3,
      borderColor: base.borderColor + 3,
      borderColorHover: base.borderColorHover + 3,
      borderColorFocus: base.borderColorFocus + 3,
      borderColorPress: base.borderColorPress + 3,
    }

    const surfaceActiveBg = {
      background: base.background + 5,
      backgroundHover: base.background + 5,
      backgroundPress: base.backgroundPress + 5,
      backgroundFocus: base.backgroundFocus + 5,
    }

    const surfaceActive = {
      ...surfaceActiveBg,
      // match border to background when active
      borderColor: surfaceActiveBg.background,
      borderColorHover: surfaceActiveBg.backgroundHover,
      borderColorFocus: surfaceActiveBg.backgroundFocus,
      borderColorPress: surfaceActiveBg.backgroundPress,
    }

    const inverseSurface1 = {
      color: surface1.background,
      colorHover: surface1.backgroundHover,
      colorPress: surface1.backgroundPress,
      colorFocus: surface1.backgroundFocus,
      background: base.color,
      backgroundHover: base.colorHover,
      backgroundPress: base.colorPress,
      backgroundFocus: base.colorFocus,
      borderColor: base.color - 2,
      borderColorHover: base.color - 3,
      borderColorFocus: base.color - 4,
      borderColorPress: base.color - 5,
    }

    const inverseActive = {
      ...inverseSurface1,
      background: base.color - 2,
      backgroundHover: base.colorHover - 2,
      backgroundPress: base.colorPress - 2,
      backgroundFocus: base.colorFocus - 2,
      borderColor: base.color - 2 - 2,
      borderColorHover: base.color - 3 - 2,
      borderColorFocus: base.color - 4 - 2,
      borderColorPress: base.color - 5 - 2,
    }

    const alt1 = {
      color: base.color - 1,
      colorHover: base.colorHover - 1,
      colorPress: base.colorPress - 1,
      colorFocus: base.colorFocus - 1,
    }

    const alt2 = {
      color: base.color - 2,
      colorHover: base.colorHover - 2,
      colorPress: base.colorPress - 2,
      colorFocus: base.colorFocus - 2,
    }

    return {
      base,
      alt1,
      alt2,
      surface1,
      surface2,
      surface3,
      inverseSurface1,
      inverseActive,
      surfaceActive,
    }
  }

  const lightTemplates = getBaseTemplates("paperWhite")
  const darkTemplates = getBaseTemplates("nightBlack")
  const templates = {
    ...objectFromEntries(
      objectKeys(lightTemplates).map(
        (name) => [`paperWhite_${name}`, lightTemplates[name]] as const,
      ),
    ),
    ...objectFromEntries(
      objectKeys(darkTemplates).map(
        (name) => [`nightBlack_${name}`, darkTemplates[name]] as const,
      ),
    ),
  }
  return templates as Record<keyof typeof templates, typeof lightTemplates.base>
}

export const defaultTemplates = getTemplates()

const shadows = {
  paperWhite: {
    shadowColor: lightShadowColorStrong,
    shadowColorHover: lightShadowColorStrong,
    shadowColorPress: lightShadowColor,
    shadowColorFocus: lightShadowColor,
  },
  nightBlack: {
    shadowColor: darkShadowColorStrong,
    shadowColorHover: darkShadowColorStrong,
    shadowColorPress: darkShadowColor,
    shadowColorFocus: darkShadowColor,
  },
}

const nonInherited = {
  paperWhite: {
    ...lightColors,
    ...shadows.paperWhite,
  },
  nightBlack: {
    ...darkColors,
    ...shadows.nightBlack,
  },
}

const overlayThemeDefinitions = [
  {
    parent: "paperWhite",
    theme: {
      background: "rgba(0,0,0,0.5)",
    },
  },
  {
    parent: "nightBlack",
    theme: {
      background: "rgba(0,0,0,0.8)",
    },
  },
]

const inverseSurface1 = [
  {
    parent: "active",
    template: "inverseActive",
  },
  {
    parent: "",
    template: "inverseSurface1",
  },
]

const surface1 = [
  {
    parent: "active",
    template: "surfaceActive",
  },
  {
    parent: "",
    template: "surface1",
  },
]

const surface2 = [
  {
    parent: "active",
    template: "surfaceActive",
  },
  {
    parent: "",
    template: "surface2",
  },
]

const surface3 = [
  {
    parent: "active",
    template: "surfaceActive",
  },
  {
    parent: "",
    template: "surface3",
  },
]

/**
 * These are optional themes that serve as defaults for components. They don't
 * change color1 through color12 just "generic" properties like color,
 * background, borderColor.
 *
 * They can be overridden with the theme prop, or left out entirely for
 * "un-themed" components.

 */
export const defaultComponentThemes = {
  ListItem: {
    template: "surface1",
  },
  SelectTrigger: surface1,
  Card: surface1,
  Button: surface3,
  Checkbox: surface2,
  Switch: surface2,
  SwitchThumb: inverseSurface1,
  TooltipContent: surface2,
  Progress: {
    template: "surface1",
  },
  RadioGroupItem: surface2,
  TooltipArrow: {
    template: "surface1",
  },
  SliderTrackActive: {
    template: "surface3",
  },
  SliderTrack: {
    template: "surface1",
  },
  SliderThumb: inverseSurface1,
  Tooltip: inverseSurface1,
  ProgressIndicator: inverseSurface1,
  SheetOverlay: overlayThemeDefinitions,
  DialogOverlay: overlayThemeDefinitions,
  ModalOverlay: overlayThemeDefinitions,
  Input: surface1,
  TextArea: surface1,
} as const

/**
 * These are useful for states (alt gets more subtle as it goes up) or emphasis
 * (surface gets more contrasted from the background as it goes up)
 */

export const defaultSubThemes = {
  alt1: {
    template: "alt1",
  },
  alt2: {
    template: "alt2",
  },
  active: {
    template: "surface3",
  },
  surface1: {
    template: "surface1",
  },
  surface2: {
    template: "surface2",
  },
  surface3: {
    template: "surface3",
  },
  surface4: {
    template: "surfaceActive",
  },
} as const

// --- themeBuilder ---

const themeBuilder = createThemeBuilder()
  .addPalettes(defaultPalettes)
  .addTemplates(defaultTemplates)
  .addThemes({
    paperWhite: {
      template: "base",
      palette: "paperWhite",
      nonInheritedValues: nonInherited.paperWhite,
    },
    nightBlack: {
      template: "base",
      palette: "nightBlack",
      nonInheritedValues: nonInherited.nightBlack,
    },
  })
  .addChildThemes({
    orange: {
      palette: "orange",
      template: "base",
    },
    yellow: {
      palette: "yellow",
      template: "base",
    },
    green: {
      palette: "green",
      template: "base",
    },
    blue: {
      palette: "blue",
      template: "base",
    },
    purple: {
      palette: "purple",
      template: "base",
    },
    pink: {
      palette: "pink",
      template: "base",
    },
    red: {
      palette: "red",
      template: "base",
    },
    gray: {
      palette: "gray",
      template: "base",
    },
  })
  .addChildThemes(defaultSubThemes)
  .addComponentThemes(defaultComponentThemes, {
    avoidNestingWithin: [
      "alt1",
      "alt2",
      "surface1",
      "surface2",
      "surface3",
      "surface4",
    ],
  })

// --- themes ---

const themesIn = themeBuilder.build()

type ThemeKeys =
  | keyof typeof defaultTemplates.paperWhite_base
  | keyof typeof nonInherited.paperWhite

export type Theme = Record<ThemeKeys, string>

export type ThemesOut = Record<keyof typeof themesIn, Theme>

export const themes = themesIn as unknown as ThemesOut

// --- tokens ---

export const size = {
  $0: 0,
  "$0.5": 4,
  $1: 8,
  "$1.5": 12,
  $2: 16,
  "$2.5": 20,
  $3: 24,
  "$3.5": 28,
  $4: 32,
  $true: 32,
  $5: 40,
  $6: 48,
  $7: 56,
  $8: 64,
  $9: 72,
  $10: 80,
  $11: 88,
  $12: 96,
  $14: 112,
  $16: 128,
  $20: 160,
}

type SizeKeysIn = keyof typeof size
type Sizes = {
  [Key in SizeKeysIn extends `$${infer Key}` ? Key : SizeKeysIn]: number
}
type SizeKeys = `${keyof Sizes extends `${infer K}` ? K : never}`

export const spaces = Object.entries(size).map(([k, v]) => {
  return [k, v / 2] as const
})

export const spacesNegative = spaces
  .slice(1)
  .map(([k, v]) => [`-${k.slice(1)}`, -v])

type SizeKeysWithNegatives =
  | Exclude<`-${SizeKeys extends `$${infer Key}` ? Key : SizeKeys}`, "-0">
  | SizeKeys

export const space: {
  [Key in SizeKeysWithNegatives]: Key extends keyof Sizes ? Sizes[Key] : number
} = {
  ...Object.fromEntries(spaces),
  ...Object.fromEntries(spacesNegative),
}

export const zIndex = {
  0: 0,
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500,
}

export const radius = {
  0: 0,
  1: 3,
  2: 5,
  3: 7,
  4: 9,
  true: 9,
  5: 10,
  6: 16,
  7: 19,
  8: 22,
  9: 26,
  10: 34,
  11: 42,
  12: 50,
}

export const tokens = createTokens({
  color,
  radius,
  zIndex,
  space,
  size,
})

// --- utils ---

export function postfixObjKeys<
  A extends { [key: string]: string },
  B extends string,
>(obj: A, postfix: B) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [`${k}${postfix}`, v]),
  ) as {
    [Key in `${keyof A extends string ? keyof A : never}${B}`]: string
  }
}

export function objectFromEntries<ARR_T extends EntriesType>(
  arr: ARR_T,
): EntriesToObject<ARR_T> {
  return Object.fromEntries(arr) as EntriesToObject<ARR_T>
}

export type EntriesType =
  | [PropertyKey, unknown][]
  | ReadonlyArray<readonly [PropertyKey, unknown]>

export type DeepWritable<OBJ_T> = {
  -readonly [P in keyof OBJ_T]: DeepWritable<OBJ_T[P]>
}
export type UnionToIntersection<UNION_T> = // From https://stackoverflow.com/a/50375286
  (UNION_T extends unknown ? (k: UNION_T) => void : never) extends (
    k: infer I,
  ) => void
    ? I
    : never

export type UnionObjectFromArrayOfPairs<ARR_T extends EntriesType> =
  DeepWritable<ARR_T> extends (infer R)[]
    ? R extends [infer key, infer val]
      ? { [prop in key & PropertyKey]: val }
      : never
    : never
export type MergeIntersectingObjects<ObjT> = { [key in keyof ObjT]: ObjT[key] }
export type EntriesToObject<ARR_T extends EntriesType> =
  MergeIntersectingObjects<
    UnionToIntersection<UnionObjectFromArrayOfPairs<ARR_T>>
  >

export function objectKeys<O extends Record<string, unknown>>(obj: O) {
  return Object.keys(obj) as Array<keyof O>
}

const youngSerif = createFont({
  family: "YoungSerif",
  size: size,
  face: {
    500: {
      normal: "YoungSerif",
    },
  },
})

const bookerly = createFont({
  family: "Bookerly",
  size: size,
  face: {
    500: {
      normal: "Bookerly",
    },
  },
})

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  fonts: {
    heading: youngSerif,
    book: bookerly,
  },
  tokens,
  themes,
})

export type AppConfig = typeof tamaguiConfig

declare module "tamagui" {
  // or '@tamagui/core'
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends AppConfig {}
}

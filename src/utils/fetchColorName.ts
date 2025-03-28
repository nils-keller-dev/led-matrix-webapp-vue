import { ref } from 'vue'

const colorNameCache = ref<Record<string, string>>({})

export const fetchColorName = async (hex: string) => {
  if (colorNameCache.value[hex]) return colorNameCache.value[hex]

  const colorData = await fetch(
    `https://www.thecolorapi.com/id?hex=${hex.replace('#', '')}`
  ).then((response) => response.json())

  const colorName = colorData.name.value as string
  colorNameCache.value[hex] = colorName

  return colorName
}

export function toCamelCase(str: string) {
  if (!str) {
    return ''
  }

  return str.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

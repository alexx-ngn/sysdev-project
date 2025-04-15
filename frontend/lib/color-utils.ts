/**
 * Converts a hex color to HSL format
 * @param hex - The hex color code (e.g., "#A5D8FF")
 * @returns The HSL color as a string (e.g., "199 70% 80%")
 */
export function hexToHSL(hex: string): string {
  // Remove the hash if it exists
  hex = hex.replace('#', '')
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255
  
  // Find the min and max values
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  
  // Calculate lightness
  let l = (max + min) / 2
  
  // Calculate saturation
  let s = 0
  if (max !== min) {
    s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min)
  }
  
  // Calculate hue
  let h = 0
  if (max !== min) {
    if (max === r) {
      h = (g - b) / (max - min) + (g < b ? 6 : 0)
    } else if (max === g) {
      h = (b - r) / (max - min) + 2
    } else {
      h = (r - g) / (max - min) + 4
    }
    h /= 6
  }
  
  // Convert to degrees, percentage, percentage
  h = Math.round(h * 360)
  s = Math.round(s * 100)
  l = Math.round(l * 100)
  
  return `${h} ${s}% ${l}%`
}

/**
 * Converts a hex color to CSS variable format
 * @param hex - The hex color code (e.g., "#A5D8FF")
 * @returns The CSS variable format (e.g., "199 70% 80%")
 */
export function hexToCSSVariable(hex: string): string {
  return hexToHSL(hex)
}

/**
 * Applies a color to a CSS variable
 * @param variableName - The name of the CSS variable (e.g., "--primary")
 * @param hexColor - The hex color code (e.g., "#A5D8FF")
 */
export function applyColorToVariable(variableName: string, hexColor: string): void {
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty(variableName, hexToCSSVariable(hexColor))
  }
} 
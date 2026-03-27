/**
 * Shared color utilities for hero canvas animations.
 * Called inside useEffect at init time (not per-frame).
 */

export function getPrimaryColor() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-primary').trim()
  return parseHex(raw || '#0EA5E9')
}

export function getBgColor() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-bg').trim()
  return parseHex(raw || '#050505')
}

function parseHex(hex) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  }
}

export function hueRotateRGB({ r, g, b }, degrees) {
  // RGB to HSL
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  let h, s

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6
    else if (max === gn) h = ((bn - rn) / d + 2) / 6
    else h = ((rn - gn) / d + 4) / 6
  }

  // Rotate hue
  h = (h + degrees / 360) % 1
  if (h < 0) h += 1

  // HSL to RGB
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  let ro, go, bo
  if (s === 0) {
    ro = go = bo = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    ro = hue2rgb(p, q, h + 1 / 3)
    go = hue2rgb(p, q, h)
    bo = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(ro * 255),
    g: Math.round(go * 255),
    b: Math.round(bo * 255),
  }
}

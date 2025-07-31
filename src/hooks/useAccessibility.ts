import {
  ACCESSIBILITY_CLASSES,
  ACCESSIBILITY_DEFAULTS,
  ACCESSIBILITY_STORAGE_KEY,
  AccessibilityMode,
  FontSize,
  type AccessibilitySettings
} from '@/types/common'
import { useEffect, useState } from 'react'

export const useAccessibility = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const stored = localStorage.getItem(ACCESSIBILITY_STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : ACCESSIBILITY_DEFAULTS
    return parsed
  })

  useEffect(() => {
    localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    const root = document.documentElement

    root.classList.remove(
      ACCESSIBILITY_CLASSES.LARGE_TEXT,
      ACCESSIBILITY_CLASSES.EXTRA_LARGE_TEXT,
      ACCESSIBILITY_CLASSES.REDUCED_MOTION
    )

    if (settings.fontSize === FontSize.LARGE) {
      root.classList.add(ACCESSIBILITY_CLASSES.LARGE_TEXT)
    } else if (settings.fontSize === FontSize.EXTRA_LARGE) {
      root.classList.add(ACCESSIBILITY_CLASSES.EXTRA_LARGE_TEXT)
    }

    if (settings.reducedMotion) {
      root.classList.add(ACCESSIBILITY_CLASSES.REDUCED_MOTION)
    }
  }, [settings])

  const setMode = (mode: AccessibilityMode) => {
    setSettings(prev => ({ ...prev, mode }))
  }

  const setFontSize = (fontSize: FontSize) => {
    setSettings(prev => ({ ...prev, fontSize }))
  }

  const setReducedMotion = (reducedMotion: boolean) => {
    setSettings(prev => ({ ...prev, reducedMotion }))
  }

  const resetSettings = () => {
    setSettings(ACCESSIBILITY_DEFAULTS)
  }

  return {
    settings,
    setMode,
    setFontSize,
    setReducedMotion,
    resetSettings
  }
}

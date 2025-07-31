import { AccessibilityMode, FontSize, ThemeMode } from '@/types/common'
import React, { useState } from 'react'
import { IoAccessibility, IoEye, IoEyeOff } from 'react-icons/io5'
import { useAccessibility } from '@/hooks/useAccessibility'
import * as S from './styles'

type AccessibilityButtonProps = {
  setTheme?: (theme: ThemeMode) => void
}

const AccessibilityButton: React.FC<AccessibilityButtonProps> = ({
  setTheme
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { settings, setMode, setFontSize, setReducedMotion, resetSettings } =
    useAccessibility()

  const handleModeChange = (mode: AccessibilityMode) => {
    setMode(mode)

    if (setTheme) {
      switch (mode) {
        case AccessibilityMode.COLORBLIND:
          setTheme(ThemeMode.COLORBLIND)
          break
        case AccessibilityMode.HIGH_CONTRAST:
          setTheme(ThemeMode.HIGH_CONTRAST)
          break
        default:
          setTheme(ThemeMode.LIGHT)
          break
      }
    }

    setIsOpen(false)
  }

  const handleFontSizeChange = (fontSize: FontSize) => {
    setFontSize(fontSize)
  }

  const handleReducedMotion = () => {
    setReducedMotion(!settings.reducedMotion)
  }

  const handleReset = () => {
    resetSettings()
    setIsOpen(false)
  }

  return (
    <div style={{ position: 'relative' }}>
      <S.Button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Configurações de acessibilidade"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <IoAccessibility size={24} />
      </S.Button>

      {isOpen && (
        <S.Menu>
          <S.MenuTitle>Configurações de Acessibilidade</S.MenuTitle>

          <div>
            <strong>Modo de Cor:</strong>
            <S.MenuItem
              active={settings.mode === AccessibilityMode.NORMAL}
              onClick={() => handleModeChange(AccessibilityMode.NORMAL)}
            >
              Normal
            </S.MenuItem>
            <S.MenuItem
              active={settings.mode === AccessibilityMode.COLORBLIND}
              onClick={() => handleModeChange(AccessibilityMode.COLORBLIND)}
            >
              Amigável para Daltonismo
            </S.MenuItem>
            <S.MenuItem
              active={settings.mode === AccessibilityMode.HIGH_CONTRAST}
              onClick={() => handleModeChange(AccessibilityMode.HIGH_CONTRAST)}
            >
              Alto Contraste
            </S.MenuItem>
          </div>

          <div style={{ marginTop: '0.5rem' }}>
            <strong>Tamanho da Fonte:</strong>
            <S.MenuItem
              active={settings.fontSize === FontSize.NORMAL}
              onClick={() => handleFontSizeChange(FontSize.NORMAL)}
            >
              Normal
            </S.MenuItem>
            <S.MenuItem
              active={settings.fontSize === FontSize.LARGE}
              onClick={() => handleFontSizeChange(FontSize.LARGE)}
            >
              Grande
            </S.MenuItem>
            <S.MenuItem
              active={settings.fontSize === FontSize.EXTRA_LARGE}
              onClick={() => handleFontSizeChange(FontSize.EXTRA_LARGE)}
            >
              Extra Grande
            </S.MenuItem>
          </div>

          <div style={{ marginTop: '0.5rem' }}>
            <S.MenuItem
              active={settings.reducedMotion}
              onClick={handleReducedMotion}
            >
              {settings.reducedMotion ? (
                <IoEyeOff size={16} />
              ) : (
                <IoEye size={16} />
              )}
              Reduzir Movimento
            </S.MenuItem>
          </div>

          <div
            style={{
              marginTop: '0.5rem',
              borderTop: '1px solid #eee',
              paddingTop: '0.5rem'
            }}
          >
            <S.MenuItem onClick={handleReset}>Restaurar Padrão</S.MenuItem>
          </div>
        </S.Menu>
      )}
    </div>
  )
}

export default AccessibilityButton

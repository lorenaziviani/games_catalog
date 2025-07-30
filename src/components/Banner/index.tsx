import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'
import * as S from './styles'

type BannerProps = {
  children: ReactNode
  badge?: {
    icon: IconType
    text: string
  }
}

const Banner = ({ children, badge }: BannerProps) => {
  return (
    <S.BannerSection>
      <S.BannerContent>
        {badge && (
          <S.Badge>
            <badge.icon /> {badge.text}
          </S.Badge>
        )}
        {children}
      </S.BannerContent>
    </S.BannerSection>
  )
}

export default Banner

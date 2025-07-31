import { mobile, tablet } from '@/styles/breakpoint'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 24px;
  color: ${({ theme }) => theme.primary};

  ${mobile} {
    padding: 16px;
  }
`

export const Header = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;

  ${tablet} {
    flex-direction: column;
    gap: 16px;
  }

  ${mobile} {
    margin-bottom: 24px;
  }
`

export const ImageContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 300px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  ${tablet} {
    width: 100%;
    height: 250px;
  }

  ${mobile} {
    height: 200px;
  }
`

export const HeaderContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${mobile} {
    gap: 12px;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  ${mobile} {
    gap: 24px;
  }
`

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${mobile} {
    gap: 8px;
  }
`

export const ScreenshotsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 8px;

  ${tablet} {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }

  ${mobile} {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 8px;
  }
`

export const DescriptionContainer = styled.div`
  background-color: ${({ theme }) => theme.quaternary};
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;

  p {
    line-height: 1.6;
    margin: 0 0 12px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 16px 0 8px 0;
    font-weight: bold;
    color: ${({ theme }) => theme.primary};
  }

  ul,
  ol {
    margin: 8px 0;
    padding-left: 20px;
  }

  li {
    margin: 4px 0;
  }

  strong,
  b {
    font-weight: bold;
  }

  em,
  i {
    font-style: italic;
  }

  a {
    color: ${({ theme }) => theme.quinary};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.quinary};
    padding-left: 16px;
    margin: 12px 0;
    font-style: italic;
  }

  ${mobile} {
    padding: 12px;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 12px 0 6px 0;
    }

    ul,
    ol {
      padding-left: 16px;
    }
  }
`

export const ScreenshotItem = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 120px;
    object-fit: cover;

    ${mobile} {
      height: 80px;
    }
  }
`

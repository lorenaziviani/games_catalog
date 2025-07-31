import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Marvel', sans-serif;
    list-style: none;
  }
  body {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.secondary};
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.primary};
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.quaternary};
      border-radius: 10px;
      border: 1px solid ${({ theme }) => theme.primary};
    }
    &::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.secondary};
    }
  }

  /* Accessibility Styles */

  /* Large Text */
  .large-text {
    font-size: 18px !important;
  }

  .large-text h1 { font-size: 2.5rem !important; }
  .large-text h2 { font-size: 2rem !important; }
  .large-text h3 { font-size: 1.75rem !important; }
  .large-text h4 { font-size: 1.5rem !important; }
  .large-text h5 { font-size: 1.25rem !important; }
  .large-text h6 { font-size: 1.125rem !important; }

  /* Extra Large Text */
  .extra-large-text {
    font-size: 20px !important;
  }

  .extra-large-text h1 { font-size: 3rem !important; }
  .extra-large-text h2 { font-size: 2.5rem !important; }
  .extra-large-text h3 { font-size: 2rem !important; }
  .extra-large-text h4 { font-size: 1.75rem !important; }
  .extra-large-text h5 { font-size: 1.5rem !important; }
  .extra-large-text h6 { font-size: 1.25rem !important; }

  /* Reduced Motion */
  .reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .reduced-motion *,
  .reduced-motion *::before,
  .reduced-motion *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Large Text */
  .large-text {
    font-size: 18px !important;
  }

  .large-text h1 { font-size: 2.5rem !important; }
  .large-text h2 { font-size: 2rem !important; }
  .large-text h3 { font-size: 1.75rem !important; }
  .large-text h4 { font-size: 1.5rem !important; }
  .large-text h5 { font-size: 1.25rem !important; }
  .large-text h6 { font-size: 1.125rem !important; }

  /* Extra Large Text */
  .extra-large-text {
    font-size: 20px !important;
  }

  .extra-large-text h1 { font-size: 3rem !important; }
  .extra-large-text h2 { font-size: 2.5rem !important; }
  .extra-large-text h3 { font-size: 2rem !important; }
  .extra-large-text h4 { font-size: 1.75rem !important; }
  .extra-large-text h5 { font-size: 1.5rem !important; }
  .extra-large-text h6 { font-size: 1.25rem !important; }

  /* Reduced Motion */
  .reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .reduced-motion *,
  .reduced-motion *::before,
  .reduced-motion *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
`
export default GlobalStyle
export const MainContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2%;
`

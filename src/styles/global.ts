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
  }
`
export default GlobalStyle
export const MainContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2%;
`

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import App from './App.jsx'

const theme = createTheme({
  palette: {
    primary: {
      main: '#40A34E',
      dark: '#2a6a33'
    },
    secondary: {
      main: '#F40204',
    },
    black: {
      main: '#000'
    }
  },
  typography:{
    fontFamily:[
      'Fira Sans'
    ]
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)

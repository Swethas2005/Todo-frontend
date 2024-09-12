//packages
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react'

//local imports
import App from './App.jsx'
import { AuthContextProvider } from './contexts/AuthContextProvider.jsx'

//rendering the App component
createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
  <BrowserRouter>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </BrowserRouter>
  </AuthContextProvider>
);

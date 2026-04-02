import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthProvider from './context/AuthContextProvider.tsx'
import { GlobalContextProvider } from './context/ExpenseContext.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <GlobalContextProvider>
    <App />
    </GlobalContextProvider>
  </AuthProvider>,
)

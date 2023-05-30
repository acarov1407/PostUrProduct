import '@/styles/globals.css';
import { AppProvider } from '@/context/app/AppProvider';
import { AuthProvider } from "@/context/auth/AuthProvider";


function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
  )
}

export default App
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./components/App/App.tsx"
import "modern-normalize"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{ duration: 3000, removeDelay: 1000 }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)

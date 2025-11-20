import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query"
import { ThemeProvider } from "./contexts/providers/ThemeProvider"
import { RouterProvider } from "react-router"
import { Toaster } from "sonner"
import { router } from "./routes"

function App() {
  return (
     <QueryClientProvider client={queryClient}>
          {/* <ReduxProvider store={store}> */}
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <RouterProvider router={router} />
              <Toaster />
          </ThemeProvider>
          {/* </ReduxProvider> */}
      </QueryClientProvider>
  )
}

export default App

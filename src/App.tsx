/**
 * I like to keep this file (App.tsx) outside of the pages folder
 * since it is more like a container for the pages and not a page
 * by itself
 */
import { HomePage } from "@pages/HomePage";
import { MapProvider } from "@contexts/MapContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UsersProvider } from "@contexts/UsersContext";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <QueryClientProvider client={queryClient}>
        <UsersProvider>
          <MapProvider>
            <HomePage />
          </MapProvider>
        </UsersProvider>
      </QueryClientProvider>
    </SnackbarProvider>
  );
}

export default App;

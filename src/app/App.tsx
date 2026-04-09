import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import ViewportToggle from "./components/ViewportToggle";

export default function App() {
  return (
    <>
      <ViewportToggle />
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
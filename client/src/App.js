import React from "react";
import RoutesIndex from "./routes";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <RoutesIndex />
    </AppProvider>
  );
}

export default App;

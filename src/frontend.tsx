/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { createRoot } from "react-dom/client";
import { LogtoProvider } from '@logto/react';
import { App } from "./App";
import { logtoConfig } from './logto-config';

function start() {
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <LogtoProvider config={logtoConfig} navigate={url => (window.location.href = url)}>
      <App />
    </LogtoProvider>
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

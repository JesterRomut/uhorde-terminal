import { Suspense } from "solid-js";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";

import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => {
        return <Suspense>{props.children}</Suspense>;
      }}>
      <FileRoutes />
    </Router>
  );
}
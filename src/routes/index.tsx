import { createSignal, Match, onMount, Show, Suspense, Switch } from "solid-js";
import tabRegistry from "../data/tabs";

export default function Index() {
    const [tab, setTab] = createSignal("main");
    const [debugMode, setDebugMode] = createSignal(false)
    onMount(() => {
        if (sessionStorage?.getItem("debug") != null) {
            setDebugMode(true);
        }
    })
  
    return (
        <>
            <Show when={debugMode()}>
                <div>Debug Mode</div>
            </Show>
        <div>
          <Suspense fallback={<div class="loader">Loading...</div>}>
            {tabRegistry.get(tab())}
          </Suspense>
        </div>
      </>
    );
  };
  
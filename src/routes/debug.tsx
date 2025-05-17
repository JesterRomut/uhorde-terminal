import { createSignal, Match, onMount, Suspense, Switch } from "solid-js";
import tabRegistry from "../data/tabs";
import { redirect, useNavigate } from "@solidjs/router";

export default function Debug() {
    const [tab, setTab] = createSignal("main");
    const updateTab = (id: string) => () => setTab(id);
    const navigate = useNavigate();

    onMount(() => {
        
    sessionStorage.setItem("debug", "enabled")
    navigate("/", { replace: true });
    })
    return (
      <>
        <div>Here be Debugs</div>
      </>
    );
  };
  
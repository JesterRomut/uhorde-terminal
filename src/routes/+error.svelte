<script>
    import { page } from "$app/state";
    import ConsoleScreen from "$lib/components/ConsoleScreen.svelte";
    import "../app.css";
</script>

<ConsoleScreen>
    <h1>{page.status}</h1>
    <span>{page.error?.message}</span>
</ConsoleScreen>

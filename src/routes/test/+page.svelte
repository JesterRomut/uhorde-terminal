<script>
    import ByteSeparator from "$lib/components/ByteSeparator.svelte";
    import TypewriterMover from "$lib/components/typewriter/TypewriterMover.svelte";
    import TypewriterMoverDeep from "$lib/components/typewriter/TypewriterMoverDeep.svelte";
    import TypewriterMoverCursored from "$lib/components/typewriter/TypewriterMoverCursored.svelte";
    import { typewriterMoverCursoredDeep } from "$lib/components/typewriter/typewriterMover";
</script>

<TypewriterMoverCursored fn={typewriterMoverCursoredDeep}>
    <ByteSeparator>11111111111111111111111</ByteSeparator>
</TypewriterMoverCursored>

<TypewriterMoverCursored fn={typewriterMoverCursoredDeep}>
    <div>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <div>
            <p>4</p>
        </div>
    </div>
    <p>5</p>
    <p>6</p>
</TypewriterMoverCursored>

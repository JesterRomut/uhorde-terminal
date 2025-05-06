<script>
    /**@typedef {object} Props
     * @property {number} [rotation]
     * @property {boolean} mouseOnList
     */
    /**@type {Props}*/
    let { rotation, mouseOnList = $bindable() } = $props();
    if (!rotation) rotation = 0;
</script>

<div class:-cardboard-hovering={mouseOnList}>Hello, I'm a card.</div>

<style>
    div {
        position: relative;
        width: 20vw;
        height: 24vw;
        max-width: 10rem;
        max-height: 12rem;
        background: linear-gradient(#fff2, transparent);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 25px 25px rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(10px);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s;
        border-radius: 10px;
        margin: 0 -45px;
        transform: rotate(calc(var(--card-rotation) * 1deg));
    }
    div:hover {
        z-index: 100;
        transform: none;
    }
    .-cardboard-hovering {
        margin: 0;
    }
</style>

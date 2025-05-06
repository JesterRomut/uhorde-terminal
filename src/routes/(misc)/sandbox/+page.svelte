<script>
    import ByteSeparator from "$lib/components/ByteSeparator.svelte";
    import TypewriterMover from "$lib/components/typewriter/TypewriterMover.svelte";
    import TypewriterMoverDeep from "$lib/components/typewriter/TypewriterMoverDeep.svelte";
    import TypewriterMoverCursored from "$lib/components/typewriter/TypewriterMoverCursored.svelte";
    import { typewriterMoverCursoredDeep } from "$lib/components/typewriter/typewriterMover";
    import Cardboard from "$lib/components/Cardboard.svelte";
    import ConsoleScreen from "$lib/components/ConsoleScreen.svelte";
    import TerminalChoice from "$lib/components/TerminalChoice.svelte";
    import { goto } from "$app/navigation";
</script>

<ConsoleScreen>
    <TypewriterMoverCursored fn={typewriterMoverCursoredDeep}>
        <ByteSeparator>拒绝访问。X 侮辱删去不需要的文件</ByteSeparator>
    </TypewriterMoverCursored>
    <br />
    <TypewriterMoverCursored removeCursorWhenFinish={false}
        >你好。这里是测试场地。
        <p>
            第一行的文本是我在研究如何把元素连带子元素拆分开来，实现一个一个打字的效果。（跟主页那个一个一个打的不一样！！这个不会让动态元素无效化，很重要！！！）
        </p>
        <p>很明显爆了。文本次序都错乱了。</p>
        <p>下面是一些神秘的小卡片。用于互动叙事。</p>
        <p>
            比如说在屏幕上放一个插槽插入角色卡，然后下一章叙事就是该角色的视角，云云。
        </p>
        <p>
            但卡面也要自己画，我还不知道弄啥画风。有点想弄个黑白的这样不伤眼。
        </p>
    </TypewriterMoverCursored>

    <TerminalChoice
        choices={[
            {
                text: "[返回 / RETURN]",
                waitingTime: 1000,
                onclick: (e) => {
                    goto("/");
                },
            },
        ]}
    />
</ConsoleScreen>

<Cardboard />

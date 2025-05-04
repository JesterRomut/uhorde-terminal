// import MapleMonoNormalNL from "$lib/assets/MapleMonoNormalNL[wght].ttf";
// import MapleMonoNormalItalic from "$lib/assets/MapleMonoNormalNL-Italic[wght].ttf";

/**@type {import("./$types").PageLoad} */
export async function load({ params }) {
    await new Promise((fulfil) => {
        setTimeout(fulfil, 1000);
    });
    return {
        loaded: true,
        // font: MapleMonoNormalNL,
        // fontItalic: MapleMonoNormalItalic,
    };
}

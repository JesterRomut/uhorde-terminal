//import ChargeBladePic from "$lib/assets/IMG_2860_zh.png?enhanced";
import { WeightedRandom } from "$lib/classes/WeightedRandom";

/** @type {WeightedRandom<string>} */
const codes = new WeightedRandom()
    .add("因为我喜欢你，没有理由。", 1)
    .add("因为它们都是单个的。", 1)
    .add("因为根本就没有答案。", 1);

/**@type {import("./$types").PageLoad} */
export async function load({ params }) {
    await new Promise((fulfil) => {
        setTimeout(fulfil, 1000);
    });
    return {
        codes: codes,
        //chargeBlade: ChargeBladePic,
    };
}

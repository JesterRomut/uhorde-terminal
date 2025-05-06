//import ChargeBladePic from "$lib/assets/IMG_2860_zh.png?enhanced";
import { WeightedRandom } from "$lib/classes/WeightedRandom";
import { accessCodes } from "$lib/documents/accessCode";

/**@type {import("./$types").PageLoad} */
export async function load({ params }) {
    // await new Promise((fulfil) => {
    //     setTimeout(fulfil, 1000);
    // });
    return {
        codes: accessCodes,
        //chargeBlade: ChargeBladePic,
    };
}

import { WeightedRandom } from "$lib/classes/WeightedRandom";

/** @type {WeightedRandom<string>} */
export const accessCodes = new WeightedRandom()
    .add("因为我喜欢你，没有理由。")
    .add("因为它们都是单个的。")
    .add("因为根本就没有答案。");

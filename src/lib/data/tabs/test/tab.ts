export interface Data {
    //codes: WeightedRandom<string>;
}

// const accessCodes = new WeightedRandom<string>()
//     .add("因为我喜欢你，没有理由。")
//     .add("因为它们都是单个的。")
//     .add("因为根本就没有答案。");

/**@returns {Promise<Data>} */
export default async function load(): Promise<Data> {
    return {
        //codes: accessCodes,
    };
}

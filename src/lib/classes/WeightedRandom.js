/**
 * @template T
 */
export class WeightedRandom {
    /**@type {?Map<T, number>} */
    items = null;
    constructor() {
        this.items = new Map();
    }
    /**
     * 添加物件与权重
     * @param {T} item
     * @param {number} weight
     *
     * @returns {WeightedRandom<T>}
     */
    add(item, weight) {
        this.items?.set(item, weight);
        return this;
    }
    /**
     * 返回所有权重之总和
     * @returns {number}
     */
    sum() {
        if (!this.items) throw new ReferenceError("WeightedRandom not inited!");
        const items = Array.from(this.items.values());
        let total = 0.0;
        items.forEach((value) => {
            total += value;
        });
        return total;
    }
    /**
     * 获取按权重的随机物品
     * @returns {T | null}
     */
    roll() {
        if (!this.items) throw new ReferenceError("WeightedRandom not inited!");
        const items = Array.from(this.items);

        if (items.length == 0) throw new RangeError("WeightedRandom is empty!");

        let max = items[0][1];
        let random = Math.random() * this.sum();

        for (let i = 0; i < items.length; i++) {
            if (random < max) {
                return items[i][0];
            } else if (i == items.length - 1) {
                return items[items.length - 1][0];
            }
            max += items[i + 1][1];
        }
        return null;
    }
}

// function weightedRandom() {
//     let builder = {
//         /**
//          * @type {Map<any, number>}
//          */
//         items: new Map(),
//         /**
//          * @param {any} item
//          * @param {number} weight
//          */
//         add: function (item, weight) {
//             builder.items.set(item, weight);
//             return builder;
//         },
//         sum: function () {
//             const items = Array.from(this.items.values());
//             let total = 0.0;
//             items.forEach((value) => {
//                 total += value;
//             });
//             return total;
//         },
//         getItem: function () {
//             const items = Array.from(this.items);
//             //var pmf = [0.8, 0.1, 0.1];
//             //var pmf = Array.from(items.values())
//             //var cdf = pmf.map((sum => value => sum += value)(0));

//             let max = items[0][1];
//             let random = Math.random() * this.sum();

//             for (let index = 0; index < items.length; index++) {
//                 if (random < max) {
//                     return items[index][0];
//                 } else if (index == items.length - 1) {
//                     return items[items.length - 1][0];
//                 }
//                 max += items[index + 1][1];
//             }

//             return -1;
//         },
//     };

//     return builder;
// }

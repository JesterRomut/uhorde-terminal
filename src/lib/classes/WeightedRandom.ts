type Random = () => number;

export default class WeightedRandom<T> {
    items: Map<T, number> | null | undefined = null;
    random: Random = Math.random;

    constructor() {
        this.items = new Map();
        this.random = Math.random;
    }
    /**
     * 添加物件与权重
     */
    add(item: T, weight: number = 1): WeightedRandom<T> {
        this.items?.set(item, weight);
        return this;
    }
    /**
     *
     */
    rng(rng: Random): WeightedRandom<T> {
        this.random = rng;
        return this;
    }
    /**
     * 返回所有权重之总和
     */
    sum(): number {
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
     */
    roll(): T {
        if (!this.items) throw new ReferenceError("WeightedRandom not inited!");
        const items = Array.from(this.items);

        if (items.length == 0) throw new RangeError("WeightedRandom is empty!");

        let max = items[0][1];
        let random = this.random() * this.sum();

        for (let i = 0; i < items.length; i++) {
            if (random < max) {
                return items[i][0];
            } else if (i == items.length - 1) {
                return items[items.length - 1][0];
            }
            max += items[i + 1][1];
        }
        throw RangeError("Roll Failed!");
    }
}

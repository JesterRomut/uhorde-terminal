interface IRegistry<T> {
    register(
        key: string,
        service: unknown
    ): IRegistry<Record<string, unknown> & T>;
    get<K extends keyof T>(key: K): T[K];
    registry: T;
}
export default class Registry<T extends object> implements IRegistry<T> {
    private constructor(private _registry: T) {}
    register<K extends string, S>(
        key: K,
        service: S
    ): Registry<Record<K, S> & T> {
        // add service to registry and return the same object with a narrowed type
        (this._registry as any)[key] = service;
        return this as any as Registry<Record<K, S> & T>;
    }
    get<K extends keyof T>(key: K): T[K] {
        if (!(key in this._registry)) {
            throw new Error(`Invalid type ${String(key)}`);
        }
        return this._registry[key];
    }
    get registry() {
        return this._registry;
    }
    set registry(value) {
        this._registry = value;
    }

    static create(): Registry<{}> {
        return new Registry({});
    }

    // static satisfies<T>(): SatisfiedRegistry<{}, T> {
    //     return new SatisfiedRegistry<{}, T>({});
    // }
}

// class SatisfiedRegistry<T extends object, R> implements IRegistry<T> {
//     constructor(private _registry: T) {}
//     register<K extends string, S extends R>(
//         key: K,
//         service: S
//     ): Registry<Record<K, S> & T> {
//         // add service to registry and return the same object with a narrowed type
//         service satisfies R;
//         (this._registry as any)[key] = service;
//         return this as any as Registry<Record<K, S> & T>;
//     }
//     get<K extends keyof T>(key: K): T[K] {
//         if (!(key in this._registry)) {
//             throw new Error(`Invalid type ${String(key)}`);
//         }
//         return this._registry[key];
//     }
//     get registry() {
//         return this._registry;
//     }
//     set registry(value) {
//         this._registry = value;
//     }
// }

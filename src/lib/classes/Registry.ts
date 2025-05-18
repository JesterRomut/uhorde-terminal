export default class Registry<T extends object> {
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

    static object(): Registry<{}> {
        return new Registry({});
    }

    // static map<K>(): Registry<Map<string, K>> {
    //     return new Registry(new Map<string, K>());
    // }
}

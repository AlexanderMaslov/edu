export interface Cache<T> {
  get: (key: string) => T | undefined;
  set: (key: string, value: T) => void;
  clone: <U>(transform: (elem: T) => U) => Cache<U>;
}

const createCache = <T>(initialCache?: Record<string, T>): Cache<T> => {
  const cache: Record<string, T> = initialCache || {};

  return {
    get: (key) => cache[key],
    set: (key, value) => {
      cache[key] = value;
    },
    clone: (transform) => {
      const newCache: Record<string, any> = {};

      for (const key in cache) {
        newCache[key] = transform(cache[key]);
      }
      return createCache(newCache);
    },
  };
};

const numberCache = createCache<number>();
numberCache.set("a", 1);
numberCache.set("b", 2);

const stringCache = numberCache.clone((elem) => String(elem));

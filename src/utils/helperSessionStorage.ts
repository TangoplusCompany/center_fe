export const session = {
  get<T = unknown>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (e) {
      console.error("sessionStorage.get error:", e);
      return null;
    }
  },

  set<T = unknown>(key: string, value: T): void {
    try {
      const json = JSON.stringify(value);
      sessionStorage.setItem(key, json);
    } catch (e) {
      console.error("sessionStorage.set error:", e);
    }
  },

  delete(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (e) {
      console.error("sessionStorage.delete error:", e);
    }
  },

  clear(): void {
    try {
      sessionStorage.clear();
    } catch (e) {
      console.error("sessionStorage.clear error:", e);
    }
  },
};

import {inject, Injectable} from '@angular/core';
import {BROWSER_STORAGE} from '@app/core/tokens';

@Injectable({
  providedIn: 'root'
})
export class LocalStorage {
  #storage = inject(BROWSER_STORAGE);

  get<T>(key: string): T | null {
    const item = this.#storage?.getItem(key);

    if (!item) {
      return null;
    }

    return this.isJSONValid(item) ? (JSON.parse(item) as T) : (item as T);
  }

  set(key: string, value: unknown): void {
    this.#storage?.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    this.#storage?.removeItem(key);
  }

  removeKeys(keys: string[]): void {
    keys.forEach(key => this.#storage?.removeItem(key));
  }

  clear(): void {
    this.#storage?.clear();
  }

  private isJSONValid(value: string): boolean {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  }
}

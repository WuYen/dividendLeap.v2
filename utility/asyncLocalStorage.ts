import { AsyncLocalStorage } from 'async_hooks';

const asyncLocalStorage = new AsyncLocalStorage<Map<string, string>>();

export default asyncLocalStorage;

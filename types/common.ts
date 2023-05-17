export type Cache =
  | 'no-cache'
  | 'no-store'
  | 'cache-force'
  | 'reload'
  | 'only-if-cached';

export interface Meta {
  hasMore: boolean;
  count: number;
}

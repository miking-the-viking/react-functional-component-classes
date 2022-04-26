export function stringOfLength(length: number): string {
  return Array.from(new Array(length).keys()).join();
}

export type VfcParams<T> = T extends React.VFC<infer R> ? R : never;

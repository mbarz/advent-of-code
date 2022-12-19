export function isDefinded<T>(o: T | null | undefined): o is T {
  return o != null;
}

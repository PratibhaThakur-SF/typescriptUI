export interface ICrud<T> {
  add(arg: T): void;
  getall(): T[];
  update(arg: T): void;
  delete(arg: T): void;
}

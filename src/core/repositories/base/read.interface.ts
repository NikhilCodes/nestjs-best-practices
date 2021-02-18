export interface IRead<T> {
  findOne(item: T): Promise<T>;
  find(item?: T): Promise<T[]>;
  findOneById(id: string): Promise<T>;
}

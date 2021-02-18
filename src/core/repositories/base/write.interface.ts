export interface IWrite<T> {
  insertOne(item: T): Promise<T>;
  updateOneById(id: string, item: T): Promise<boolean>;
  deleteOneById(id: string): Promise<boolean>;
}

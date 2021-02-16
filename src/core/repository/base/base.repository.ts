// import all interfaces
import { IWrite } from './write.interface';
import { IRead } from './read.interface';

// that class only can be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  insertOne(item: T): Promise<T> {
    throw new Error('Method not implemented.');
  }

  updateOneById(id: string, item: T): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  deleteOneById(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  find(item: T): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  findOneById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }

  findOne(item: T): Promise<T> {
    throw new Error('Method not implemented');
  }
}

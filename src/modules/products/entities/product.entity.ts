import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export default class Product {
  @ObjectIdColumn()
  public id: ObjectID;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public price: number;
}

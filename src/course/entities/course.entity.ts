import { IBaseEntity, BaseEntity } from "src/database/interfaces/base.entity";

export interface ICourse extends IBaseEntity {
  name: string;
}

export class Course extends BaseEntity implements ICourse {
  name: string;
}

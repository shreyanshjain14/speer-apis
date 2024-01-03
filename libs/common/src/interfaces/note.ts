import { IUser } from "@libs/common/interfaces";

export interface INote {
  id?: number;
  ulid?: number;
  description?: string;
  status?: number;
  createdBy?: number;
  createdByUser?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
  q?: string;
  page?: number;
  perPage?: number;
  paginate?: boolean;
}

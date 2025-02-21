import { WithId } from 'mongodb';

export interface IAccount {
  name: string;
  createdAt: Date;
  deviceToken?: string;
}

export type AccountWithId = WithId<IAccount>;
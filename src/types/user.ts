import { IRole } from './role';

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  provider: string;
  picture: string | null;
  roles: IRole[];
  createdAt: string;
  updatedAt: string;
  address?: string;
  name?: string;
  phoneNumber?: string;
  status?: string;
  company?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  role?: string;
  avatarUrl?: string;
}

export interface IUserItem extends IUser {
  date? : string;
}

export type IUserTableFilterValue = string | string[];

export type IUserTableFilters = {
  name: string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
};




export interface IUser {
  id: number;
  username: string;
  email: string;
  registrationDate: string;
  deleteDate?: null;
  status: string;
  createdAt: string;
  updatedAt: string;
  isSelected?: boolean;
}

import { ObjectId } from "mongodb";

export interface INotification {
  _id?: ObjectId;
  accountId: ObjectId;
  title: string;
  message: string;
  createdAt: Date;
  updatedAt?: Date;
  status: "pending" | "sent" | "failed";
}

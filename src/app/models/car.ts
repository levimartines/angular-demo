import {Customer} from "./customer";

export interface Car {
  id: number;
  name: string;
  comments: string;
  plate: string;
  customer: Customer;
}

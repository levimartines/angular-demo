import {Customer} from "./customer";

export interface Car {
  id: number;
  model: string;
  color: string;
  comments: string;
  plate: string;
  customer: Partial<Customer>;
}

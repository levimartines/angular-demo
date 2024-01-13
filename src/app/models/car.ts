import {Customer} from "./customer";
import {Estimate} from "./estimate";

export interface Car {
  id: number;
  model: string;
  color: string;
  comments: string;
  plate: string;
  customer: Partial<Customer>;
  estimates: Estimate[];
}

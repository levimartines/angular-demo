import {Customer} from "./customer";
import {Service} from "./service";

export interface Car {
  id: number;
  model: string;
  color: string;
  comments: string;
  plate: string;
  customer: Partial<Customer>;
  services: Partial<Service>[];
}

import {ServiceItem} from "./service-item";

export interface Service {
  id: number;
  date: Date;
  done: boolean;
  items: ServiceItem[];
}

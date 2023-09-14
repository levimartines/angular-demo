import {ServiceItem} from "./service-item";

export interface Service {
  date: Date;
  serviceItems: ServiceItem[];
}

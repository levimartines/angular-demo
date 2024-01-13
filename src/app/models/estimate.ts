import {EstimateItem} from "./estimate-item";

export interface Estimate {
  id: number;
  date: Date;
  done: boolean;
  total: number;
  items: EstimateItem[];
}


import { Row } from "./row-seat";


export interface Show {
  playId: string;
  daysOfWeek: string[];
  time: string;
  showDate: string;
  price: number;
  rows: Row[];
}
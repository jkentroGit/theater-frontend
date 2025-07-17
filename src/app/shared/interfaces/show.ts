
import { Row } from "./row-seat";


export interface Show {
  _id?: string,
  playId: string;
  time: string;
  showDate: Date;
  price: number;
  rows: Row[];
  cardColour?: string;
}


import { Row } from "./row-seat";


export interface Show {
  _id?: String,
  playId: String;
  time: String;
  showDate: Date;
  price: Number;
  rows: Row[];
}
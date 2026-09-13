export type entry = {
  hour: number;
  minutes: number;
  amPm?: string;
  lat: number;
  long: number;
  busStop?: string;
  busRoute?: string;
  id?: string;
};

export type marker = {
  lat: number;
  long: number;
  busRoute?: string;
};

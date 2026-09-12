export type entry = {
  hour: number;
  minutes: number;
  lat: number;
  long: number;
  busRoute?: string;
};

export type marker = {
  lat: number;
  long: number;
  busRoute?: string;
};

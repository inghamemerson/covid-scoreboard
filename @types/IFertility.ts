import { ICountry } from "./ICountry";

export interface IFertility {
  id?:                                      number;
  country?:                                 ICountry;
  country_id?:                              string;
  year?:                                    number;
  value?:                                   number;
}

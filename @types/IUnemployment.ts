import { ICountry } from "./ICountry";

export interface IUnemployment {
  id?:                                      number;
  country?:                                 ICountry;
  country_id?:                              string;
  year?:                                    number;
  value?:                                   number;
}

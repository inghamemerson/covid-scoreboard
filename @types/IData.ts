import { ICountry } from "./ICountry";

export interface IData {
  id?:                                      number;
  country?:                                 ICountry;
  country_id?:                              string;
  total_cases?:                             number;
  total_deaths?:                            number;
  total_vaccinations?:                      number;
  people_fully_vaccinated?:                 number;
}

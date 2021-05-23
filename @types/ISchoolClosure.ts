import { ICountry } from "./ICountry";

export interface ISchoolClosure {
  country?:                       ICountry;
  country_id?:                    string;
  income_group?:                  string;
  days_academic_break?:           number;
  days_fully_closed?:             number;
  days_fully_open?:               number;
  days_partially_closed?:         number;
  instruction_days?:              number;
  pre_primary_pop?:        number;
  primary_pop?:            number;
  lower_secondary_pop?:    number;
  upper_secondary_pop?:    number;
}

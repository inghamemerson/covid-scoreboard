import { IClosure } from "./IClosure";
import { IUnemployment } from "./IUnemployment";
import { IData } from "./IData";

export interface ICountry {
  id?:                         number;
  iso_code:                    string;
  slug?:                       string;
  emoji?:                      string;
  continent?:                  string;
  location?:                   string;
  population?:                 number;
  population_density?:         number;
  median_age?:                 number;
  aged_65_older?:              number;
  aged_70_older?:              number;
  gdp_per_capita?:             number;
  life_expectancy?:            number;
  human_development_index?:    number;
  extreme_poverty?:            number;
  score?:                      number;
  data?:                       IData[];
  closure?:                    IClosure[];
  unemployment?:               IUnemployment[];
}

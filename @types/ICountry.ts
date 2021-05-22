import { IData } from "./IData";

export interface ICountry {
  id:                          number;
  iso_code:                    string
  slug?:                       string
  emoji?:                      string
  continent?:                  string
  location?:                   string
  population?:                 number
  population_density?:         number
  median_age?:                 number
  aged_65_older?:              number
  aged_70_older?:              number
  gdp_per_capita?:             number
  cardiovasc_death_rate?:      number
  diabetes_prevalence?:        number
  handwashing_facilities?:     number
  hospital_beds_per_thousand?: number
  life_expectancy?:            number
  human_development_index?:    number
  stringency_index?:           number
  extreme_poverty?:            number
  female_smokers?:             number
  male_smokers?:               number
  data:                        IData[]
}

import { ICountry } from "./ICountry";

export interface IData {
  id:                                       number
  country?:                                 ICountry
  countryId?:                               string
  date:                                     string
  total_cases?:                             number
  new_cases?:                               number
  new_cases_smoothed?:                      number
  total_deaths?:                            number
  new_deaths?:                              number
  new_deaths_smoothed?:                     number
  total_cases_per_million?:                 number
  new_cases_per_million?:                   number
  new_cases_smoothed_per_million?:          number
  total_deaths_per_million?:                number
  new_deaths_per_million?:                  number
  new_deaths_smoothed_per_million?:         number
  reproduction_rate?:                       number
  icu_patients?:                            number
  icu_patients_per_million?:                number
  hosp_patients?:                           number
  hosp_patients_per_million?:               number
  weekly_icu_admissions?:                   number
  weekly_icu_admissions_per_million?:       number
  weekly_hosp_admissions?:                  number
  weekly_hosp_admissions_per_million?:      number
  total_tests?:                             number
  new_tests?:                               number
  total_tests_per_thousand?:                number
  new_tests_per_thousand?:                  number
  new_tests_smoothed?:                      number
  new_tests_smoothed_per_thousand?:         number
  positive_rate?:                           number
  tests_per_case?:                          number
  total_vaccinations?:                      number
  people_vaccinated?:                       number
  people_fully_vaccinated?:                 number
  new_vaccinations?:                        number
  new_vaccinations_smoothed?:               number
  total_vaccinations_per_hundred?:          number
  people_vaccinated_per_hundred?:           number
  people_fully_vaccinated_per_hundred?:     number
  new_vaccinations_smoothed_per_million?:   number
}

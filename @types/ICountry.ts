import { ISchoolClosure } from "./ISchoolClosure";
import { IFertility } from "./IFertility";
import { IUnemployment } from "./IUnemployment";
import { IData } from "./IData";

export interface ICountry {
  id?:                         number;
  iso_code:                    string;
  slug?:                       string;
  emoji:                       string | null;
  continent:                   string | null;
  location:                    string | null;
  population:                  number | null;
  population_density:          number | null;
  median_age?:                  number | null;
  aged_65_older?:               number | null;
  aged_70_older?:               number | null;
  gdp_per_capita:              number | null;
  life_expectancy:             number | null;
  human_development_index:     number | null;
  extreme_poverty:             number | null;
  deathScore?:                 number | null;
  vaccScore?:                  number | null;
  econScore?:                  number | null;
  socialScore?:                number | null;
  overallScore?:                number | null;
  data?:                       IData[];
  schoolClosure?:             ISchoolClosure[];
  unemployment?:               IUnemployment[];
  fertility?:                  IFertility[];
}

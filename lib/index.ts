interface IFatalityRation {
  total_cases: number | null
  total_deaths: number | null
}

export const fatalityRatio = ({ total_cases, total_deaths }: IFatalityRation): number => {
  if (total_cases && total_deaths) {
    return ((total_deaths / total_cases) * 100);
  };
  return 100;
};

interface IdeathPercentage {
  population: number | null
  total_deaths: number | null
}

export const deathPercentage = ({ population, total_deaths }: IdeathPercentage): number => {
  if (population && total_deaths) {
    return ((total_deaths / population) * 100);
  };
  return 100;
};

interface IVaccinePercentage {
  population: number | null;
  total_vaccinations: number | null;
}

export const vaccinePercentage = ({ population, total_vaccinations }: IVaccinePercentage): number => {
  if (population && total_vaccinations) {
    return ((total_vaccinations / population) * 100);
  };
  return 100;
};

// export const composite

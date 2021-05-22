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

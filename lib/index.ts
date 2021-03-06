import { ICountry } from "../@types/ICountry";

/*
  TODO: this is scoring too high and needs to be better benchmarkd
*/
export const diseaseScore = (country: ICountry): number | null => {
  const scores: number[] = [];
  // @ts-ignore
  if (country.population && country?.data[0]?.total_deaths) {
    if (country?.data[0]?.total_deaths > country.population) {
      return null;
    }
    // return 100 - ((country.data[0].total_deaths / country.population) * 100);
    scores.push(100 - ((country.data[0].total_deaths / country.population) * 100));
  };

  // @ts-ignore
  if (country.population && country?.data[0]?.total_cases) {
    if (country?.data[0]?.total_cases > country.population) {
      return null;
    }
    // return 100 - ((country.data[0].total_cases / country.population) * 100);
    scores.push(100 - ((country.data[0].total_cases / country.population) * 100));
  };

  if (scores.length) {
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }

  return null;
};

export const vaccineScore = (country: ICountry): number | null => {
  // @ts-ignore
  if (country.population && country?.data[0]?.people_fully_vaccinated) {
    if (country?.data[0]?.people_fully_vaccinated > country.population) {
      return null;
    }
    return ((country.data[0].people_fully_vaccinated / country.population) * 100);
  };
  return null;
};

export const econScore = (country: ICountry): number | null => {
  const data2019 = country.unemployment?.find((u) => u.year === 2019);
  const data2020 = country.unemployment?.find((u) => u.year === 2020);

  if (data2019?.value && data2020?.value) {
    return 100 - (((data2020.value - data2019.value) / data2019.value) * 100);
  };
  return null;
}

export const socialScore = (country: ICountry): number | null => {
  const scores: number[] = [];
  // const fertility2020 = country.fertility?.find((f) => f.year === 2020);
  // const fertility2021 = country.fertility?.find((f) => f.year === 2021);
  let days_fully_closed = null;
  let instruction_days = null;

  // @ts-ignore
  if (country?.schoolClosure[0] && typeof country?.schoolClosure[0] != 'undefined') {
    days_fully_closed = country.schoolClosure[0].days_fully_closed;
    instruction_days = country.schoolClosure[0].instruction_days;
  }

  // const canScoreFertility = fertility2020?.value && typeof fertility2020?.value != 'undefined' && fertility2021?.value && typeof fertility2021?.value != 'undefined';
  const canScoreFertility = false;
  const canScoreClosures = days_fully_closed && typeof days_fully_closed != 'undefined' && instruction_days && typeof instruction_days != 'undefined';

  if (canScoreFertility) {
    // @ts-ignore
    const fertilityScore = ((fertility2020.value - fertility2021.value) / fertility2020.value) * 100;
    if (fertilityScore && fertilityScore != 0) {
      scores.push(fertilityScore);
    }
  }

  if (canScoreClosures) {
    // @ts-ignore
    const closureScore = 100 - ((days_fully_closed / instruction_days) * 100);
    if (closureScore && closureScore != 0) {
      scores.push(closureScore);
    }
  }

  if (scores.length) {
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }

  return null;
}

const calculateCompositeScore = (country: ICountry, weights: IWeights) => {
  const scores: number[] = [];
  let scoreCount = 0;
  Object.keys(weights).forEach((weight) => {
    // @ts-ignore
    if (country[weight] && weights[weight] != 0) {
      // @ts-ignore
      scores.push(country[weight] * weights[weight]);
      // @ts-ignore
      scoreCount += weights[weight];
    } else {
      scores.push(0);
      scoreCount++;
    }
  });

  return scores.reduce((a, b) => a + b, 0) / scoreCount;
};

export const ranked = (countries: ICountry[], reversed: boolean = false): ICountry[] => {
  const ranked = countries.sort((a, b) => {
    if (reversed) {
      // @ts-ignore
      return a.overallBenchmarked > b.overallBenchmarked ? 1 : -1;
    }
    // @ts-ignore
    return a.overallBenchmarked > b.overallBenchmarked ? -1 : 1;
  });

  return ranked;
}

interface IWeights {
  diseaseScore: number;
  vaccScore: number;
  econScore: number;
  socialScore: number;
}

const benchmark = (countries: ICountry[], country: ICountry, key: string): number | null => {
  // @ts-ignore
  if (country[key]) {
    // @ts-ignore
    const min = Math.min.apply(Math, countries.map(function(item) { return item[key] ? item[key] : 0; }));
    // @ts-ignore
    const max = Math.max.apply(Math, countries.map(function(item) { return item[key] ? item[key] : 0; }));
    // @ts-ignore
    return ((country[key] - min) / (max - min)) * 100;
  }

  return null;
};

export const scoreCountries = (countries: ICountry[] | null, weights: IWeights,): ICountry[] => {
  if (countries) {
    const scoredCountries = countries.map((country) => {
      const scoredCountry = {
        ...country,
        diseaseScore: diseaseScore(country),
        vaccScore: vaccineScore(country),
        econScore: econScore(country),
        socialScore: socialScore(country)
      };
      return scoredCountry;
    });

    const benchmarkedCountries = scoredCountries.map((country) => {
      const benchmarked = {
        ...country,
        deathBenchmarked: benchmark(scoredCountries, country, "diseaseScore"),
        vaccBenchmarked: benchmark(scoredCountries, country, "vaccScore"),
        econBenchmarked: benchmark(scoredCountries, country, "econScore"),
        socialBenchmarked: benchmark(scoredCountries, country, "socialScore")
      };
      benchmarked.overallBenchmarked = calculateCompositeScore(benchmarked, weights);
      return benchmarked;
    });

    const filteredCountries = benchmarkedCountries.filter((country) => {
      return !!country.diseaseScore && ((!!country.vaccScore && !!country.socialScore) || (!!country.econScore && !!country.socialScore) || (!!country.econScore && !!country.vaccScore));
    });

    return filteredCountries;
  };

  return [];
}


// export const composite

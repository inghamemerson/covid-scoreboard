import React, { useState, useEffect, Dispatch } from 'react';

interface IFilters {
  continent?: string;
  population?: string;
  gdp_per_capita?: string;
  median_age?: string;
  life_expectancy?: string;
  human_development_index?: string;
  extreme_poverty?: string;
}

interface IWeights {
  deathBenchmarked?: number;
  vaccBenchmarked?: number;
  econBenchmarked?: number;
  socialBenchmarked?: number;
}

interface IReportDetails {
  submit: () => void;
  setFilters: Dispatch<IFilters>;
  setWeights: Dispatch<IWeights>;
}

export const ReportDetails = ({ submit, setFilters, setWeights }: IReportDetails) => {
  const [continent, setContinent] = useState('');
  const [population, setPopulation] = useState('');
  const [gdpPerCapita, setGDPPerCapita] = useState('');
  const [medianAge, setMedianAge] = useState('');
  const [lifeExpectancy, setLifeExpectancy] = useState('');
  const [humanDevelopmentIndex, setHumanDevelopmentIndex] = useState('');
  const [extremePoverty, setExtremePoverty] = useState('');
  const [deathBenchmarkedOverride, setDeathBenchmarkedOverride] = useState(1);
  const [vaccBenchmarkedOverride, setVaccBenchmarkedOverride] = useState(1);
  const [econBenchmarkedOverride, setEconBenchmarkedOverride] = useState(1);
  const [socialBenchmarkedOverride, setSocialBenchmarkedOverride] = useState(1);

  useEffect(() => {
    setFilters({
      continent: continent,
      population: population,
      gdp_per_capita: gdpPerCapita,
      median_age: medianAge,
      life_expectancy: lifeExpectancy,
      human_development_index: humanDevelopmentIndex,
      extreme_poverty: extremePoverty
    });

    setWeights({
      deathBenchmarked: deathBenchmarkedOverride,
      vaccBenchmarked: vaccBenchmarkedOverride,
      econBenchmarked: econBenchmarkedOverride,
      socialBenchmarked: socialBenchmarkedOverride
    });
  }, [continent, population, gdpPerCapita, lifeExpectancy, humanDevelopmentIndex, extremePoverty, deathBenchmarkedOverride, vaccBenchmarkedOverride, econBenchmarkedOverride, socialBenchmarkedOverride]);

  const runRating = () => {
    submit();
  }

  return (
    <div className="relative max-w-7xl mx-auto my-16 px-4 sm:my-20 sm:px-6 lg:px-8">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="mt-5 md:mt-0">
            <div className="space-y-6 md:grid md:grid-cols-12 md:gap-6 items-baseline">

              <div className="col-span-12 sm:col-span-3 md:col-span-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Continent
                </label>
                <select
                  id="continent"
                  name="continent"
                  onChange={e => setContinent(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value=''>All</option>
                  <option value='Africa'>Africa</option>
                  <option value='Asia'>Asia</option>
                  <option value='Europe'>Europe</option>
                  <option value='North America'>North America</option>
                  <option value='South America'>South America</option>
                  <option value='Oceania'>Oceania</option>
                </select>
              </div>

              <div className="col-span-12 sm:col-span-3 md:col-span-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Population
                </label>
                <select
                  id="population"
                  name="population"
                  onChange={e => setPopulation(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value=''>All</option>
                  <option value='<1m'>Less than 1,000,000</option>
                  <option value='1m-10m'>1,000,000 - 10,000,000</option>
                  <option value='10m-100m'>10,000,000 - 100,000,000</option>
                  <option value='>100m'>Greater than 100,000,000</option>
                </select>
              </div>

              <div className="col-span-12 sm:col-span-3 md:col-span-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  GDP per capita
                </label>
                <select
                  id="gdp"
                  name="gdp"
                  onChange={e => setGDPPerCapita(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value=''>All</option>
                  <option value='sm'>Less than $10,000</option>
                  <option value='med'>$10,000 - $25,000</option>
                  <option value='lg'>$25,000 - $50,000</option>
                  <option value='xl'>Greater than $50,000</option>
                </select>
              </div>

              <div className="col-span-12 sm:col-span-3 md:col-span-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Median Age
                </label>
                <select
                  id="age"
                  name="age"
                  onChange={e => setMedianAge(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value=''>All</option>
                  <option value='<20>'>Less Than 20</option>
                  <option value='20-30'>20 - 30</option>
                  <option value='30-40'>30 - 40</option>
                  <option value='>40'>Greater than 40</option>
                </select>
              </div>

              <div className="col-span-12 sm:col-span-3 md:col-span-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Life Expectancy
                </label>
                <select
                  id="le"
                  name="le"
                  onChange={e => setLifeExpectancy(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value=''>All</option>
                  <option value='<60>'>Less than 60</option>
                  <option value='60-65'>60 - 65</option>
                  <option value='65-70'>65 - 70</option>
                  <option value='70-75'>70 - 75</option>
                  <option value='>75'>Greater than 75</option>
                </select>
              </div>

              <div className="col-span-12 sm:col-span-3 md:col-span-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Human Development Index
                </label>
                <select
                  id="hdi"
                  name="hdi"
                  onChange={e => setHumanDevelopmentIndex(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value=''>All</option>
                  <option value='<.5'>Less than 0.5</option>
                  <option value='.5-.6'>0.5 - 0.6</option>
                  <option value='.6-.7'>0.6 - 0.7</option>
                  <option value='.7-.8'>0.7 - 0.8</option>
                  <option value='.8-.9'>0.8 - 0.9</option>
                  <option value='>.9'>Greate than 0.9</option>
                </select>
              </div>

            </div>
            <div className="space-y-6 md:grid md:grid-cols-12 md:gap-6 items-baseline">

              <div className="col-span-12 sm:col-span-6 md:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Disease Score weight : {deathBenchmarkedOverride}
                </label>
                <input
                  type="range"
                  id="diseaseScore"
                  name="diseaseScore"
                  min="0"
                  max="10"
                  step="1"
                  onChange={e => setDeathBenchmarkedOverride(parseInt(e.target.value))}
                />
              </div>

              <div className="col-span-12 sm:col-span-6 md:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Vaccination Score weight : {vaccBenchmarkedOverride}
                </label>
                <input
                  type="range"
                  id="vaccScore"
                  name="vaccScore"
                  min="0"
                  max="10"
                  step="1"
                  onChange={e => setVaccBenchmarkedOverride(parseInt(e.target.value))}
                />
              </div>

              <div className="col-span-12 sm:col-span-6 md:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Economic Score weight : {econBenchmarkedOverride}
                </label>
                <input
                  type="range"
                  id="econSCore"
                  name="econSCore"
                  min="0"
                  max="10"
                  step="1"
                  onChange={e => setEconBenchmarkedOverride(parseInt(e.target.value))}
                />
              </div>

              <div className="col-span-12 sm:col-span-6 md:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Social Score weight : {socialBenchmarkedOverride}
                </label>
                <input
                  type="range"
                  id="socialScore"
                  name="socialScore"
                  min="0"
                  max="10"
                  step="1"
                  onChange={e => setSocialBenchmarkedOverride(parseInt(e.target.value))}
                />
              </div>

            </div>
          </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={runRating}
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          RANK 'EM!!
        </button>
      </div>
    </div>
  )
};

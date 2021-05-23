
import { PrismaClient } from '@prisma/client';
import _kebabCase from 'lodash/kebabCase';
import * as data from '../.data/owid-covid-data.json';
import * as countries from '../.data/country-emoji.json';
import * as codes from '../.data/country-code-mapping.json';
import * as closures from '../.data/closures.json';
import * as unemployment from '../.data/unemployment.json';
import * as fertility2020 from '../.data/total-fertility-2020.json';
import * as fertility2021 from '../.data/total-fertility-2021.json';
import { now } from 'lodash';

const prisma = new PrismaClient();

const handleNum = (number: string | number): number => {
  if (typeof number === 'string') {
    return parseInt(number.replace(/,/g, ''))
  }

  return number;
};

const haveCountrySlug = (countries: any, slug: string): boolean => {
  return !!countries.find((country: any) => country.slug === slug);
};

const haveCountryISO = (countries: any, iso: string): boolean => {
  return !!countries.find((country: any) => country.iso_code === iso);
};

const slugToISO = (countries: any, slug: string): string => {
  return countries.find((country: any) => country.slug === slug).iso_code;
};

async function main() {
  // add countries
  console.log("Inserting Countries\n");
  const countryInsert = await Promise.all(
    Object.keys(data).map((item) => {
      // @ts-ignore
      const newItem = data[item];
      // @ts-ignore
      if (!item.includes("OWID") && item !== 'default') {
        const countryInsert = prisma.country.create({
          data: {
            iso_code: item,
            slug: newItem.location ? _kebabCase(newItem.location) : 'unknown',
            // @ts-ignore
            emoji: countries[codes[item]] ? countries[codes[item]].emoji : undefined,
            continent: newItem.continent ? newItem.continent : undefined,
            location: newItem.location ? newItem.location : undefined,
            population: newItem.population ? newItem.population : undefined,
            population_density: newItem.population_density ? newItem.population_density : undefined,
            median_age: newItem.median_age ? newItem.median_age : undefined,
            aged_65_older: newItem.aged_65_older ? newItem.aged_65_older : undefined,
            aged_70_older: newItem.aged_70_older ? newItem.aged_70_older : undefined,
            gdp_per_capita: newItem.gdp_per_capita ? newItem.gdp_per_capita : undefined,
            life_expectancy: newItem.life_expectancy ? newItem.life_expectancy : undefined,
            human_development_index: newItem.human_development_index ? newItem.human_development_index : undefined,
            extreme_poverty: newItem.extreme_poverty ? newItem.extreme_poverty : undefined,
          },
        });
        process.stdout.write('.');
        return countryInsert;
      }
    })
  );

  const refCountries = await prisma.country.findMany({
    where: { NOT: [{ emoji: null }] },
    select: {
      iso_code: true,
      slug: true,
    },
    orderBy: [
      {
        location: 'asc'
      }
    ]
  });

  // add covid data
  console.log("\nInserting Data\n");
  const dataInsert = await Promise.all(
    Object.keys(data).map((country) => {
      // @ts-ignore
      const newItemData = data[country].data;
      if (newItemData && newItemData.length) {
        newItemData.map(async (newData: any) => {
        const dataInsert = await prisma.data.create({
          data: {
            // @ts-ignore
            country_id: country ? country : undefined,
            // @ts-ignore
            date: newData.date ? new Date(newData.date).toISOString() : now(),
            total_cases: newData.total_cases ? newData.total_cases : undefined,
            total_deaths: newData.total_deaths ? newData.total_deaths : undefined,
            total_vaccinations: newData.total_vaccinations ? newData.total_vaccinations : undefined,
            people_vaccinated: newData.people_vaccinated ? newData.people_vaccinated : undefined,
            people_fully_vaccinated: newData.people_fully_vaccinated ? newData.people_fully_vaccinated : undefined,
          },
        });
        process.stdout.write('.');
        return dataInsert;
      });
      }
    })
  );

  // add closures
  console.log("\nInserting Closures\n");
  const closuresInsert = await Promise.all(
    Object.keys(closures).map(async (item) => {
      // @ts-ignore
      const newClosuresItem = closures[item];
      if (newClosuresItem && newClosuresItem.ISO3 && haveCountryISO(refCountries, newClosuresItem.ISO3)) {
        const newClosuresInsert = await prisma.closure.create({
          data: {
            // @ts-ignore
            country_id: newClosuresItem.ISO3 ? newClosuresItem.ISO3 : undefined,
            income_group: newClosuresItem.income_group ? newClosuresItem.income_group : undefined,
            days_academic_break: newClosuresItem.days_academic_break ? newClosuresItem.days_academic_break : undefined,
            days_fully_closed: newClosuresItem.days_fully_closed ? newClosuresItem.days_fully_closed : undefined,
            days_fully_open: newClosuresItem.days_fully_open ? newClosuresItem.days_fully_open : undefined,
            days_partially_closed: newClosuresItem.days_partially_closed ? newClosuresItem.days_partially_closed : undefined,
            instruction_days: newClosuresItem.instruction_days ? newClosuresItem.instruction_days : undefined,
            // @ts-ignore
            pre_primary_pop: newClosuresItem.pre_primary_pop ? handleNum(newClosuresItem.pre_primary_pop) : undefined,
            primary_pop: newClosuresItem.primary_pop ? handleNum(newClosuresItem.primary_pop) : undefined,
            lower_secondary_pop: newClosuresItem.lower_secondary_pop ? handleNum(newClosuresItem.lower_secondary_pop) : undefined,
            upper_secondary_pop: newClosuresItem.upper_secondary_pop ? handleNum(newClosuresItem.upper_secondary_pop) : undefined,
          }
        });
        process.stdout.write('.');
        return newClosuresInsert;
      }
    })
  );

  // add  unemployment
  console.log("\nInserting Unemployment\n");
  const unemploymentInsert = await Promise.all(
    Object.keys(unemployment).map(async (item) => {
      // @ts-ignore
      const newUnemploymentItem = unemployment[item];
      if (newUnemploymentItem && newUnemploymentItem.country_code && haveCountryISO(refCountries, newUnemploymentItem.country_code)) {
        ["2015","2016","2017","2018","2019","2020"].map(async (year) => {
          const newUnemploymentInsert = await prisma.unemployment.create({
            data: {
              // @ts-ignore
              country_id: newUnemploymentItem.country_code,
              // @ts-ignore
              year: parseInt(year),
              value: newUnemploymentItem[year],
            }
          });
          process.stdout.write('.');
          return newUnemploymentInsert;
        })
      }
    })
  );

  // add fertility 2020
  console.log("\nInserting Fertility 2020\n");
    const fertility2020Insert = await Promise.all(
    Object.keys(fertility2020).map(async (item) => {
      // @ts-ignore
      const newFertilityItem = fertility2020[item];
      if (newFertilityItem && newFertilityItem.name && haveCountrySlug(refCountries, _kebabCase(newFertilityItem.name))) {
        const newFertilityInsert = await prisma.fertility.create({
          data: {
            // @ts-ignore
            country_id: slugToISO(refCountries, _kebabCase(newFertilityItem.name)),
            // @ts-ignore
            year: 2020,
            value: newFertilityItem.rate,
          }
        });
        process.stdout.write('.');
        return newFertilityInsert;
      }
    })
  );

  // add fertility 2021
  console.log("\nInserting Fertility 2021\n");
    const fertility2021Insert = await Promise.all(
    Object.keys(fertility2021).map(async (item) => {
      // @ts-ignore
      const newFertilityItem = fertility2021[item];
      if (newFertilityItem && newFertilityItem.slug && haveCountrySlug(refCountries, newFertilityItem.slug)) {
        const newFertilityInsert = await prisma.fertility.create({
          data: {
            // @ts-ignore
            country_id: slugToISO(refCountries, _kebabCase(newFertilityItem.slug)),
            // @ts-ignore
            year: 2021,
            value: newFertilityItem.value,
          }
        });
        process.stdout.write('.');
        return newFertilityInsert;
      }
    })
  );
}

main()
.catch(e => {
  console.error(e)
  process.exit(1)
})
.finally(async () => {
  await prisma.$disconnect();
});

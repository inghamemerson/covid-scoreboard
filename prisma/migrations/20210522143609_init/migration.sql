-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "iso_code" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "emoji" TEXT,
    "continent" TEXT,
    "location" TEXT,
    "population" DOUBLE PRECISION,
    "population_density" DOUBLE PRECISION,
    "median_age" DOUBLE PRECISION,
    "aged_65_older" DOUBLE PRECISION,
    "aged_70_older" DOUBLE PRECISION,
    "gdp_per_capita" DOUBLE PRECISION,
    "cardiovasc_death_rate" DOUBLE PRECISION,
    "diabetes_prevalence" DOUBLE PRECISION,
    "handwashing_facilities" DOUBLE PRECISION,
    "hospital_beds_per_thousand" DOUBLE PRECISION,
    "life_expectancy" DOUBLE PRECISION,
    "human_development_index" DOUBLE PRECISION,
    "stringency_index" DOUBLE PRECISION,
    "extreme_poverty" DOUBLE PRECISION,
    "female_smokers" DOUBLE PRECISION,
    "male_smokers" DOUBLE PRECISION,

    PRIMARY KEY ("iso_code")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "countryId" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "total_cases" DOUBLE PRECISION,
    "new_cases" DOUBLE PRECISION,
    "new_cases_smoothed" DOUBLE PRECISION,
    "total_deaths" DOUBLE PRECISION,
    "new_deaths" DOUBLE PRECISION,
    "new_deaths_smoothed" DOUBLE PRECISION,
    "total_cases_per_million" DOUBLE PRECISION,
    "new_cases_per_million" DOUBLE PRECISION,
    "new_cases_smoothed_per_million" DOUBLE PRECISION,
    "total_deaths_per_million" DOUBLE PRECISION,
    "new_deaths_per_million" DOUBLE PRECISION,
    "new_deaths_smoothed_per_million" DOUBLE PRECISION,
    "reproduction_rate" DOUBLE PRECISION,
    "icu_patients" DOUBLE PRECISION,
    "icu_patients_per_million" DOUBLE PRECISION,
    "hosp_patients" DOUBLE PRECISION,
    "hosp_patients_per_million" DOUBLE PRECISION,
    "weekly_icu_admissions" DOUBLE PRECISION,
    "weekly_icu_admissions_per_million" DOUBLE PRECISION,
    "weekly_hosp_admissions" DOUBLE PRECISION,
    "weekly_hosp_admissions_per_million" DOUBLE PRECISION,
    "total_tests" DOUBLE PRECISION,
    "new_tests" DOUBLE PRECISION,
    "total_tests_per_thousand" DOUBLE PRECISION,
    "new_tests_per_thousand" DOUBLE PRECISION,
    "new_tests_smoothed" DOUBLE PRECISION,
    "new_tests_smoothed_per_thousand" DOUBLE PRECISION,
    "positive_rate" DOUBLE PRECISION,
    "tests_per_case" DOUBLE PRECISION,
    "total_vaccinations" DOUBLE PRECISION,
    "people_vaccinated" DOUBLE PRECISION,
    "people_fully_vaccinated" DOUBLE PRECISION,
    "new_vaccinations" DOUBLE PRECISION,
    "new_vaccinations_smoothed" DOUBLE PRECISION,
    "total_vaccinations_per_hundred" DOUBLE PRECISION,
    "people_vaccinated_per_hundred" DOUBLE PRECISION,
    "people_fully_vaccinated_per_hundred" DOUBLE PRECISION,
    "new_vaccinations_smoothed_per_million" DOUBLE PRECISION,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country.slug_unique" ON "Country"("slug");

-- AddForeignKey
ALTER TABLE "Data" ADD FOREIGN KEY ("countryId") REFERENCES "Country"("iso_code") ON DELETE SET NULL ON UPDATE CASCADE;

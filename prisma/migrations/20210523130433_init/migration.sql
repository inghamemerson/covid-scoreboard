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
    "life_expectancy" DOUBLE PRECISION,
    "human_development_index" DOUBLE PRECISION,
    "extreme_poverty" DOUBLE PRECISION,

    PRIMARY KEY ("iso_code")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "country_id" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "total_cases" DOUBLE PRECISION,
    "total_deaths" DOUBLE PRECISION,
    "total_vaccinations" DOUBLE PRECISION,
    "people_vaccinated" DOUBLE PRECISION,
    "people_fully_vaccinated" DOUBLE PRECISION,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unemployment" (
    "id" SERIAL NOT NULL,
    "country_id" TEXT,
    "year" INTEGER NOT NULL,
    "value" DOUBLE PRECISION,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fertility" (
    "id" SERIAL NOT NULL,
    "country_id" TEXT,
    "year" INTEGER NOT NULL,
    "value" DOUBLE PRECISION,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Closure" (
    "id" SERIAL NOT NULL,
    "country_id" TEXT,
    "income_group" TEXT,
    "days_academic_break" INTEGER,
    "days_fully_closed" INTEGER,
    "days_fully_open" INTEGER,
    "days_partially_closed" INTEGER,
    "instruction_days" INTEGER,
    "pre_primary_pop" INTEGER,
    "primary_pop" INTEGER,
    "lower_secondary_pop" INTEGER,
    "upper_secondary_pop" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country.slug_unique" ON "Country"("slug");

-- AddForeignKey
ALTER TABLE "Unemployment" ADD FOREIGN KEY ("country_id") REFERENCES "Country"("iso_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD FOREIGN KEY ("country_id") REFERENCES "Country"("iso_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Closure" ADD FOREIGN KEY ("country_id") REFERENCES "Country"("iso_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fertility" ADD FOREIGN KEY ("country_id") REFERENCES "Country"("iso_code") ON DELETE SET NULL ON UPDATE CASCADE;

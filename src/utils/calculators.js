import calculatorsData from "../data/calculators.json";

const today = new Date().toISOString().split("T")[0];

export const allCalculators = calculatorsData.calculators.filter(
  (calc) => !calc.lastUpdated || calc.lastUpdated.split("T")[0] <= today
);

export const calculatorsRaw = calculatorsData.calculators;

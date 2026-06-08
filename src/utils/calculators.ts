import calculatorsData from "../data/calculators.json";
import type { Calculator, CalculatorsData } from "../types/calculator";

const data = calculatorsData as unknown as CalculatorsData;
const today = new Date().toISOString().split("T")[0];

export const allCalculators: Calculator[] = data.calculators.filter(
  (calc) => !calc.lastUpdated || calc.lastUpdated.split("T")[0] <= today
);

export const calculatorsRaw: Calculator[] = data.calculators;

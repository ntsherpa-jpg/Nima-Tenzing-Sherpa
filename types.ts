export enum CoffeeStage {
  FRESH_CHERRY = 'FRESH_CHERRY',
  DRIED_CHERRY = 'DRIED_CHERRY', // Natural
  PULPED_COFFEE = 'PULPED_COFFEE',
  DRAINED_PARCHMENT = 'DRAINED_PARCHMENT',
  HONEY_PARCHMENT = 'HONEY_PARCHMENT', // Calculated Estimate
  DRY_PARCHMENT = 'DRY_PARCHMENT', // Washed
  GREEN_COFFEE = 'GREEN_COFFEE'
}

export interface RatioData {
  id: CoffeeStage;
  label: string;
  ratio: number; // Kg source per 1 Kg Green
  description: string;
  color: string;
  isEstimate?: boolean;
}

export interface ConversionResult {
  stage: CoffeeStage;
  weight: number;
}

import { CoffeeStage, RatioData } from './types';

// Ratios based strictly on the provided image source.
// Honey is interpolated as an estimate (~1.28-1.30) as it sits between Parchment and Natural.
export const CONVERSION_DATA: Record<CoffeeStage, RatioData> = {
  [CoffeeStage.FRESH_CHERRY]: {
    id: CoffeeStage.FRESH_CHERRY,
    label: "Fresh Red Cherry",
    ratio: 5.56,
    description: "Raw harvested fruit",
    color: "#D9381E" // coffee-cherry
  },
  [CoffeeStage.PULPED_COFFEE]: {
    id: CoffeeStage.PULPED_COFFEE,
    label: "Pulped Coffee",
    ratio: 3.39,
    description: "Skin removed, wet mucilage",
    color: "#E6B98C"
  },
  [CoffeeStage.DRAINED_PARCHMENT]: {
    id: CoffeeStage.DRAINED_PARCHMENT,
    label: "Drained Parchment",
    ratio: 2.31,
    description: "Washed and drained, wet",
    color: "#D6CFC7"
  },
  [CoffeeStage.DRIED_CHERRY]: {
    id: CoffeeStage.DRIED_CHERRY,
    label: "Dried Cherry (Natural)",
    ratio: 2.25,
    description: "Dry whole fruit (Natural Process)",
    color: "#8C5A47" // coffee-dried
  },
  [CoffeeStage.HONEY_PARCHMENT]: {
    id: CoffeeStage.HONEY_PARCHMENT,
    label: "Dry Honey (Est.)",
    ratio: 1.30, 
    description: "Dried with mucilage attached",
    color: "#D4A017", // coffee-honey
    isEstimate: true
  },
  [CoffeeStage.DRY_PARCHMENT]: {
    id: CoffeeStage.DRY_PARCHMENT,
    label: "Dry Parchment",
    ratio: 1.25,
    description: "Dried, hull intact (Washed Process)",
    color: "#F2E8C9" // coffee-parchment
  },
  [CoffeeStage.GREEN_COFFEE]: {
    id: CoffeeStage.GREEN_COFFEE,
    label: "Green Coffee",
    ratio: 1.00,
    description: "Exportable milled beans",
    color: "#5A7C65" // coffee-green
  }
};

export const STAGE_ORDER = [
  CoffeeStage.FRESH_CHERRY,
  CoffeeStage.PULPED_COFFEE,
  CoffeeStage.DRAINED_PARCHMENT,
  CoffeeStage.DRIED_CHERRY,
  CoffeeStage.HONEY_PARCHMENT,
  CoffeeStage.DRY_PARCHMENT,
  CoffeeStage.GREEN_COFFEE
];

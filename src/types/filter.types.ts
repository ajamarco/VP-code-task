export interface FilterValue {
  gte: number;
  lte: number;
}

export interface SelectedFilter {
  identifier?: string;
  id?: string;
  value: FilterValue;
  displayValue: string;
  isFilter?: boolean;
}

export type FilterType = "price" | "brand";

export interface ExpandedSections {
  [key: string]: boolean;
}

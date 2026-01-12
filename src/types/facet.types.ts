export interface FacetOptionValue {
  gte: number;
  lte: number;
}

export interface FacetOption {
  identifier: string;
  value: FacetOptionValue;
  displayValue: string;
  productCount: number;
  priority: number;
}

export interface Facet {
  identifier: string;
  facetType: number;
  displayName: string;
  options: FacetOption[];
  priority: number;
}

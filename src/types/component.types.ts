import { SortOptionValue } from "../features/sort/sortSlice";

// Props for components that handle modal/overlay visibility
export interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Props for sort components
export interface SortProps {
  sortBy: SortOptionValue;
  onSortChange: (value: SortOptionValue) => void;
}

// Props for toggle button
export interface ToggleButtonProps {
  onClick: () => void;
}

// Props for star rating
export interface StarRatingProps {
  rating: number;
}

// Star fill type
export type StarFill = 0 | 0.5 | 1;

// Props for individual star
export interface StarProps {
  fill: StarFill;
}

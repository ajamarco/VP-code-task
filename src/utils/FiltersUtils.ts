/**
 * Determines the new lastActiveFilterType when a filter is toggled (added or removed).
 *
 * @param toggledFilterType - The type of filter that was just toggled ("prices" or "brands")
 * @param currentFilterCount - The count of remaining filters of the toggled type (after the toggle)
 * @param otherFilterCount - The count of filters of the other type
 * @returns The new lastActiveFilterType value
 */
export const getLastActiveFilterTypeOnToggle = (
  toggledFilterType: "prices" | "brands",
  currentFilterCount: number,
  otherFilterCount: number
): "prices" | "brands" | null => {
  // If there are any filters remaining (of either type), return the toggled type
  // This tracks which filter the user just interacted with
  if (currentFilterCount > 0 || otherFilterCount > 0) {
    return toggledFilterType;
  }

  // No filters remain at all
  return null;
};

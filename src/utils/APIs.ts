const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const API_ENDPOINT = `${baseUrl}apikey=${apiKey}`;

interface FilterValue {
  gte: number;
  lte: number;
}

interface SelectedFilter {
  identifier?: string;
  id?: string;
  value: FilterValue;
  displayValue: string;
  isFilter?: boolean;
}

interface FacetsPayload {
  prices?: SelectedFilter[];
  brands?: SelectedFilter[];
}

export const searchAPI = async (
  query: string,
  sort: number = 1,
  pageNumber: number = 1,
  facets: FacetsPayload = {},
  facetExcludes: string[] | null = null
): Promise<any> => {
  const body: any = {
    query: query,
    pageNumber: pageNumber,
    size: 20,
    additionalPages: 0,
    sort: sort,
    facets: facets,
  };

  // Only add facetExcludes if it's not null
  if (facetExcludes !== null) {
    body.facetExcludes = facetExcludes;
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

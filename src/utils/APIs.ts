const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const API_ENDPOINT = `${baseUrl}apikey=${apiKey}`;

export const searchAPI = async (
  query: string,
  sort: number = 1,
  pageNumber: number = 1
): Promise<any> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        pageNumber: pageNumber,
        size: 20,
        additionalPages: 0,
        sort: sort,
      }),
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

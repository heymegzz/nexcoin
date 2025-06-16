const API_KEY = "CG-RrMEWNov6TaJ5MAkJZgq3BU6";
const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchTopCoins = async (limit = 20) => {
  try {
    const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&x_cg_demo_api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch top coins');
    return await response.json();
  } catch (error) {
    console.error('Error fetching top coins:', error);
    return [];
  }
};

export const searchCoins = async (query, maxRetries = 2) => {
  let retries = 0;
  
  const executeSearch = async () => {
    try {
      
      const encodedQuery = encodeURIComponent(query.trim());
      console.log(`Searching for: ${encodedQuery}`);
      
      const response = await fetch(`${BASE_URL}/search?query=${encodedQuery}&x_cg_demo_api_key=${API_KEY}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Search API error: ${response.status} ${errorText}`);
        throw new Error(`Search failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`Found ${data.coins?.length || 0} coins matching "${query}"`);
      return data;
    } catch (error) {
      console.error('Error searching coins:', error);
      if (retries < maxRetries) {
        retries++;
        console.log(`Retrying search (${retries}/${maxRetries})...`);
        return executeSearch(); 
      }
      return { coins: [] };
    }
  };
  
  return executeSearch();
};

export const getCoinDetails = async (coinId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=true&x_cg_demo_api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch coin details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching coin details:', error);
    throw error;
  }
};
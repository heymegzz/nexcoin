const API_KEY = "CG-RrMEWNov6TaJ5MAkJZgq3BU6";
const BASE_URL = "https://api.coingecko.com/api/v3";

const handleResponse = async (response) => {
  if (response.status === 429) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API request failed with status: ${response.status}`);
  }
  
  return response.json();
};

const fetchWithRetry = async (url, options = {}, maxRetries = 3) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Accept': 'application/json'
        }
      });
      
      return await handleResponse(response);
    } catch (error) {
      lastError = error;
      if (error.message.includes('Rate limit exceeded')) {
        await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1))); // Exponential backoff
        continue;
      }
      break;
    }
  }
  
  throw lastError;
};

export const fetchTopCoins = async (limit = 20) => {
  try {
    const data = await fetchWithRetry(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h,7d&x_cg_demo_api_key=${API_KEY}`
    );
    
    return data.map(coin => ({
      ...coin,
      sparkline_data: coin.sparkline_in_7d?.price || []
    }));
  } catch (error) {
    console.error('Error fetching top coins:', error);
    throw error;
  }
};

export const searchCoins = async (query) => {
  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const data = await fetchWithRetry(
      `${BASE_URL}/search?query=${encodedQuery}&x_cg_demo_api_key=${API_KEY}`
    );
    
    return {
      coins: data.coins?.slice(0, 20) || []
    };
  } catch (error) {
    console.error('Error searching coins:', error);
    throw error;
  }
};

export const getCoinDetails = async (coinId) => {
  try {
    const data = await fetchWithRetry(
      `${BASE_URL}/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=true&x_cg_demo_api_key=${API_KEY}`
    );
    
    if (!data.id) {
      throw new Error('Invalid coin data received');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching coin details:', error);
    throw error;
  }
};
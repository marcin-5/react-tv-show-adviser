const BASE_URL = "https://api.themoviedb.org/3/";
// Vite uses import.meta.env and VITE_ prefix for env variables
const API_KEY = import.meta.env.VITE_API_KEY;
if (!API_KEY) {
  // Provide a clear message in the console to help configuration
  // Avoid throwing to allow the app to render basic UI without data
  console.error("Missing VITE_API_KEY env variable. Create a .env file with VITE_API_KEY=your_tmdb_api_key");
}
const API_KEY_PARAM = `?api_key=${API_KEY ?? ""}`;
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";
const SMALL_IMG_COVER_BASE_URL = "https://image.tmdb.org/t/p/w300";

export { BASE_URL, API_KEY_PARAM, BACKDROP_BASE_URL, SMALL_IMG_COVER_BASE_URL };

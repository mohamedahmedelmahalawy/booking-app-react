import { AxiosInterceptor } from "../../interceptor/interceptor";

export default async function searchLoader({ request }) {
  //   throw new Error("Test error for SearchError");//personal tesst for error page don't keep it
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const country = url.searchParams.get("country");

  try {
    const res = await AxiosInterceptor.get("/hotels");
    let results = res.data;

    if (search) {
      results = results.filter(
        (hotel) =>
          hotel.name?.toLowerCase().includes(search.toLowerCase()) ||
          hotel.address?.city?.toLowerCase().includes(search.toLowerCase()) ||
          hotel.address?.country?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (country) {
      results = results.filter((hotel) =>
        hotel.address?.country?.toLowerCase().includes(country.toLowerCase())
      );
    }

    return results;
  } catch (error) {
    throw new Response("Failed to load search results", { status: 500 });
  }
}

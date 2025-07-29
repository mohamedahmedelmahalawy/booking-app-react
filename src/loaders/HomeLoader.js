import bestOfferLoader from "./bestOfferLoader";
import recommendedHotelsLoader from "./recommendedHotelsLoader";

export default async function homeLoader() {
  try {
    const [bestOffers, recommendedHotels] = await Promise.all([
      bestOfferLoader(),
      recommendedHotelsLoader(),
    ]);

    return {
      bestOffers,
      recommendedHotels,
    };
  } catch (error) {
    console.error("Home loader error:", error);
    throw new Response("Failed to load home data", { status: 500 });
  }
}

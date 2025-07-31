import bestOfferLoader from "./bestOfferLoader";
import recommendedHotelsLoader from "./recommendedHotelsLoader";

export default async function homeLoader() {
  // throw new Error("Test error"); //just testing my error code, don't keep it
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

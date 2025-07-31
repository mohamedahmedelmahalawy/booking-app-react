import detailsLoader from "./DetailsLoader";
import recommendedHotelsLoader from "../homeloaders/recommendedHotelsLoader";

export default async function detailsPageLoader({ params }) {
  try {
    const [hotelDetails, recommendedHotels] = await Promise.all([
      detailsLoader({ params }),
      recommendedHotelsLoader(),
    ]);

    return {
      ...hotelDetails,
      recommendedHotels,
    };
  } catch (error) {
    console.error("Details page loader error:", error);
    throw new Response("Failed to load details page data", { status: 500 });
  }
}

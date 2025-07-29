import { AxiosInterceptor } from "../interceptor/interceptor";

export default function recommendedHotelsLoader() {
  const bestOffer = AxiosInterceptor.get("/recommended_hotels")
    .then((res) => {
      console.log(res.data[0].images.main);
      return res.data;
    })
    .catch((error) => console.log(error));

  return bestOffer;
}

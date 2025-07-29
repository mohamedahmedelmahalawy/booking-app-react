import { AxiosInterceptor } from "../interceptor/interceptor";

export default function bestOfferLoader() {
  const bestOffer = AxiosInterceptor.get("/best_offer")
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => console.log(error));

  return bestOffer;
}

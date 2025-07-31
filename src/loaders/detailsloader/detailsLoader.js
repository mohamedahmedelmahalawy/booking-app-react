import { AxiosInterceptor } from "../../interceptor/interceptor";

export default function detailsLoader({ params }) {
  const hotelDetails = AxiosInterceptor.get("/hotels/" + params.id)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => console.log(error));

  return hotelDetails;
}

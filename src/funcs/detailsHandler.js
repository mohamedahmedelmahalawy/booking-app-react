import { redirect } from "react-router-dom";

export function detailsHandler(id) {
  return redirect("/" + id);
}

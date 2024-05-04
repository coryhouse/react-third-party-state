import { ShippingAddress } from "../types/types";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export async function getShippingAddress(userId: number) {
  return fetch(baseUrl + "shippingAddress/" + userId).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}

export async function saveShippingAddress(address: ShippingAddress) {
  return fetch(baseUrl + "shippingAddress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });
}

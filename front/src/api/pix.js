import axios from "axios";

export default class PixService {
  async get() {
    const config = {
        headers: {
            Authorization: `Bearer APP_USR-6870288723824475-051212-d8448679fc02d23e5a60485c7fdc3236-1369685958`,
          }
    };
    const { data } = await axios.get("https://api.mercadopago.com/v1/payment_methods", {
      headers: {
          Authorization: `Bearer APP_USR-6870288723824475-051212-d8448679fc02d23e5a60485c7fdc3236-1369685958`,
        }
  });
    return data;
  }
}

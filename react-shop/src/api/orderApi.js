import axiosClient from "./axiosClient";

class OrderApi {
  getUserOrder = (id) => {
    const url = `api/orders/user/${id}`;
    return axiosClient.get(url);
  };

}
const orderApi = new OrderApi();
export default orderApi;

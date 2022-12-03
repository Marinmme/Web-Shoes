import axiosClient from "./axiosClient";

class SliderApi {
  getAll = () => {
    const url = "api/sliders";
    return axiosClient.get(url);
  };
}
const sliderApi = new SliderApi();
export default sliderApi;

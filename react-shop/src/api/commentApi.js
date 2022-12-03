import axiosClient from "./axiosClient";

class CommentApi {
  getCommentByProduct = (id) => {
    const url = `api/comments/${id}`;
    return axiosClient.get(url);
  };

  addComment = (comment) => {
    const url = `api/comments`;
    return axiosClient.post(url, comment);
  };

}
const commentApi = new CommentApi();
export default commentApi;

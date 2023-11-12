import {
  deleteResource,
  getAllResource,
  putResource,
  postResource,
  getResource,
} from "./Http";

export default {
  index: (params) => getAllResource("articles", params),
  show: (articleId) => getResource("articles", articleId),
  store: (articleData) => postResource("articles", articleData),
  update: (articleId, updatedArticleData) =>
    postResource(`articles/${articleId}`, updatedArticleData),
  destroy: (articleId) => deleteResource("articles", articleId),
};

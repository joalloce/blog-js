import {
  deleteResource,
  getAllResource,
  putResource,
  postResource,
  getResource,
} from "./Http";

export default {
  index: (params) => getAllResource("comments", params),
  show: (commentId) => getResource("comments", commentId),
  store: (commentData) => postResource("comments", commentData),
  update: (commentId, updatedCommentData) =>
    putResource("comments", commentId, updatedCommentData),
  destroy: (commentId) => deleteResource("comments", commentId),
  replies: (commentId, params) =>
    getAllResource(`comments/${commentId}/replies`, params),
  storeReply: (commentId, replyData) =>
    postResource(`comments/${commentId}/replies`, replyData),
};

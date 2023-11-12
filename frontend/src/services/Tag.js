import {
  deleteResource,
  getAllResource,
  putResource,
  postResource,
  getResource,
} from "./Http";

export default {
  index: (params) => getAllResource("tags", params),
  show: (tagId) => getResource("tags", tagId),
  store: (tagData) => postResource("tags", tagData),
  update: (tagId, updatedTagData) => putResource("tags", tagId, updatedTagData),
  destroy: (tagId) => deleteResource("tags", tagId),
};

import FormData from "form-data";
import mime from "mime";

export const getFormData = (image: string, data: any) => {
  let body = new FormData();
  body.append("image", {
    url: image,
    name: image.split("/").pop(),
    type: mime.getType(image),
  });

  Object.keys(data).forEach((key) => {
    body.append(key, data[key]);
  });

  return body;
};

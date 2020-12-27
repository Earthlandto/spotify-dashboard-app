export function createError(responseObject, status, content) {
  return responseObject.status(status).json(content);
}

export function createError(responseObject, status, content = {}) {
  return responseObject.status(status).json(content);
}

export function createUnauthorizedError(responseObject) {
  return responseObject
    .status(401)
    .json({ error: { message: 'Unauthorized: no token provided' } });
}

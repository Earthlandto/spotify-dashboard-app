/* Generated error format:
  {
    ok: false
    status: <status_code>
    error: {
      message: <reason why the error happened>
      ...<other props>
    }
  }
*/

export function createError(response, status, error = {}) {
  return response.status(status).json({
    status,
    error,
    ok: false,
  });
}

export function createUnauthorizedError(response) {
  return response.status(401).json({
    ok: false,
    status: 401,
    error: { message: 'Unauthorized: no token provided' },
  });
}

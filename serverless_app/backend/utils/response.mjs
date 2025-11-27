/**
 * Creates a standardized API Gateway response
 * @param {number} statusCode - HTTP status code
 * @param {object} body - Response body (will be JSON stringified)
 * @returns {object} Formatted API Gateway response
 */
export const createResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
};

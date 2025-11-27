import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { createResponse } from "../utils/response.mjs";

// Initialize DynamoDB client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Get table name from environment variable
const tableName = process.env.TABLE_NAME;

/**
 * Lambda handler for GET /signups/{id}
 * Retrieves a single signup by ID from DynamoDB (protected endpoint)
 */
export const handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  console.log('Table Name:', tableName);

  try {
    // Extract path parameters
    const { pathParameters } = event;
    const id = pathParameters?.id;

    if (!id) {
      return createResponse(400, {
        error: 'Bad Request',
        message: 'Missing id in path',
      });
    }

    console.log('Getting signup with ID:', id);

    const command = new GetCommand({
      TableName: tableName,
      Key: {
        id,
      },
    });

    const response = await docClient.send(command);

    console.log('DynamoDB Response:', JSON.stringify(response, null, 2));

    // Check if item was found
    if (!response.Item) {
      return createResponse(404, {
        error: 'Not Found',
        message: `Signup with ID '${id}' not found`,
      });
    }

    // Return single signup
    return createResponse(200, {
      signup: response.Item,
    });

  } catch (error) {
    console.error('Error accessing DynamoDB:', error);

    // Return error response
    return createResponse(500, {
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { createResponse } from "../utils/response.mjs";

// Initialize DynamoDB client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Get table name from environment variable
const tableName = process.env.TABLE_NAME;

/**
 * Lambda handler for DELETE /signups/{id}
 * Deletes a signup from DynamoDB (protected endpoint)
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

    console.log('Deleting signup with ID:', id);

    // Delete the item
    const command = new DeleteCommand({
      TableName: tableName,
      Key: {
        id,
      },
      ReturnValues: "ALL_OLD",
      ConditionExpression: "attribute_exists(id)",
    });

    const response = await docClient.send(command);

    console.log('Signup deleted successfully:', response.Attributes);

    // Return success response with deleted signup
    return createResponse(200, {
      message: 'Signup deleted successfully',
      signup: response.Attributes,
    });

  } catch (error) {
    console.error('Error deleting signup:', error);

    // Handle conditional check failure (item doesn't exist)
    if (error.name === 'ConditionalCheckFailedException') {
      return createResponse(404, {
        error: 'Not Found',
        message: 'Signup with this ID does not exist',
      });
    }

    // Return generic error response
    return createResponse(500, {
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

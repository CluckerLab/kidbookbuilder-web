import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { createResponse } from "../utils/response.mjs";

// Initialize DynamoDB client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Get table name from environment variable
const tableName = process.env.TABLE_NAME;

/**
 * Lambda handler for DELETE /coffee/{id}
 * Deletes a coffee item from DynamoDB
 */
export const handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  console.log('Table Name:', tableName);

  try {
    // Extract path parameters
    const { pathParameters } = event;
    const coffeeId = pathParameters?.id;

    if (!coffeeId) {
      return createResponse(400, {
        error: 'Bad Request',
        message: 'Missing coffeeId in path',
      });
    }

    console.log('Deleting item with ID:', coffeeId);

    // Delete the item
    const command = new DeleteCommand({
      TableName: tableName,
      Key: {
        coffeeId,
      },
      ReturnValues: "ALL_OLD", // Return the deleted item
      ConditionExpression: "attribute_exists(coffeeId)", // Only delete if item exists
    });

    const response = await docClient.send(command);

    console.log('Item deleted successfully:', response.Attributes);

    // Return success response with deleted item
    return createResponse(200, {
      message: 'Coffee deleted successfully',
      item: response.Attributes,
    });

  } catch (error) {
    console.error('Error deleting item:', error);

    // Handle conditional check failure (item doesn't exist)
    if (error.name === 'ConditionalCheckFailedException') {
      return createResponse(404, {
        error: 'Not Found',
        message: 'Coffee with this ID does not exist',
      });
    }

    // Return generic error response
    return createResponse(500, {
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

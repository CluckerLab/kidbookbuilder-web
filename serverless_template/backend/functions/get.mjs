import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { createResponse } from "../utils/response.mjs";

// Initialize DynamoDB client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Get table name from environment variable
const tableName = process.env.TABLE_NAME;

/**
 * Lambda handler for GET /coffee and GET /coffee/{id}
 * Retrieves all coffee items or a single item by ID from DynamoDB
 */
export const handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  console.log('Table Name:', tableName);

  // Extract path parameters if they exist
  const { pathParameters } = event;
  const { id } = pathParameters || {};

  try {
    let command;
    let response;

    if (id) {
      // Get single item by ID
      console.log('Getting single item with ID:', id);

      command = new GetCommand({
        TableName: tableName,
        Key: {
          coffeeId: id,
        },
      });

      response = await docClient.send(command);

      console.log('DynamoDB Response:', JSON.stringify(response, null, 2));

      // Check if item was found
      if (!response.Item) {
        return createResponse(404, {
          error: 'Not Found',
          message: `Coffee with ID '${id}' not found`,
        });
      }

      // Return single item
      return createResponse(200, {
        item: response.Item,
      });

    } else {
      // Scan for all items
      console.log('Scanning all items');

      command = new ScanCommand({
        TableName: tableName,
      });

      response = await docClient.send(command);

      console.log('DynamoDB Response:', JSON.stringify(response, null, 2));

      // Return all items
      return createResponse(200, {
        items: response.Items,
        count: response.Count,
        scannedCount: response.ScannedCount,
      });
    }

  } catch (error) {
    console.error('Error accessing DynamoDB:', error);

    // Return error response
    return createResponse(500, {
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

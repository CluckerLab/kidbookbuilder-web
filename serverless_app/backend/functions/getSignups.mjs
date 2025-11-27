import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { createResponse } from "../utils/response.mjs";

// Initialize DynamoDB client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Get table name from environment variable
const tableName = process.env.TABLE_NAME;

/**
 * Lambda handler for GET /signups
 * Retrieves all signups from DynamoDB (protected endpoint)
 */
export const handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  console.log('Table Name:', tableName);

  try {
    // Scan for all items
    console.log('Scanning all signups');

    const command = new ScanCommand({
      TableName: tableName,
    });

    const response = await docClient.send(command);

    console.log('DynamoDB Response:', JSON.stringify(response, null, 2));

    // Sort by createdAt descending (newest first)
    const sortedItems = (response.Items || []).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Return all signups
    return createResponse(200, {
      signups: sortedItems,
      count: response.Count,
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

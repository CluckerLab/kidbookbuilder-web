import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { createResponse } from "../utils/response.mjs";

// Initialize DynamoDB client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Get table name from environment variable
const tableName = process.env.TABLE_NAME;

/**
 * Lambda handler for POST /coffee
 * Creates a new coffee item in DynamoDB
 */
export const handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  console.log('Table Name:', tableName);

  try {
    // Parse request body
    const { body } = event;
    const { coffeeId, name, price, available } = JSON.parse(body || "{}");

    console.log('Parsed data:', { coffeeId, name, price, available });

    // Validate required fields
    if (!coffeeId || !name || price === undefined || available === undefined) {
      return createResponse(400, {
        error: 'Bad Request',
        message: 'Missing required fields: coffeeId, name, price, or available',
      });
    }

    // Validate data types
    if (typeof coffeeId !== 'string' || typeof name !== 'string') {
      return createResponse(400, {
        error: 'Bad Request',
        message: 'coffeeId and name must be strings',
      });
    }

    if (typeof price !== 'number' || price <= 0) {
      return createResponse(400, {
        error: 'Bad Request',
        message: 'price must be a positive number',
      });
    }

    if (typeof available !== 'boolean') {
      return createResponse(400, {
        error: 'Bad Request',
        message: 'available must be a boolean',
      });
    }

    // Create the item
    const command = new PutCommand({
      TableName: tableName,
      Item: {
        coffeeId,
        name,
        price,
        available,
      },
      // Only create if item doesn't already exist
      ConditionExpression: "attribute_not_exists(coffeeId)",
    });

    await docClient.send(command);

    console.log('Item created successfully');

    // Return success response
    return createResponse(201, {
      message: 'Coffee created successfully',
      item: {
        coffeeId,
        name,
        price,
        available,
      },
    });

  } catch (error) {
    console.error('Error creating item:', error);

    // Handle conditional check failure (item already exists)
    if (error.name === 'ConditionalCheckFailedException') {
      return createResponse(409, {
        error: 'Conflict',
        message: 'Coffee with this ID already exists',
      });
    }

    // Return generic error response
    return createResponse(500, {
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

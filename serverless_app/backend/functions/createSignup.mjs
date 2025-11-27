import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";
import { createResponse } from "../utils/response.mjs";

// Initialize DynamoDB client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Get table name from environment variable
const tableName = process.env.TABLE_NAME;

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Lambda handler for POST /signups
 * Creates a new signup in DynamoDB (public endpoint)
 */
export const handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  console.log('Table Name:', tableName);

  try {
    // Parse request body
    const { body } = event;
    const { parentName, parentEmail, childName, childAge } = JSON.parse(body || "{}");

    console.log('Parsed data:', { parentName, parentEmail, childName, childAge });

    // Validate required fields
    if (!parentName || !parentEmail || !childName || childAge === undefined) {
      return createResponse(400, {
        error: 'Bad Request',
        message: 'Missing required fields: parentName, parentEmail, childName, or childAge',
      });
    }

    // Validate data types
    if (typeof parentName !== 'string' || typeof childName !== 'string') {
      return createResponse(400, {
        error: 'Bad Request',
        message: 'parentName and childName must be strings',
      });
    }

    // Validate email format
    if (!emailRegex.test(parentEmail)) {
      return createResponse(400, {
        error: 'Bad Request',
        message: 'parentEmail must be a valid email address',
      });
    }

    // Validate childAge
    const age = typeof childAge === 'string' ? parseInt(childAge, 10) : childAge;
    if (typeof age !== 'number' || isNaN(age) || age < 0 || age > 18) {
      return createResponse(400, {
        error: 'Bad Request',
        message: 'childAge must be a number between 0 and 18',
      });
    }

    // Generate ID and timestamps
    const id = randomUUID();
    const now = new Date().toISOString();

    // Create the item
    const item = {
      id,
      parentName: parentName.trim(),
      parentEmail: parentEmail.trim().toLowerCase(),
      childName: childName.trim(),
      childAge: age,
      createdAt: now,
      updatedAt: now,
    };

    const command = new PutCommand({
      TableName: tableName,
      Item: item,
    });

    await docClient.send(command);

    console.log('Signup created successfully:', item);

    // Return success response
    return createResponse(201, {
      message: 'Signup created successfully',
      signup: item,
    });

  } catch (error) {
    console.error('Error creating signup:', error);

    // Return generic error response
    return createResponse(500, {
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

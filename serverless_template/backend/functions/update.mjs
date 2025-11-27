import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { createResponse } from "../utils/response.mjs";

// Initialize DynamoDB client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Get table name from environment variable
const tableName = process.env.TABLE_NAME;

/**
 * Lambda handler for PUT /coffee/{id}
 * Updates an existing coffee item in DynamoDB
 */
export const handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  console.log('Table Name:', tableName);

  try {
    // Extract path parameters
    const { pathParameters, body } = event;
    const coffeeId = pathParameters?.id;

    if (!coffeeId) {
      return createResponse(400, {
        error: 'Bad Request',
        message: 'Missing coffeeId in path',
      });
    }

    // Parse request body
    const { name, price, available } = JSON.parse(body || "{}");

    console.log('Update data:', { coffeeId, name, price, available });

    // Check if at least one field is provided
    if (!name && price === undefined && available === undefined) {
      return createResponse(400, {
        error: 'Bad Request',
        message: 'At least one field (name, price, or available) must be provided',
      });
    }

    // Build dynamic update expression
    const updateExpressions = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    if (name !== undefined) {
      updateExpressions.push('#name = :name');
      expressionAttributeNames['#name'] = 'name'; // 'name' is a reserved keyword
      expressionAttributeValues[':name'] = name;
    }

    if (price !== undefined) {
      if (typeof price !== 'number' || price <= 0) {
        return createResponse(400, {
          error: 'Bad Request',
          message: 'price must be a positive number',
        });
      }
      updateExpressions.push('price = :price');
      expressionAttributeValues[':price'] = price;
    }

    if (available !== undefined) {
      if (typeof available !== 'boolean') {
        return createResponse(400, {
          error: 'Bad Request',
          message: 'available must be a boolean',
        });
      }
      updateExpressions.push('available = :available');
      expressionAttributeValues[':available'] = available;
    }

    const updateExpression = 'SET ' + updateExpressions.join(', ');

    console.log('Update expression:', updateExpression);

    // Update the item
    const command = new UpdateCommand({
      TableName: tableName,
      Key: {
        coffeeId,
      },
      UpdateExpression: updateExpression,
      ...(Object.keys(expressionAttributeNames).length > 0 && {
        ExpressionAttributeNames: expressionAttributeNames,
      }),
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW", // Return the updated item
      ConditionExpression: "attribute_exists(coffeeId)", // Only update if item exists
    });

    const response = await docClient.send(command);

    console.log('Item updated successfully:', response.Attributes);

    // Return success response with updated item
    return createResponse(200, {
      message: 'Coffee updated successfully',
      item: response.Attributes,
    });

  } catch (error) {
    console.error('Error updating item:', error);

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

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { createResponse } from "../utils/response.mjs";

// Initialize DynamoDB client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Get table name from environment variable
const tableName = process.env.TABLE_NAME;

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Lambda handler for PUT /signups/{id}
 * Updates an existing signup in DynamoDB (protected endpoint)
 */
export const handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  console.log('Table Name:', tableName);

  try {
    // Extract path parameters
    const { pathParameters, body } = event;
    const id = pathParameters?.id;

    if (!id) {
      return createResponse(400, {
        error: 'Bad Request',
        message: 'Missing id in path',
      });
    }

    // Parse request body
    const { parentName, parentEmail, childName, childAge } = JSON.parse(body || "{}");

    console.log('Update data:', { id, parentName, parentEmail, childName, childAge });

    // Check if at least one field is provided
    if (parentName === undefined && parentEmail === undefined && childName === undefined && childAge === undefined) {
      return createResponse(400, {
        error: 'Bad Request',
        message: 'At least one field (parentName, parentEmail, childName, or childAge) must be provided',
      });
    }

    // Build dynamic update expression
    const updateExpressions = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    if (parentName !== undefined) {
      if (typeof parentName !== 'string') {
        return createResponse(400, {
          error: 'Bad Request',
          message: 'parentName must be a string',
        });
      }
      updateExpressions.push('#parentName = :parentName');
      expressionAttributeNames['#parentName'] = 'parentName';
      expressionAttributeValues[':parentName'] = parentName.trim();
    }

    if (parentEmail !== undefined) {
      if (!emailRegex.test(parentEmail)) {
        return createResponse(400, {
          error: 'Bad Request',
          message: 'parentEmail must be a valid email address',
        });
      }
      updateExpressions.push('parentEmail = :parentEmail');
      expressionAttributeValues[':parentEmail'] = parentEmail.trim().toLowerCase();
    }

    if (childName !== undefined) {
      if (typeof childName !== 'string') {
        return createResponse(400, {
          error: 'Bad Request',
          message: 'childName must be a string',
        });
      }
      updateExpressions.push('childName = :childName');
      expressionAttributeValues[':childName'] = childName.trim();
    }

    if (childAge !== undefined) {
      const age = typeof childAge === 'string' ? parseInt(childAge, 10) : childAge;
      if (typeof age !== 'number' || isNaN(age) || age < 0 || age > 18) {
        return createResponse(400, {
          error: 'Bad Request',
          message: 'childAge must be a number between 0 and 18',
        });
      }
      updateExpressions.push('childAge = :childAge');
      expressionAttributeValues[':childAge'] = age;
    }

    // Always update updatedAt
    updateExpressions.push('updatedAt = :updatedAt');
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();

    const updateExpression = 'SET ' + updateExpressions.join(', ');

    console.log('Update expression:', updateExpression);

    // Update the item
    const command = new UpdateCommand({
      TableName: tableName,
      Key: {
        id,
      },
      UpdateExpression: updateExpression,
      ...(Object.keys(expressionAttributeNames).length > 0 && {
        ExpressionAttributeNames: expressionAttributeNames,
      }),
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
      ConditionExpression: "attribute_exists(id)",
    });

    const response = await docClient.send(command);

    console.log('Signup updated successfully:', response.Attributes);

    // Return success response with updated signup
    return createResponse(200, {
      message: 'Signup updated successfully',
      signup: response.Attributes,
    });

  } catch (error) {
    console.error('Error updating signup:', error);

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

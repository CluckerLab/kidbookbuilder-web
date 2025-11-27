import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { randomUUID } from "crypto";
import { createResponse } from "../utils/response.mjs";

// Initialize DynamoDB client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Initialize SES client
const sesClient = new SESClient({});

// Get environment variables
const tableName = process.env.TABLE_NAME;
const notificationEmail = process.env.NOTIFICATION_EMAIL;
const stage = process.env.STAGE || 'dev';
const frontendUrl = process.env.FRONTEND_URL || 'unknown';

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

    // Send email notification
    if (notificationEmail) {
      try {
        const envLabel = stage.toUpperCase();
        const emailBody = `[${envLabel}] New KidBookBuilder Signup!

Environment: ${envLabel}
Website: ${frontendUrl}

Parent Name: ${item.parentName}
Parent Email: ${item.parentEmail}
Child Name: ${item.childName}
Child Age: ${item.childAge}

Signup ID: ${item.id}
Timestamp: ${item.createdAt}`;

        const emailCommand = new SendEmailCommand({
          Source: notificationEmail,
          Destination: {
            ToAddresses: [notificationEmail],
          },
          Message: {
            Subject: { Data: `[${envLabel}] New KidBookBuilder Signup: ${item.parentName}` },
            Body: {
              Text: { Data: emailBody },
            },
          },
        });

        await sesClient.send(emailCommand);
        console.log('Notification email sent successfully');
      } catch (emailError) {
        // Log error but don't fail the request - signup was already saved
        console.error('Failed to send notification email:', emailError);
      }
    }

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

import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from "src/utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;

  const response = await document.query({
    TableName: "todos",
    KeyConditionExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": user_id
    }
  }).promise();

  const todos = response.Items;

  return {
    statusCode: 200,
    body: JSON.stringify({
      todos,
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}
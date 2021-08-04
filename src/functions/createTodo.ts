import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuidV4 } from 'uuid';
import { document } from '../utils/dynamodbClient';

interface ICreateTodoBody {
  title: boolean;
  deadline: Date;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTodoBody;

  const todo = {
    id: uuidV4(),
    user_id,
    title,
    done: false,
    deadline: new Date(deadline),
  }

  await document
    .put({
      TableName: "todos",
      Item: todo
    }).promise();


  return {
    statusCode: 201,
    body: JSON.stringify({
      todo,
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}

import { setResponseStatus, readBody } from "#imports";
import Todos from "~/server/db/models/todos";

export default defineEventHandler(async (event) => {
  const { title, description } = await readBody(event);
  try {
    if(!title || !description) {
        setResponseStatus(event, 400)
        return {
            status: "Failed",
            message: "Value title or description null..."
        }
    }

    const addTodo = await Todos.create({ title, description })
    setResponseStatus(event, 201)
    return {
        status: "Success",
        message: "Add data todo successfully...",
        data: addTodo
    }
  } catch (err: any) {
    setResponseStatus(event, 500);
    return {
      status: "Failed",
      message: err.message,
    };
  }
});

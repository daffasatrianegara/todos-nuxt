import { setResponseStatus, getRouterParams, readBody } from "#imports";
import Todos from "~/server/db/models/todos";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const { title, description } = await readBody(event);
  try {
    if (!id || !title || !description) {
      setResponseStatus(event, 400);
      return {
        status: "Failed",
        message: "Value title, id, or description null...",
      };
    }

    const isTodoExist = await Todos.findByPk(id);
    if (!isTodoExist) {
      setResponseStatus(event, 404);
      return {
        status: "Failed",
        message: "Data todo is not exist...",
      };
    }

    await Todos.update(
      { title, description },
      {
        where: { id },
      }
    );

    setResponseStatus(event, 200);
    return {
      status: "Success",
      message: "Todo data updated...",
    };
  } catch (err: any) {
    setResponseStatus(event, 500);
    return {
      status: "Failed",
      message: err.message,
    };
  }
});

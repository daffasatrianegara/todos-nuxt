import { setResponseStatus, getRouterParams } from "#imports";
import Todos from "~/server/db/models/todos";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  try {
    if (!id) {
      setResponseStatus(event, 400);
      return {
        status: "Failed",
        message: "Value id null...",
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

    await Todos.destroy({ where: { id } });
    setResponseStatus(event, 200);
    return {
      status: "Success",
      message: "Todo data deleted...",
    };
  } catch (err: any) {
    setResponseStatus(event, 500);
    return {
      status: "Failed",
      message: err.message,
    };
  }
});

import { setResponseStatus, getRouterParams } from "#imports";
import Todos from "~/server/db/models/todos";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  try {
    if(!id) {
        setResponseStatus(event, 400)
        return {
            status: "Failed",
            message: "Id null..."
        }
    }

    const isTodoExist = await Todos.findByPk(id)
    if(!isTodoExist) {
        setResponseStatus(event, 404)
        return {
            status: "Failed",
            message: "Data todos is not exist..."
        }
    }

    await Todos.update({ status: true }, {
        where: { id }
    })

    setResponseStatus(event, 200)
    return {
        status: "Success",
        message: "Status data todo updated...",
        todo_status: true
    }
  } catch (err: any) {
    setResponseStatus(event, 500);
    return {
      status: "Failed",
      message: err.message,
    };
  }
});

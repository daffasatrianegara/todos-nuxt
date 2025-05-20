import { setResponseStatus, getRouterParams } from "#imports";
import Todos from "~/server/db/models/todos";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  try {
    const getData = await Todos.findByPk(id);
    if (!getData) {
      setResponseStatus(event, 404);
      return {
          status: "Failed",
          message: "Data todos is null...",
          data: getData,
        };
    }
    
    setResponseStatus(event, 200);
    return {
        status: "Success",
        data: getData
    }
  } catch (err: any) {
    setResponseStatus(event, 500);
    return {
      status: "Failed",
      message: err.message,
    };
  }
});

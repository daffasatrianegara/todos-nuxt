import { getQuery, setResponseStatus } from "#imports";
import { db } from "~/server/config";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = query.search as string | undefined;
  const order = query.order as "asc" | "desc" | undefined;
  try {
    let query = `
   SELECT * FROM todos
   `;

    if (search) {
      query += `
    WHERE title LIKE :search OR description LIKE :search
    `;
    }

    if (order === "asc") {
      query += `
        ORDER BY "createdAt" ASC
        `;
    } else if (order === "desc") {
      query += `
        ORDER BY "createdAt" DESC
        `;
    } else {
      query += `
        ORDER BY id ASC
        `;
    }

    const [result, metadata] = await db.query(query, {
        replacements : { search: `%${search}%` }
    })

    if(result.length === 0) {
        setResponseStatus(event, 404)
        return {
            status: "Failed",
            message: "Data todos is null...",
            data: result
        }
    }

    setResponseStatus(event, 200)
    return {
        status: "Success",
        data: result
    }
  } catch (err: any) {
    setResponseStatus(event, 500);
    return {
      status: "Failed",
      message: err.message,
    };
  }
});

import Todos from "./models/todos";
import seedDataTodos from "./seeders/todos";

const migrateDb = async () => {
  try {
    await Todos.sync({ force: true });
    await seedDataTodos();
  } catch (err: any) {
    console.error(err.message);
  }
};

migrateDb();

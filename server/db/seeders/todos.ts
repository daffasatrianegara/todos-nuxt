import Todos from "../models/todos";

const dataTodos = [
    {
        title: "Makan",
        description: "Makan siang dengan teman."
    },
    {
        title: "Kerja",
        description: "Kerja di kantor."
    },
    {
        title: "Olahraga",
        description: "Olahraga di gym setelah kerja."
    },
    {
        title: "Nongkrong",
        description: "Nongkrong di rektorat UNY bareng temen jam 8an malam."
    },
    {
        title: "Tidur",
        description: "Tidur cepat yah..."
    },
]

const seedDataTodos = async () => {
    try {
        await Todos.bulkCreate(dataTodos)
        console.log("Seeding data todo success...");
    } catch (err: any) {
        console.error(err.message)
    }
}

export default seedDataTodos
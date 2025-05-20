import { db } from "~/server/config";
import { DataTypes } from "sequelize";

const Todos = db.define("todos", {
    id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey:true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: "todos",
    freezeTableName: true,
    timestamps: true
})

export default Todos
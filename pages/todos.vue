<script lang="ts" setup>
type Todo = {
  id: number;
  title: string;
  description: string;
  status: boolean;
  createdAt: string;
};

type TodoResponse = {
  status: string;
  data: Todo[];
};

const selectedTodo = ref<Todo | null>(null)
const isUpdated = ref<boolean>(false)

const { data: todos, refresh: refreshTodos } = await useAsyncData<TodoResponse>("todos", () =>
  $fetch("/api/todos")
);

const setDataTodo = async (todoVal: Todo) => {
  selectedTodo.value = todoVal
  isUpdated.value = true
}

const updateStatusTodo = async (id: number) => {
  await $fetch(`/api/todos/status/${id}`, { method: "PUT" });
  await refreshTodos();
};

const deleteTodo = async (id: number) => {
  await $fetch(`/api/todos/${id}`, { method: "DELETE" })
  await refreshTodos()
}
</script>

<template>
  <div class="min-h-screen">
    <h1 class="text-black font-semibold text-2xl">Todo:</h1>
    <p>{{ selectedTodo !== null ? "update" : "add" }}</p>
    <div class="w-full px-5">
      <div class="flex flex-wrap justify-center gap-3">
        <div
          v-for="todo in todos?.data"
          :key="todo.id"
          class="p-3 border-1 rounded-lg w-[30%] flex flex-col"
          :class="todo.status ? 'bg-green-500' : 'bg-red-500'"
        >
          <div class="flex items-center">
            <p class="text-xl font-bold text-white">{{ todo.title }}</p>
            <div
              class="ms-auto px-5 py-1 rounded"
              :class="todo.status ? 'bg-green-400' : 'bg-red-400'"
            >
              <p class="text-base font-semibold text-white">
                {{ todo.status ? "Selesai" : "Belum Selesai" }}
              </p>
            </div>
          </div>
          <p class="text-base my-1 text-white">{{ todo.description }}</p>
          <p class="text-xs text-end text-white mt-auto">
            Dibuat pada: {{ new Date(todo.createdAt).toLocaleString() }}
          </p>
          <div class="flex gap-3 mt-3 justify-end">
            <button
              class="bg-yellow-400 text-black py-1 px-3 font-semibold text-sm rounded cursor-pointer hover:bg-yellow-300"
              :class="todo.status ? 'hidden' : ''"
              @click="setDataTodo(todo)"
            >
              Update
            </button>
            <button
              class="bg-green-500 text-white py-1 px-3 font-semibold text-sm rounded cursor-pointer hover:bg-green-400"
              :class="todo.status ? 'hidden' : ''"
              @click="updateStatusTodo(todo.id)"
            >
              Selesai
            </button>
            <button
              class="bg-red-500 text-white py-1 px-3 font-semibold text-sm rounded cursor-pointer hover:bg-red-400"
              :class="todo.status ? '' : 'hidden'"
              @click="deleteTodo(todo.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

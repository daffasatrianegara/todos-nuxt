<script lang="ts" setup>
useHead({
  title: "Data Todo | TodoLagi",
});

type Todo = {
  id: string;
  title: string;
  description: string;
  status: boolean;
  createdAt: string;
};

type TodoResponse = {
  status: string;
  data: Todo[];
};

const debounceDelay = 500; // ms
let debounceTimeout: ReturnType<typeof setTimeout>;

const selectedTodo = ref<Todo | null>(null);
const isUpdated = ref<boolean>(false);
const sort = ref<"desc" | "asc" | null>("desc");
const q = ref<string>("");

const key = ref(`todos-${sort.value}-${q.value}`);

watch(
  [sort, q],
  () => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      key.value = `todos-${sort.value}-${q.value}`;
    }, debounceDelay);
  },
  { immediate: true }
);

const { data: todos, refresh: refreshTodos } = await useAsyncData<TodoResponse>(
  key,
  () => $fetch(`/api/todos?order=${sort.value}&search=${q.value}`)
);

const setDataTodo = async (todoVal: Todo) => {
  selectedTodo.value = todoVal;
  isUpdated.value = true;
};

const handleUpsertTodo = async (
  title: string,
  description: string,
  id?: number | string
) => {
  console.log(title, description, id, isUpdated.value);
  if (id && isUpdated.value) {
    await $fetch(`/api/todos/${id}`, {
      method: "PUT",
      body: {
        title,
        description,
      },
    });

    selectedTodo.value = null;
    isUpdated.value = false;
    await refreshTodos();
  } else if (id === undefined && !isUpdated.value) {
    console.log("tambah");
    await $fetch("/api/todos", {
      method: "POST",
      body: {
        title,
        description,
      },
    });

    await refreshTodos();
  } else {
    console.error("gagal...");
  }
};

const updateStatusTodo = async (id: string) => {
  await $fetch(`/api/todos/status/${id}`, { method: "PUT" });
  await refreshTodos();
};

const deleteTodo = async (id: string) => {
  await $fetch(`/api/todos/${id}`, { method: "DELETE" });
  await refreshTodos();
};
</script>

<template>
  <div class="min-h-screen">
    <InputSection
      :id="selectedTodo?.id"
      :title="selectedTodo?.title"
      :description="selectedTodo?.description"
      :status="isUpdated"
      :onHandle="handleUpsertTodo"
      :onCancel="
        () => {
          isUpdated = false;
          selectedTodo = null;
        }
      "
    />
    <div class="flex justify-center gap-3">
      <input
        class="h-8 border-1 border-gray-500 rounded mt-5 mb-8 ps-2 text-black w-[100vh]"
        v-model="q"
        type="text"
        placeholder="Cari Data..."
      />
    </div>
    <div class="w-full px-5">
      <div class="flex flex-wrap justify-center gap-3">
        <CardTodos
          v-for="todo in todos?.data"
          :key="todo.id"
          v-bind="{
            ...todo,
            onUpdateStatus: updateStatusTodo,
            onDelete: deleteTodo,
            onSetData: setDataTodo,
          }"
        />
      </div>
    </div>
  </div>
</template>

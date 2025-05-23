<script setup lang="ts">
const props = defineProps<{
  id: string;
  title: string;
  description: string;
  status: boolean;
  createdAt: string;
  onUpdateStatus: (id: string) => void;
  onSetData: (todoVal: {
    id: string;
    title: string;
    description: string;
    status: boolean;
    createdAt: string;
  }) => void;
  onDelete: (id: string) => void;
}>();
</script>
<template>
  <div
    class="p-3 border-1 rounded-lg w-[30%] flex flex-col"
    :class="props.status ? 'bg-green-500' : 'bg-red-500'"
  >
    <div class="flex items-center">
      <p class="text-xl font-bold text-white">{{ props.title }}</p>
      <div
        class="ms-auto px-5 py-1 rounded"
        :class="props.status ? 'bg-green-400' : 'bg-red-400'"
      >
        <p class="text-base font-semibold text-white">
          {{ props.status ? "Selesai" : "Belum Selesai" }}
        </p>
      </div>
    </div>
    <p class="text-base my-1 text-white">{{ props.description }}</p>
    <p class="text-xs text-end text-white mt-auto">
      Dibuat pada: {{ new Date(props.createdAt).toLocaleString() }}
    </p>
    <div class="flex gap-3 mt-3 justify-end">
      <button
        class="bg-yellow-400 text-black py-1 px-3 font-semibold text-sm rounded cursor-pointer hover:bg-yellow-300"
        :class="props.status ? 'hidden' : ''"
        @click="
          props.onSetData({
            id: props.id,
            title: props.title,
            description: props.description,
            status: props.status,
            createdAt: props.createdAt,
          })
        "
      >
        Update
      </button>
      <button
        class="bg-green-500 text-white py-1 px-3 font-semibold text-sm rounded cursor-pointer hover:bg-green-400"
        :class="props.status ? 'hidden' : ''"
        @click="props.onUpdateStatus(props.id)"
      >
        Selesai
      </button>
      <button
        class="bg-red-500 text-white py-1 px-3 font-semibold text-sm rounded cursor-pointer hover:bg-red-400"
        :class="props.status ? '' : 'hidden'"
        @click="props.onDelete(props.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

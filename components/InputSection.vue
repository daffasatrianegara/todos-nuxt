<script setup lang="ts">
const props = defineProps<{
  id?: string | number;
  title?: string;
  description?: string;
  status: boolean;
  onHandle: (title: string, description: string, id?: number | string) => void;
  onCancel: () => void;
}>();

const title = ref<string>("");
const description = ref<string>("");

watch(
  () => [props.status, props.id],
  (newStatus) => {
    if (newStatus) {
      title.value = props.title ?? "";
      description.value = props.description ?? "";
    } else {
      title.value = "";
      description.value = "";
    }
  },
  { immediate: true }
);

const handleCancel = () => {
  title.value = "";
  description.value = "";
  props.onCancel()
};
</script>
<template>
  <div
    class="w-fit flex flex-col justify-start items-start h-fit mb-5 border-1 border-black rounded px-4 py-2"
  >
    <p class="text-black font-bold text-2xl mb-3">
      {{ status ? "Perbarui" : "Tambah" }} Todo
    </p>
    <label for="title" class="font-semibold text-lg text-black">Judul</label>
    <input
      v-model="title"
      class="border-1 border-gray-500 ps-2 placeholder:text-gray-500 rounded w-[70vh] h-8 mb-2 text-black"
      type="text"
      placeholder="Masukkan Judul..."
      required
    />
    <label for="description" class="font-semibold text-lg text-black"
      >Deskripsi</label
    >
    <textarea
      v-model="description"
      class="border-1 border-gray-500 ps-2 placeholder:text-gray-500 rounded w-[70vh] mb-2 text-black"
      type="text"
      placeholder="Masukkan Deskripsi..."
      required
    />
    <div class="w-full mt-3 flex justify-center gap-3">
      <button
        class="px-5 py-1 bg-red-500 hover:bg-red-400 text-white font-semibold rounded cursor-pointer"
        type="submit"
        @click="handleCancel"
      >
        Batal
      </button>
      <button
        class="px-5 py-1 bg-green-500 hover:bg-green-400 text-white font-semibold rounded cursor-pointer"
        @click="() => {
            onHandle(title, description, props.id)
            title =''
            description =''
        }"
      >
        {{ status ? "Perbarui" : "Tambah" }}
      </button>
    </div>
  </div>
</template>

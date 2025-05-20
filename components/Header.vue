<script lang="ts" setup>
const router = useRouter()

const handleRedirect = () => {
  router.push("/todos")
}
</script>

<template>
  <div class="flex items-center justify-center py-10">
    <div class="w-[50%] px-10 flex flex-col gap-2">
      <p class="text-blue-950 text-5xl font-bold">
        Jangan Cuma Ingat di Kepala!
      </p>
      <p class="text-black text-2xl font-semibold">
        Simpan semua tugasmu di TodoLagi, lebih tenang dan teratur.
      </p>
      <button
      @click="handleRedirect"
        class="px-5 py-1 bg-green-700 rounded text-white font-semibold text-lg cursor-pointer hover:bg-green-500 w-[13rem]"
      >
        Mulai Mencatat
      </button>
    </div>
    <div class="w-[50%]">
      <img class="w-[90%] ms-auto me-auto border-4 border-blue-500 rounded" src="/todo.jpg" alt="img_todo" />
    </div>
  </div>
</template>

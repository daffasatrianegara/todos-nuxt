<template>
  <div class="w-full px-5 py-4 bg-blue-700">
    <div class="flex items-center">
      <p class="font-bold text-2xl text-gray-100">TodoLagi</p>
      <div class="ms-10 flex items-center gap-5 mt-1">
        <NuxtLink
          to="/"
          class="font-semibold text-lg text-gray-100 hover:text-gray-50 hover:underline"
          >Beranda
        </NuxtLink>
        <NuxtLink
          to="/todos"
          class="font-semibold text-lg text-gray-100 hover:text-gray-50 hover:underline"
          >Todo
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

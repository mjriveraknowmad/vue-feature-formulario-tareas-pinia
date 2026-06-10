<script setup lang="ts">
import { TareaForm, TareaList } from '../features/tarea-feature';
</script>

<template>
  <main>
    <TareaForm :mode="'edit'" />
  </main>
</template>

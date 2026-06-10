// Exportamos los componentes principales
export { default as TareaForm } from './components/TareaForm.vue';
export { default as TareaList } from './components/TareaList.vue';

// Exportamos el composable por si otro componente quiere usar la lógica
export { useTareaForm } from './composables/useTareaForm';

// Exportamos los tipos y modelos
export * from './types/tarea.model';
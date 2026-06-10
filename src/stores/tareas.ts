import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import type { TareaFormModel } from "@/features/tarea-form-feature/types/tarea.model";

export const useTareasStore = defineStore("tareas", () => {
  
  let tareaActual = reactive<TareaFormModel>({
    nombre: "",
    estado: "",
    categorias: [],
    numero: 0,
  });

  const tareas = ref<TareaFormModel[]>([]);

  const agregarTarea = (tarea: TareaFormModel) => {
    tareas.value.push(tarea);
    console.log("Tarea agregada:", tarea);
  }

  const setTareaActual = (tarea: TareaFormModel) => {
    Object.assign(tareaActual, tarea);  // Actualiza propiedades, mantiene reactividad
  }

  const resetTareaActual = () => {
    Object.assign(tareaActual, {
      nombre: "",
      estado: "",
      categorias: [],
      numero: 0,
    });
  }

  return {
    tareaActual,
    tareas,
    agregarTarea,
    setTareaActual,
    resetTareaActual,
  };
});

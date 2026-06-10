import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import type { TareaFormModel } from "@/features/tarea-form-feature/types/tarea.model";
import shortid from "shortid";

export const useTareasStore = defineStore("tareas", () => {
  
  let tareaActual = reactive<TareaFormModel>({
    nombre: "",
    estado: "",
    categorias: [],
    numero: 0,
  });

  const tareas = ref<TareaFormModel[]>([]);

  const agregarTarea = (tarea: TareaFormModel) => {
    tarea.id = shortid.generate()
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

  const eliminarTarea = (id: number) => {
    tareas.value = tareas.value.filter(t => t.id !== id);
  }

  return {
    tareaActual,
    tareas,
    agregarTarea,
    setTareaActual,
    resetTareaActual,
    eliminarTarea,
  };
});

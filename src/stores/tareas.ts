import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import type { TareaFormModel } from "@/features/tarea-feature/types/tarea.model";
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

  const modificarTarea = (tarea: TareaFormModel) => {
    if(!tarea.id) {
      console.warn('La tarea no tiene ID, no se puede modificar:', tarea);
      return;
    }
    tareas.value = tareas.value.map(t => t.id === tarea.id ? tarea : t);
    console.log("Tarea actualizada:", tarea);
    return;
  }

  const setTareaActual = (tarea: TareaFormModel) => {
    Object.assign(tareaActual, tarea);  // Actualiza propiedades, mantiene reactividad
  }

  const resetTareaActual = () => {
    Object.assign(tareaActual, {
      id: undefined,
      nombre: "",
      estado: "",
      categorias: [],
      numero: 0,
    });
  }

  const eliminarTarea = (id: string) => {
    tareas.value = tareas.value.filter(t => t.id !== id);
  }

  const obtenerTareaPorId = (id: string) => {
    return tareas.value.find(t => t.id === id);
  }

  return {
    tareaActual,
    tareas,
    agregarTarea,
    modificarTarea,
    setTareaActual,
    resetTareaActual,
    eliminarTarea,
    obtenerTareaPorId,
  };
});

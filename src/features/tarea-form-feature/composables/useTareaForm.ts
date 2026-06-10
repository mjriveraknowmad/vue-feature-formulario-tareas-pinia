import { useTareasStore } from '@/stores/tareas';
import { computed, ref } from 'vue';
import { type TareaFormModel } from '../types/tarea.model';


export function useTareaForm() {
  const tareasStore = useTareasStore();
  // Estado del formulario
  const form = computed(() => tareasStore.tareaActual);
  
  // Estados auxiliares
  const isSubmitting = ref(false);
  const errors = ref<Record<string, string>>({});
  const disabled = computed(() => isSubmitting.value || form.value.nombre.trim() === '' || form.value.estado.trim() === '' || form.value.categorias.length === 0 || !form.value.numero);

  // Validación básica del lado del cliente
  const validate = (): boolean => {
    const invalidate = form.value.nombre.trim() === '' || form.value.estado.trim() === '' || form.value.categorias.length === 0 || !form.value.numero
    return !invalidate;
  };

  // Valida cada input por separado para mostrar errores específicos
  const validateField = (field: keyof TareaFormModel) => {
    switch (field) {
      case 'nombre':
        if (!form.value.nombre.trim()) {
          errors.value.nombre = 'El nombre es obligatorio.';
        } else {
          delete errors.value.nombre;
        }
        break;
      case 'estado':
        if (!form.value.estado.trim()) {
          errors.value.estado = 'El estado es obligatorio.';
        } else {
          delete errors.value.estado;
        }
        break;
      case 'numero':
        if (!form.value.numero) {
          errors.value.numero = 'El número es obligatorio.';
        } else {
          delete errors.value.numero;
        }
        break;
      case 'categorias':
        if (!form.value.categorias.length) {
          errors.value.categorias = 'Debes seleccionar una categoria.';
        } else {
          delete errors.value.categorias;
        }
        break;
    }
  };

  // Envío del formulario
  const submitForm = async () => {
    if (!validate()) return;

    isSubmitting.value = true;
    
    try {
      tareasStore.agregarTarea({...form.value});

      // Simulación de petición API
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Datos enviados con éxito');
      
      // Resetear formulario tras éxito
      tareasStore.resetTareaActual();
    } catch (error) {
      console.error('Error al enviar:', error);
    } finally {
      isSubmitting.value = false;
    }
  };

  // Retornamos solo lo que el componente necesita saber
  return {
    form,
    errors,
    isSubmitting,
    disabled,
    validateField,
    submitForm,
    isValid: computed(() => Object.keys(errors.value).length === 0)
  };
}
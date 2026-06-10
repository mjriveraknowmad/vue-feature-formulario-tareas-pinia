<script setup lang="ts">
import { useTareaForm } from '../composables/useTareaForm';

const { form, errors, isSubmitting, disabled, submitForm, validateField } = useTareaForm();


</script>

<template>
  <div class="form-container">    
    <form @submit.prevent="submitForm" novalidate>
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input 
          id="nombre" 
          v-model="form.nombre" 
          @blur="validateField('nombre')"
          type="text" 
          :class="{ 'input-error': errors.nombre }"
        />
        <span v-if="errors.nombre" class="error-text">{{ errors.nombre }}</span>
      </div>

      <div class="form-group">
        <label for="categorias">Categoria:</label>
        <select id="categorias" v-model="form.categorias" @blur="validateField('categorias')" :class="{ 'input-error': errors.categorias }" multiple>
          <option value="javascript">Javascript</option>
          <option value="node">Node</option>
        </select>
        <span v-if="errors.categorias" class="error-text">{{ errors.categorias }}</span>
      </div>

      <div class="form-group">
        <label for="estado">Estado:</label>
        <div>
          <label>
            <input type="radio" value="urgente" v-model="form.estado" @blur="validateField('estado')" />
            Urgente
          </label>
          <label style="margin-left: 10px;">
            <input type="radio" value="relax" v-model="form.estado" @blur="validateField('estado')" />
            Relax
          </label>
        </div>
        <span v-if="errors.estado" class="error-text">{{ errors.estado }}</span>
      </div>


      
      <div class="form-group">
        <label for="numero">Número:</label>
        <input 
          id="numero" 
          v-model.number="form.numero"
          @blur="validateField('numero')"
          type="number" 
          :class="{ 'input-error': errors.numero }"
        />
        <span v-if="errors.numero" class="error-text">{{ errors.numero }}</span>
      </div>

      <button type="submit" :disabled="disabled">
        {{ isSubmitting ? 'Guardando...' : 'Procesar' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
/* .form-container { max-width: 400px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; } */
.form-container { padding-top: 20px; }
.form-group { margin-bottom: 15px; display: flex; flex-direction: column; }
.form-group.checkbox { flex-direction: row; align-items: center; }
.input-error { border-color: red; }
.error-text { color: red; font-size: 0.8rem; margin-top: 5px; }
button { width: 100%; padding: 10px; background-color: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer; }
button:disabled { background-color: #a3e2c5; cursor: not-allowed; }
</style>
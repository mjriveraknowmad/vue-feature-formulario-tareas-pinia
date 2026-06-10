<template>
    <!-- {{tareas}} -->
    <table class="table mt-5">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Categorias</th>
                <th scope="col">Estado</th>
                <th scope="col">Numero</th>
                <th scope="col">Acción</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in tareas" :key="item.id">
                <th scope="row">{{ item.id }}</th>
                <td>{{ item.nombre }}</td>
                <td>
                    <span v-for="(cat, index) in item.categorias" :key="index">
                        {{
                            (item.categorias.length === index + 1) ? cat : cat + ', '
                        }}
                    </span>
                </td>
                <td>{{ item.estado }}</td>
                <td>{{ item.numero }}</td>
                <td>
                    <button class="btn btn-danger btn-sm" @click="deleteTarea(item.id!)">
                        Eliminar
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">

import { useTareasStore } from '@/stores/tareas';
import { computed } from 'vue';

const tareasStore = useTareasStore();
const tareas = computed(() => tareasStore.tareas);

const deleteTarea = (id: number) => {
    tareasStore.eliminarTarea(id);
}

const editarTarea = (id: number) => {
    console.log('Editar tarea con ID:', id, ' a futuro  haremos un navigateTo a editar' );
}

</script>


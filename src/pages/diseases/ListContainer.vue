<template>
    <div>
        <component :is="formComponent" v-bind="$attrs"></component>
    </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, inject, watch, watchEffect } from 'vue'
import RotaVirus from './list/RotaVirus.vue';
import MeningitisEncephalitis from './list/Meningitis-Encephalitis.vue';
import MeaslesRubellaVue from './list/MeaslesRubella.vue';
import NotFound from '../404-pages/NotFound.vue';




export default {
    props: {
        type : String,
    },
    components: {
        RotaVirus,
        MeningitisEncephalitis,
        MeaslesRubellaVue,
        NotFound
    },
   setup(props) {
        const formComponent = computed(() => {
            if (props.type === 'rota') {
                return RotaVirus;
            } else if (props.type === 'meningitis') {
                return MeningitisEncephalitis;
            } else if (props.type === 'measles') {
                return MeaslesRubellaVue;
            }

            return NotFound;
        });

        return {
         formComponent,
        };
    },
}
</script>

<style scoped>

</style>
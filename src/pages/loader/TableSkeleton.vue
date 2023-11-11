<template>
    <table class="table table-bordered table-hover">
        <thead>
            <tr>
                <td class="text-center p-1 m-0">
                    <skeleton-placeholder height="30px" width="100%" bg="#5D87FF" />
                </td>
            </tr>
            <tr v-for="r in rows" :key="r">
                <td class="text-center p-1 m-0">
                    <skeleton-placeholder height="35px" width="100%" />
                </td>
            </tr>
        </thead>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SkeletonPlaceholder from './SkeletonPlaceholder.vue'

export default defineComponent({
    components: {
        SkeletonPlaceholder
    },
    setup () {
        const rows = 10;

        return { rows }
    }
})
</script>

<style scoped>

</style>
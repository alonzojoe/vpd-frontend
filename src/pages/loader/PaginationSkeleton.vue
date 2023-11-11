<template>
    <div class="d-flex align-items-center justify-content-between mx-3" id="skeleton">
        <skeleton-placeholder height="30px" width="140px" radius="5px"/>
        <skeleton-placeholder height="30px" width="140px" radius="5px"/>
        <div>
        <skeleton-placeholder height="30px" width="35px"/>
        <skeleton-placeholder height="30px" width="35px" bg="#5D87FF"/>
        <skeleton-placeholder height="30px" width="35px"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SkeletonPlaceholder from './SkeletonPlaceholder.vue'
export default defineComponent({
    components: {
        SkeletonPlaceholder
    },
    setup () {
        

        return {}
    }
})
</script>

<style scoped>
@media (max-width: 650px) {
    #skeleton{
        flex-direction: column;
        gap: 1rem;
    }
}
</style>
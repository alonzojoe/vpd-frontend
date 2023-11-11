<template>
    <div class="profile-dropdown position-relative" data-simplebar>
        <div class="py-3 px-7 pb-0">
            <h5 class="mb-0 fs-5 fw-semibold">User Profile</h5>
        </div>
        <div class="d-flex align-items-center py-9 mx-7 border-bottom">
            <skeleton-placeholder height="70px" width="70px" radius="50%"/>
            <div class="ms-3">
                <h5 class="mb-1 fs-3"><skeleton-placeholder height="18px" width="120px"></skeleton-placeholder></h5>
                <skeleton-placeholder height="18px" width="100px"/>
                <p class="mb-0 d-flex text-dark align-items-center fs-2 gap-1">
                <skeleton-placeholder class="mt-2" height="16px" width="180px"/>
                </p>
            </div>
        </div>
        <div class="d-grid py-4 px-7 pt-8">
            <skeleton-placeholder height="28px" width="100%" radius="5px" bg="#FA896B"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SkeletonPlaceholder from './SkeletonPlaceholder.vue'
export default defineComponent({
    components:{
        SkeletonPlaceholder
    },
    setup () {
        

        return {}
    }
})
</script>

<style scoped>

</style>
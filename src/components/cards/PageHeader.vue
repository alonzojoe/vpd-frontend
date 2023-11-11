<template>
    <div class="card bg-light-info shadow-none position-relative overflow-hidden">
    <div class="card-body px-4 py-0">
        <div class="row align-items-center">
        <div class="col-9">
            <h1 class="fw-semibold mb-8 text-primary">{{ title }}</h1>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><router-link :to="{ name: 'dashboard' }" class="text-muted text-decoration-none"><i class="ti ti-dashboard"></i> Dashboard</router-link></li>
                    <li class="breadcrumb-item" aria-current="page">Settings</li>
                    <li class="breadcrumb-item" aria-current="page">{{ title }}</li>
                </ol>
            </nav>
        </div>
        <div class="col-3">
            <div class="text-center mb-n5">  
            <img src="../../assets/images/breadcrumb/ChatBc.png" alt="" class="img-fluid mb-n4">
            </div>
        </div>
        </div>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PageHeader',
    props: {
        title: String
    },
    setup (props) {
        
        return {}
    }
})
</script>

<style scoped>

</style>
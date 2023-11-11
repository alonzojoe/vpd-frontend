<template>
<div class="row border border-primary custom-border group-bg" style="margin: 5px 5px 5px 5px; padding: 25px 10px 20px 10px; !important">
    <span class="bg-primary text-white cus-span2">Patient Registry</span>

    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
        <div class="search">
            <Label>Last Name:</Label>
            <input type="text" class="form-control form-control-sm w-100 custom-font">
        </div>
    </div> 

    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
        <div class="search">
            <Label>First Name:</Label>
            <input type="text" class="form-control form-control-sm w-100 custom-font">
        </div>
    </div> 

    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
            <Label>Middle Name:</Label>
            <input type="text" class="form-control form-control-sm w-100 custom-font">
        </div>
    </div> 

    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
        <div class="search">
            <Label>Date of Birth:</Label>
            <input type="date" class="form-control form-control-sm w-100 custom-font">
        </div>
    </div> 

    <div class="col-12">
        <div class="d-flex justify-content-end mt-2">
            <button class="btn btn-primary m-1">Search</button>
            <button class="btn btn-danger m-1">Refresh</button>
            <router-link :to="{ name: 'form', params: { type: 'rotavirus' } }" class="btn btn-info m-1">Go to Forms</router-link>
        </div>
    </div>



</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.cus-span2 {
    font-size: 14px;
    font-weight: 500;
    padding: 0.2em 0.2em 0.2em 0.2em;
    top: 4.9rem;
    width: 12em;
    border-radius: 4px;
    position: absolute;
    text-align: center;
}

.custom-border {
    border-radius: 6px;
    background: #FFFFFF !important;
    box-shadow: rgba(145,158,171,0.2) 0px 0px 2px 0px,rgba(145,158,171,0.12) 0px 12px 24px -4px !important; 
}

.w-100 {
    width: 100% !important;
}

.custom-font {
    font-size: 16px;
}
</style>
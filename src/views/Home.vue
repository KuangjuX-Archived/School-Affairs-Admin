<template>
<div>
    <my-header></my-header>
    <my-sidebar></my-sidebar>
</div>
</template>

<script>
import MyHeader from '../components/Header'
import MySidebar from "../components/Sidebar"
export default {
    name: "Home",
    components: {
        MyHeader,
        MySidebar
    }
}
</script>

<style scoped>

</style>

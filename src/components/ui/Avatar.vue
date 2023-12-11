<template>
    <!-- Компонент аватара  -->
    <div class="v-avatar">
        <img :src="src" alt="">
    </div>
</template>

<script>
    export default {
        // Принимаем параметр ссылки на картинку для аватара
        props: {
            src: String
        }
    }
</script>

<style lang='scss' scoped>
    .v-avatar {
        width: 50px;
        height: 50px;
    }
</style>
<template>
    <!-- Блок со статистикой по национальности  -->
    <div class="v-contacts-national">
        <h3>The number of users of each nationality</h3>
        <ul>
            <!-- 
                Выполняем цикл по выводу количества людей по национальности:
                - key: имя национальности
                - count: количество пользователей
            -->
            <li
                v-for="nat in getNationalLength"
                :key="nat.key"
            >{{nat.key}}: {{nat.count}} users</li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        // Добавляем массив с подчетом людей по национальности с помощью mapGetters
        ...mapGetters(['getNationalLength'])
    }
}
</script>

<style lang="scss" scoped>
    .v-contacts-national {
        margin-top: 50px;
        ul {
            display: grid;
            grid-template-columns: 4fr 4fr 4fr 4fr;
        }
    }
    
        
</style>
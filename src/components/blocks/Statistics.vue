<template>
    <!-- Блок общей статистики -->
    <div class="v-contacts-stat">
        <h3>Statistic</h3>
        <ul>
            <!-- Количество пользователей в коллекции  -->
            <li>Collection length: {{itemsLength}}</li>
            <!-- Количество мужчин в коллекции  -->
            <li>Male: {{getMale}}</li>
            <!-- Количество женчин в коллекции  -->
            <li>Female: {{getFemale}}</li>
            <!-- Количество остальных в коллекции  -->
            <li>Other: {{getOther}}</li>
            <!-- Выводим кого больше, мужчин или женщин  -->
            <li>
                <!-- Одинаковое количество  -->
                <template v-if="!genderTop">
                    The same number of both men and women
                </template>
                <!-- Не равное количество  -->
                <template v-else>
                    Most of all among users by {{genderTop}}: {{genderLength}} users
                </template>
            </li>
        </ul>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        // С помощью mapGetters выводим геттеры:
        // - itemsLength: количество пользователей
        // - getFemale: количество женщин
        // - getMale: количество мужчин
         ...mapGetters({
            itemsLength: 'getUsersLength',
            getFemale: 'getFemale',
            getMale: 'getMale',
        }),

        // Высчитываем кого больше, если одинаковое количество то выводим false
        genderTop(){
            return this.getFemale === this.getMale ? 'female' : 
                        this.getFemale < this.getMale ? 'male' : 
                        false
        },

        // Высчитываем кого больше, выводим большее число
        genderLength(){
            return this.getFemale > this.getMale ? this.getFemale : this.getMale
        },

        // Количество остальных гендеров
        getOther(){
            return this.itemsLength - this.getFemale - this.getMale
        }
    }
}
</script>

<style lang="scss" scoped>
    .v-contacts-stat {
        margin-top: 70px;
        ul {
            @include flex;
        }
    }
</style>
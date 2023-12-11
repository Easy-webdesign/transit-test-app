<template>
    <!-- Страница контактов  -->
    <div class="v-contacts">
        <div class="container">
            <h2>Contacts</h2>
            <h4>View mode:</h4> 
            <!-- Переключатели режима просмотра -->
            <div class="v-contacts-mode">

                <!-- Режим списка  -->
                <p 
                    :style="{color: viewMode === 'list' ? '#007bff' : ''}"
                    @click="onSelectViewMode('list')"
                >List</p>

                <!-- Режим плитки  -->
                <p 
                    :style="{color: viewMode === 'cards' ? '#007bff' : ''}"
                    @click="onSelectViewMode('cards')"
                >Cards</p>
            </div>
             
            <!-- Компонент фильтров -->
            <Filters/>
            
            <!-- Компонент таблицы  -->
            <BaseTable v-if="viewMode === 'list'" :contacts="items"/>
            <!-- Компонент карточек  -->
            <BaseCards v-if="viewMode === 'cards'" :contacts="items"/>
            <!-- Компонент пагинации  -->
            <BasePagination :countPages="countPages" v-model="page" />
            <!-- Компонент общей статистики  -->
            <Statistics/>
            <!-- Компонент статистики по национальностям -->
            <NationalStat/>
        </div>
    </div>
</template>

<script>
import BaseCards from '@/components/blocks/BaseCards.vue';
import BaseTable from '@/components/blocks/BaseTable.vue';
import Filters from '@/components/blocks/Filters.vue';    
import Statistics from '@/components/blocks/Statistics.vue';
import NationalStat from '@/components/blocks/NationalStat.vue';
import BasePagination from '@/components/ui/BasePagination.vue';    
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
    components: { BaseTable, BasePagination, Filters, Statistics, NationalStat, BaseCards },

    data(){
        // page: активная страница
        // viewMode: Режим просмотра
        return {
            page: 1,
            viewMode: 'list'
        }
    },

    watch: {
        // Слушатель переключения страницы
        page(value){
            this.changeSelectedPage(value);
        }
    },

    computed: {
        // С помощью mapGetters выводим из store такие данные как:
        // - items: getPageUsers, пользователи текущей страницы
        // - countPages: getCountPageOfUsers количество страниц согласно пользователям
        ...mapGetters({
            items: 'getPageUsers',
            countPages: 'getCountPageOfUsers',
        })
    },

    methods: {
        // С помощью mapActions и mapMutations выводим из store такие функции как:
        // - fetchUsersData:  получение данных о пользователях
        // - changeSelectedPage: изменение страницы
        ...mapActions(['fetchUsersData']),
        ...mapMutations(['changeSelectedPage']),

        // Смена режима просмотра 
        onSelectViewMode(mode){
            this.viewMode = mode;
        }
    },

    async mounted(){
        // Получаем список пользователей в store 
        await this.fetchUsersData();
    }
}
</script>


<style lang="scss" scoped>
    .v-contacts {
        padding: 50px 0;

        &-mode {
            @include flex(f, fs);

            p { 
                margin-right: 15px;
                cursor: pointer;
            }
        }
    }
</style>

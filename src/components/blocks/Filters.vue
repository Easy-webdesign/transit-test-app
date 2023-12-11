<template>
    <!-- Компонент фильров для пользователей -->
    <div class="v-filters">
        <!-- Если пользователь зашел как админ, то ему дополнительно доступны следующие параметры:
        - Фильтрация по полному имени
        - Фильтрация по полу
        - Фильтрация по национальности 
        -->
        <template v-if="role === 'admin'">
            <BFormInput v-model="fullNameValue" placeholder="Enter username"/>
            <BFormSelect v-model="genderValue" :options="gender"/>
            <BFormSelect v-model="nationalValue" :options="national"/>
        </template>
        
        <!-- Параметр сортировки по имени по возрастанию и по убыванию. 
        По умолчанию доступен всем -->
        <BFormSelect v-model="nameFilterValue" :options="nameFilters"/>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
    data(){
        // Параметры:
        // - fullNameValue: значение имени по умолчанию
        // - genderValue: значение пола по умолчанию
        // - nationalValue: значение Нацинальности по умолчанию
        // - nameFilterValue: значение сортировки по именам по умолчанию
        // - gender: опции для выпадающего списка сортировки по полу
        // - nameFilters: опции для выпадающего списка сортировки по имени
        return {
            fullNameValue: '',
            genderValue: null,
            nationalValue: null,
            nameFilterValue: null,
            gender: [
                { value: null, text: 'Please select the gender' },
                { value: 'male', text: 'Male' },
                { value: 'female', text: 'Female' },
            ],
            nameFilters: [
                { value: null, text: 'Default sorting of username' },
                { value: 'asc', text: 'Ascending' },
                { value: 'desc', text: 'Descending' },
            ],
        }
    },

    watch: {
        // Слушатель значения fullNameValue
        fullNameValue(val){
            this.sortUsers({key: 'name', value: val})
        },

        // Слушатель значения genderValue
        genderValue(val){
            this.sortUsers({key: 'gender', value: val})
        },

        // Слушатель значения nationalValue
        nationalValue(val){
            let value = val ? val.toUpperCase() : val;
            this.sortUsers({key: 'nat', value});
        },
        // Слушатель значения nameFilterValue
        nameFilterValue(val){
            this.sortUsers({key: 'order', value: val});
        },
    },

    computed: {
        // С помощью mapGetters выводим нужные нам геттеры из store для дальнейшей обработки
        // - national: выводит список национальностей для select
        // - role: выводит роль авторизованного пользователя
        ...mapGetters({
            national: 'getNational',
            role: 'getRole'
        })
    },

    methods: {
        // С помощью mapActions и mapMutations выводим нужные нам функции из store
        // - sortUsers: сортировка пользователей по умолчанию
        // - setRole: установка роли пользователя
        ...mapActions(['sortUsers']),
        ...mapMutations(['setRole'])
    },

    mounted(){
        // Проверяем есть ли пользователь в localStorage, и если нет то делаем редирект
        // на страницу авторизации
        if(!this.getLS('AUTH')) this.$router.push('/');
        // Иначе устанавливаем роль пользователя в store 
        else this.setRole(this.getLS('AUTH'));
    }
}
</script>

<style lang="scss" scoped>
    .v-filters {
        display: grid;
        grid-template-columns: 3fr 3fr 3fr 3fr;
        gap: 20px;
        margin-top: 30px;
    }
</style>
<template>
    <!-- Компонент таблицы, содержит в себе такие поля как:
        - аватар,
        - полное имя
        - день рождения
        - почту
        - номер телефона
        - местоположение
        - национальность
     -->
    <table class="v-contacts-table table">
        <thead>
            <tr>
                <th scope="col">Avatar</th>
                <th scope="col">Fullname</th>
                <th scope="col">Birthday</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Location</th>
                <th scope="col">National</th>
            </tr>
        </thead>
        <tbody>
            <!-- Компонент пользователя, выведен отдельно -->
            <ContactTable
                v-for="contact in contacts"
                :key="contact.id.value"
                :contact="contact"
            />

        </tbody>
    </table>
</template>

<script>
    import ContactTable from '@/components/items/ContactTable.vue';

    export default {
        // Добавлен компонент таблицы контакта пользователя 
        components: { ContactTable },

        // Зачения переданные в данный компонент:
        // - contacts: Массив контактов
        props: {
            contacts: Array
        }
    }
</script>

<style lang='scss' scoped>
    .v-contacts-table {
        margin-top: 30px;
    }
</style>
<template>
    <!-- Компонент таблицы пользователя  -->
    <tr>
        <!-- Аватар  -->
        <td>
            <div>
                <Avatar :src="contact.picture.thumbnail"/>
            </div>
        </td>
        <!-- Полное имя  -->
        <td>
            <div>{{ getFullName }}</div>
        </td>
        <!-- День рождения  -->
        <td>
            <div>{{ getBirthday }}</div>
        </td>
        <!-- Почта  -->
        <td>
            <ContactLink type='email' :link="contact.email"/>
        </td>
        <!-- Номер телефона  -->
        <td>
            <ContactLink type='phone' :link="contact.phone"/>
        </td>
        <!-- Местоположение  -->
        <td>
            <div>{{ getLocation }}</div>
        </td>
        <!-- Национальность  -->
        <td>
            <div>{{ contact.nat }}</div>
        </td>
    </tr>
</template>

<script>
    import Avatar from '@/components/ui/Avatar.vue';
    import ContactLink from '../ui/ContactLink.vue';

    // Словарь с днями недели 
    import { weekDays } from '@/utils/dictionaries';

    export default {
        components: { Avatar, ContactLink },

        props: {
            // Значение contact, для вывода информации в таблице 
            contact: Object
        },
        computed: {
            // Генерируем полное имя пользователя
            getFullName(){
                // Деструктуризация объекта name пользователя  
                const { title, first, last } = this.contact.name;

                // Возвращаем строку в нужном нам формате 
                return `${title} ${first} ${last}`;
            },

            // Генерируем дату в нужном нам формате 
            getBirthday(){
                // Получаем дату 
                const date = new Date(this.contact.dob.date);
                
                // Выводим параметры:
                // -  weekDay: день недели
                // -  month: месяц
                // -  number: число
                // -  year: год
                const weekDay = date.getDay();
                const month = date.getMonth();
                const number = date.getDate();
                const year = date.getFullYear();

                // -  hours: часы
                // -  minutes: минуты
                const hours = date.getHours();
                const minutes = date.getHours();

                //Форматируем время в нужный нам формат
                const time = this.toAmPmFormat(hours);

                return `${weekDays[weekDay]}, ${month}/${number}/${year}, ${time.hours}:${minutes} ${time.timeOfDay}, Age - ${this.contact.dob.age}`
            },

            // Получаем местоположение пользователя 
            getLocation(){
                const loc = this.contact.location
                return `${loc.country}, ${loc.state}, ${loc.city} `
            }
        }
    }
    
</script>

<style lang="scss" scoped>
    tr {
        // @include flex();
        font-size: 13px;

        td {
            // @include flex(inf, c, fs);
            height: 50px;

            div {
                @include flex(f, fs, c);
                height: 100%;
                margin: auto 0;
            }
        }
    }
</style>
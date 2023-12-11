<template>
    <!-- Компонент карточек контактов -->
    <div class="v-cards">
        <!-- Выводим циклом контакты -->
        <BCard
            v-for="contact in contacts"
            :key="contact.id.value"
        >
            <BCardBody>
                <!-- Аватар  -->
                <BCardImg :src="contact.picture.thumbnail"/>
                <!-- Полное имя  -->
                <BCardTitle>{{ getFullName(contact.name) }}</BCardTitle>
                 <!-- День рождения  -->
                <BCardSubTitle>Birthday {{ getBirthday(contact.dob) }}</BCardSubTitle>
                <!-- Почта  -->
                <BCardText>Mail: <ContactLink type='email' :link="contact.email"/></BCardText>
                <!-- Номер телефона  -->
                <BCardText>Phone: <ContactLink type='phone' :link="contact.phone"/></BCardText>
                <!-- Местоположение  -->
                <BCardText>{{ getLocation(contact.location) }}</BCardText>
                <!-- Национальность  -->
                <BCardText>{{ contact.nat }}</BCardText>
            </BCardBody>
        </BCard>
    </div>
</template>

<script>
import { weekDays } from '@/utils/dictionaries';
import ContactLink from '../ui/ContactLink.vue';

export default {
    components: { ContactLink },
    // Зачения переданные в данный компонент:
    // - contacts: Массив контактов
    props: {
        contacts: Array
    },

    methods: {
        // Генерируем полное имя пользователя
        getFullName(name){
            // Деструктуризация объекта name пользователя  
            const { title, first, last } = name;

            // Возвращаем строку в нужном нам формате 
            return `${title} ${first} ${last}`;
        },

        // Генерируем дату в нужном нам формате 
        getBirthday(dob){
            console.log(dob.date);
            // Получаем дату 
            const date = new Date(dob.date);
            
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

            return `${weekDays[weekDay]}, ${month}/${number}/${year}, ${time.hours}:${minutes} ${time.timeOfDay}, Age - ${dob.age}`
        },

        // Получаем местоположение пользователя 
        getLocation(location){
            return `${location.country}, ${location.state}, ${location.city} `
        }
    }
}
</script>

<style lang="scss">
    .v-cards {
        display: grid;
        grid-template-columns: 4fr 4fr 4fr;
        gap: 30px;
        margin-top: 30px;

        .card {
            &-title {
                font-size: 1.1rem;
                margin-top: 20px;
            }

            &-subtitle {
                margin-bottom: 20px;
            }

            &-body {
                padding: 0.7rem;
            }
        }
    }
</style>
<template>
    <!-- Страница авторизации  -->
    <div class="v-auth">
        <div class="container">
            <h2>Войти как</h2>
            <!-- Компонент радио кнопок  -->
            <BFormRadioGroup
                v-model="selected"
                disabled-field="notEnabled"
                class="mb-3"
            >
                <!-- value-field="item"
                text-field="name" -->
                <!-- Выводим кнопки для админа и обычного пользователя  -->
                <BFormRadio
                    v-for="button in buttons"
                    :key="button.item"
                    :value="button.item"
                >{{button.name}}</BFormRadio>

            </BFormRadioGroup>

            <!-- Кнопка войти  -->
            <BButton variant="primary" @click="onClick">Войти</BButton>
        </div>
    </div>
    
</template>

<script>
    import { mapMutations } from 'vuex';

    export default {
        data(){
            // Данные для страницы авторизации:
            // - selected: выбранная по умолчанию кнопка
            // - buttons: список кнопок для выбора типа пользователя 
            return {
                selected: 'admin',
                buttons: [
                    { item: 'admin', name: 'Админ' },
                    { item: 'user', name: 'Пользователь' },
                ]
            }
        },

        methods: {
            // С помощью mapMutations получаем функцию setRole для установки роли
            // авторизованного пользователя
            ...mapMutations(['setRole']),

            // Клик по кнопке авторизации
            onClick(){
                // Добавляем в localStorage данные об авторизованном пользователе
                this.toLS('AUTH', this.selected);
                // Устанавливаем роль пользователя в store 
                this.setRole(this.selected)
                // Переходим на страницу контактов 
                this.$router.push('/contacts');
            }
        },
        mounted(){

            // Если наш пользователь авторизован, при рендере автоматически переходим
            // на страницу контактов
            if(this.getLS('AUTH')) this.$router.push('/contacts');
        },
    }
</script>

<style lang="scss" scoped>

    .v-auth {
        .container {
            width: 100%;
            height: 90vh;
            @include flex(f, c, c, col);
        }
    }

    .v-radio { cursor: pointer; }

</style>

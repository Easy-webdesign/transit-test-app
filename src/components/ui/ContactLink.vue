<template>
    <!-- Компонент ссылки контакта  -->
    <div class="v-contact__link">
        <!-- Если тип ссылки mail то выводим соответственно ссылку для mail -->
        <a v-if="type === 'mail'" :href="`mailto:${link}`">{{link}}</a>
        <!-- Иначе для телефона  -->
        <a v-else :href="`tel:+${getPhone}`">{{link}}</a>

        <!-- Компонент иконки копирования ссылки в буфер -->
        <CopyIcon @click.native="onCopy" class="v-copy-icon"/>
    </div>
</template>

<script>
    import CopyIcon from '@/components/ui/CopyIcon';

    export default {
        components: { CopyIcon },

        // Свойства передаваемые в наш компонент:
        // - type: тип ссылки mail или phone 
        // - link: номер или почта
        props: {
            type: String,
            link: String
        },

        methods: {
            // Копирование номера телефона или почты 
            onCopy(e){
                // Проверяем есть ли у тега по которому кликнули
                // родитель с классом v-copy-icon
                const target = e.target.closest('.v-copy-icon');

                // Если нет, то останавливаем функцию
                if(!target) return;

                // Копируем значение ссылки в буфер обмена
                navigator.clipboard.writeText(this.link);
            }
        },

        computed: {
            // Форматируем значение телефона удаляя лишние символы из строки
            // Для дальнейшей передачи в аттрибут href 
            getPhone(){
                // Если тип ссылки phone 
                if(this.type === 'phone') {
                    // Тогда возвращаем ссылку, удалив дефис
                    return this.link.replace('-', '');
                };
            }
        }
    };
</script>
<style lang='scss' scoped>

</style>
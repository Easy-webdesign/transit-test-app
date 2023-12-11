<template>
    <!-- Компонент навигации -->
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <!-- Кнопка предыдущей страницы -->
            <li 
                :class="['page-item', { disabled: !prev }]"
                @click.prevent="dec()"
            >
                <a class="page-link" href="#">Previous</a>
            </li>

            <!-- Выводим кнопки страниц -->
            <li 
                v-for="page in pagination"
                :key="page * Math.random()"
                :class="['page-item', {active: value === page}]"
                @click.prevent="onClick(page)"
            >
                <a class="page-link" href="#">{{page}}</a>
            </li>

            <!-- Кнопка следующей страницы  -->
            <li 
                :class="['page-item', { disabled: !next }]"
                @click.prevent="inc()"
            >
                <a class="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        
        props: {
            // Выводим передаваемые свойства:
            // - countPages: количество страниц 
            // - value: значение активной страницы передаваемое через v-model
            countPages: Number,
            value: Number
        },

        data(){
            // Параметры пагинации:
            // - prev: статус кнопки предыдущей страницы
            // - next: статус кнопки следующей страницы
            // - pagination: список отображаемых кнопок страниц, 
            //   при переключении страниц меняется
            return {
                prev: false,
                next: true,
                pagination: []
            }
        },

        watch: {
            // Слушатель изменения количества страниц, изменяется в случае
            // обновления количества страниц за счет изменения количества выводимых
            // пользователей на странице
            countPages(val){
                // Обнуляем массив кнопок пагинации
                this.pagination = [];

                // Собираем по новой
                this.setPaginationList();
            }
        },

        methods: {
            // Выбор страницы с контактами:
            // - btn: кнопка страницы с ее номером
            selectPageContacts(btn){
                // Если активная страница равна номеру кнопки страницы, 
                // останавливаем функцию
                if(this.value === btn) return;
                
                // Если номер кнопки страницы больше или равен 4 то 
                // пересобираем массив кнопок, чтобы список сместился
                if(btn >= 4){
                    // Длина итерации до остановки цикла вывода кнопок
                    // Если значение кнопки в сумме с числом 2 больше или равно количеству
                    // страниц, то возвращаем количество страниц. Таким образом отображаемых
                    // страниц будет пропорционально количеству пользователей в store
                    const iterationLength = btn + 2 >= this.countPages ? 
                                            this.countPages : 
                                            btn + 2;
                    
                    // Номер кнопки с которого начинается обработка цикла. 
                    // Если у нас номер кнопки последний, то мы выводим число меньше на 4 или 3.
                    // Таким образом мы выведем последние 5 кнопок
                    // Если число кнопки с разницей числа 2 меньше единицы, в таком случае 
                    // получаем число 1 в качестве старта итерации и выводим первые 5 кнопок
                    // В остальных случаях число начала итерации будет на 2 меньше от выбранной кнопки
                    const idx = btn === this.countPages ? 
                                        btn - 4 : 
                                        btn === this.countPages - 1 ?
                                        btn - 3 :
                                        btn - 2 <= 1 ? btn : btn - 2
        
                    
                    // Обнуляем массив с кнопками, для его пересборки
                    this.pagination = [];
                    
                    // Запускаем цикл для добавления отображаемых кнопок в массив
                    for (let i = idx; i <= iterationLength; i++) this.pagination.push(i);
        
                    // Если номер кнопки меньше количества страниц, то для
                    // кнопки следующей страницы мы ставим статус true 
                    if(btn < this.countPages) this.next = true;
                    // Иначе false 
                    else this.next = false
                } else {
                    // В остальных случаях мы выводим кнопки первых 5 страниц
                    this.pagination = [];
                    for (let i = 1; i <= 5; i++) this.pagination.push(i);

                    // Ставим статус активности кнопки следующей страницы true 
                    this.next = true;

                    // Ставим статус активности кнопки предыдущей страницы
                    // Если номер активной страницы больше 1 ставим статус кнопки
                    // предыдущей страницы true
                    if(btn > 1) this.prev = true;
                    // Иначе false 
                    else this.prev = false;
                }
            },

            // Установка страниц при рендере
            setPaginationList(){
                // Если число страниц больше 5, выводим первые 5 кнопок
                if(this.countPages > 5){
                    for (let i = 1; i <= 5; i++) this.pagination.push(i);
                    this.next = true;
                } else {
                    // Иначе выводим количество кнопок по количеству доступных страниц
                    for (let i = 1; i <= this.countPages; i++) this.pagination.push(i);
                    this.next = false;
                }
                
            },

            // Следующая страница
            inc(){
                // Если кнопка next не активна, останавливаем функцию
                if(!this.next) return;

                // Увеличиваем значение текущей кнопки на 1
                const btn = this.value + 1;
                // Передаем в функцию onClick для дальнейшей обработки 
                this.onClick(btn);
            },

            // Предыдущая страница
            dec(){
                // Если кнопка prev не активна, останавливаем функцию
                if(!this.prev) return;

                // Уменьшаем значение текущей кнопки на 1
                const btn = this.value - 1;
                // Передаем в функцию onClick для дальнейшей обработки 
                this.onClick(btn);
            },

            // Клик по кнопке в пагинации
            onClick(btn){
                // Открываем встроенное событие input которое у нас появляется
                // при использовании параметра v-model и передаем наверх новое значение
                // активной страницы
                this.$emit('input', btn);

                // Запускаем рендер кнопок пагинации
                this.selectPageContacts(btn);
            }
        },

        mounted(){
            // Устанавливаем список кнопок страниц в пагинации при рендере
            this.setPaginationList();
        }
    }
</script>

<style lang="scss" scoped>
    nav {
        margin-top: 30px;
    }
</style>
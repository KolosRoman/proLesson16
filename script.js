const container = document.getElementById('slide-conteiner');


let btnDeleteLast = document.getElementById('button-delete-last');
let btnAdd = document.getElementById('button-add');
let btnAddNumber = document.getElementById('button-add-number');
let btnNext = document.getElementById('button-next');
let btnPrev = document.getElementById('button-back');
let btnDeleteNamber = document.getElementById('button-delete-namber');
let btnOpenFirstSlide = document.getElementById('button-open-first');
let btnOpenLastSlide = document.getElementById('button-open-last');
let btnOpenNumberSlide = document.getElementById('button-open-number');





class Slider {
    constructor(container) {
        this.container = container;
        this.block = document.getElementsByClassName('slide-block');
        this.nonBlock = document.querySelector('.non-slide');
        
        this.offset = 0;
        this.slideNum = 1;

        this.title = document.getElementById('title');
        this.todo = document.getElementById('todo');
        this.inputAddNumber = document.getElementById('input-add-number');
        this.inputNumberDelete = document.getElementById('input-number-delete');
        this.inputOpenSlide = document.getElementById('input-number-open');


        this.slideNumber = document.getElementById('slide-number');
        this.slideNumberOpen = document.getElementById('slide-number-open');
        

        this.errorInputValue = document.getElementsByClassName('error-input')
        this.errorAddNumber = document.getElementById('error-add-number');
        this.errorDeleteNumber = document.getElementById('error-delete-number');
        this.errorOpenNumber = document.getElementById('error-input-number-open');
    }

    nextSlider() {
        this.offset = this.offset + 600;
        if (this.offset > (this.block.length - 1) * 600) {
            this.offset = 0;
        }
        
        this.slideNum += 1;
        if(this.slideNum > this.block.length) {
            this.slideNum = 1;
        }
        this.slideNumberOpen.textContent = this.slideNum;
        this.slideNumber.textContent = this.block.length;
        this.container.style.left = -this.offset + 'px';
    }

    previousSlider() {
        this.offset = this.offset - 600;
        if (this.offset < 0) {
            this.offset = (this.block.length - 1) * 600;
        }

        if (this.slideNum === 1) {
            this.slideNum = this.block.length + 1;
        }
        
        if(this.slideNum > 1) {
            this.slideNum -= 1;
        }

        this.slideNumberOpen.textContent = this.slideNum;
        this.slideNumber.textContent = this.block.length;
        this.container.style.left = -this.offset + 'px';
    }

    addSliderLast() {
        let inputTitle = this.title.value;
        let inputTodo = this.todo.value;

        if (!inputTitle) {
            this.errorInputValue[0].textContent = "Поле не має бути порожнім"
            return
            
        }
        if (!inputTodo) {
            this.errorInputValue[1].textContent = "Поле не має бути порожнім"
            return
        }
        const todoDiv = document.createElement('div');
        const todoTitle = document.createElement('h2');
        const todoItem = document.createElement('p');
        todoTitle.innerText = inputTitle;
        todoItem.innerText = inputTodo;
        todoDiv.append(todoTitle, todoItem);
        todoDiv.classList.add('slide-block');

        if(this.block.length === 0) {
            this.container.insertAdjacentElement('afterbegin', todoDiv);
        } 
        else {
            this.block[this.block.length - 1].after(todoDiv);
        }

        if(this.slideNum === 0) {
            this.nonBlock.classList.remove('active');
        }

        this.container.style.left = -((this.block.length - 1) * 600) + 'px';
        this.offset = (this.block.length - 1) * 600;
        this.slideNum = this.block.length;
        this.slideNumberOpen.textContent = this.slideNum;
        this.slideNumber.textContent = this.block.length;
        this.title.value = '';
        this.todo.value = '';
        this.errorInputValue[0].textContent = '';
        this.errorInputValue[1].textContent = '';
    }

    addSlideByNamber() {
        let inputTitle = this.title.value;
        let inputTodo = this.todo.value;

        if (!inputTitle) {
            this.errorInputValue[0].textContent = "Поле не має бути порожнім"
            return
            
        }
        if (!inputTodo) {
            this.errorInputValue[1].textContent = "Поле не має бути порожнім"
            return
        }
    
        const todoDiv = document.createElement('div');
        const todoTitle = document.createElement('h2');
        const todoItem = document.createElement('p');
        todoTitle.innerText = inputTitle;
        todoItem.innerText = inputTodo;
        todoDiv.append(todoTitle, todoItem);
        todoDiv.classList.add('slide-block');
        let numAdd = +this.inputAddNumber.value;
        if(numAdd <= 0) {
            this.errorAddNumber.textContent = "Слайда з від'ємним значенням або 0 не існує"
            return;
        }
        if(this.block.length === 0) {
            if(numAdd > 1) {
                this.errorAddNumber.textContent = "Контейнер порожній. Введіть слайд під №1"
                return;
            }
            this.container.insertAdjacentElement('afterbegin', todoDiv);
        }
        if(numAdd > this.block.length) {
            this.errorAddNumber.textContent = `Ви ввели номер який більший за кількість слайдів, у колекції ${this.block.length} слайди`
            return;
        }
        this.block[numAdd - 1].before(todoDiv);

        if(this.slideNum === 0) {
            this.nonBlock.classList.remove('active');
        }

        this.container.style.left = -((numAdd - 1) * 600) + 'px';
        this.offset = (numAdd * 600) - 600;
        this.slideNum = numAdd;
        this.slideNumberOpen.textContent = this.slideNum;

        this.slideNumber.textContent = this.block.length;
        this.title.value = '';
        this.todo.value = '';
        this.inputAddNumber.value = '';
        this.errorInputValue[0].textContent = '';
        this.errorInputValue[1].textContent = '';
        this.errorAddNumber.textContent = '';
    }

    deleteLastSlide() {
        if(this.block.length - 1 >= 0) {
            this.block[this.block.length - 1].remove();
            this.container.style.left = -((this.block.length - 1) * 600) + 'px';
            this.slideNum = this.block.length;
        }
        if(this.slideNum === 0) {
            this.container.style.left = 0;
            this.nonBlock.classList.add('active');
        }
        this.slideNumberOpen.textContent = this.slideNum;
        this.slideNumber.textContent = this.block.length;
    }

    deleteSlideByNamber() {
        let numDelete = +this.inputNumberDelete.value;

        if(numDelete <= 0) {
            this.errorDeleteNumber.textContent = "Слайда з від'ємним значенням або 0 не існує"
            return;
        }
        if(numDelete > this.block.length) {
            this.errorDeleteNumber.textContent = `Ви ввели номер який більший за кількість слайдів, у колекції ${this.block.length} слайди`
            return;
        }

        this.block[numDelete - 1].remove()
        this.offset = 0;
        this.slideNum = 1;
        
        if(this.block.length === 0) {
            this.slideNum = 0;
        }

        if(this.slideNum === 0) {
            this.container.style.left = 0;
            this.nonBlock.classList.add('active');
        }
        
        this.slideNumberOpen.textContent = this.slideNum;
        this.slideNumber.textContent = this.block.length;
        this.container.style.left = -this.offset + 'px';
        this.inputNumberDelete.value = '';
        this.errorDeleteNumber.textContent = '';
    }

    openFirstSlide() {
        this.container.style.left = 0 + 'px';
        this.offset = 0;
        this.slideNum = 1;
        this.slideNumberOpen.textContent = this.slideNum;
    }

    openLastSlide() {
        this.container.style.left = -((this.block.length - 1) * 600) + 'px';
        this.offset = (this.block.length - 1) * 600;
        this.slideNum = this.block.length;
        this.slideNumberOpen.textContent = this.slideNum;
    }

    openSlideByNumber() {
        let numOpen = +this.inputOpenSlide.value;
        if((numOpen * 600) - 600 > (this.block.length - 1) * 600) {
            this.errorOpenNumber.textContent = 'Слайд з таким номером відсутній'
            return;
        }

        if(numOpen <= 0) {
            this.errorOpenNumber.textContent = "Слайди з від'ємним значенням та 0 відсутні"
            return;
        }
        this.offset = (numOpen * 600) - 600;

        this.container.style.left = -this.offset + 'px';
        this.slideNum = numOpen;
        this.slideNumberOpen.textContent = this.slideNum;
        this.inputOpenSlide.value = '';
        this.errorOpenNumber.textContent = '';
    }

}

const slider = new Slider(container);



btnNext.addEventListener('click', () => {
    slider.nextSlider()
})

btnPrev.addEventListener('click', () => {
    slider.previousSlider()
})

btnDeleteNamber.addEventListener('click', () => {
    slider.deleteSlideByNamber()
})

btnDeleteLast.addEventListener('click', () => {
    slider.deleteLastSlide()
})

btnAdd.addEventListener('click', () => {
    slider.addSliderLast()
})

btnAddNumber.addEventListener('click', () => {
    slider.addSlideByNamber()
})

btnOpenFirstSlide.addEventListener('click', () => {
    slider.openFirstSlide()
})

btnOpenLastSlide.addEventListener('click', () => {
    slider.openLastSlide()
})

btnOpenNumberSlide.addEventListener('click', () => {
    slider.openSlideByNumber()
})

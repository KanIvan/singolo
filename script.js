const MENU = document.getElementById('menu122');
const MENU_PORTF = document.getElementById('menu_portfolio');
const GALERY = document.getElementById('galery');
const BUTTON = document.getElementById('button');
const CLOSE_BUTTON = document.getElementById('close-btn');
const BUTTON_ALL = document.getElementById('btn_All');

// let srcArray = [];
//  for (i = 0; i < GALERY.querySelectorAll('div').length; i++) {
//     srcArray = srcArray.concat(GALERY.querySelectorAll('div')[i]);
//  }

// function shuffle(arr){
// 	var j, temp;
// 	for(var i = arr.length - 1; i > 0; i--){
// 		j = Math.floor(Math.random()*(i + 1));
// 		temp = arr[j];
// 		arr[j] = arr[i];
// 		arr[i] = temp;
// 	}
// 	return arr;
// }

// shuffle(srcArray);

MENU_PORTF.addEventListener('click', (event) => {
    MENU_PORTF.querySelectorAll('a').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
});

GALERY.addEventListener('click', (event) => {
    GALERY.querySelectorAll('div').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
});

BUTTON.addEventListener('click', () => {
    const subject = document.getElementById('sub').value.toString();
    if (subject != '') {
        document.getElementById('result').innerText = 'Тема: ' + subject;
    }
    else {
        document.getElementById('result').innerText = 'Без темы';
    }

    const subject2 = document.getElementById('detail').value.toString();
    if (subject2 != '') {
        document.getElementById('result2').innerText = 'Описание: ' + subject2;
    }
    else {
        document.getElementById('result2').innerText = 'Без описания';
    }
    document.getElementById('message-block').classList.remove('hidden');
});

CLOSE_BUTTON.addEventListener('click', () => {
    document.getElementById('result').innerText = '';
    document.getElementById('message-block').classList.add('hidden');
});

document.addEventListener('scroll', onScroll);

function onScroll(event) {
    const curPos = window.scrollY;
    const divs = document.querySelectorAll('#wrapper>div');
    const links = document.querySelectorAll('#menu122 a');

    divs.forEach((el) => {
        if (el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {
            links.forEach((a) => {
                a.classList.remove('active');
                if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('active');
                }
            })
        }
    })
}

let items = document.querySelectorAll('.item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    })
}

function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    })
}

function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}

function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
}

document.querySelector('.control.left').addEventListener('click', function() {
    if (isEnabled) {
        previousItem(currentItem)
    }
});

document.querySelector('.control.right').addEventListener('click', function() {
    if (isEnabled) {
        nextItem(currentItem)
    }
});
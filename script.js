
let initialCount = true;
const apiKey = 'AVf-UAXZrsSWxuhX_4zVdUBexFFzmF90uk2f-S6NqnM';
const count  = 5;
let apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

let photosArr = [];
let loader = document.querySelector('.loader');
let canMore = false;
let imgCounter = 0


/**
 * Устанавливает атрибуты заданному DOM-элементу
 *
 * @param {node} Элемент.
 * @param {object} Объект с атрибутами и значениями.
 */

function setAttr(el, attrs) {
    for(let attr in attrs){
        el.setAttribute(attr, attrs[attr])
    }
}

function setNewImageCount(count){
    apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
}

function cardLoaded(ArrLength){
    imgCounter++;
    console.log('loaded');
    if(imgCounter === ArrLength) {
        canMore = true;
        loader.hidden = true;
        console.log('go more');
    }
}

async function getPhotos(){
    try{
        let response = await fetch(apiURL);
        photosArr = await response.json();
        displayPhotos(photosArr)
        if(initialCount) {
            setNewImageCount(30);
            initialCount = false;
        }
    }catch(error) {
        console.log(error);
    }
}

function displayPhotos(photos){
    // console.log(photos);
    imgCounter = 0;
    let infiniteCards = document.querySelector('.infinite-cards');
    photos.forEach(photo => {

        // Cоздаём a
        let a = document.createElement('a');
        setAttr(a, {
            href: photo.links.html,
            target: '_blank',
            class: 'infinite__card'
        });

        // Создаём img
        let img = document.createElement('img');
        setAttr(img, {
            src: photo.urls.regular,
            alt: photo.alt_description !== null ? photo.alt_description : 'Безымянное изображение',
            title: photo.alt_description !== null ? photo.alt_description : 'Безымянное изображение',
            class: 'infinite__image'
        });

        // Помещаем img внутрь a
        a.append(img);

        // Помещаем a, в котором находится img в контейнер
        infiniteCards.append(a);

        img.addEventListener('load', () => {
            cardLoaded(photos.length);
        })
        
    });
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
       if(canMore) {
            getPhotos();
            canMore = false;
       }
    }
})

getPhotos();
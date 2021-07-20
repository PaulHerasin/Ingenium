$(document).ready(function () {
    //initialize swiper when document ready
    var mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 40,
        slidesPerGroup: 3,
        speed: 500,
        loop: true,
        autoHeight: true,

        autoplay: {
            delay: 5000,
        },

        pagination: {
            el: '.swiper-pagination',
            bulletClass: 'swiper-bullet',
            bulletActiveClass: 'swiper-bullet-activ',
            clickable: true,
        },

        breakpoints: {

            767: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 20
            },

            1200: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 30
            }
        },

    })

    var maxHeight = 1;
    document.querySelectorAll('.solution__item-text').forEach(function (item) {
        let itemHeight = getComputedStyle(item).getPropertyValue('height');
        itemHeight = itemHeight.substr(0, itemHeight.length - 2) * 1;
        maxHeight < itemHeight ? maxHeight = itemHeight : '';
    });
    document.querySelectorAll('.solution__item-text').forEach(i => {
        i.style.height = maxHeight;
    });
});

history.pushState('', document.title, window.location.pathname+window.location.search);

$('.js-button-campaign').click(function () {
    $(".js-popup-campaign").fadeToggle(100);
});

$('.js-close-campaign').click(function () {
    $('.js-popup-campaign').fadeOut();
});


document.querySelector('#form-header').addEventListener('submit', wmSubmitForm);
document.querySelector('#form-footer').addEventListener('submit', wmSubmitForm);

function wmSubmitForm(e) {
    e.preventDefault();
    let nameNode = e.target.querySelector('[name="name"]');
    let phoneNode = e.target.querySelector('[name="phone"]');
    if (nameNode.value.length < 2) {
        nameNode.classList.add('input-error');
    } else {
        nameNode.classList.remove('input-error');
    }
    if (phoneNode.value.length < 7) {
        phoneNode.classList.add('input-error');
    } else {
        phoneNode.classList.remove('input-error');
    }
    if (e.target.querySelector('.input-error') != null) return;
    var obj = new FormData(e.target);
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', e.target.action + '?action=send_form_call_me', true);
    xhttp.send(obj);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                obj = JSON.parse(xhttp.response);
                if (obj.success) {
                    alert('Ваша заявка успешно отправлена!');
                } else {
                    alert('Что-то пошло не так, попробуйте написать нам на почту - ' + mail);
                }
            } else {
                alert('Что-то пошло не так, попробуйте написать нам на почту - ' + mail);
            }
        }
    }
}

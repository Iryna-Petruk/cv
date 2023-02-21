var linkNav = document.querySelectorAll('[href^="#"]'); //выбираем все ссылки к якорю на странице
var speedScroll = 1;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)

for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
        e.preventDefault(); //отменяем стандартное поведение

        var w = window.pageYOffset; // производим прокрутка прокрутка
        var linkID = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
        var topGup = document.querySelector(linkID).getBoundingClientRect().top;  // отступ от окна браузера до id
        var start = null;

        requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]

        function step(time) {

            if (start === null) start = time;

            var progress = time - start;
            var r = (topGup < 0 ? Math.max(w - progress/speedScroll, w + topGup) :
            Math.min(w + progress/speedScroll, w + topGup));

            window.scrollTo(0,r);

            if (r != w + topGup) {
                requestAnimationFrame(step)
            } else {
                location.hash = linkID  // URL с хэшем
            }
        }
    }, false);
}

const servicesItem = document.querySelector('.mobile-menu__item:nth-child(2)');
const servicesLink = servicesItem.querySelector('.mobile-menu__link');
const submenuList = servicesItem.querySelector('.mobile-submenu__list');

if (servicesItem && servicesLink && submenuList) {
    servicesLink.addEventListener('click', (event) => {
        event.preventDefault();

        servicesLink.classList.toggle('select');

        servicesItem.classList.toggle('is-open');

        if (servicesItem.classList.contains('is-open')) {
            submenuList.style.display = 'block';
        } else {
            submenuList.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const yearsElement = document.getElementById('copyright-years');

    if (yearsElement) {
        const startYear = yearsElement.textContent;
        const currentYear = new Date().getFullYear();

        if (parseInt(startYear) < currentYear) {
            yearsElement.textContent = `${startYear}-${currentYear}`;
        } else {
            yearsElement.textContent = startYear;
        }
    }
});

$(document).ready(function() {
    const $header = $('.header');
    const scrollThreshold = 50;

    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();

        if (scrollTop > scrollThreshold) {
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }
    });

    $(window).trigger('scroll');
});

document.addEventListener('DOMContentLoaded', () => {
    const maxHeight = 200; 
    
    const relatedCards = document.querySelectorAll('.related__card');

    relatedCards.forEach(card => {
        const detailsBlock = card.querySelector('.related__details');
        const readMoreButton = card.querySelector('.related__btn');
        const fullTextBlock = card.querySelector('.related__description--full'); 

        if (!detailsBlock || !readMoreButton) {
            return;
        }

        const totalContentHeight = detailsBlock.scrollHeight;
        
        if (totalContentHeight > maxHeight) {
            readMoreButton.style.display = 'block';
            detailsBlock.classList.remove('is-expanded');
        } else {
            readMoreButton.style.display = 'none';
            detailsBlock.classList.add('is-expanded');
        }

        readMoreButton.addEventListener('click', () => {
            detailsBlock.classList.toggle('is-expanded');

            if (detailsBlock.classList.contains('is-expanded')) {
                readMoreButton.textContent = 'Read less';
            } else {
                readMoreButton.textContent = 'Read more';
            }
        });
    });
});

function centerLastItem() {
    const $visibleItems = $('.project__item:visible');
    if ($visibleItems.length % 2 !== 0 && $visibleItems.length > 1) {
        const $lastItem = $visibleItems.last();
        $lastItem.addClass('center-item');
    } else {
        $('.project__item').removeClass('center-item');
    }
}

$('.projects__btn').on('click', function() {
    const $thisButton = $(this);
    const filterValue = $thisButton.data('filter');

    $('.projects__btn').removeClass('active');
    $thisButton.addClass('active');

    const $projectItems = $('.project__list .project__item');

    $projectItems.fadeOut(300, function() {
        if (filterValue === 'all') {
            $projectItems.fadeIn(300, function() {
                centerLastItem();
            });
        } else {
            $projectItems.filter('[data-category="' + filterValue + '"]').fadeIn(300, function() {
                centerLastItem();
            });
        }
    });
});
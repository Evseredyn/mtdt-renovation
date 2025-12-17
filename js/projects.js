$(document).ready(function() {

    $('.projects__btn').on('click', function() {
        const $thisButton = $(this);
        const filterValue = $thisButton.data('filter');

        $('.projects__btn').removeClass('active');
        $thisButton.addClass('active');

        const $projectItems = $('.project__list .project__item');
        const $targetItems = (filterValue === 'all') 
            ? $projectItems 
            : $projectItems.filter('[data-category="' + filterValue + '"]');

        $projectItems.stop(true, true).fadeOut(300, function() {
            
            if (!$(this).is(':animated') && $(this).css('display') === 'none') {
                
                $projectItems.hide(); 
                
                $targetItems.stop(true, true).fadeIn(300);
            }
        });
        
        $targetItems.each(function() {
            const $article = $(this).find('.project__article');
            const $activeThumb = $article.find('.project__switcher-thumb.active');
            if ($activeThumb.length) {
                $article.find('.project__demo').attr('src', $activeThumb.data('image'));
            }
        });
        
    });

    $('.projects__btn.active').trigger('click');

    $('.project__list').on('click', '.project__switcher-thumb', function() {
        const $thisThumb = $(this);
        const $projectArticle = $thisThumb.closest('.project__article');
        const $mainImage = $projectArticle.find('.project__demo');
        const newImageUrl = $thisThumb.data('image');

        $mainImage.attr('src', newImageUrl);

        $projectArticle.find('.project__switcher-thumb').removeClass('active');
        $thisThumb.addClass('active');
    });

    $('.project__article').each(function() {
        const $article = $(this);
        const $activeThumb = $article.find('.project__switcher-thumb.active');
        if ($activeThumb.length) {
            $article.find('.project__demo').attr('src', $activeThumb.data('image'));
        }
    });

});
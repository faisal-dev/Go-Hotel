console.log('\'Allo \'Allo!'); // eslint-disable-line no-console

// Putting semicolon before self invoke fuction prevent and error code on minnify
// http://stackoverflow.com/questions/19864244/why-is-there-sometimes-a-semicolon-before-an-anonymous-function
;(function($) {
  'use strict';

  $(document).ready(function() {

    // Menu item
    $('.menu-item').hover(function(e) {
      /* Stuff to do when the mouse enters the element */
      if(window.innerWidth < 1200) {
        setTimeout(function() {
          $(this).find('.menu-item-extend ').addClass('in');
        }, 500);
      } else {
        $(this).find('.menu-item-extend ').addClass('in');
      }

      }, function(e) {
        /* Stuff to do when the mouse leaves the element */
        if(window.innerWidth > 1200) {
          $(this).find('.menu-item-extend ').removeClass('in');
        }
      });

    /* -------------------------------------------------------------------------
      SELECT BOX
    ------------------------------------------------------------------------- */

    $.fn.uouSelectBox = function() {

      var
        self = $(this),
        select = self.find('select');
      self.prepend('<ul class="select-clone custom-list"></ul>');

      var
        placeholder = select.data('placeholder') ? select.data('placeholder') : select.find('option:eq(0)').text(),
        clone = self.find('.select-clone');
      self.prepend('<input class="form-control value-holder" type="text" disabled="disabled" placeholder="' + placeholder + '"><span class="glyphicon glyphicon-triangle-bottom"></span>');
      var value_holder = self.find('.value-holder');

      // INPUT PLACEHOLDER FIX FOR IE
      if ($.fn.placeholder) {
        self.find('input, textarea').placeholder();
      }

      // CREATE CLONE LIST
      select.find('option').each(function() {
        if ($(this).attr('value')) {
          clone.append('<li data-value="' + $(this).val() + '">' + $(this).text() + '</li>');
        }
      });

      // TOGGLE LIST
      self.click(function(e) {;
        e.stopPropagation();
        self.toggleClass('active');
      });

      $(document).on('click', function() {
        $('.select-box').removeClass('active');
      });

      // CLICK
      clone.find('li').click(function() {

        value_holder.val($(this).text());
        select.find('option[value="' + $(this).attr('data-value') + '"]').attr('selected', 'selected');

        // IF LIST OF LINKS
        if (self.hasClass('links')) {
          window.location.href = select.val();
        }

      });

      // HIDE LIST
      self.bind('clickoutside', function(event) {
        clone.slideUp(100);
        console.log('slide out');
      });

      // LIST OF LINKS
      if (self.hasClass('links')) {
        select.change(function() {
          window.location.href = select.val();
        });
      }

    };

    // SELECT BOX
    $('.select-box').each(function(){
      $(this).uouSelectBox();
    });

    if(window.innerWidth > 1200) {
      $('.select-box').hover(function() {
        /* Stuff to do when the mouse enters the element */
        $(this).addClass('active');
      }, function() {
        /* Stuff to do when the mouse leaves the element */
        $(this).removeClass('active');
      });
    }

    // Date picker init
    $('.calendar').each(function() {
      var
        input = $(this).find('input'),
        icon = $(this).find('.glyphicon');

      input.datepicker();
    });

    // Owlcarousel init
    $('#owl-banner').owlCarousel({
      items:1,
      autoplay: true,
      smartSpeed:450,
      navText: ['<span class="glyphicon glyphicon-menu-left"></span>', '<span class="glyphicon glyphicon-menu-right"></span>'],
      responsive:{
        0:{
          nav: false,
        },
        768:{
          nav: true,
        }
      }
    });

    $('#owl-testimonials').owlCarousel({
      items:1,
      autoplay: true,
      smartSpeed:450,
    });

    $('#owl-client-slider').owlCarousel({
      margin:40,
      autoplay: true,
      smartSpeed:450,
      responsive:{
        0:{
          items:2
        },
        600:{
          items:3
        },
        1000:{
          items:5
        }
      }
    });

    // Range slider
    var snapSlider = document.getElementById('slider-snap');

    if(snapSlider !== null) {
      noUiSlider.create(snapSlider, {
        start: [ 0, 500 ],
        snap: true,
        connect: true,
        range: {
          'min': 0,
          '10%': 50,
          '20%': 100,
          '30%': 150,
          '40%': 500,
          '50%': 800,
          'max': 1000
        }
      });

      var snapValues = [
        document.getElementById('slider-snap-value-lower'),
        document.getElementById('slider-snap-value-upper')
      ];

      snapSlider.noUiSlider.on('update', function( values, handle ) {
        snapValues[handle].innerHTML = values[handle];
      });
    }
  });

})(jQuery);

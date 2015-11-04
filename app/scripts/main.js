console.log('\'Allo \'Allo!'); // eslint-disable-line no-console

// Putting semicolon before self invoke fuction prevent and error code on minnify
// http://stackoverflow.com/questions/19864244/why-is-there-sometimes-a-semicolon-before-an-anonymous-function
;(function($) {
  'use strict';

$(document).ready(function() {

  /* -------------------------------------------------------------------------
    SELECT BOX
  ------------------------------------------------------------------------- */

  $.fn.uouSelectBox = function() {
    console.log('select-box'); // eslint-disable-line no-console

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

  /* -------------------------------------------------------------------------
    MEDIA QUERY BREAKPOINT
  ------------------------------------------------------------------------- */
  // var uouMediaQueryBreakpoint = function() {

  //   if ($('#media-query-breakpoint').length < 1) {
  //     $('body').append('<var id="media-query-breakpoint"><span></span></var>');
  //   }
  //   var value = $('#media-query-breakpoint').css('content');
  //   if (typeof value !== 'undefined') {
  //     value = value.replace("\"", "").replace("\"", "").replace("\'", "").replace("\'", "");
  //     if (isNaN(parseInt(value, 10))) {
  //       $('#media-query-breakpoint span').each(function() {
  //         value = window.getComputedStyle(this, ':before').content;
  //       });
  //       value = value.replace("\"", "").replace("\"", "").replace("\'", "").replace("\'", "");
  //     }
  //     if (isNaN(parseInt(value, 10))) {
  //       value = 1199;
  //     }
  //   } else {
  //     value = 1199;
  //   }
  //   return value;

  // };

  // SELECT BOX
  $( '.select-box' ).each(function(){
    $(this).uouSelectBox();
  });

  // Date picker init
  $( "#arrival" ).datepicker();
  $( "#departure" ).datepicker();

});

})(jQuery);

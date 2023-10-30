define([
    'jquery',
    'mage/translate',
    'jquery/ui',
    'mage/mage'
], function ($, $t) {
    'use strict';

    function copyToClipboard(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
    };

    $('#copy_code').click(function(){
        copyToClipboard('#coupon_code');
        $('#copy_code').html('Cupom copiado!');
        setTimeout(function(){
            $('.newsletter_popup').hide();
        },2000)
    });

    $('.newsletter_close').click(function(){
        $('.newsletter_popup').hide();
    });

    $.widget('Palacio.Newsletter', {

        /** @inheritdoc */
        _create: function () {
            this._bindSubmit();
        },

        /**
         * @private
         */
        _bindSubmit: function () {
            var self = this;

            this.element.on('submit', function (e) {
                e.preventDefault();
                if ($(this).validation('isValid')) {
                    self.submitForm($(this));
                }
            });
        },

        /**
         * Handler for the form 'submit' event
         *
         * @param {Object} form
         */
        submitForm: function (form) {
            var self = this;
            $.ajax({
                url: form.attr('action'),
                data: form.serialize(),
                type: 'post',
                dataType: 'json',
                showLoader: true,
                /** @inheritdoc */
                beforeSend: function () {
                    self.element.parent().find('.messages').remove();
                },
                success: function (response) {
                    if (response.error) {
                        $('.action.subscribe.primary').prop('disabled', false);
                        self.element.after('<div class="messages"><div class="message message-error error"><div>'+response.message+'</div></div></div>');
                    } else {
                        $('.newsletter_lightbox').addClass('success');
                        self.element.find('input').val('');
                        self.element.after('<div class="messages"><div class="message message-success success"><div>Inscrição realizada com sucesso!</div></div></div>');
                        $('.coupon-code').addClass('visible');
                    }
                },
                error: function() {
                    self.element.after('<div class="messages"><div class="message message-error error"><div>'+$t('Ocorreu um erro inesperado, por favor tente novamente.')+'</div></div></div>');
                }
            });
        }
    });

    return $.Palacio.Newsletter;
});

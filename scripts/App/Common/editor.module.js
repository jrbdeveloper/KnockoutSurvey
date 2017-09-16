$.widget("custom.Editor", {
    options: {
        height: 200
    },

    _init: function () { },

    _create: function () {
        var self = this;

        self.element.tinymce({
            height: self.options.height,
            theme: 'modern',
            plugins: [
                'advlist autolink lists link charmap preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime nonbreaking save table contextmenu directionality'
            ],
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image preview',
        });
    },
});
$.widget("custom.Header", {
    options: { },

   _create: function () {
       var banner = '\
            <style>\
                body:after{\
                    content: "' + this.options.environment + '";\
                    position: fixed;\
                    width: 80px;\
                    height: 25px;\
                    background: #EE8E4A;\
                    top: 7px;\
                    left: -20px;\
                    text-align: center;\
                    font-size: 12px;\
                    font-family: sans-serif;\
                    /*text-transform: uppercase;*/\
                    font-weight: bold;\
                    color: #fff;\
                    line-height: 27px;\
                    -ms-transform:rotate(-45deg);\
                    -webkit-transform:rotate(-45deg);\
                    transform:rotate(-45deg);\
                }\
            </style>';

       $('html > head').append(banner);
    },
});
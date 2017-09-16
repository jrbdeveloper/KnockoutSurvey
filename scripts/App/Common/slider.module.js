$.widget("custom.Slider", {
    options: { },

    _init: function () { },

    _create: function () { },

    Create: function (ctrl, val) {
        var self = this;

        ctrl.slider({
            min: self.Configuration.MinimumGPA,
            max: self.Configuration.MaximumGPA,
            step: 0.01,
            value: val,
            tooltip: "hide",
            handle: "triangle"
        });
    },

    SetValue: function (slider, valField, callback) {
        var self = this;

        slider.on("slide", function () {
            valField.val(parseFloat(slider.val()).toFixed(self.Configuration.GPAScale));
        });

        if (callback !== null) {
            slider.on("slideStop", callback);
        }
    },

    Execute: function (slider, callback) {
        slider.on("slideStop", callback);
    },
});
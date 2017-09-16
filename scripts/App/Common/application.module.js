$.widget("custom.Application", {
    options: {
        showlogs: false,
    },

    _init: function () {
        this.WriteLog("Application Initialized");
        this._registerEvents();
    },

    _create: function () {
        this.Tracker = $.custom.Tracker({ showlogs: this.options.showlogs });
        this.Helpers = $.custom.Helpers();
        this.Controls = $.custom.Controls();

        this.count = 0;
    },

    GetBasePath: function (env) {
        switch (env) {
            case "DEV":
                return "/";
            case "TEST":
                return "/";
            case "STAGE":
                return "/";
            case "PROD":
                return "/";
        }
    },

    Cancel: function () {
        this.Helpers.Confirm("Please Confirm", "Are you sure you would like to cancel?", function () {
            document.location.reload();
        });
    },

    Submit: function (ctrl, frm, action) {
        var self = this;

        self.Helpers.Confirm("Please Confirm", "Are you sure you want to " + $(ctrl).val() + "?", function () {
            self.Helpers.ShowProcessing();
            frm.prop("action", action);
            frm.submit();
        });
    },

    GetModel: function (id, api, async) {
        var model = this._get({ id: id }, api, async);

        return model;
    },

    GetByModel: function (model, api, async) {
        var result = this._post(model, api, async);

        return result;
    },

    GetList: function (data, api, async) {
        var list = this._getList(data, api, async, "POST");

        return list;
    },

    DeleteModel: function (id, api) {
        return this._get({ id: id }, api, false);
    },

    SaveModel: function (object, api, async) {
        var result = this._post(object, api, async);

        return result;
    },

    BindDataToModel: function (model, data) {
        var self = this;

        $.each(data, function (key, value) {
            if (model[key]) {
                //self.WriteLog(model[key]);
                if ($(model[key]).value !== undefined) {
                    $(model[key]).val(value);
                } else {
                    $(model[key]).html(value);
                }
            }
        });
    },

    CreateIncrementer: function (ctrl) {
        var self = this;
        var incrementer = $(ctrl).TouchSpin({
            verticalbuttons: true,
            step: 0.01,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            mousewheel: true,
            buttondown_class: "btn btn-default",
            buttonup_class: "btn btn-default",
            min: self.Configuration.MinimumGPA,
            max: self.Configuration.MaximumGPA,
        });

        return incrementer;
    },

    _getList: function (data, api, async, method) {
        var self = this;
        var ret;

        $.ajax({
            method: method,
            url: api,
            dataType: "json",
            data: data,
            async: async,
        }).done(function (result) {
            ret = result;
            //self.Helpers.HideProcessing();
        }).fail(function (obj, msg) {
            self.Helpers.ShowError("Error requesting data from service.", JSON.stringify(obj) + ' ' + msg);
        });

        return ret;
    },

    _get: function (data, api, async) {
        var self = this;
        var ret;

        $.ajax({
            method: "GET",
            url: api,
            dataType: "json",
            data: data,
            async: async,
        }).done(function (result) {
            ret = result;
        }).fail(function (obj, msg) {
            self.Helpers.ShowError("Error requesting data from service.", JSON.stringify(obj) + ' ' + msg);
        });

        return ret;
    },

    _registerEvents: function () {
        var self = this;

        $("#nav_back").on({
            click: function () {
                self.Helpers.ShowProcessing();

                if (window.history.back() != undefined) {
                    window.history.back();
                } else {
                    self.Helpers.HideProcessing();
                }
            }
        });

        $("#nav_forward").on({
            click: function () {
                self.Helpers.ShowProcessing();

                if (window.history.forward() != undefined) {
                    window.history.forward();
                } else {
                    self.Helpers.HideProcessing();
                }
            }
        });
    },

    _post: function (data, api, async) {
        var self = this;
        var ret;

        $.ajax({
            method: "POST",
            url: api,
            dataType: "json",
            data: data,
            async: async,
        }).done(function (result) {
            ret = result;
        }).fail(function (obj, msg) {
            self.Helpers.ShowError("Error requesting data from service.", JSON.stringify(obj) + ' ' + msg);
        });

        return ret;
    },

    WriteLog: function (msg) {
        if (this.options.showlogs) {
            console.log(msg);
        }
    },
});

var Singleton = (function () {
    var instance;

    function createInstance() {
        var object = $.custom.Application({ showlogs: true });
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

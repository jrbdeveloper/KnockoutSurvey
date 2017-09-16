$.widget("custom.Tracker", {
    options: { },

    _init: function () {
        this._showLog("Tracker: Initialized");
    },

    _create: function () {
        this.Tracker = new Object;
        this._registerEvents();
        this._setFieldsUnchanged();        
    },

    HasChanges: function (e) {
        var self = this;
        var hasChanges = false;

        self._showLog("Tracker: Checking for changes", self.Tracker);
        self._showLog("TRACKED CONTROLS: " + JSON.stringify(self.Tracker));

        $.each(self.Tracker, function (item) {
            if (self.Tracker.hasOwnProperty(item)) {
                if (self.Tracker[item]) {
                    hasChanges = true;
                }
            }
        });

        return hasChanges;
    },

    Reset: function () {
        this._showLog("Tracker: Reseting");
        this.Tracker = new Object;
        this._setFieldsUnchanged();
    },

    _registerEvents: function () {
        var self = this;

        self._showLog("Tracker: Registering events");
        
        $(".track").on({
            change: function () {
                self._showLog("Tracker: A field changed", self.Tracker);
                self.Tracker[$(this).attr('id')] = true;
            }
        });
    },

    _setFieldsUnchanged: function () {
        var self = this;

        self._showLog("Tracker: Set Fields Unchanged", self.Tracker);

        $('.track').each(function (item) {
            self.Tracker[$(item).attr('id')] = false;
        });
    },

    _showLog: function (msg) {
        if (this.options.showlogs) {
            console.log(msg);
        }
    },
});
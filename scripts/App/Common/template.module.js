$.widget("custom.Template", {
    options: {
        gridSettings: {
            columns: [],
            text_filters: [],
            list_filters: []
        }
    },

    _init: function () {
        var self = this;

        self.Grid = $("#grid").empty().Grid({
            pageSize: -1,
            showFilters: true,
            allowSelect: true,
            fixedHeader: true,
            ajax: {
                url: "",
                dataSrc: ""
            },
            textFilters: self.options.gridSettings.text_filters,
            listFilters: self.options.gridSettings.list_filters,
            columns: self.options.gridSettings.columns
        });
    },

    _create: function () {
        this.Application = Singleton.getInstance();
        this._initializeControls();
        this._registerEvents();
    },

    _registerEvents: function () {
        var self = this;
    },

    _initializeControls: function () {

    },
});
$.widget("custom.ExceptionLog", {
    options: { },

    _init: function () {
        var grid = $("#exceptions-table").Grid({
            pageSize: 10,
            showFilters: false,
            allowSelect: true,
            fixedHeader: true,
            enableExport: false,
            paging: false,
            gridType: 'simple',
            order: [1, "desc"]
        });
    },

    _create: function () {
        this.Application = Singleton.getInstance();
        this._initializeControls();
        this._registerEvents();
    },

    _registerEvents: function () {
        var self = this;

        this.viewBtn.on({
            click: function () {
                var trace = self.Application.GetModel($(this).attr("id"), "/ExceptionLog/GetStackTrace", false);
                self.Application.Helpers.ShowError("Error", trace);
            }
        });
    },
    
    _initializeControls: function () {
        this.viewBtn = this.element.find(".viewBtn");
    },
});
$.widget("custom.Grid", {
    options: {
        data: {},
        columns:[],
        pageSize: 10,
        showFilters: false,
        textFilters: [],
        listFilters: [],
        order: [1, "asc"],
        allowSelect: false,
        fixedHeader: false,
        processing:false,
        serverSide: false,
        enableExport: false,
        gridType: '',
        lengthChange:false,
        paging: false,
        adjustColumns: false,
        showRowHighlight: false,
        showIndex: false,
		rowId:'',
		enableEdit:false,
		enableDelete: false,
    },

    table: {},

    _init: function () { },

    _create: function () {        
        this.Helpers = $.custom.Helpers();
        this._determineImplementation(this.options.gridType);
        this._registerEvents();
    },    
    
    _getGridSettings: function () {
        var self = this;

        var settings = {
            dom: (self.options.enableExport) ? 'fBrtip' : 'frtip',
            data: self.options.data.length > 0 ? self.options.data : null,
            ajax: self.options.ajax != null ? self.options.ajax : null,
            serverSide: self.options.serverSide,
            processing: self.options.processing,
            stateSave: false,
            deferRender: false,
            fixedHeader: self.options.fixedHeader,
            aaSorting: [self.options.order],
            order: [self.options.order],
            scrollY: self.options.fixedHeader ? "450px" : "",
            scrollX: self.options.fixedHeader ? "100%" : "",
            scrollCollapse: self.options.fixedHeader,
            paging: self.options.paging,
            lengthChange: self.options.lengthChange,
            pagingType: "full_numbers",
            iDisplayLength: self.options.pageSize !== '' ? self.options.pageSize : 10,
            rowCallback: function (row, data, index) {
            },

            buttons: [{
                extend: 'collection',
                text: 'Export',
                autoClose: true,
                buttons: [
                    self._createButton("csv", "CSV"),
                    self._createButton("excel", "Excel"),
                ],
            }],

            lengthMenu: [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],

            columnDefs: (self.options.columns.length > 0)
                ? self.options.columns
                : (self.options.showFilters)
                    ? [{
                        targets: 0,
                        orderable: false,
                        searchable: false,
                        className: 'text-center nopadding',
                        mDataProp: self.options.rowId,
                        render: function (data, type, full, meta) {
                            if (self.options.allowSelect) {
                                return '<input name="'+self.options.rowId+'" id="'+self.options.rowId+'" type="checkbox" class="rowCheck" value="' + $(full[1]).html() + '">';
                            } else {
                                return data;
                            }
                        },
                    }]
                    : null,

            initComplete: function (settings, json) {
                var my = this;
                var mySettings = my.api().settings();

                if (self.options.showFilters) {
                    my.api().columns().every(function () {
                        var column = this;
                        var search_string = mySettings[0].aoPreSearchCols[column.index()].sSearch.replace("$", "").replace("^", "");

                        if (column.index() >= 0) {
                            if ($.inArray(column.index(), self.options.textFilters) >= 0) {
                                $('<input class="form-control input input-sm filter" type="text" value="' + search_string + '">')
                                    .appendTo($(column.header()))
                                    .on('keyup', function () {
                                        var val = $.fn.dataTable.util.escapeRegex($(this).val());
                                        column.search(val).draw();
                                    }).on("click", function () {
                                        return false;
                                    });
                            } else if ($.inArray(column.index(), self.options.listFilters) >= 0) {
                                var list = $('<select class="form-control input input-sm filter"><option value=""></option></select>')
                                    .appendTo($(column.header()))
                                    .on('change', function () {
                                        var val = $.fn.dataTable.util.escapeRegex($(this).val());
                                        column.search(val ? '^' + val + '$' : '', true, false).draw();

                                        if (self.options.showIndex) {
                                            var count = 1;
                                            var cellIndex = (self.options.allowSelect) ? 1 : 0;
                                            
                                            my.api().rows({ filter: 'applied' }).every(function (rowIdx, tableLoop, cellLoop) {
                                                var cellNode = my.api().cell(this.index(), cellIndex).node();
                                                $(cellNode).html(count);
                                                count++;
                                            });
                                        }
                                    }).on("click", function () {
                                        return false;
                                    });

                                column.data().unique().sort().each(function (d, j) {
                                    if (d != null) {
                                        if (Number.isFinite(d)) {
                                            d = d.toFixed(2);
                                        }

                                        if (d && d.indexOf && d.indexOf("href") > 0) {
                                            list.append('<option value="' + $(d).text() + '">' + $(d).text() + '</option>');
                                        } else {
                                            list.append('<option value="' + d + '">' + d + '</option>');
                                        }
                                    }                                    
                                });
                            }
                        }
                    });
                }

                my.api().columns.adjust().draw();

                self._initializeControls();
                self._registerEvents();
            },
        };

        return settings;
    },
    
    _registerEvents: function () {
        var self = this;
        
        $(self.options.selector).on({
            "order.dt": function () {
                self._resetChecks();
                console.log("Sorted");
            }
        });

        if (self.options.allowSelect) {
            $('body').on("click", self.Row, function () {
                if ($(this).find(".rowCheck").is(":checked")) {
                    $(this).addClass("selected");
                } else {
                    $(this).removeClass("selected");
                }
            });

            self.CheckAll.on({
                click: function () {
                    self._toggleSelected();
                }
            });
        }

        if (self.options.showFilters) {
            self.ResetFiltersBtn.on({
                click: function () {
                    self._reset();
                }
            });

            self.Filters.on({
                change: function () {
                    self._initializeControls();
                }
            });
        }        

        if (self.options.lengthChange) {
            self.PageLength.on({
                change: function () {
                    self._initializeControls();
                }
            });
        }        
    },
    
    _initializeControls: function () {
        this.Row = '#' + this.element[0].id + ' tbody tr';
        this.CheckAll = $(".checkall");
        this.RowCheck = $(".rowCheck");        
        this.Wrapper = $("#" + this.element[0].id + "_wrapper .dataTables_filter");
        this.PageLength = $("select[name=" + this.element[0].id + "_length]")
        this.ResetFiltersBtn = $('<a/>', { id: "resetFilters", text: "Reset Filters" }).addClass("dt-button buttons-html5");
        this.Filters = $('.filter');
    },
    
    _injectButtons: function () {
        var self = this;

        if (self.options.enableExport) {
            self.table.buttons().container().addClass("pull-right");
        }        
    },
    
    _reset: function () {
        var tableContainer = this.Helpers.CreateElement("table", this.element[0].id, "display table table-striped table-bordered");
        var btnContainer = this.Helpers.CreateElement("div", "export-buttons", "");

        $("#table_container").empty().append(tableContainer);

        this.table = this._createTable(tableContainer);
        this._initializeControls();
        this._registerEvents();
        this._injectButtons();
    },

    _createTable: function (container) {
        var table = $(container).DataTable(this._getGridSettings());
        $(".dataTables_scrollHeadInner").css({ "width": "100%" });
        $(".table ").css({ "width": "100%" });
        
        if (this.options.adjustColumns) {
            $(container).css('display', 'block');
            table.columns.adjust().draw();
        }

        return table;
    },
    
    _createButton: function (type, text, layout) {
        var self = this;

        var obj = {
            extend: type,
            text: text,
            orientation: layout,
            columns: ':all',
            exportOptions: {
                rows: '.selected',
                modifier: {
                    selected: true
                },
                format: {
                    header: function (data, columnIdx) {
                        return data.substring(0, data.indexOf("<"));
                    }
                }
            },

            SelectorOpts: { filter: 'applied', order: 'current' }
        };

        return obj;
    },

    _resetChecks: function () {
        var self = this;

        self.RowCheck = $(".rowCheck");

        if ($(self.CheckAll).prop('checked')) {
            $(self.CheckAll).prop('checked', false);
            $(self.CheckAll).prop('checked', true);
        }

        self._toggleSelected();
    },
   
    _toggleSelected: function () {
        var self = this;
        var chk = $(self.CheckAll).prop('checked');

        self.RowCheck.each(function () {
            $(this).prop('checked', chk);
            if (self.RowCheck.prop('checked')) {
                $(this).closest("tr").addClass("selected");
            } else {
                $(this).closest("tr").removeClass("selected");
            }            
        });
    },
    
    _determineImplementation: function (gridType) {
        if (gridType == "simple") {
            this._createTable("#" + this.element[0].id);
        } else {
            this._reset();
        }
    },
    
    _showLog: function (msg) {
        if (this.options.showlogs) {
            console.log(msg);
        }
    },
});
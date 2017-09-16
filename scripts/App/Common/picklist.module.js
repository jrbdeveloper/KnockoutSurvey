$.widget("widgets.PickList", {
    options: {
        InactiveListId: "",
        ActiveListId: "",
        ActiveLabel: "",
        InactiveLabel: "",
        Ajax: {
            url: "",
            data: ""
        },
        Data: []
    },

    _init: function () {
        this.InactiveId = "#" + this.options.InactiveListId;
        this.ActiveId = "#" + this.options.ActiveListId;

        this._createConstants();
        this._load();
        this._registerEvents();
    },

    _load: function () {
        this._initializeControls();

        if (this.options.InactiveLabel != "" && this.options.ActiveLabel != "") {
            $(this.InactiveContainer).append(this.InactiveLabel);
            $(this.ActiveContainer).append(this.ActiveLabel);
        }

        $(this.Div1).append(this.IncludeButton);
        $(this.Div2).append(this.InactiveItems);
        $(this.InactiveContainer).append(this.Div1).append(this.Div2);

        $(this.Div3).append(this.ExcludeButton);
        $(this.Div4).append(this.ActiveItems);
        $(this.ActiveContainer).append(this.Div3).append(this.Div4);

        $(this.element).append(this.InactiveContainer);
        $(this.element).append(this.ActiveContainer);
        
        this._loadList();
    },

    _registerEvents: function () {
        var self = this;

        $(self.IncludeButton).on({
            click: function () {                
                self._include($(self.InactiveId + " option:selected"), $(self.ActiveId + " option"), $(self.ActiveId));
                return false;
            }
        });

        $(self.ExcludeButton).on({
            click: function () {                
                self._exclude($(self.ActiveId + " option:selected"), $(self.InactiveId + " option"), $(self.InactiveId));
                return false;
            }
        });
    },

    _initializeControls: function () {
        var self = this;

        self.InactiveLabel = self._createControl({
            type: "label", cssClass: "",
            text: self.options.InactiveLabel,
            value: self.options.InactiveLabel,
            html: self.options.InactiveLabel
        });

        self.ActiveLabel = self._createControl({
            type: "label", cssClass: "",
            text: self.options.ActiveLabel,
            value: self.options.ActiveLabel,
            html: self.options.ActiveLabel
        });

        self.Div1 = self._createControl({ type: self.const.div, id: "", cssClass: "pull-left", style: "width: 35px;" });
        self.Div2 = self._createControl({ type: self.const.div, id: "", cssClass: "pull-right", style: "width: 97%;" });

        self.Div3 = self._createControl({ type: self.const.div, id: "", cssClass: "pull-left", style: "width: 35px;" });
        self.Div4 = self._createControl({ type: self.const.div, id: "", cssClass: "pull-right", style: "width: 97%;" });

        self.InactiveContainer = self._createControl({ type: self.const.div, id: "inactive-container", cssClass: "row-fluid col-md-12 margin-bottom-15" });
        self.InactiveItems = self._createControl({ type: self.const.select, id: self.options.InactiveListId, name: self.options.InactiveListId, cssClass: "form-control", multiple: "multiple" });
        self.IncludeButton = self._createControl({ type: self.const.button, id: "include-button", cssClass: "btn btn-default btn-sm glyphicon glyphicon glyphicon-chevron-down", text: "" });

        self.ActiveContainer = self._createControl({ type: self.const.div, id: "active-container", cssClass: "row-fluid col-md-12" });
        self.ActiveItems = self._createControl({ type: self.const.select, id: self.options.ActiveListId, name: self.options.ActiveListId, cssClass: "form-control", multiple: "multiple" });
        self.ExcludeButton = self._createControl({ type: self.const.button, id: "exclude-button", cssClass: "btn btn-default btn-sm glyphicon glyphicon glyphicon-chevron-up", text: "" });
    },

    _loadList: function () {
        var self = this;
        var list = [];

        if (self.options.Data.length > 0) {
            list = self.options.Data;
        }

        if (self.options.Ajax.url != "") {
            list = self._getModel(self.options.Ajax, false);
        }

        if (list.Objectives.length > 0) {
            $.each(list.Objectives, function (index, item) {
                var decodedName = $('<div/>').html(item.Name).text();
                $(self.InactiveId).append(self._createControl({ type: self.const.option, value: item.ObjectiveID, text: decodedName }));
            });
        }
    },

    _include: function (selectedItems, savedItems, destination) {
        var self = this;

        $.each(selectedItems, function (index, item) {
            var option = self._createControl({ type: self.const.option, text: item.text, value: item.value });

            if ($.inArray($(item).val(), self._getValues(savedItems)) == -1) {
                $(option).appendTo(destination);
                $(item).remove();
            }
        });
    },

    _exclude: function (selectedItems, savedItems, destination) {
        var self = this;

        $.each(selectedItems, function (index, item) {
            var option = self._createControl({ type: self.const.option, text: item.text, value: item.value });

            if ($.inArray($(item).val(), self._getValues(savedItems)) == -1) {
                $(option).prependTo(destination);
                $(item).remove();
            }
        });
    },

    _getModel: function (ajax, async) {
        var ret;

        $.ajax({
            method: "GET",
            url: ajax.url,
            dataType: "json",
            data: ajax.data,
            async: async,
        }).done(function (result) {
            ret = result;
        }).fail(function (text, msg) {
        });

        return ret;
    },

    _getValues: function (ctrl) {
        var valuesArray = ctrl.map(function () {
            return this.value;
        }).get();

        return valuesArray;
    },

    _createControl: function (props) {
        var control;

        if (props.type != '') {
            control = document.createElement(props.type);
        } else {
            control = document.createElement(this.const.text);
        }

        if (props.name != "") {
            $(control).prop(this.const.name, props.name);
        }        

        if (props.id != "") {
            $(control).prop("id", props.id);
        }        

        if (props.cssClass != "") {
            $(control).prop("class", props.cssClass);
        }
        
        $(control).prop("value", props.value);
        $(control).prop(this.const.text, props.text);
        $(control).prop("style", props.style);
        $(control).prop("multiple", props.multiple);
        $(control).val(props.value);

        if (props.type == this.const.label || props.type == this.const.button) {
            $(control).html(props.text);
        }

        return control;
    },

    _createConstants: function () {
        this.const = {
            div: "div",
            button: "button",
            select: "select",
            option: "option",
            label: "label",
            name: "name",
            text: "text"
        };
    },
});
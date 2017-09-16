$.widget("custom.Controls", {
    options: { },

    _init: function () { },

    _create: function () { },

    Create: function (property) {
        switch (property.control) {
            case "input":
                return this.CreateControl(property);
            case "form":
                return this.CreateForm(property);
            default:
                return this.CreateContainer(property);
        }
    },

    CreateForm: function (property) {
        var element = document.createElement("form");
        this._assignAttributes(element, property);
        return element;
    },

    CreateControl: function (property) {
        var element = document.createElement(property.control); //input element, text
        if (property.type) element.setAttribute('type', property.type);
        this._assignAttributes(element, property);

        return element;
    },

    CreateContainer: function (property) {
        var element = document.createElement(property.type);
        this._assignAttributes(element, property);

        if (property.value) {
            $(element).append(property.value);
        } else if (property.text) {
            $(element).append(property.text);
        }

        return element;
    },

    _assignAttributes: function (element, property) {

        //for (var key in property) {
        //    if (property.hasOwnProperty(key)) {
                
        //        if (key.toString().indexOf("_") >= 0) {
        //            key = key.replace("_", "-");
        //        }

        //        element.setAttribute(key, property[key]);
        //    }
        //}

        if (property.method) element.setAttribute('method', property.method);
        if (property.action) element.setAttribute('action', property.action);
        if (property.name) element.setAttribute('name', property.name);
        if (property.id) element.setAttribute('id', property.id);
        if (property.name) element.setAttribute('name', property.name);
        if (property.id) element.setAttribute('id', property.id);
        if (property.value) element.setAttribute('value', property.value);
        if (property.text) element.setAttribute('text', property.text);
        if (property.dataVal) element.setAttribute('data-val', property.dataVal);
        if (property.data_dismiss) element.setAttribute('data-dismiss', property.data_dismiss);
        if (property.tabindex) element.setAttribute('tabindex', property.tabindex);
        if (property.role) element.setAttribute('role', property.role);
        if (property.style) element.setAttribute('style', property.style);
        if (property.aria_valuenow) element.setAttribute('aria-valuenow', property.aria_valuenow);
        if (property.aria_valuemin) element.setAttribute('aria-valuemin', property.aria_valuemin);
        if (property.aria_valuemax) element.setAttribute('aria-valuemax', property.aria_valuemax);
        if (property.readonly) element.setAttribute('readonly', property.readonly);

        $(element).addClass(property.cssClass);
    }
});
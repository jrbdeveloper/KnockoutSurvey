$.widget("custom.Helpers", {
    options: {},

    _init: function () { },

    _create: function () {
        this.Controls = $.custom.Controls();

        this.Modal = {
            Container: this.Controls.Create({ type: "div", id: "alertModal", cssClass: "modal fade", tabindex: "-1", role: "dialog" }),
            Dialog: this.Controls.Create({ type: "div", cssClass: "modal-dialog modal-lg", role: "document" }),
            Content: this.Controls.Create({ type: "div", cssClass: "modal-content" }),
            Header: this.Controls.Create({ type: "div", cssClass: "modal-header" }),
            Title: this.Controls.Create({ type: "h1", cssClass: "modal-title" }),
            Body: this.Controls.Create({ type: "div", cssClass: "modal-body", style: "overflow-y:auto" }),
            Footer: this.Controls.Create({ type: "div", cssClass: "modal-footer" }),
            OkButton: this.Controls.Create({ type: "button", cssClass: "btn btn-default", id: "modalOkBtn", data_dismiss: "modal" }),
            CancelButton: this.Controls.Create({ type: "button", cssClass: "btn", id: "modalCancelBtn", data_dismiss: "modal" }),
            ProgressContainer: this.Controls.Create({ type: "div", cssClass: "progress" }),
            ProgressBar: this.Controls.Create({ type: "div", cssClass: "progress-bar progress-bar-info progress-bar-striped active", role: "progressbar", style: "width: 0%", aria_valuenow: "0", aria_valuemin: "0", aria_valuemax: "100" }),
            Progress: this.Controls.Create({ type: "span", cssClass: "sr-only" })
        };
    },

    Sum: function (params) {
        var result = 0;

        for (i = 0; i < params.length; i++) {
            if (parseInt(params[i]) >= 0) {
                result += parseInt(params[i]);
            }
        }

        return result;
    },

    ShowError: function (title, message, callback) {
        this._constructModal();

        $(this.Modal.Title).empty().append(title);
        $(this.Modal.Body).empty().append(message);
        $(this.Modal.OkButton).empty().append("OK");
        $(this.Modal.Footer).append(this.Modal.OkButton);

        if (callback != undefined) {
            $(this.Modal.Container).modal({ backdrop: "static", keyboard: false }).one("click", $(this.Modal.OkButton).attr("id"), callback);
        } else {
            $(this.Modal.Container).modal();
        }
    },

    Confirm: function (title, message, callback) {
        this._constructModal();

        $(this.Modal.Title).empty().append(title);
        $(this.Modal.Body).empty().append(message);
        $(this.Modal.OkButton).empty().append("Yes");
        $(this.Modal.CancelButton).empty().append("No");
        $(this.Modal.Footer).append(this.Modal.CancelButton);
        $(this.Modal.Footer).append(this.Modal.OkButton);

        var okBtnId = "#" + $(this.Modal.OkButton).attr("id");
        console.log(okBtnId);
        $(this.Modal.Container).modal({ backdrop: "static", keyboard: false }).one("click", $(okBtnId), callback);
    },

    ShowProcessing: function () {
        this._constructModal();
        this.ProcessingModal = $(this.Modal.Container);
        $(this.Modal.Title).empty().append("Processing...");
        $(this.Modal.ProgressBar).append(this.Modal.Progress);
        $(this.Modal.ProgressContainer).append(this.Modal.ProgressBar);
        $(this.Modal.Body).append(this.Modal.ProgressContainer);
        $(this.Modal.Footer).remove();

        var $progress = $(this.Modal.Container);
        var $status = $(this.Modal.ProgressBar);
        var count = 0;
        var interval;

        $progress.modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });

        $progress.on("shown.bs.modal", function () {
            interval = setInterval(function () {
                $status.css('width', (count += 3) + '%').attr('aria-valuenow', (count += 3));
            }, 100);
        });

        $progress.on("hidden.bs.modal", function () {
            clearInterval(interval);
            $status.css('width', 0 + '%').attr('aria-valuenow', 0);
        });
    },

    HideProcessing: function () {
        $(this.ProcessingModal).modal("hide");
    },

    ClearFields: function () {
        $(".form-control").val('');
    },

    ScrollTop: function () {
        $("html, body").animate({ scrollTop: 0 }, "fast");
    },

    FormatDate: function (unformatted) {
        if (unformatted) {
            return moment(unformatted).format("MM/DD/YYYY");
        }        
    },

    CreatePopOver: function (ctrl, title, message) {
        var popover = ctrl.popover({
            html: true,
            container: "body",
            trigger: "hover",
            placement: "top",
            title: title,
        }).on("show.bs.popover", function (e) {
            popover.attr('data-content', message);
        });
    },

    DestroyPopOver: function (ctrl) {
        var popover = ctrl.popover("destroy");
    },

    _constructModal: function () {
        $(this.Modal.Header).append(this.Modal.Title);
        $(this.Modal.Content).append(this.Modal.Header);
        $(this.Modal.Content).append(this.Modal.Body);
        $(this.Modal.Content).append(this.Modal.Footer);
        $(this.Modal.Dialog).append(this.Modal.Content);
        $(this.Modal.Container).append(this.Modal.Dialog);
    },

    // Deprecated
    CreateElement: function (type, name, cssClass, dataVal, value) {
        var element = document.createElement(type);
        element.id = name;
        $(element).addClass(cssClass);
        $(element).attr("data-val", dataVal);
        $(element).text(value);

        return element;
    },

    // Deprecated
    BuildElement: function (property) {
        var element = document.createElement(property.type);

        if (property.isCheckbox) {
            element.type = "checkbox"
        }

        if (property.name) {
            element.id = property.name;
        }

        if (property.value != "") {
            element.value = property.value;
        }

        $(element).addClass(property.cssClass);
        $(element).attr("data-val", property.dataVal);

        if (property.text != "") {
            if (property.type == "div" || property.type == "span" || property.type == "label") {
                $(element).html(property.text);
            } else {
                $(element).text(property.text);
            }
        }

        return element;
    },
});
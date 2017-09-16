$.widget("custom.Tabs", {
    options: { },

    _create: function () {
        this._initializeControls();
        this._registerEvents();
    },

    _registerEvents: function () {
        var self = this;

        self.One.Tab.on({
            click: function () {
                self.One.Activate();
            }
        });

        self.Two.Tab.on({
            click: function () {
                self.Two.Activate();
            }
        });

        self.Three.Tab.on({
            click: function () {
                self.Three.Activate();
            }
        });

        self.Four.Tab.on({
            click: function () {
                self.Four.Activate();
            }
        });

        self.Five.Tab.on({
            click: function () {
                self.Five.Activate();
            }
        });
    },

    ShowTabs: function (CurrentYear) {
        switch (CurrentYear) {
            case "FirstYear":
                this.One.Activate();
                break;

            case "SecondYear":
                this.Two.Activate();
                break;

            case "ThirdYear":
                this.Three.Activate();
                break;

            case "FourthYear":
                this.Four.Activate();
                break;

            case "PostUCSD":
                this.Five.Activate();
                break;
        }
    },

    ActivateTab: function (index) {
        this.TabContainer.tabs({ heightStyle: "content", active: (index - 1) }).css({ 'overflow': 'auto' });
    },

    ResetTabs: function () {
        this.One.Content.hide();
        this.Two.Content.hide();
        this.Three.Content.hide();
        this.Four.Content.hide();
        this.Five.Content.hide();
    },

    _determinTabsToShow: function () {
        //if(this.options.tabSet)
    },

    _initializeControls: function () {
        this.TabContainer = $("#tab-container");        

        this.One = {
            Tab:$("#firstTab"),
            Panel: $("#firstPanel"),
            Content:$("#firstTabContent"),
            Activate: function () { }
        };

        this.Two = {
            Tab:$("#secondTab"),
            Panel: $("#secondPanel"),
            Content: $("#secondTabContent"),
            Activate: function () { }
        };

        this.Three = {
            Tab:$("#thirdTab"),
            Panel: $("#thirdPanel"),
            Content: $("#thirdTabContent"),
            Activate: function () { }
        };

        this.Four = {
            Tab:$("#fourthTab"),
            Panel: $("#fourthPanel"),
            Content: $("#fourthTabContent"),
            Activate: function () { }
        };

        this.Five = {
            Tab:$("#fifthTab"),
            Panel: $("#fifthPanel"),
            Content: $("#fifthTabContent"),
            Activate: function () { }
        };
    },
});
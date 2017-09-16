$.widget("custom.Navigation", {
    options: {
        Roles: {
            Coach: "Coach",
            Mentor: "Mentor",
            Student: "Student"
        }
    },

    _init: function () {        
        this.Application.WriteLog("Navigation: Initialized");
    },

    _create: function () {
        this.Application = Singleton.getInstance();
        this._initializeControls();
        this._registerEvents();
        this._determineActivePage();
        this._updateMenu();
    },
    
    _registerEvents: function () {
        var self = this;

        self.Application.WriteLog("Navigation: Register Events");

        self.navItem.on({
            click: function (e) {
                try {
                    self.Application.WriteLog("Navigation: Item Clicked, checking for changes");
                    
                    if (self.Application.Tracker.HasChanges(e)) {
                        e.preventDefault();
                        self.Application.Helpers.ShowError('Unsaved Changes', 'Information on the page has changed. Want to save your changes?');
                    } else {
                        self.Application.Helpers.ShowProcessing();
                    }
                } catch (er) {
                    self.Application.Helpers.ShowError("Error",er.message);
                }
            }
        });
    },
    
    _determineActivePage: function () {
        var self = this;

        this.Application.WriteLog("Navigation: Determine Active Page");

        self.navItem.each(function () {
            $(this).removeClass("active");
        });

        if (self.options.page) {
            $('#' + self.options.page).addClass("active");
        }        
    },

    _updateMenu: function () {
        var self = this;

        console.log(this.options.Role);
        if (self.options.BasedOnUserInContext == "True") {
            self.CoachItems.hide();
            self.UnknownItems.hide();
            self.StudentItems.show();

            if (this.options.Role == self.options.Roles.Coach) {
                self.CoachItems.show();
            }

            if (this.options.Role == self.options.Roles.Mentor) {
                self.MentorItems.show();
            }
        } else {
            switch (this.options.Role) {
                case self.options.Roles.Coach:
                    self.StudentItems.hide();
                    self.UnknownItems.hide();
                    self.CoachItems.show();
                    break;

                case self.options.Roles.Mentor:
                    self.StudentItems.hide();
                    self.CoachItems.hide();
                    self.UnknownItems.hide();
                    self.MentorItems.show();
                    break;

                case self.options.Roles.Student:
                    self.CoachItems.hide();
                    self.UnknownItems.hide();
                    self.StudentItems.show();
                    break;

                default:
                    self.StudentItems.hide();
                    self.CoachItems.hide();
                    self.MentorItems.hide();

                    if (this.options.Role == '') {
                        self.UnknownItems.show();
                    }

                    break;
            }
        }        
    },

    _initializeControls: function () {
        this.navItem = $(".nav-item");
        this.StudentItems = $(".student");
        this.CoachItems = $(".coach");
        this.MentorItems = $(".mentor");
        this.UnknownItems = $(".unknown");
    },
});
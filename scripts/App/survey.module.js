$.widget("custom.SurveyModule", {
  options: {
    services: {
      getModel: "scripts/App/model.json"
    }
  },

    SurveyModel: function (model) {
        return new ApplicationSurvey(model);
    },

    _create: function () {
        this.Application = Singleton.getInstance();
        this._initializeControls();
        this._registerEvents();

        this._getSurvey();
    },

    _registerEvents: function () {
        var self = this;

        $('body').on('focus', ".ui-datepicker", function () {
            $(this).datepicker();
        });
    },

    _getSurvey: function () {
        var model = this._getModel();
        ko.applyBindings(this.SurveyModel(model));
    },

    _getModel: function () {
        //var model = this.Application.GetModel("",this.options.services.getModel, false);
		var model= {
					Pages:
					[
						// Make
						{ ID: 1, Name: "Favorite Make", Questions: [1] },

						// Type
						{ ID: 2, Name: "Preferred Type", Questions: [2] },
						{ ID: 3, Name: "Preferred Type", Questions: [3] },
						{ ID: 4, Name: "Preferred Type", Questions: [4] },
						{ ID: 5, Name: "PreferredType", Questions: [5] },

						// Ford
						{ ID: 6, Name: "Ford Cars", Questions: [6] },
						{ ID: 11, Name: "Ford Trucks", Questions: [11] },
						{ ID: 15, Name: "Ford SUVs", Questions: [15] },

						// Dodge
						{ ID: 7, Name: "Dodge Cars", Questions: [7] },
						{ ID: 12, Name: "Dodge Trucks", Questions: [12] },
						{ ID: 16, Name: "Dodge SUVs", Questions: [16] },

						// Chevy
						{ ID: 8, Name: "Chevy Cars", Questions: [8] },
						{ ID: 13, Name: "Chevy Trucks", Questions: [13] },
						{ ID: 17, Name: "Chevy SUVs", Questions: [17] },

						// Kia
						{ ID: 9, Name: "Kia Cars", Questions: [9] },
						{ ID: 14, Name: "Kia SUVs", Questions: [14] },

						// Complete
						{ ID: 10, Name: "Complete", Questions: [10] },
					],

					Questions:
					[
						// Make
						{ ID: 1, Text: "What is your favorite make?", Answers: [1, 2, 3, 4] },

						// Type
						{ ID: 2, Text: "What is your favorite preferred type?", Answers: [5,6,7] },
						{ ID: 3, Text: "What is your favorite preferred type?", Answers: [8,9,10] },
						{ ID: 4, Text: "What is your favorite preferred type?", Answers: [11,12,13] },
						{ ID: 5, Text: "What is your favorite preferred type?", Answers: [14,16] },

						// Ford
						{ ID: 6, Text: "What is your favorite car?", Answers: [17, 18, 19, 20] },
						{ ID: 11, Text: "What is your favorite truck?", Answers: [33,34] },
						{ ID: 15, Text: "What is your favorite SUV?", Answers: [41,42] },

						// Dodge
						{ ID: 7, Text: "What is your favorite car?", Answers: [21, 22, 23, 24] },
						{ ID: 12, Text: "What is your favorite truck?", Answers: [35,36] },
						{ ID: 16, Text: "What is your favorite SUV?", Answers: [43,44] },

						// Chevy
						{ ID: 8, Text: "What is your favorite car?", Answers: [25, 26, 27, 28] },
						{ ID: 13, Text: "What is your favorite truck?", Answers: [37,38] },
						{ ID: 17, Text: "What is your favorite SUV?", Answers: [45,46] },

						// Kia
						{ ID: 9, Text: "What is your favorite car?", Answers: [29, 30, 31, 32] },
						{ ID: 14, Text: "What is your favorite SUV?", Answers: [39,40] },

						// Complete
						{ ID: 10, Text: "That's it! Thank you.", Answers: [] },
					],

					Answers:
					[
						// Makes
						{ ID: 1, Text: "Ford", NextPage: 2 },
						{ ID: 2, Text: "Dodge", NextPage: 3 },
						{ ID: 3, Text: "Chevy", NextPage: 4 },
						{ ID: 4, Text: "Kia", NextPage: 5 },

						// Ford Types
						{ ID: 5, Text: "Car", NextPage: 6 },
						{ ID: 6, Text: "Truck", NextPage: 11 },
						{ ID: 7, Text: "SUV", NextPage: 15 },

						// Dodge Types
						{ ID: 8, Text: "Car", NextPage: 7 },
						{ ID: 9, Text: "Truck", NextPage: 12 },
						{ ID: 10, Text: "SUV", NextPage: 16 },

						// Chevy Types
						{ ID: 11, Text: "Car", NextPage: 8 },
						{ ID: 12, Text: "Truck", NextPage: 13 },
						{ ID: 13, Text: "SUV", NextPage: 17 },

						// Kia Types
						{ ID: 14, Text: "Car", NextPage: 9 },
						{ ID: 16, Text: "SUV", NextPage: 14 },

						// Ford Cars
						{ ID: 17, Text: "Focus", NextPage: 10 },
						{ ID: 18, Text: "Mustang", NextPage: 10 },
						{ ID: 19, Text: "Escape", NextPage: 10 },
						{ ID: 20, Text: "Fusion", NextPage: 10 },

						// Dodge Cars
						{ ID: 21, Text: "Charge", NextPage: 10 },
						{ ID: 22, Text: "Challenger", NextPage: 10 },
						{ ID: 23, Text: "Dart", NextPage: 10 },
						{ ID: 24, Text: "Viper", NextPage: 10 },

						// Chevy Cars
						{ ID: 25, Text: "Camaro", NextPage: 10 },
						{ ID: 26, Text: "Corvette", NextPage: 10 },
						{ ID: 27, Text: "Cruze", NextPage: 10 },
						{ ID: 28, Text: "Malibu", NextPage: 10 },

						// Kia Cars
						{ ID: 29, Text: "Rio", NextPage: 10 },
						{ ID: 30, Text: "Optima", NextPage: 10 },
						{ ID: 31, Text: "Forte", NextPage: 10 },
						{ ID: 32, Text: "Cadenza", NextPage: 10 },

						// Ford Trucks
						{ ID: 33, Text: "Ranger", NextPage: 10 },
						{ ID: 34, Text: "F-150", NextPage: 10 },

						// Dodge Trucks
						{ ID: 35, Text: "Dakoda", NextPage: 10 },
						{ ID: 36, Text: "RAM", NextPage: 10 },

						// Chevy Trucks
						{ ID: 37, Text: "Silverado", NextPage: 10 },
						{ ID: 38, Text: "Colorado", NextPage: 10 },

						// Kia SUVs
						{ ID: 39, Text: "Sportage", NextPage: 10 },
						{ ID: 40, Text: "Sorento", NextPage: 10 },

						// Ford SUVs
						{ ID: 41, Text: "Explorer", NextPage: 10 },
						{ ID: 42, Text: "Edge", NextPage: 10 },

						// Dodge SUVs
						{ ID: 43, Text: "Durango", NextPage: 10 },
						{ ID: 44, Text: "Journey", NextPage: 10 },

						// Chevy SUVs
						{ ID: 45, Text: "EQUINOX", NextPage: 10 },
						{ ID: 46, Text: "TAHOE", NextPage: 10 },
					]
				};

		return model;
	},

    _initializeControls: function () {
    },
});

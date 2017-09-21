var App = App || {};

App.Survey = function (model) {
    var self = this;
    var currentPage = 1;

    self.TrackedIndex = 0;

    self.TrackedPath = [];

    self.PageIndex = 0;

    self.CurrentPage = ko.observable(currentPage);

    self.Pages = ko.observableArray(ko.utils.arrayMap(model.Pages, function (page) {
        return {
            ID: page.ID,
            Name: page.Name,
            Questions: ko.observableArray(page.Questions)
        };
    }));

    self.Page = ko.observable(_.findWhere(self.Pages(), { ID: currentPage }));

    self.AddFirst = function(){
        trackedPath[pageIndex] = self.Page();
        pageIndex++;
    };

    self.Questions = ko.observableArray(ko.utils.arrayMap(model.Questions, function (question) {
        return {
            ID: question.ID,
            Text: question.Text,
            Answers: ko.observableArray(question.Answers)
        };
    }));

    self.Answers = ko.observableArray(ko.utils.arrayMap(model.Answers, function (answer) {
        return {
            ID: answer.ID,
            Text: answer.Text,
            NextPage: answer.NextPage
        };
    }));

    self.PageQuestions = function (questions) {
        var list = ko.observableArray(ko.utils.arrayMap(questions(), function (id) {
            return _.findWhere(self.Questions(), { ID: id });
        }));

        return list();
    };

    self.QuestionAnswers = function (answers) {
        var list = ko.observableArray(ko.utils.arrayMap(answers, function (id) {
            return _.findWhere(self.Answers(), { ID: id });
        }));

        return list();
    };

    self.Forward = function () {
        self.PageIndex = self.TrackedPath.indexOf(self.Page());

        if(self.PageIndex+1 <= self.TrackedIndex){
          self.Page(self.TrackedPath[self.PageIndex+1]);
        }

        //console.log(currentPageIndex);
        self.ShowLog();
    };

    self.Back = function () {
        self.PageIndex = self.TrackedPath.indexOf(self.Page());
        
        if(self.PageIndex-1 != -1) {
          self.Page(self.TrackedPath[self.PageIndex-1]);
        }

        //console.log(currentPageIndex);
        self.ShowLog();
    };

    self.GoToPage = function (page) {
        self.TrackPath(self.Page());

        ///TODO: Save user selection here as well
        currentPage = page.NextPage;
        self.Page(_.findWhere(self.Pages(), { ID: currentPage }));
        self.CurrentPage(currentPage);

        self.TrackedPath[self.TrackedIndex] = self.Page();
    };

    self.TrackPath = function(page) {
        self.TrackedPath[self.TrackedIndex] = page;
        self.TrackedIndex++;

        self.ShowLog();
    };


    self.ShowLog = function () {
        console.log("Tracked Index: " + self.TrackedIndex);
        console.log("Page Index: " + self.PageIndex);
    };

    self.ShowLog();
};

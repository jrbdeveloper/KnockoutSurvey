var ApplicationSurvey = function (model) {
    var self = this;
    var currentPage = 1;

    self.CurrentPage = ko.observable(currentPage);

    self.Pages = ko.observableArray(ko.utils.arrayMap(model.Pages, function (page) {
        return {
            ID: page.ID,
            Name: page.Name,
            Questions: ko.observableArray(page.Questions)
        };
    }));

    self.Page = ko.observable(_.findWhere(self.Pages(), { ID: currentPage }));

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

    self.Next = function () {
        currentPage++;
        self.Page(_.findWhere(self.Pages(), { ID: currentPage }));
        self.CurrentPage(currentPage);
    };

    self.Back = function () {
        currentPage--;
        self.Page(_.findWhere(self.Pages(), { ID: currentPage }));
        self.CurrentPage(currentPage);
    };

    self.GoToPage = function (page) {
        ///TODO: Save user selection here as well
        currentPage = page.NextPage;
        self.Page(_.findWhere(self.Pages(), { ID: currentPage }));
        self.CurrentPage(currentPage);
    };
};
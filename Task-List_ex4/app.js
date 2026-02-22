var app = angular.module("taskApp", []);

app.controller("taskController", function ($scope) {
  $scope.tasks = [];
  $scope.filterStatus = "all";

  $scope.addTask = function () {
    if ($scope.newTask) {
      $scope.tasks.push({
        name: $scope.newTask,
        completed: false,
        editing: false,
      });
      $scope.newTask = "";
    }
  };

  $scope.deleteTask = function (index) {
    $scope.tasks.splice(index, 1);
  };

  $scope.editTask = function (task) {
    task.editing = true;
  };

  $scope.saveTask = function (task) {
    task.editing = false;
  };

  $scope.taskFilter = function (task) {
    if ($scope.filterStatus === "completed") {
      return task.completed;
    } else if ($scope.filterStatus === "pending") {
      return !task.completed;
    }
    return true;
  };
});

import { editTaskField } from "./editTaskField.js";
import { addNewTask } from "./task.js";
import {
  newTaskFieldFooter,
  newTaskFieldHeader,
  newTaskFieldProgress,
} from "./taskFieldComponents.js";

function addFunctions() {
  $(".editButton")
    .unbind()
    .bind("click", function () {
      editTaskField($(this)[0].classList[1]);
    });
  $(".addButton")
    .unbind()
    .bind("click", function () {
      addNewTask(
        $(this)[0].classList[1],
        $(`.newTask.${$(this)[0].classList[1]}`).val()
      );
    });
  $(".deleteButton")
    .unbind()
    .bind("click", function () {
      showPrompt("remove", `${$(this)[0].classList[1]}`);
    });
}

function showPrompt(type, taskField = "none") {
  if (type == "title") {
    $(".accept")
      .unbind()
      .bind("click", function () {
        if ($(".titleTaskField").val().length != 0) {
          addNewTaskField($(".titleTaskField").val());
          addFunctions();
          $(".promptAlertBg").css("display", "none");
        }
      });
    $(".promptMessage").html(
      "Wpisz tytuł nowej tablicy zadań: <br> <textarea class='titleTaskField'></textarea>"
    );
    $(".promptAlertBg").css("display", "flex");
  } else if (type == "remove") {
    $(".accept")
      .unbind()
      .bind("click", function () {
        removeTaskField(`${taskField}`);
        $(".promptAlertBg").css("display", "none");
      });
    $(".promptMessage").html("Czy na pewno chcesz usunąć tę tablice zadań?");
    $(".promptAlertBg").css("display", "flex");
  }
}

function generateNewTaskField(taskFieldNumber, titleTaskField) {
  let newTaskField = document.createElement("div");
  $(newTaskField).addClass(`taskField block taskField${taskFieldNumber}`);
  $(newTaskField).append(
    newTaskFieldHeader(taskFieldNumber, titleTaskField),
    newTaskFieldFooter(taskFieldNumber),
    newTaskFieldProgress(taskFieldNumber)
  );
  if ($(".taskFieldMain").find("div").length == 1) {
    $(`.taskFieldMain div`).last().after(newTaskField);
  } else {
    $(`.taskFieldMain`).append(newTaskField);
  }
}

function addNewTaskField(titleTaskField) {
  let i = 1;
  let taskFieldNumber = 0;
  do {
    if (localStorage.getItem(`taskField taskField${i}`) == null) {
      taskFieldNumber = i;
    }
    i++;
  } while (taskFieldNumber == 0);
  generateNewTaskField(taskFieldNumber, titleTaskField);
  localStorage.setItem(
    `taskField taskField${taskFieldNumber}`,
    `${titleTaskField}`
  );
}

function removeTaskField(taskField) {
  let taskNumber = 1;
  if ($(`.${taskField}`).next(".block").length == 0) {
    $(`.${taskField}`).remove();
    localStorage.removeItem(`taskField ${taskField}`);
    do {
      localStorage.removeItem(`${taskField} Task${taskNumber}`);
      localStorage.removeItem(`${taskField} Task${taskNumber} Checked`);
      taskNumber++;
    } while (localStorage.getItem(`${taskField} Task${taskNumber}`) != null);
  } else if ($(`.${taskField}`).next(".block").length == 1) {
    let nextTaskField = $(`.${taskField}`).next(".block")[0].classList[2];
    let previousTaskField = taskField;
    $(`.${taskField}`).remove();
    do {
      localStorage.removeItem(`${taskField} Task${taskNumber} Checked`);
      localStorage.removeItem(`${taskField} Task${taskNumber}`);
      taskNumber++;
    } while (localStorage.getItem(`${taskField} Task${taskNumber}`) != null);
    localStorage.removeItem(`taskField ${taskField}`);
    do {
      $(`.${nextTaskField}`)
        .removeClass(`${nextTaskField}`)
        .addClass(`${previousTaskField}`);
      localStorage.setItem(
        `taskField ${previousTaskField}`,
        `${localStorage.getItem(`taskField ${nextTaskField}`)}`
      );
      let taskNumber = 1;
      do {
        if (
          localStorage.getItem(`${nextTaskField} Task${taskNumber}`) != null
        ) {
          localStorage.setItem(
            `${previousTaskField} Task${taskNumber}`,
            `${localStorage.getItem(`${nextTaskField} Task${taskNumber}`)}`
          );
        }

        if (
          localStorage.getItem(`${nextTaskField} Task${taskNumber} Checked`) ==
          "true"
        ) {
          localStorage.setItem(
            `${previousTaskField} Task${taskNumber} Checked`,
            true
          );
        }
        localStorage.removeItem(`${nextTaskField} Task${taskNumber} Checked`);
        localStorage.removeItem(`${nextTaskField} Task${taskNumber}`);
        taskNumber++;
      } while (
        localStorage.getItem(`${nextTaskField} Task${taskNumber}`) != null
      );
      taskField = previousTaskField;
      previousTaskField = nextTaskField;
      localStorage.removeItem(`taskField ${nextTaskField}`);
      nextTaskField =
        $(`.${taskField}`).next(".block").length == 0
          ? null
          : $(`.${taskField}`).next(".block")[0].classList[2];
    } while (nextTaskField != null);
  }
}

export { addNewTaskField, showPrompt, addFunctions, generateNewTaskField };

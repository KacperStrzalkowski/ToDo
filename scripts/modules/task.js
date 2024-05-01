function deleteTask(taskField, taskNumber) {
  if (
    $(`.task.${taskField}.${taskNumber}`).next(`.task.${taskField}`).length == 0
  ) {
    $(`.task.${taskField}.${taskNumber}`).remove();
    localStorage.removeItem(`${taskField} ${taskNumber}`);
    localStorage.removeItem(`${taskField} ${taskNumber} Checked`);
    updateProgress(taskField);
  } else if (
    $(`.task.${taskField}.${taskNumber}`).next(`.task.${taskField}`).length != 0
  ) {
    let nextTask = $(`.task.${taskField}.${taskNumber}`).next(
      `.task.${taskField}`
    )[0].classList[2];
    let previousTask = taskNumber;
    $(`.task.${taskField}.${taskNumber}`).remove();
    localStorage.removeItem(`${taskField} ${previousTask}`);
    localStorage.removeItem(`${taskField} ${previousTask} Checked`);
    do {
      $(`.${nextTask}`).removeClass(`${nextTask}`).addClass(`${previousTask}`);
      localStorage.setItem(
        `${taskField} ${previousTask}`,
        `${localStorage.getItem(`${taskField} ${nextTask}`)}`
      );
      if (localStorage.getItem(`${taskField} ${nextTask} Checked`) == "true") {
        localStorage.setItem(`${taskField} ${previousTask} Checked`, true);
      }
      localStorage.removeItem(`${taskField} ${nextTask}`);
      localStorage.removeItem(`${taskField} ${nextTask} Checked`);
      taskNumber = previousTask;
      previousTask = nextTask;
      console.log(localStorage.getItem(`${taskField} ${nextTask}`));
      nextTask =
        $(`.task.${taskField}.${taskNumber}`).next(`.task.${taskField}`)
          .length == 0
          ? null
          : $(`.task.${taskField}.${taskNumber}`).next(`.task.${taskField}`)[0]
              .classList[2];
      updateProgress(taskField);
    } while (nextTask != null);
  }
}

function generateNewTask(taskField, task, taskNumber) {
  let newTaskCheckBox = document.createElement("input");
  $(newTaskCheckBox).attr("type", "checkbox");
  $(newTaskCheckBox).addClass(`taskCheckbox ${taskField} Task${taskNumber}`);
  let newTaskDeleteButton = document.createElement("button");
  $(newTaskDeleteButton).addClass(
    `taskDeleteButton ${taskField} Task${taskNumber}`
  );
  $(newTaskDeleteButton).html("<img src='images/delete_icon16.svg'>");
  $(newTaskDeleteButton)
    .unbind()
    .bind("click", function () {
      deleteTask(`${$(this)[0].classList[1]}`, `${$(this)[0].classList[2]}`);
    });
  $(newTaskCheckBox).css("display", "none");
  $(newTaskCheckBox)
    .unbind()
    .bind("change", function () {
      checkState(taskField, `Task${taskNumber}`);
    });
  $(`.editButton.${taskField}`).attr("data-status") == 1
    ? $(newTaskDeleteButton).css("display", "flex")
    : $(newTaskCheckBox).css("display", "flex");
  let newTask = document.createElement("p");
  $(newTask).addClass(`task ${taskField} Task${taskNumber}`);
  $(newTask).append(task, newTaskDeleteButton, newTaskCheckBox);
  if ($(`.taskField.block.${taskField}`).find("p").length != 0) {
    $(`.${taskField} p`).last().after(newTask);
  } else {
    $(`.${taskField}.taskHeader`).after(newTask);
  }
  $(`.newTask.${taskField}`).val("");
}

function checkState(taskField, task) {
  switch ($(`.taskCheckbox.${taskField}.${task}`).is(`:checked`)) {
    case true:
      localStorage.setItem(`${taskField} ${task} Checked`, true);
      updateProgress(taskField);
      break;
    case false:
      localStorage.setItem(`${taskField} ${task} Checked`, false);
      updateProgress(taskField);
      break;
    default:
      console.log("Error");
  }
}

function updateProgress(taskField) {
  let taskNumber = 1;
  let checkedTask = 0;
  do {
    if (
      localStorage.getItem(`${taskField} Task${taskNumber} Checked`) == "true"
    ) {
      checkedTask++;
    }
    taskNumber++;
  } while (localStorage.getItem(`${taskField} Task${taskNumber}`) != null);
  taskNumber = 1;
  while (localStorage.getItem(`${taskField} Task${taskNumber + 1}`) != null) {
    taskNumber++;
  }
  $(`.taskProgress.${taskField}`).val(checkedTask);
  $(`.taskProgress.${taskField}`).attr("max", taskNumber);
}

function addNewTask(taskField, task) {
  if (task.length != 0) {
    let i = 1;
    let taskNumber = 0;
    do {
      if (localStorage.getItem(`${taskField} Task${i}`) == null) {
        taskNumber = i;
      }
      i++;
    } while (taskNumber == 0);
    generateNewTask(taskField, task, taskNumber);
    localStorage.setItem(`${taskField} Task${taskNumber}`, `${task}`);
  }
}

export { addNewTask, generateNewTask, updateProgress };

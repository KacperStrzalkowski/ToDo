import {
  showPrompt,
  addFunctions,
  generateNewTaskField,
} from "./modules/settings.js";
import { generateNewTask, updateProgress } from "./modules/task.js";

var taskFieldNumber = 1;
while (localStorage.getItem(`taskField taskField${taskFieldNumber}`) != null) {
  generateNewTaskField(
    taskFieldNumber,
    localStorage.getItem(`taskField taskField${taskFieldNumber}`)
  );
  var taskNumber = 1;
  while (
    localStorage.getItem(`taskField${taskFieldNumber} Task${taskNumber}`) !=
    null
  ) {
    generateNewTask(
      `taskField${taskFieldNumber}`,
      localStorage.getItem(`taskField${taskFieldNumber} Task${taskNumber}`),
      taskNumber
    );
    updateProgress(`taskField${taskFieldNumber}`);
    if (
      localStorage.getItem(
        `taskField${taskFieldNumber} Task${taskNumber} Checked`
      ) == "true"
    ) {
      $(`.taskCheckbox.taskField${taskFieldNumber}.Task${taskNumber}`).prop(
        "checked",
        true
      );
    }
    taskNumber++;
  }
  taskFieldNumber++;
}

addFunctions();
$(".settingsButton").click(function () {
  showPrompt("title");
});

$(".decline").click(function () {
  $(".promptAlertBg").css("display", "none");
  console.log($(`.taskField .taskField2 .block`));
});

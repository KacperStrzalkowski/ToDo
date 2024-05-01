function newTaskFieldHeader(taskFieldNumber, titleTaskField) {
  let newTaskFieldHeader = document.createElement("div");
  $(newTaskFieldHeader).addClass(`taskHeader taskField${taskFieldNumber}`);
  let newTaskEditButton = document.createElement("button");
  let newTaskFieldDeleteButton = document.createElement("button");
  $(newTaskFieldDeleteButton).addClass(
    `deleteButton taskField${taskFieldNumber}`
  );
  $(newTaskEditButton).addClass(`editButton taskField${taskFieldNumber}`);
  $(newTaskEditButton).attr("data-status", 0);
  $(newTaskFieldDeleteButton).append("<img src='images/delete_icon.svg'>");
  $(newTaskEditButton).append('<img src="images/edit_icon.svg">');
  $(newTaskFieldHeader).append(
    newTaskFieldDeleteButton,
    `${titleTaskField}`,
    newTaskEditButton
  );
  return newTaskFieldHeader;
}

function newTaskFieldFooter(taskFieldNumber) {
  let newTaskFieldFooter = document.createElement("div");
  $(newTaskFieldFooter).addClass(`taskFieldFooter taskField${taskFieldNumber}`);
  let newTaskAddButton = document.createElement("button");
  $(newTaskAddButton).addClass(`addButton taskField${taskFieldNumber}`);
  $(newTaskAddButton).append('<img src="images/add_icon.svg">');
  $(newTaskFieldFooter).append(
    `<textarea class='newTask taskField${taskFieldNumber}'></textarea>`,
    newTaskAddButton
  );
  return newTaskFieldFooter;
}

function newTaskFieldProgress(taskFieldNumber) {
  let newTaskFieldProgress = document.createElement("div");
  $(newTaskFieldProgress).addClass(
    `taskFieldProgress taskField${taskFieldNumber}`
  );
  let newTaskProgress = document.createElement("progress");
  $(newTaskProgress).addClass(`taskProgress taskField${taskFieldNumber}`);
  $(newTaskProgress).attr("min", "0");
  $(newTaskProgress).attr("max", "100");
  $(newTaskProgress).attr("value", "0");
  $(newTaskFieldProgress).append(newTaskProgress);
  return newTaskFieldProgress;
}
export { newTaskFieldHeader, newTaskFieldFooter, newTaskFieldProgress };

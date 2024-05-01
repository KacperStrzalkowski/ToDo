function editTaskField(taskField) {
  if ($(`.editButton.${taskField}`).attr("data-status") == 0) {
    $(`.${taskField} .taskFieldFooter`).css("display", "flex");
    $(`.${taskField} .deleteButton`).css("visibility", "visible");
    $(`.taskCheckbox.${taskField}`).css("display", "none");
    $(`.taskDeleteButton.${taskField}`).css("display", "block");
    $(`.editButton.${taskField}`).attr("data-status", 1);
  } else if ($(`.editButton.${taskField}`).attr("data-status") == 1) {
    $(`.taskCheckbox.${taskField}`).css("display", "block");
    $(`.${taskField} .taskFieldFooter`).css("display", "none");
    $(`.${taskField} .deleteButton`).css("visibility", "hidden");
    $(`.editButton.${taskField}`).attr("data-status", 0);
    $(`.taskDeleteButton.${taskField}`).css("display", "none");
  }
}
export { editTaskField };

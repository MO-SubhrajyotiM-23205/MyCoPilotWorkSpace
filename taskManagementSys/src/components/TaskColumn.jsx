
const todoIcon = "../assets/todo-icon.png"; // Adjust the path as necessary
const inProgressIcon = "../assets/glowing-star.png"; // Adjust the path as necessary
const doneIcon = "../assets/check-mark-button.png"; // Adjust the path as necessary

const TaskColumn = ({title}) => {
    let icon;
    if (title === "To Do") {
        icon = todoIcon;
    } else if (title === "In Progress") {
        icon = inProgressIcon;
    } else if (title === "Done") {
        icon = doneIcon;
    }

    return (
        <section >
            <h2><img src={icon} />{title}</h2>
        </section>
    );
};

export default TaskColumn;

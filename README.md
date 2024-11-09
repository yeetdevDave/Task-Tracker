# Task-Tracker

Task tracker is a project (https://roadmap.sh/projects/task-tracker) used to track and manage your tasks.

# How does it work?

Task Tracker uses a json file to track and manage your tasks.

# How to run it ?

Run the script app.js

# How to use it ?

To add a task
`task-cli add description`

To update a task
`task-cli update id description`

To delete a task
`task-cli delete id`

To mark a task as in progress
`task-cli mark-in-progress id`

To mark a task as done
`task-cli mark-done id`

## Examples
```
task-cli add "Buy groceries"

task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

task-cli mark-in-progress 1
task-cli mark-done 1

task-cli list

task-cli list done
task-cli list todo
task-cli list in-progress
```

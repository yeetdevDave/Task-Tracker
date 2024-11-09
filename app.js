const readline = require('readline');
const fs = require('fs')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

async function checkTasksFile() {
  if(!fs.existsSync('./tasks.json')) {
    fs.writeFile('./tasks.json', '[]', (err) => {
      if (err) throw err;
  
      console.log('tasks.json file created');
    })
  }
}

function getTasks() {
  return fs.promises.readFile('./tasks.json', 'utf8')
}

function updateTasksFile(json) {
  return fs.promises.writeFile('./tasks.json', json)
}

async function addTask(input) {
  let result = await getTasks()
  result = JSON.parse(result)
  let date = new Date().toLocaleString()
  let id = 1

  if(result.length > 0) {
    id = result[result.length - 1].id + 1
  }

  let description = input.slice(2, input.length).join(' ')

  if(description == '')
    return

  let object = {
    id,
    description,
    status: 'todo',
    createdAt: date,
    updatedAt: date
  }
  
  result.push(object)

  result = JSON.stringify(result, null, ' ')

  await updateTasksFile(result)

  console.log(`added task #${id}`);
}

async function updateTask(input) {
  let result = await getTasks()
  result = JSON.parse(result)
  let id = input[2]
  let description = input.slice(3, input.length).join(' ')

  if(description == '')
    return


  for(let i = 0; i < result.length; i++) {
    if(result[i].id == id) {
      result[i].description = description
      result[i].updatedAt = new Date().toLocaleString()

      result = JSON.stringify(result, null, ' ')

      await updateTasksFile(result)

      console.log(`updated task #${id}`);

      return
    }
  }
}

async function deleteTask(input) {
  let result = await getTasks()
  result = JSON.parse(result)

  let id = input[2]

  for(let i = 0; i < result.length; i++) {
    if(result[i].id == id) {
      result.splice(i, 1)

      for(let j = 0; j < result.length; j++) {
        result[j].id = j + 1
      }

      result = JSON.stringify(result, null, ' ')

      await updateTasksFile(result)

      console.log(`deleted task #${id}`);

      return
    }
  }
}

async function listTasks(input) {
  let result = await getTasks()
  result = JSON.parse(result)

  let status = input[2]

  if(status) {
    for(let i = 0; i < result.length; i++) {
      if(result[i].status == status) {
        console.log(result[i].description)
      }
    }
  } else {
    for(let i = 0; i < result.length; i++) {
      console.log(result[i].description)
    }
  }
}

async function markTaskDone(input) {
  let result = await getTasks()
  result = JSON.parse(result)

  let id = input[2]

  for(let i = 0; i < result.length; i++) {
    if(result[i].id == id) {
      result[i].status = 'done'
    }

    result = JSON.stringify(result, null, ' ')

    await updateTasksFile(result)

    console.log(`marked task #${id} as done`);

    return
  }
}

async function markTaskInProgress(input) {
  let result = await getTasks()
  result = JSON.parse(result)

  let id = input[2]

  for(let i = 0; i < result.length; i++) {
    if(result[i].id == id) {
      result[i].status = 'in-progress'
    }

    result = JSON.stringify(result, null, ' ')

    await updateTasksFile(result)

    console.log(`marked task #${id} as in progress`);

    return
  }
}

async function main() {
  checkTasksFile()

  while(true) {
    let input = await askQuestion('$ ');
    input = input.split(' ')
  
    let command = input[0]
    let action = input[1]
  
    if(command != 'task-cli') {
      console.log(`'${command}' command not found`)
      continue
    }

    switch(action) {
      case 'add':
        await addTask(input)
        break
      case 'update':
        await updateTask(input)
        break
      case 'delete':
        await deleteTask(input)
        break
      case 'mark-in-progress':
        await markTaskInProgress(input)
        break
      case 'mark-done':
        await markTaskDone(input)
        break
      case 'list':
        await listTasks(input)
        break
      default:
        console.log(`${action}: unknown action`)
        break
    }
  
  }
}

main()
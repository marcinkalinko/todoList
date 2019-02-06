const yargs = require('yargs');
const fs = require('fs');


const addList = {
    command: 'add <todo>',
    describe: 'Add new ',
    handler: args => {
        const list = {
            id: Math.floor((Math.random() * 100) + 1),
            name: args.todo
        }

        let data = fs.readFileSync('todo.json');
        data += JSON.stringify(list) + '|';
        fs.writeFileSync('todo.json', data);
        console.log('Zapisano');
    }
};

const deleteList = {
    command: 'del <id>',
    describe: 'Del todo',
    handler: args => {

        const data = fs.readFileSync('todo.json');
        const str = data.toString();
        let arr = str.split("|");

        let newArray = [];
        for (let index = 0; index < arr.length - 1; index++) {
            const element = arr[index];
            let obj = JSON.parse(element);
            if (obj.id != args.id) {
                newArray.push(obj);
            }
        }

        if (newArray.length != arr.length - 1) {
            let content = '';
            newArray.forEach(el => {
                content += JSON.stringify(el) + '|';
            });

            fs.writeFileSync('todo.json', content);
            console.log(`Usunieto`);
        } else {
            console.log(`Nie ma nic do usuniecia`);
        }


    }
};

const showList = {
    command: 'show',
    describe: 'Show all list',
    handler: () => {

        const data = fs.readFileSync('todo.json');
        const str = data.toString();
        let arr = str.split("|");

        console.log(`List TODO:`)
        for (let index = 0; index < arr.length - 1; index++) {
            const element = arr[index];
            let obj = JSON.parse(element);
            console.log(`Id: ${obj.id} Title: ${obj.name}`);
        }

    }
};

//start program
yargs.command(addList).command(deleteList).command(showList)
    .demandCommand()
    .help()
    .version(false).argv;
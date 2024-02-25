// rover.js
let Message = require('./message.js');
const Command = require('./command.js');

class Rover {
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }

  receiveMessage(message) {
   let results = [];
   message.commands.forEach(command => {
     let result = { completed: false };
     if (command.commandType === 'MOVE') {
       if (this.mode === 'LOW_POWER') {
         result.completed = false;
       } else {
         this.position = command.value;
         result.completed = true;
       }
     } else if (command.commandType === 'STATUS_CHECK') {
       result.completed = true;
       result.roverStatus = {
         mode: this.mode,
         generatorWatts: this.generatorWatts,
         position: this.position
       };
     } else if (command.commandType === 'MODE_CHANGE') {
       this.mode = command.value;
       result.completed = true;
     }
     results.push(result);
   });
   return { message: message.name, results: results };
 }

}

module.exports = Rover;


let rover = new Rover(100);
let commands = [
   new Command('MOVE', 4321),
   new Command('STATUS_CHECK'),
   new Command('MODE_CHANGE', 'LOW_POWER'),
   new Command('MOVE', 3579),
   new Command('STATUS_CHECK')
];
let message = new Message('TA power', commands);
let response = rover.receiveMessage(message);

console.log(rover);
console.log(response);


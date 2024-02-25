const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {
  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function () {
    let rover = new Rover(100);
    expect(rover.position).toEqual(100);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains the name of the message", function () {
    let rover = new Rover(100);
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    let message = new Message("Test message with two commands", commands);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual("Test message with two commands");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let rover = new Rover(100);
    let commands = [new Command("MOVE", 5000), new Command("STATUS_CHECK")];
    let message = new Message("Two commands", commands);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });

  it("responds correctly to the status check command", function () {
    let rover = new Rover(100);
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("Status check", commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.mode).toEqual("NORMAL");
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(100);
  });

  it("responds correctly to the mode change command", function () {
    let rover = new Rover(100);
    let commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    let message = new Message("Mode change", commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBeTruthy();
    expect(rover.mode).toEqual("LOW_POWER");
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let rover = new Rover(100);
    rover.receiveMessage(
      new Message("Change mode to LOW_POWER", [
        new Command("MODE_CHANGE", "LOW_POWER"),
      ])
    );
    let commands = [new Command("MOVE", 5000)];
    let message = new Message("Attempt to move in LOW_POWER mode", commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBeFalsy();
    expect(rover.position).toEqual(100); // Position should not change
  });

  it("responds with the position for the move command", function () {
    let rover = new Rover(100);
    let commands = [new Command("MOVE", 5000)];
    let message = new Message("Move to position 5000", commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBeTruthy();
    expect(rover.position).toEqual(5000);
  });
});

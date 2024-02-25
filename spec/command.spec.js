const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

  // Test 1: throws error if command type is NOT passed into constructor as the first parameter
  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect(function() { new Command(); }).toThrow(new Error('Command type required.'));
  });

  // Test 2: constructor sets command type
  it("constructor sets command type", function() {
    let command = new Command('MOVE', 100);
    expect(command.commandType).toEqual('MOVE');
  });

  // Test 3: constructor sets a value passed in as the 2nd argument
  it("constructor sets a value passed in as the 2nd argument", function() {
    // Create a new Command object with a specific command type and value
    let command = new Command('MOVE', 100);
    // Check if the value property of the created object matches the provided value
    expect(command.value).toEqual(100);
  });

});

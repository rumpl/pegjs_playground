start
  = commands+

commands
  = increment
  / decrement
  / incrementData
  / decrementData
  / output
  / input
  / ifZero

increment =
  increments:">"+ { return { op: "INC", value: increments.length}; }

decrement =
  decrements:"<"+ { return { op: "DEC", value: decrements.length}; }

incrementData =
  increments:"+"+ { return { op: "INC_DATA", value: increments.length}; }

decrementData =
  decrements:"-"+ { return { op: "DEC_DATA", value: decrements.length}; }

output =
  "." { return { op: "OUTPUT"}; }

input =
  "," { return { op: "INPUT"}; }

// This is sub-optimal for the interpreter, I need to flatten the array
// in order to have a nice looking code.
// The ideal would be something like this :
//
// ifZero =
//   "[" commands:&commands+ { return { op: "IF", length: commands.length }; }
//
// But the parser would not advance so that we could parse the commands once
// more in order to put them in the final array.

ifZero =
  "[" commands:commands+ "]" { return { op: "IF", commands: commands }; }

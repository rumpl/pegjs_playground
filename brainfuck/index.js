var fs = require('fs');
var bf = require("./brainfuck");

var code = bf.parse('++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.');
var code2 = bf.parse('>+++++++[<+++++++++++>-]<.>++++[<++++++>-]<.>+++[<++++>-]<+..+++++++.>++++++++[<----------->-]<-.>+++++++[<++++++++++>-]<.>++[<++++++>-]<.>++[<------>-]<-.----.>+++++[<++>-]<.--.+++++.>+++++++[<---------->-]<-.-------.>+++++++[<+++++>-]<.>++++++++[<++++>-]<+++++.>++[<+++++>-]<.>+++[<--->-]<.>++[<+++++>-]<.+.>++[<---->-]<+.>+++[<---->-]<.>+++[<++++++>-]<.');

var mem = [];
var mem_ptr = 0;
for(var i = 0; i < 30; i++) {
  mem[i] = 0;
}

function flatten(ast) {
  var ret = [];
  var i = 0;

  while(i < ast.length) {
    if (ast[i].op === 'IF') {
      ast[i].length = ast[i].commands.length;
      ret.push(ast[i]);
      ret = ret.concat(flatten(ast[i].commands));
      ret.push({ op: 'NIF', length: ast[i].length });
      delete ast[i].commands;
    } else {
      ret.push(ast[i]);
    }
    i++;
  }

  return ret;
}

function run(code) {
  mem = [];
  mem_ptr = 0;
  for(var i = 0; i < 30; i++) {
    mem[i] = 0;
  }

  var instr_ptr = 0;
  var last_length = [];

  while(instr_ptr < code.length) {
    var instruction = code[instr_ptr];
    switch(instruction.op) {
      case 'INC':
        mem_ptr += instruction.value;
        break;
      case 'DEC':
        mem_ptr -= instruction.value;
        break;
      case 'INC_DATA':
        mem[mem_ptr] += instruction.value;
        break;
      case 'DEC_DATA':
        mem[mem_ptr] -= instruction.value;
        break;
      case 'OUTPUT':
        process.stdout.write(String.fromCharCode(mem[mem_ptr]));
        break;
      case 'INPUT':
        var response = fs.readSync(process.stdin.fd, 100, 0, "utf8");
        mem[mem_ptr] = response[0].charCodeAt(0);
        break;
      case 'IF':
        if(mem[mem_ptr] === 0) {
          instr_ptr += instruction.length;
        }
        break;
      case 'NIF':
        if (mem[mem_ptr] !== 0) {
          instr_ptr -= instruction.length + 1;
        }
        break;
      default:
        throw new Error("Unknown opcode " + instruction.op);
    }

    instr_ptr++;
  }
}

run(flatten(code));
run(flatten(code2));

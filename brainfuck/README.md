# Brainfuck interpreter

The parser does a trick where, if there are multiple operations side by side :'++++' for example, it returns only one instruction : `{ op: "INC", length: 4}` in this example.

The interpreter has to flatten the AST before processing since I was unable to do what I wanted with PEG.js (see brainfuck.pegjs).

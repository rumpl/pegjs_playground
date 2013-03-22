start
  = additive
  
NonZeroDigit
  = [1-9]
    
DecimalIntegerLiteral
  = "0" / NonZeroDigit DecimalDigits?

DecimalDigits
  = DecimalDigit+

DecimalDigit
  = [0-9]
  
additive
  = left:multiplicative "+" right:additive { return {"type": "expr", "left": left, "right": right, "op": "+"}; }
  / left:multiplicative "-" right:additive { return {"type": "expr", "left": left, "right": right, "op": "-"}; }
  / multiplicative

multiplicative
  = left:primary "*" right:multiplicative { return {"type": "expr", "left": left, "right": right, "op": "*"}; }
  / left:primary "/" right:multiplicative { return {"type": "expr", "left": left, "right": right, "op": "/"}; }
  / primary

primary
  = float
  / "(" additive:additive ")" { return additive; }

float "float"
  = parts:("-"? DecimalIntegerLiteral "." DecimalDigits) {
      var minus = parts.shift();
      var m = 1;

      if (minus === '-') {
        m = -1;
      }

      return { 
          "type": "num", 
          "val" : m * parseFloat(parts[0].join("") + parts[1] + parts[2].join(""))
      }; 
    }
  / parts:("-"? DecimalIntegerLiteral) { return { "type": "num", "val" : parseFloat(parts.join(""))}; }

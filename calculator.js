$(document).ready(function() {
  //var entries = [];
  var overallTotal = '0';
  //var tempEquations = '';
  //var buttonValue = '';
  //var symbol = '';

  function removeLeadingZero(string){
   var newString = string
   if (newString[0] === "0"){
     console.log('removeLeadingZero-1: remove leading Zero from newString')
     newString = newString.slice(1)
   }
   return newString
  }

  function removeLeadingSymbol(string){
   var newString = string
   var symbols = ["*", "/", "+", "-",]
   if (symbols.includes(newString[0])){
     console.log('removeLeadingSymbol-1: remove leading Symbol from newString')
     newString = newString.slice(1)
   }
   return newString
  }

  function storeAnswer(value){
    console.log('storeAnswer-1: storeAnswer is::: ', value)
    var value = removeLeadingZero(value)
    overallTotal = value
    console.log('storeAnswer-2: overallTotal is::: ', overallTotal)
    $("#answer").html(overallTotal)
    console.log('storeAnswer-3: set overallTotal on calculator')
    return value
  }

  function getCurrentValue(){
    var currentValue =
  document.getElementById("display").innerHTML
    console.log('getCurrentValue-- currentValue is a string: ', currentValue)
    return currentValue
  }

  function clearCurrentValue(){
    console.log('CLEAR-1: calling clearCurrentValue... currentValue === 0')
    $("#display").html("0")
    console.log('CLEAR-2: call storeAnswer with "0", to reset overallTotal')
    return storeAnswer("0")
  }

  function equals(){
  var answer = overallTotal
  console.log('EQUALS-1: answer is:::', answer)
  var removeEqualSign = answer.split("=")
  var newAnswer = removeEqualSign[0]
  newAnswer = replaceTimesAndDivide(newAnswer)
  console.log('EQUALS-2: newAnswer is:::', newAnswer)
  var finalAnswer = eval(newAnswer)//turning it into a number
  finalAnswer = finalAnswer.toString()
  storeAndReset(finalAnswer, finalAnswer)
  console.log('EQUALS-3: finalAnswer is:::', finalAnswer)
  return finalAnswer
  }

//getting info from buttons when they are clicked.
  function clickButton(event){
    $("button").click(function(event){
    buttonValue = this.innerHTML
    console.log("0. you clicked: ", buttonValue)

    if ($(this).hasClass("orange")){
      console.log('clickButton-1. ${buttonValue} is in the orange class!')
      return addSymbolToAnswer (buttonValue)
    }

    if ($(this).hasClass("number")){
      console.log('clickedButton-2. ${buttonValue} is in the number class!')
      return createNewNumber(buttonValue)
    }

    if ($(this).hasClass("clear")){
      console.log('clickButton-3. clearCurrentValue called!')
      return clearCurrentValue()
    }

    if ($(this).hasClass("equals")){
      console.log('clickButton-4. equals pressed!')
      addSymbolToAnswer(buttonValue)
      return equals()
    }
    })
  }
  clickButton(event)

//converting symbols X and ÷ to * and /.
  function replaceTimesAndDivide(string){
    string = string.replace('X','*')
    string = string.replace('÷', '/')
    return string
  }

//calling the replaceT&D function & getting cValue & estab symbols
  function addSymbolToAnswer(string){
    var symbolString = string
    symbolString = replaceTimesAndDivide(symbolString)
    console.log('ORANGE-1. symbolString is: ', symbolString)
    var currentValue = getCurrentValue()
    var symbols = ["*", "/", "+", "-"]
    console.log('ORANGE-2. overallTotal is now: ', overallTotal)

//adding symbol
    if (overallTotal === currentValue){
      console.log('ORANGE-3a. after "=" pressed, just one symbol added to currentValue')
    var newOverallTotal = currentValue + symbolString
      return storeAndReset (newOverallTotal, symbolString)
    }

    if (symbols.includes(currentValue)){
      console.log('ORANGE-3b: currentValue and symbolString are both symbols!')
      currentValue = currentValue.replace(currentValue, symbolString)
      console.log('ORANGE-3b: replaced currentValue with ', symbolString)
      var newOverallTotal = overallTotal.slice(0,-1) + currentValue
      console.log('ORANGE-4b: replace lastChar in new')
      return storeAndReset (newOverallTotal, symbolString)
    } else {
      console.log('ORANGE-3c: adding new symbol to currentValue')
      currentValue = currentValue + symbolString
      console.log('ORANGE-3c. new currentValue is: ', currentValue)
      var newOverallTotal = overallTotal + currentValue
      return storeAndReset(newOverallTotal, symbolString)
    }
  }

//clearing
  function storeAndReset(newOverallTotal, newCurrentValue){
    storeAnswer(newOverallTotal)
    $("#display").html(newCurrentValue)
    console.log ('storeAndReset: replaced currentValue with: ', newCurrentValue)
    return newCurrentValue
  }

function createNewNumber(string){
  var buttonValue = string
  var currentValue = getCurrentValue()
  var newString = currentValue + buttonValue
  newString = removeLeadingZero(newString)
  newString = removeLeadingSymbol(newString)
  console.log('createNewNumber-1: newString is: ', newString)
  $("#display").html(newString)
  return newString
}

})

  /*$("button").click(function() {
    buttonValue = this.innerHTML
    console.log('buttonValue: ' + buttonValue);

  if (!isNaN(buttonValue) || buttonValue === '.'){
    tempEquations += buttonValue;
    $("#display").html(tempEquations)
    console.log(tempEquations)
  }

  if (buttonValue === '÷' || buttonValue === 'X' ||buttonValue === '+' || buttonValue === '-'){
    entries.push(tempEquations);
    tempEquations = '';
    console.log(tempEquations)
    symbol = buttonValue;
    entries.push(symbol);
    console.log(entries);
  }

  if (buttonValue === '='){
    entries.push(tempEquations);
    tempEquations = '';
    var tempanswer;
    var temptotal;
    for (i=1; i < entries.length; i=i+2){
    switch(entries[i]){
      case '÷':
        temptotal = Number(entries[i-1]) / Number(entries[i+1]);
        if (!isNaN(tempanswer)){
          temptotal = tempanswer / entries[i+1]
        }
        tempanswer = temptotal;
        break;
      case 'X':
        temptotal = Number(entries[i-1]) * Number(entries[i+1]);
        if (!isNaN(tempanswer)){
          temptotal = tempanswer * entries[i+1]
        }
        tempanswer = temptotal;
        break;
      case '-':
        temptotal = Number(entries[i-1]) - Number(entries[i+1]);
        if (!isNaN(tempanswer)){
          temptotal = tempanswer - entries[i+1]
        }
        tempanswer = temptotal;
        break;
      case '+':
        temptotal = Number(entries[i-1]) + Number(entries[i+1]);
        if (!isNaN(tempanswer)){
          temptotal = tempanswer + entries[i+1]
        }
        tempanswer = temptotal;
        break;
      }
    }
    overallTotal = tempanswer;
    $("#display").html(overallTotal)
    entries = [];
  }

  if (buttonValue === 'AC'){
    entries = [];
    tempEquations = '';
    overallTotal = '';
    $('#display').html('0')
  } else if (buttonValue === 'CE'){
    tempEquations = '';
  }

    });
  };
  clickButton(event)
});*/

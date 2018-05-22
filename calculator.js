$(document).ready(function() {
  var entries = [];
  var overallTotal = '';
  var tempEquations = '';
  var clickedButton = '';
  var symbol = '';


  $("button").click(function() {
    clickedButton = this.innerHTML
    console.log('clickedButton: ' + clickedButton);

  if (!isNaN(clickedButton) || clickedButton === '.'){
    tempEquations += clickedButton;
    $("#display").html(tempEquations)
    console.log(tempEquations)
  }

  if (clickedButton === '÷' || clickedButton === 'X' ||clickedButton === '+' || clickedButton === '-'){
    entries.push(tempEquations);
    tempEquations = '';
    console.log(tempEquations)
    symbol = clickedButton;
    entries.push(symbol);
    console.log(entries);
  }

  if (clickedButton === '='){
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

  if (clickedButton === 'AC'){
    entries = [];
    tempEquations = '';
    overallTotal = '';
    $('#display').html('0')
  } else if (clickedButton === 'CE'){
    tempEquations = '';
  }

    });
  });

    /*if (reset){
      if (entry === '/' || entry === '' ||entry === '+' || entry === '-'){
        log = ans;
      } else {
        ans =
      }
    }
    reset = false;*/

    /*if (entry === 'AC' || entry === 'CE' && current === 'nochange'){
      ans = '';
      current = '';
      entry = '';
      log = '';
      $('#answer').html('0');
      decimal = true;
    }

    if (entry === '.' || entry === '0.'){
      if(!decimal){
        entry = '';
      }
    }*/

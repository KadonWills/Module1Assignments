function backSpace() {
    var number = document.getElementById('display').value;  
    
    var newNumber = number.substring( 0, number.length - 1 );
    
    number = newNumber;
  }

var box = document.getElementById('display');
function backSpace() {
  
    var number = box.value;
    
    var len = number.length - 1;
    
    var newNumber = number.substring( 0, len );
    
    box.value = newNumber;
  
  }
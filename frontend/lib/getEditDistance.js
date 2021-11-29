export const getEditDistance = function(a, b){
    if(a.length == 0) return b.length; 
    if(b.length == 0) return a.length; 
  
    var matrix = [];
  
    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
      matrix[i] = [i];
    }
  
    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
      matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
      for(j = 1; j <= a.length; j++){
        if(b.charAt(i-1) == a.charAt(j-1)){
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                  Math.min(matrix[i][j-1] + 1, // insertion
                                           matrix[i-1][j] + 1)); // deletion
        }
      }
    }
  
    return matrix[b.length][a.length];
  };


export default function bestMatch(myArray, myQuery, term) {
    if (!myArray) return myArray;
    if (myArray.length <= 2) return myArray;

    var temp = myArray.map(function(item) {
        let item2 = {...item}; 
        item2.distance = getEditDistance(myQuery, item2[term])
        return item2;
    });
    
    temp.sort(function(a,b) {
      if (a.distance < b.distance) return -1
      else if (a.distance > b.distance) return 1
      else return 0;
    })
    return temp;
 }
 
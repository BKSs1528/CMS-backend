function ascii_deletion_distance(str1, str2) {
    str1 = str1.split("").sort()
    str2 = str2.split("").sort()
    let final =[]
    var i = 0, j = 0;                 // i points to arr1 and j to arr2
    // Break if one of them runs out
    while(i<str1.length && j<str2.length) {
  
      if(str1[i] == str2[j]) {        // If both are same, add it to result
        final.push(str1[i]);
        i++;
        j++;
      }
      else if(str1[i] < str2[j]) {  // Increment the smaller value so that
        i++;                        // it could be matched with the larger
      }                             // element
      else {
        j++;
      }
    }
    console.log(final);
    let sum =0
    for(let i=0;i<final.length;i++){
      sum = sum + final[i].charCodeAt()
    }
    return sum
  }

// ascii_deletion_distance("cat","at")
function first_letter_second_sentence(two_sentences) {
    two_sentences = two_sentences.split("?"||"!"||".")
    let x = two_sentences[1]
    return two_sentences
  }

  console.log(first_letter_second_sentence("In it lay a marble. Tom’s astonishment was bound-less!"));
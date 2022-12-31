/* Write a program to build a `Pyramid of stars` of given height */

const buildPyramid = (val) => {
     	// Write your code here
     var result = "";
     let j;
     if(!Number.isInteger(val)) { return result;}
     for(let i=0;i<val;i++) {
          space = "";
          var high;
          if(val%2==0) {
               high = Math.ceil(val/2) - i + 3; 
          } else {
               high = Math.ceil(val/2) - i + 2;
          }

          for(j=0;j<high;j++){
               space += " ";
          }

          result += space;
          for(j=0;j<i;j++){
               result += "* ";
          }

          result += "*  \n";
     }
     return result;
};

/* For example,
INPUT - buildPyramid(6)
OUTPUT -
     *
    * *
   * * *
  * * * *
 * * * * *
* * * * * *

*/

module.exports = buildPyramid;

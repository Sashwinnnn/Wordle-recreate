var letters;
var words = getColumn("Wordle","validWordleAnswer");
var word;
var fwords = [];
for(var i = 0; i<words.length;i++){
  if(words[i]!=null){
    appendItem(fwords,words[i]);
  }
}
var r = 1;
var t;
var correct=0;
var user_input;

onEvent("startbutton","click",function(){
word = fwords[randomNumber(0,fwords.length-1)];
word = word.toUpperCase();
console.log(word);
letters = word.split('');
console.log(letters);

  
  setScreen("Home");
    for(r=1;r<6;r++){
      for(t=1;t<=5;t++){
        if(getText("r"+r+"t"+t)!=''){
        setProperty("r"+r+"t"+t,"text","");
        setProperty("r"+r+"t"+t,"background-color","white");
        }
      }
    }
  setProperty("text_input1","hidden",false);
  setProperty("check","hidden",false);
  setProperty("end","hidden",true);
  setProperty("reveal","hidden",true);
  r = 1;
  t = 1;
});

onEvent("play_again","click",function(){
  setScreen("Start");
});


onEvent("check","click",function(){
  if(fwords.indexOf(getText("text_input1"))<0) {
  flashRed();
} 
else{
correct = 0;
  
user_input = getText("text_input1");
user_input = user_input.toUpperCase();
user_input = user_input.split('');

for(t=1;t<=5;t++){
  setProperty("r"+r+"t"+t,"text",user_input[t-1]);
}
setProperty("text_input1","text","");
  

  for(t = 1; t<=5 ; t++){
  if(getText("r"+r+"t"+t) == letters[t-1]){
    setProperty("r"+r+"t"+t,"background-color","green");
  } else if (getText("r"+r+"t"+t) == letters[0] ||
           getText("r"+r+"t"+t) == letters[1] ||
           getText("r"+r+"t"+t) == letters[2] ||
           getText("r"+r+"t"+t) == letters[3] ||
           getText("r"+r+"t"+t) == letters[4]) {
  setProperty("r"+r+"t"+t,"background-color","yellow");
}
 else if(getText("r"+r+"t"+t) != (letters[0]||letters[1]||letters[2]||letters[3]||letters[4])){
    setProperty("r"+r+"t"+t,"background-color","red");
  }
}

for(t=1;t<=5;t++){
  if(getProperty("r"+r+"t"+t, "background-color")=="green"){
    correct++;
  }
}
if(correct==5){
  setProperty("text_input1","hidden",true);
  setProperty("check","hidden",true);
  setProperty("end","hidden",false);
} 
else if(r >= 5){
  setProperty("text_input1","hidden",true);
  setProperty("check","hidden",true);
  setProperty("reveal","hidden",false);
}
r++;
}
});

onEvent("end","click",function(){
  setScreen("End");
  setProperty("end_text","text","Wow! you sure figured that one out!");
});

onEvent("reveal","click",function(){
  setScreen("End");
  setProperty("end_text","text","The word was: " + word + ". Good try!");

});

function flashRed() {
  setProperty("text_input1", "background-color", "red");
  setTimeout(function(){
    setProperty("text_input1", "background-color", "white");
  }, 400);
  setProperty("text_input1","text","");
}



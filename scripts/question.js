//constructor for question class
function Question(id,text,hint,point,flag){
    this.id = id;
    this.text = text;
    this.hint = hint;
    this.flag = flag;
}

//function for checking answer
Question.prototype.checkAnswer = function (answer){
    return this.flag === answer;
}
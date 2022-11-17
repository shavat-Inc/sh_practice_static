// 計算--------------------------------------
function calc_total(){
  kingaku = 0;
  for (i=0; i<document.myform.length-1; i++){
    if (document.myform.elements[i].checked){
      kingaku += eval(document.myform.elements[i].value);
    }
  }
  document.myform.goukei.value = kingaku + "　円";
}

console.log(document.myform.length);
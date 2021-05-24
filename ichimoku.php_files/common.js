function ltrim(_1){
var _2=/^\s */;
return _1.replace(_2,"");
}
function rtrim(_3){
var _4=/\s *$/;
return _3.replace(_4,"");
}
function trim(_5){
return ltrim(rtrim(_5));
}
function errorAlert(_6,_7){
objErr=document.getElementById("err_top");
if(objErr!=null){
objErr.style.display="";
}
if(_7==null){
_7="err_"+_6.name;
}
objErr=document.getElementById(_7);
objErr.style.display="";
return false;
}
function errorAlertOff(_8,_9){
if(_9==null){
_9="err_"+_8.name;
}
objErr=document.getElementById(_9);
objErr.style.display="none";
}
function checkRequired(_a,_b){
if(_b==null){
_b="err_"+_a.name;
}
objErr=document.getElementById(_b);
objErr.style.display="none";
var s=_a.value;
if(trim(s)==""){
return errorAlert(_a,_b);
}
return true;
}
function showFieldError(elementID){
	document.getElementById(elementID).style.display = '';
	var objErr=document.getElementById("err_top");
	if(objErr!=null) objErr.style.display="";
}
function hideFieldError(elementID){
	document.getElementById(elementID).style.display = 'none';
}
function _checkTime(st){
var s=trim(st);
var i=s.indexOf(":");
if(i<0){
return false;
}
var hh=s.substr(0,i);
var mm=s.substr(i+1);
if(!_checkInt(hh)){
return false;
}
if(!_checkInt(mm)){
return false;
}
h=hh.valueOf();
m=mm.valueOf();
if((h<0)||(h>23)){
return false;
}
if((m<0)||(m>59)){
return false;
}
return true;
}
function checkTime(obj,_13){
if(_13==null){
_13="err_"+obj.name;
}
objErr=document.getElementById(_13);
objErr.style.display="none";
var s=trim(obj.value);
if(!_checkTime(s)){
return errorAlert(obj,_13);
}
return true;
}
function _checkDate(st){
var s=trim(st);
var i1=s.indexOf("/");
if(i1<0){
return false;
}
var i2=s.indexOf("/",i1+1);
if(i2<0){
return false;
}
var mm=s.substr(0,i1);
var dd=s.substr(i1+1,i2-(i1+1));
var yy=s.substr(i2+1);
if(!_checkInt(dd)){
return false;
}
if(!_checkInt(mm)){
return false;
}
if(!_checkInt(yy)){
return false;
}
d=dd.valueOf();
m=mm.valueOf();
y=yy.valueOf();
if((m<1)||(m>12)){
return false;
}
if(y<1){
return false;
}
var _1c=(((y%4)==0&&(y%100)!=0)||(y%400)==0);
var _1d=0;
_1d=31;
if((m==4)||(m==6)||(m==9)||(m==11)){
_1d=30;
}
if(m==2){
_1d=(_1c)?29:28;
}
if((dd.valueOf()<1)||(dd.valueOf()>_1d)){
return false;
}
return true;
}
function checkDate(obj,_1f){
if(_1f==null){
_1f="err_"+obj.name;
}
objErr=document.getElementById(_1f);
objErr.style.display="none";
var s=trim(obj.value);
if(!_checkDate(s)){
return errorAlert(obj,_1f);
}
return true;
}
function dateUTC(st){
s=trim(st);
var i1=s.indexOf("/");
var i2=s.indexOf("/",i1+1);
var mm=s.substr(0,i1);
var dd=s.substr(i1+1,i2-(i1+1));
var yy=s.substr(i2+1);
return Date.UTC(yy,mm-1,dd);
}
function lessDate(s1,s2){
return (dateUTC(s1)<dateUTC(s2));
}
function _checkInt(st){
var _2a=trim(st);
if(_2a.length<1||_2a==""){
return false;
}
var _2b="0123456789";
for(i=0;i<_2a.length;i++){
ch=_2a.charAt(i);
if(_2b.indexOf(ch)<0){
return false;
}
}
if(_2a.valueOf()<=0){
return false;
}
return true;
}
function checkInt(obj,_2d){
if(_2d==null){
_2d="err_"+obj.name;
}
objErr=document.getElementById(_2d);
objErr.style.display="none";
var s=trim(obj.value);
if(!_checkInt(s)){
return errorAlert(obj,_2d);
}
return true;
}

function _checkIntHaveZero(st){
var _2a=trim(st); 
if(_2a.length<1||_2a==""){  
return false;
}
var _2b="0123456789";
for(i=0;i<_2a.length;i++){ 
ch=_2a.charAt(i); 
if(_2b.indexOf(ch)<0){ 
return false;
}
}
if(_2a.valueOf()<0){ 
return false;
}
return true;
}

function checkIntHaveZero(obj,_2d){
if(_2d==null){
_2d="err_"+obj.name;
}
objErr=document.getElementById(_2d);
objErr.style.display="none";
var s=trim(obj.value);
if(_checkIntHaveZero(s)==false){ 
return errorAlert(obj,_2d);
}
return true;
}

function _checkRange(st,_30,_31){
var _32=trim(st);
if(!_checkInt(_32)){
return false;
}
var v=_32.valueOf();
return ((v>=_30)&&(v<=_31));
}
function checkRange(obj,_35,_36,_37){
if(_35==null){
_35="err_"+obj.name;
}
objErr=document.getElementById(_35);
objErr.style.display="none";
var s=trim(obj.value);
if(!_checkRange(s,_36,_37)){
return errorAlert(obj,_35);
}
return true;
}
function _checkDouble(st){
var _3a=trim(st);
if(_3a.length<1){
return false;
}
var _3b="0123456789.";
for(i=0;i<_3a.length;i++){
ch=_3a.charAt(i);
if(_3b.indexOf(ch)<0){
return false;
}
}
if(_3a.indexOf(".")!=_3a.lastIndexOf(".")){
return false;
}
return true;
}
function checkDouble(obj,_3d){
if(_3d==null){
_3d="err_"+obj.name;
}
objErr=document.getElementById(_3d);
objErr.style.display="none";
var s=trim(obj.value);
if(!_checkDouble(s)){
return errorAlert(obj,_3d);
}
return true;
}
function _checkPhone(st){
var _40="0123456789-+() ";
var _41=trim(st);
if(_41.length<1){
return false;
}
for(i=0;i<_41.length;i++){
ch=_41.charAt(i);
if(_40.indexOf(ch)<0){
return false;
}
}
return true;
}
function checkPhone(obj,_43){
if(_43==null){
_43="err_"+obj.name;
}
objErr=document.getElementById(_43);
objErr.style.display="none";
var s=trim(obj.value);
if(!_checkPhone(s)){
return errorAlert(obj,_43);
}
return true;
}
function _checkMultiPhone(st){
var _40="0123456789-+()/ ";
var _41=trim(st);
if(_41.length<1){
return false;
}
for(i=0;i<_41.length;i++){
ch=_41.charAt(i);
if(_40.indexOf(ch)<0){
return false;
}
}
return true;
}
function checkMultiPhone(obj,_43){
if(_43==null){
_43="err_"+obj.name;
}
objErr=document.getElementById(_43);
objErr.style.display="none";
var s=trim(obj.value);
if(!_checkMultiPhone(s)){
return errorAlert(obj,_43);
}
return true;
}

function inputFloat(_6b,_6c){
if(_6b.value==""){
return true;
}
var i,c,state,value;
state="H";
value="";
for(i=0;i<_6b.value.length;i++){
c=_6b.value.charAt(i);
if(c=="-"){
if(i==0&&_6c==true){
value+=c;
}
}else{
if(c=="."){
if(state=="H"){
value+=c;
state="T";
}
}else{
if(c>="0"&&c<="9"){
value+=c;
}
}
}
}
if(value.length>0&&value.charAt(0)=="."){
value="0"+value;
}
if(_6b.value!=value){
_6b.value=value;
}
}
function inputInt(_6e,_6f){
if(_6e.value==""){
return true;
}
var i,c,value;
value="";
for(i=0;i<_6e.value.length;i++){
c=_6e.value.charAt(i);
if(c=="-"){
if(i==0&&_6f==true){
value+=c;
}
}else{
if(c>="0"&&c<="9"){
value+=c;
}
}
}
if(_6e.value!=value){
_6e.value=value;
}
}

/*uyen: 27-03-2007 end*/
function hoverTR(obj){
	var td = obj.getElementsByTagName("TD");
	for(i=0; i<td.length; i++){
		td[i].setAttribute("style", "background-color:#FFFF99");
	}
}
function outTR(obj){
	var td = obj.getElementsByTagName("TD");
	for(i=0; i<td.length; i++){
		td[i].removeAttribute("style");
	}
}
function hoverTR2(obj, color){
	var td = obj.getElementsByTagName("TD");
	for(i=0; i<td.length; i++){
		td[i].setAttribute("style", "background-color:"+color);
	}
}

function setCookie(c_name,value,exdays, path)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        //c_value += '; domain=.cophieu68.vn';
        if( path == "" ){
            c_value += '; path=/';
        }
        else{
            c_value += '; path='+path;
        }
	document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function eraseCookie(c_name) {
    setCookie(c_name,"",-1);
}
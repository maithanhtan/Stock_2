//Drop Down Tabs Menu- Author: Dynamic Drive (http://www.dynamicdrive.com)
//Created: May 16th, 07'

var tabdropdown={
	disappeardelay: 200, //set delay in miliseconds before menu disappears onmouseout
	disablemenuclick: false, //when user clicks on a menu item with a drop down menu, disable menu item's link?
	enableiframeshim: 1, //1 or 0, for true or false

	//No need to edit beyond here////////////////////////
	dropmenuobj: null, ie: document.all, firefox: document.getElementById&&!document.all, previousmenuitem:null,
	currentpageurl: window.location.href.replace("http://"+window.location.hostname, "").replace(/^\//, ""), //get current page url (minus hostname, ie: http://www.dynamicdrive.com/)

	getposOffset:function(what, offsettype){
		var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
		var parentEl=what.offsetParent;
			while (parentEl!=null){
				totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
				parentEl=parentEl.offsetParent;
			}
		return totaloffset;
	},

	showhide:function(obj, e, obj2){ //obj refers to drop down menu, obj2 refers to tab menu item mouse is currently over
		if (this.ie || this.firefox)
			this.dropmenuobj.style.left=this.dropmenuobj.style.top="-500px"
		if (e.type=="click" && obj.visibility==hidden || e.type=="mouseover"){
			if (obj2.parentNode.className.indexOf("default")==-1) //if tab isn't a default selected one
				obj2.parentNode.className="selected"
			obj.visibility="visible"
			}
		else if (e.type=="click")
			obj.visibility="hidden"
	},

	iecompattest:function(){
		return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
	},

	clearbrowseredge:function(obj, whichedge){
		var edgeoffset=0
		if (whichedge=="rightedge"){
			var windowedge=this.ie && !window.opera? this.standardbody.scrollLeft+this.standardbody.clientWidth-15 : window.pageXOffset+window.innerWidth-15
			this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetWidth
		if (windowedge-this.dropmenuobj.x < this.dropmenuobj.contentmeasure)  //move menu to the left?
			edgeoffset=this.dropmenuobj.contentmeasure-obj.offsetWidth
		}
		else{
			var topedge=this.ie && !window.opera? this.standardbody.scrollTop : window.pageYOffset
			var windowedge=this.ie && !window.opera? this.standardbody.scrollTop+this.standardbody.clientHeight-15 : window.pageYOffset+window.innerHeight-18
			this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetHeight
			if (windowedge-this.dropmenuobj.y < this.dropmenuobj.contentmeasure){ //move up?
				edgeoffset=this.dropmenuobj.contentmeasure+obj.offsetHeight
				if ((this.dropmenuobj.y-topedge)<this.dropmenuobj.contentmeasure) //up no good either?
					edgeoffset=this.dropmenuobj.y+obj.offsetHeight-topedge
			}
			this.dropmenuobj.firstlink.style.borderTopWidth=(edgeoffset==0)? 0 : "1px" //Add 1px top border to menu if dropping up
		}
		return edgeoffset
	},

	dropit:function(obj, e, dropmenuID){
		if (this.dropmenuobj!=null){ //hide previous menu
			this.dropmenuobj.style.visibility="hidden" //hide menu
			if (this.previousmenuitem!=null && this.previousmenuitem!=obj){
				if (this.previousmenuitem.parentNode.className.indexOf("default")==-1) //If the tab isn't a default selected one
					this.previousmenuitem.parentNode.className=""
			}
		}
		this.clearhidemenu()
		if (this.ie||this.firefox){
			obj.onmouseout=function(){tabdropdown.delayhidemenu(obj)}
			obj.onclick=function(){return !tabdropdown.disablemenuclick} //disable main menu item link onclick?
			this.dropmenuobj=document.getElementById(dropmenuID)
			this.dropmenuobj.onmouseover=function(){tabdropdown.clearhidemenu()}
			this.dropmenuobj.onmouseout=function(e){tabdropdown.dynamichide(e, obj)}
			this.dropmenuobj.onclick=function(){tabdropdown.delayhidemenu(obj)}
			this.showhide(this.dropmenuobj.style, e, obj)
			this.dropmenuobj.x=this.getposOffset(obj, "left")
			this.dropmenuobj.y=this.getposOffset(obj, "top")
			this.dropmenuobj.style.left=this.dropmenuobj.x-this.clearbrowseredge(obj, "rightedge")+"px"
			this.dropmenuobj.style.top=this.dropmenuobj.y-this.clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+1+"px"
			this.previousmenuitem=obj //remember main menu item mouse moved out from (and into current menu item)
			this.positionshim() //call iframe shim function
		}
	},

	contains_firefox:function(a, b) {
		while (b.parentNode)
		if ((b = b.parentNode) == a)
			return true;
		return false;
	},

	dynamichide:function(e, obj2){ //obj2 refers to tab menu item mouse is currently over
		var evtobj=window.event? window.event : e
		if (this.ie&&!this.dropmenuobj.contains(evtobj.toElement))
			this.delayhidemenu(obj2)
		else if (this.firefox&&e.currentTarget!= evtobj.relatedTarget&& !this.contains_firefox(evtobj.currentTarget, evtobj.relatedTarget))
			this.delayhidemenu(obj2)
	},

	delayhidemenu:function(obj2){
		this.delayhide=setTimeout(function(){tabdropdown.dropmenuobj.style.visibility='hidden'; if (obj2.parentNode.className.indexOf('default')==-1) obj2.parentNode.className=''},this.disappeardelay) //hide menu
	},

	clearhidemenu:function(){
		if (this.delayhide!="undefined")
			clearTimeout(this.delayhide)
	},

	positionshim:function(){ //display iframe shim function
		if (this.enableiframeshim && typeof this.shimobject!="undefined"){
			if (this.dropmenuobj.style.visibility=="visible"){
				this.shimobject.style.width=this.dropmenuobj.offsetWidth+"px"
				this.shimobject.style.height=this.dropmenuobj.offsetHeight+"px"
				this.shimobject.style.left=this.dropmenuobj.style.left
				this.shimobject.style.top=this.dropmenuobj.style.top
			}
		this.shimobject.style.display=(this.dropmenuobj.style.visibility=="visible")? "block" : "none"
		}
	},

	hideshim:function(){
		if (this.enableiframeshim && typeof this.shimobject!="undefined")
			this.shimobject.style.display='none'
	},

isSelected:function(menuurl){
	var menuurl=menuurl.replace("http://"+menuurl.hostname, "").replace(/^\//, "")
	return (tabdropdown.currentpageurl==menuurl)
},

	init:function(menuid, dselected){
		this.standardbody=(document.compatMode=="CSS1Compat")? document.documentElement : document.body //create reference to common "body" across doctypes
		var menuitems=document.getElementById(menuid).getElementsByTagName("a")
		for (var i=0; i<menuitems.length; i++){
			if (menuitems[i].getAttribute("rel")){
				var relvalue=menuitems[i].getAttribute("rel")
				document.getElementById(relvalue).firstlink=document.getElementById(relvalue).getElementsByTagName("a")[0]
				menuitems[i].onmouseover=function(e){
					var event=typeof e!="undefined"? e : window.event
					tabdropdown.dropit(this, event, this.getAttribute("rel"))
				}
			}
			if (dselected=="auto" && typeof setalready=="undefined" && this.isSelected(menuitems[i].href)){
				menuitems[i].parentNode.className+=" selected default"
				var setalready=true
			}
			else if (parseInt(dselected)==i)
				menuitems[i].parentNode.className+=" selected default"
		}
	}

}

/////////////////////////////////////
// Table Header (07-Jan-2005);
// by Vic Phillips http://www.vicsjavascripts.org.uk/FormCompendium/FormCompendium.htm#f50

// As the page is scrolled and while the table is in view
// the first row(header) of the table is retained in view

// Application Notes

// Each table to apply the script must have a unique ID name

// The script is initialised from a <BODY> or window onload event call
// e.g. <body onload="f50InitTableHeader('fred','tom');" >
// where each parameter of the function is the unique ID name of a table to apply the script (string)

// All function, variable names are prefixed with 'f50' to minimise conflicts with other JavaScripts

// The functional Code(1.3k) is best as an external javascript

// Tested with IE6 and Mozilla FireFox


// Functional Code - NO NEED to Change
var f50Ary=new Array();

function f50InitTableHeader(id){
var f50args=f50InitTableHeader.arguments;
var f500,f50t;
for (f500=0;f500<f50args.length;f500++){
f50t=document.getElementById(f50args[f500]);
f50ttrs=f50t.getElementsByTagName('TR');
f50t.trs=[];
for (f501=0;f501<f50ttrs.length;f501++){
f50t.trs.push(f50ttrs[f501]);
}
f50t.hh=f50t.trs[0].offsetHeight;
f50t.trs[0].pn=f50t;
f50Ary.push(f50t);
}
}

function f50CkScroll(){
var f50t,f50o,f501;
if (document.all){ f50t=document.documentElement.scrollTop; }
else if (document.getElementById){ f50t=window.pageYOffset; }
for (f500=0;f500<f50Ary.length;f500++){
if (f50Pos(f50Ary[f500])-f50Ary[f500].hh*2<f50t){
for (f501=1;f501<f50Ary[f500].trs.length;f501++){
if ((f50Pos(f50Ary[f500].trs[f501]))>(f50t+f50Ary[f500].hh)){
if (f50Ary[f500].trs[0].pn==f50Ary[f500]){ f50Ary[f500].trs[0].parentNode.removeChild(f50Ary[f500].trs[0]); }
f50Ary[f500].insertBefore(f50Ary[f500].trs[0],f50Ary[f500].trs[f501]);
break;
}
}
}
}
}

function f50Pos(f50){
f50ObjTop = f50.offsetTop;
while(f50.offsetParent!=null){
f50ObjParent=f50.offsetParent;
f50ObjTop+=f50ObjParent.offsetTop;
f50=f50ObjParent;
}
return f50ObjTop;
}

window.onscroll=f50CkScroll;
//////////////common.js///////////////
/*
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
		}
		else{
			if(c=="."){
				if(state=="H"){
					value+=c;
					state="T";
				}
			}
			else{
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
		}
		else{
			if(c>="0"&&c<="9"){
				value+=c;
			}
		}
	}
	if(_6e.value!=value){
		_6e.value=value;
	}
}


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
function hoverTR2(obj){
	var td = obj.getElementsByTagName("TD");
	for(i=0; i<td.length; i++){
		td[i].setAttribute("style", "background-color:#333");
	}
}

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
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
*/
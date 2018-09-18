window.mainSvg=document.getElementById("mainSvg");
window.sidePanel=document.getElementById("sidePanel");
window.editArea=document.getElementById("editArea");
$(document).ready(function(){
	window.ie=new iEditor($("#mainSvg")[0]);
	$("#uploadPhoto").change(onUploadPhoto);
	$("#sidePanelToggle").click(onSidePanelToggle);
    $("#btnResizeNow").click(btnResizeClick);
    $("#btnCropNow").click(btnCropClick);
    $("#cropModel").on('shown.bs.modal',modelCropShown);
    $("#resizeModel").on('shown.bs.modal',modelResizeShown);
    loadAssets();
});

function modelCropShown(){
    
}
function modelResizeShown(){
    $("#oldHeight").val(Snap(mainSvg).attr("height"))
    $("#oldWidth").val(Snap(mainSvg).attr("width"))
}
function btnCropClick(){
    crop($("#cropX1").val(),$("#cropY1").val(),$("#cropX2").val(),$("#cropY2").val());
    $("#cropModel").modal("hide");
}
function btnResizeClick(){
    resize($("#newHeight").val(),$("#newWidth").val());
    $("#resizeModel").modal("hide");
}

/*action functions*/

function actionCrop(){
    $("#cropModel").modal("show");
}
function actionResize(){
    if(!isLoaded()){
        notie.alert({ text: "Choose photo first", type: 2 });
        return;
    }
    $("#resizeModel").modal("show");
}
function actionClipart(){
    sidePanelOn();

}
function actionFrame(){
    sidePanelOn();
}
function actionText(){
    var pText=prompt("Text to insert");
    ie.addText(pText);
}
function actionDownload(){
    if(!isLoaded()){
        notie.alert({ text: "Choose photo first", type: 2 });
        return;
    } 
    getPngFromSvg($("#mainSvg")[0],mainSvg.height.baseVal.value,mainSvg.width.baseVal.value,function(imgUri){
        triggerDownload(imgUri,"image-ieditor.png");
    });
}
function actionSave(){
    if(!isLoaded()){
        notie.alert({ text: "Choose photo first", type: 2 });
        return;
    } 
    window.user_photo_name=prompt("Enter Name: ",window.user_photo_name);
    getPngFromSvg($("#mainSvg")[0],mainSvg.height.baseVal.value,mainSvg.width.baseVal.value,function(imgUri){
        $.ajax({
            url: "dataModel.aspx",
            type: "POSt",
            data:{
                image: imgUri.replace('data:image/png;base64,', ''),
                user_photo: window.user_photo,
                user_photo_name: window.user_photo_name
            },
            success:function(data){
                console.log(data);
                if(data.indexOf("success") >=0){
                    window.user_photo=data.split(":")[1];
                    alert("saved successfully");
                }
                else{
                    alert("problem in saving image");
                }
                
            },
            error:function(err){
                console.log(err.responseText);
            }
        });
    });    
}
/*action functions*/

function insertClipart(e){
    if(!isLoaded()){
        notie.alert({ text: "Choose photo first", type: 2 });
        return;
    }   
    $("#clipartModel").modal("hide");
    return;
    getDataUri(e.src,function(imgUri){
        //console.log(imgUri);
        window.tSvg=document.createElement("svg");
        Snap(tSvg).image(imgUri,0,0,200,150);
        ie.addSvg(tSvg);
    });
}
function insertFrame(e){
    if(!isLoaded()){
        notie.alert({ text: "Choose photo first", type: 2 });
        return;
    }   
    $("#frameModel").modal("hide");
    return;
    getDataUri(e.src,function(imgUri){
        //console.log(imgUri);
        window.tSvg=document.createElement("svg");
        Snap(tSvg).image(imgUri,0,0,200,150);
        Snap(tSvg).attr({height:500,width:500,viewBox:"0 0 500 500",x:0,y:0});
        ie.addSvg(tSvg);
    });
}
function isLoaded(){
    if($(mainSvg).data("loaded")=="1"){
        return true;
    }
    return false;
}


function loadAssets(){
    $.ajax({
        url: "dataModel.aspx",
        data:{
            listCliparts: "true"
        },
        success:function(data){
            window.allCliparts=JSON.parse(data);
            $("#clipartBody").empty();
            for(c of allCliparts){
                $("#clipartBody").append("<div class='asset-item'><img src='assets/"+c.id+".png' onclick='insertClipart(this)' data-id='"+c.id+"'></div>");
            }
            
        },
        error:function(err){
            console.log(err.responseText);
        }
    });
    $.ajax({
        url: "dataModel.aspx",
        data:{
            listFrames: "true"
        },
        success:function(data){
            window.allFrames=JSON.parse(data);
             $("#frameBody").empty();
            for(c of allFrames){
                $("#frameBody").append("<div class='asset-item'><img src='assets/"+c.id+".png' onclick='insertFrame(this)' data-id='"+c.id+"'></div>");
            }
        },
        error:function(err){
            console.log(err.responseText);
        }
    });
}
function onSidePanelToggle(){
	if(!Boolean($(this).attr("data-on"))){
		sidePanelOn();
	}
	else{
	    sidePanelOff();	
		
	}
	
}
function sidePanelOn(){
    sidePanel.style.right="0px";
	$(this).attr("data-on","true");
}
function sidePanelOff(){
    sidePanel.style.right="-300px";
	$(this).attr("data-on","");
}
function onUploadPhoto(){
	var r=new FileReader();
	r.readAsDataURL(this.files[0]);
	$(this).hide();
	r.onload=function(d){
		var img=document.createElement("img");
		img.src=d.target.result;
		img.onload=function(){
			window.i=img;
		console.log(img.height,img.width)
		ie.addBackgroundImg(d.target.result,img.height,img.width);

		}
		

	}
}
function addText(){
	var pt=prompt("Insert Text");
	if(!pt){
		ie.addText(pt);
	}
	
}
function addFrame(){

}
function crop(x1,y1,x2,y2){
    Snap(mainSvg).attr("viewBox",""+x1+" "+y1+" "+x2+" "+y2);
    resize(x2-x1,y2-y1);
}
function resize(h,w){
    Snap(mainSvg).attr("height",h);
    Snap(mainSvg).attr("width",w);
}

function getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
    };

    image.src = url;
}
function iEditor(currSvg){
	var snap=Snap(currSvg);
	var rectHmdVar=null;
	window.sn=snap;
	var config={addSvgSize: 200};
	var svgs=[];
	var selectedSvg=null;
	var resizing=false;
	var rotating=false;
	var mouseMoveElement=document;

	document.onmouseup=clearMoving;
	currSvg.onclick=currSvgClick;
	function createDivRect(x,y,height,width,isText){
		var rectXY=toRectXY(x,y);
		var rect=document.createElement("div");
		var lineRect=document.createElement("div");
		var roundRectHmd=document.createElement("div");
		var textRectHmd=document.createElement("input");
		rect.id="rectHmd";
		lineRect.id="lineRectHmd";
		roundRectHmd.id="roundRectHmd";
		textRectHmd.id="textRectHmd";
		lineRect.style="background-color:#000000;height:10px;width:10px;position:absolute;bottom:-10px;right:-10px;cursor:nwse-resize";
		rect.style="height: "+width+"px;width: "+height+"px;position: absolute;top: "+rectXY.y+"px;left:"+rectXY.x+"px;border: 1px solid blue;background-color:rgba(255,255,255,0.1)";
		roundRectHmd.style="background-color:#000000;height:10px;width:10px;position:absolute; right:-15px; top:49%;cursor:move;border-radius:10px;";
		textRectHmd.style="position:absolute; top:-26px;";
		rect.appendChild(lineRect);
		if(isText){
			rect.appendChild(textRectHmd);
		}
		rect.appendChild(roundRectHmd);
		//console.log(rect.style);
		currSvg.parentElement.appendChild(rect);
		return rect;
	}
	function moveRect(x,y){
		var t=toRectXY(x,y);
		rectHmdVar.style.left=(rectHmdVar.offsetLeft+x)+"px";
		rectHmdVar.style.top=(rectHmdVar.offsetTop+y)+"px";
	}
	function moveRectTo(x,y){
		var t=toRectXY(x,y);
		rectHmdVar.style.left=(t.x)+"px";
		rectHmdVar.style.top=(t.y)+"px";
	}
	function resizeRect(height,width){
		$(rectHmdVar).height($(rectHmdVar).height()+height);
		$(rectHmdVar).width($(rectHmdVar).width()+width);
	}
	function resizeRectTo(height,width){
		$(rectHmdVar).height(height);
		$(rectHmdVar).width(width);
	}
	function toRectXY(ax,ay){
		//var pos=currSvg.getBoundingClientRect();
		var cx=editArea.offsetLeft+5;
		var cy=editArea.offsetTop+20;
		return {x: cx +ax,y: cy+ay};
	}
	function clearMoving(){
		this.onmousemove=null;
		resizing=false;
		rotating=false;
		mouseMoveElement.onmousemove=null;
		mouseMoveElement=document;
	}
	function clearAllMouseEvents(){
		for(svg of svgs){
			svg.onmousedown=null;
		}
		currSvg.onmousemove=null;
	}
	function setAllMouseEvents(){
		for(svg of svgs){
			svg.onmousedown=svgClick;
			//svg.onmouseenter=svgClick;
		}
	}
	function borderStroke(val){
        return (currSvg.viewBox.baseVal.height/500) * val;
    }
    function toViewBox(unit){
    	return unit;
        return Math.ceil(currSvg.viewBox.baseVal.height*unit/currSvg.height.baseVal.value);
    }
    function getCenter(){
    	var cy=((selectedSvg.height.baseVal.value/2) + selectedSvg.y.baseVal.value);
    	var cx=((selectedSvg.width.baseVal.value/2) + selectedSvg.x.baseVal.value);
    	return{x: cx, y: cy};
    }
    function angle(cx, cy, ex, ey) {
	  var dy = ey - cy;
	  var dx = ex - cx;
	  var theta = Math.atan2(dy, dx); // range (-PI, PI]
	  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
	  if (theta < 0) theta = 360 + theta; // range [0, 360)
	  return theta;
	}
	function currSvgClick(){
    	$(rectHmdVar).remove();
    	selectedSvg=null;
    	//textToolbar.disabled=false;
    	currSvg.parentElement.removeAttribute("contenteditable");
    }
    function svgClick(e){
    	window.ee=e;
    	window.th=this;
    	selectedSvg=this;
    	var isText=false;
    	if(selectedSvg.getAttribute("data-type")!= "25"){
    		//textToolbar.disabled=true;
    	}
    	else{
    		//textToolbar.disabled=false;
    		isText=true;
    		//currSvg.parentElement.setAttribute("contenteditable","");
    	}
    	//selectedSvg.onmouseup=clearMoving;

        if($(this).find("#rectHmd").length==0){
        	console.log("do");
        	if(rectHmdVar){
        		$(rectHmdVar).remove();
        	}
            rectHmdVar=createDivRect(this.x.baseVal.value,this.y.baseVal.value,this.width.baseVal.value,this.height.baseVal.value,isText);
            if(selectedSvg.rt){
            	//console.log("tt");
            	rectHmdVar.style.transform="rotate("+selectedSvg.rt+"deg)";
            }


            lineRectHmd=$(rectHmdVar).find("#lineRectHmd")[0];
            roundRectHmd=$(rectHmdVar).find("#roundRectHmd")[0];
            lineRectHmd.onmousedown=function(){
            	resizing=true;
            }
            roundRectHmd.onmousedown=function(){
            	rotating=true;
            	mouseMoveElement=currSvg;
            }
            if(isText){
            	var textRectHmd=$(rectHmdVar).find("#textRectHmd")[0];
            	textRectHmd.oninput=textRectHmdInputEvent;
				var t=$(selectedSvg).find("text");
    			textRectHmd.value=t.text();
            }
            rectHmdVar.onmousedown=rectHmdMouseDown;
            
        }
        //currSvg.onmousemove=svgMouseMove;
    }
    function rectHmdMouseDown(e){
    	e.stopPropagation();
    	selectedSvg.focus();
    	mouseMoveElement.onmousemove=svgMouseMove;
    }
    function textRectHmdInputEvent(e){
    	iEditor.prototype.setSelectedText(this.value);
    }
    function svgMouseMove(e){
    	var xNow=toViewBox(e.movementX);
    	var yNow=toViewBox(e.movementY);
    	//console.log(e);
    	window.ee=e;
    	var c=getCenter();
    	//console.log(rectHmdVar);
        if(resizing){
            selectedSvg.height.baseVal.value+=yNow;
            selectedSvg.width.baseVal.value+=xNow;
            resizeRectTo(selectedSvg.height.baseVal.value,selectedSvg.width.baseVal.value);
            if(selectedSvg.rt){
            	selectedSvg.parentElement.setAttribute("transform","rotate("+selectedSvg.rt+","+c.x+","+c.y+")");
            }
        }
        else if(rotating){
        	var c=getCenter();
        	//console.log("deg",angle(c.x,c.y,e.offsetX,e.offsetY));
        	var cx=editArea.offsetLeft;
    		var cy=editArea.offsetTop;
        	var rt=Math.ceil(angle(c.x,c.y,e.offsetX ,e.offsetY));
        	iEditor.prototype.rotateSelected(rt);
        }
        else{
        	//console.log(toViewBox(e.movementX) + " "+ e.movementX);
            selectedSvg.x.baseVal.value+= Math.ceil(xNow);
            selectedSvg.y.baseVal.value+= Math.ceil(yNow);
            moveRectTo(selectedSvg.x.baseVal.value,selectedSvg.y.baseVal.value);
            if(selectedSvg.rt){
            	selectedSvg.parentElement.setAttribute("transform","rotate("+selectedSvg.rt+","+c.x+","+c.y+")");
            }
        }
    }


	iEditor.prototype.addBackgroundImg=function(src,height,width){
		$(currSvg).data("loaded","1");
        window.te=snap.image(src,0,0,width,height);
		snap.attr({viewBox:"0 0 "+width+" "+height,height:height,width:width});
	}
    iEditor.prototype.addImg=function(src,height,width){
		var g=Snap(currSvg).g();
        var te=snap.image(src,0,0,width,height);
    	g.node.appendChild(te)
		svgs.push(te);
		setAllMouseEvents();
	}
	iEditor.prototype.addSvg=function(svg){
    	svg.removeAttribute("id");
    	svg.removeAttribute("xmlns");
    	svg.setAttribute("preserveAspectRatio","none");
    	var g=Snap(currSvg).g();
    	g.node.appendChild(svg)
		svgs.push(svg);
		setAllMouseEvents();
    }
	iEditor.prototype.addText1=function(text){
		
		var cSvg=snap.svg(400,400,50,50,0,0,500,60);
		window.txt=cSvg.text(0,45,text).attr({"font-size":"50","id":"txtHmd","font-family":"LKLUG"});
		txt.node.style.cursor="pointer";
		cSvg.node.width.baseVal.value=txt.getBBox().width;
		cSvg.node.height.baseVal.value=txt.getBBox().height;
		cSvg.attr({viewBox: "0 0 "+txt.getBBox().width+" 60","preserveAspectRatio":"none","data-type":"25"});
		svgs.push(cSvg.node);
		//setAllMouseEvents();
	}



	iEditor.prototype.allSvgs=function(){
		return svgs;
	}
	iEditor.prototype.deleteSelected=function(){
		if(selectedSvg){
			selectedSvg.remove();
		}
		currSvgClick();
	}
	iEditor.prototype.selected=function(){
		return selectedSvg;
	}	
	iEditor.prototype.selectedMoveTop=function(){
		if(selectedSvg){
			if($(currSvg).children("g").length >1){
				if($(selectedSvg).parent().next("g").length == 1){
					$(selectedSvg).parent().next("g").after($(selectedSvg).parent());
				}
			}
		}
	}	
	iEditor.prototype.selectedMoveBottom=function(){
		if(selectedSvg){
			if($(currSvg).children("g").length >1){
				if($(selectedSvg).parent().prev("g").length == 1){
					$(selectedSvg).parent().prev("g").before($(selectedSvg).parent());
				}
			}
		}
	}
	iEditor.prototype.rectHmdVar=function(){
		return rectHmdVar;
	}
	
    iEditor.prototype.addSvgData=function(svgData){
    	var temp=document.createElement("div");
    	temp.innerHTML=svgData;
    	var svg=temp.getElementsByTagName("svg")[0];
    	svg.removeAttribute("id");
    	svg.removeAttribute("xmlns");
    	svg.setAttribute("preserveAspectRatio","none");
    	var g=Snap(currSvg).g();
    	g.node.appendChild(svg)
		//currSvg.appendChild(svg);
		svgs.push(svg);
		setAllMouseEvents();
    }
    iEditor.prototype.clearEvents=function(){
    	clearAllMouseEvents();
    }
    iEditor.prototype.setEvents=function(){
    	setAllMouseEvents();
    }
    iEditor.prototype.rotateSelected=function(deg){
    	if(!rectHmd){
    		return;
    	}
    	var c=getCenter();
    	rectHmd.style.transform="rotate("+deg+"deg)";
    	selectedSvg.parentElement.setAttribute("transform","rotate("+deg+","+c.x+","+c.y+")");
    	selectedSvg.rt=deg;
    }
    iEditor.prototype.setSelectedText=function(text){
    	var t=$(selectedSvg).find("text");
    	t.text(text);
    	setTimeout(function(){
    		var tp=t.parent()[0];
    		tp.width.baseVal.value=t[0].getBBox().width;
    		t.parent().attr({viewBox: "0 0 "+t[0].getBBox().width+" 60"});
    		resizeRectTo(selectedSvg.height.baseVal.value,selectedSvg.width.baseVal.value);
    	},100);
    }
    iEditor.prototype.addText=function(text){
    	var g=Snap(currSvg).g();
    	var cSvg=g.svg(0,0,50,50,0,0,500,60);
    	window.txt=cSvg.text(0,45,text).attr({"font-size":"50","id":"txtHmd","font-family":"LKLUG"});
    	txt.node.style.cursor="pointer";
    	cSvg.node.width.baseVal.value=txt.getBBox().width;
    	cSvg.node.height.baseVal.value=txt.getBBox().height;
    	cSvg.attr({viewBox: "0 0 "+txt.getBBox().width+" 60","preserveAspectRatio":"none","data-type":"25"});
		svgs.push(cSvg.node);
		setAllMouseEvents();
    }
    iEditor.prototype.addTextAsDiv=function(text){
    	var txt=document.createElementNS("http://www.w3.org/2000/svg","foreignObject");
    	txt.id="tHmd";
    	var txtDiv=document.createElement("div");
    	txtDiv.setAttribute("contenteditable","");
    	txtDiv.style.fontSize="50px";
    	txtDiv.innerHTML=text;
    	txt.appendChild(txtDiv);
    	var g=Snap(currSvg).g();
    	//var cSvg=g.svg(400,400,50,50,0,0,500,60);
    	//window.txt=cSvg.text(0,45,text).attr({"font-size":"50","id":"txtHmd","font-family":"LKLUG"});
    	//cSvg.node.appendChild(txt);
    	txt.style.cursor="pointer";
    	//cSvg.node.width.baseVal.value=txt.getBBox().width;
    	//cSvg.node.height.baseVal.value=txt.getBBox().height;
    	//cSvg.attr({viewBox: "0 0 "+txt.getBBox().width+" 60","preserveAspectRatio":"none","data-type":"25"});
    	Snap(txt).attr({x:400,y:400,height:50,width:100});
    	g.node.appendChild(txt);
		svgs.push(txt);
		setAllMouseEvents();
    }
    iEditor.prototype.setSelectedFont=function(fontName){
    	var t=Snap($(selectedSvg).find("text")[0]);
    	t.attr("font-family", fontName);
    	setTimeout(function(){
    		t.parent().attr({viewBox: "0 0 "+t.getBBox().width+" 60"});
    	},100);
    }
    iEditor.prototype.setOpacity=function(per){
    	Snap(selectedSvg).attr("opacity",per/100);
    }    
    iEditor.prototype.getOpacity=function(){
    	return Snap(selectedSvg).attr("opacity")*100;
    }
    iEditor.prototype.setSelectedColor=function(cl){
    	var t=$(selectedSvg).find("text").attr("fill", cl);

    }
    iEditor.prototype.makeCopy=function(){
    	if(selectedSvg){
    		window.t=selectedSvg.cloneNode(true);
    		iEditor.prototype.addSvg(t);
    		selectedSvg.x.baseVal.value+= 20;
            selectedSvg.y.baseVal.value+= 20;
    	}
    }
    
}

function getPngFromSvg(currSvg,h,w,onDone){
	var newSvg=currSvg.cloneNode(true);
	var pngCanvas=document.createElement("canvas");
	window.can=pngCanvas;
	newSvg.setAttribute("height",h+"px");
	newSvg.setAttribute("width",w+"px");
	pngCanvas.setAttribute("height",h+"px");
	pngCanvas.setAttribute("width",w+"px");
	var svgString = new XMLSerializer().serializeToString(newSvg);
    var ctx = pngCanvas.getContext("2d");
    var DOMURL = self.URL || self.webkitURL || self;
    var img = new Image();
    var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
    var url = DOMURL.createObjectURL(svg);
    img.src = url;
    img.onload=function(){
    	ctx.drawImage(img, 0, 0);
    	var png = pngCanvas.toDataURL("image/png");
    	DOMURL.revokeObjectURL(url);
    	onDone(png);
    }
}

function triggerDownload (imgURI,name) {
    var evt = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: true
    });

    var a = document.createElement('a');
    a.setAttribute('download', name+'.png');
    a.setAttribute('href', imgURI);
    a.setAttribute('target', '_blank');
    a.dispatchEvent(evt);
}
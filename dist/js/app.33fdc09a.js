(function(t){function e(e){for(var n,r,o=e[0],c=e[1],h=e[2],l=0,d=[];l<o.length;l++)r=o[l],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&d.push(i[r][0]),i[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(d.length)d.shift()();return s.push.apply(s,h||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],n=!0,o=1;o<a.length;o++){var c=a[o];0!==i[c]&&(n=!1)}n&&(s.splice(e--,1),t=r(r.s=a[0]))}return t}var n={},i={app:0},s=[];function r(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=n,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(a,n,function(e){return t[e]}.bind(null,n));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var h=0;h<o.length;h++)e(o[h]);var u=c;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},"0d11":function(t,e,a){},"1e09":function(t,e,a){},"59bf":function(t,e,a){},cd49:function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),i=a("5f5b"),s=(a("1e09"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"vh-100",attrs:{id:"app"}},[a("b-tabs",{staticClass:"full-height-tabs",attrs:{pills:"",card:"","nav-wrapper-class":"bg-dark rounded-0"}},[a("b-tab",{staticClass:"p-0",attrs:{title:"Лаб 0",active:"","title-link-class":"text-white"}},[a("lab0")],1),a("b-tab",{staticClass:"p-0",attrs:{title:"Лаб 1","title-link-class":"text-white"}},[a("lab1")],1)],1)],1)}),r=[],o=a("d4ec"),c=a("262e"),h=a("2caf"),u=a("9ab4"),l=a("1b40"),d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",{staticClass:"h-100",attrs:{fluid:""}},[a("b-row",{staticClass:"h-100"},[a("b-col",{staticClass:"h-100 p-3"},[a("h6",[t._v("Current canvas size is "+t._s(t.currentCanvasWidth)+"X"+t._s(t.currentCanvasHeight)+"px")]),a("b-form-group",[a("b-input-group",{attrs:{prepend:"Height",append:"px",size:"sm"}},[a("b-form-input",{attrs:{type:"number",min:"0",step:"1"},model:{value:t.newCanvasHeight,callback:function(e){t.newCanvasHeight=e},expression:"newCanvasHeight"}})],1)],1),a("b-form-group",[a("b-input-group",{attrs:{prepend:"Width",append:"px",size:"sm"}},[a("b-form-input",{attrs:{type:"number",min:"0",step:"1"},model:{value:t.newCanvasWidth,callback:function(e){t.newCanvasWidth=e},expression:"newCanvasWidth"}})],1)],1),a("b-form-group",[a("b-button",{attrs:{size:"sm"},on:{click:t.resizeCanvas}},[t._v("Resize canvas")])],1),a("b-form-group",[a("b-form-file",{attrs:{accept:"image/jpeg, image/png",size:"sm"},model:{value:t.imgFile,callback:function(e){t.imgFile=e},expression:"imgFile"}})],1),a("b-form-group",[a("b-button",{attrs:{size:"sm"},on:{click:t.drawImage}},[t._v("Draw image")])],1),a("b-form-group",[a("b-button",{attrs:{size:"sm"},on:{click:t.saveImage}},[t._v("Save image")])],1),a("b-form-group",[a("b-button",{attrs:{size:"sm"},on:{click:t.invertColors}},[t._v("Invert colors")])],1),a("b-form-group",[a("b-button",{attrs:{size:"sm"},on:{click:t.drawRandomLine}},[t._v("Draw random line")])],1)],1),a("b-col",{staticClass:"h-100 bg-secondary canvas-container",attrs:{cols:"9"}},[a("canvas",{attrs:{id:t.canvasId}})])],1)],1)},v=[],g=a("3835"),p=a("bee2");a("b0c0"),a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("25eb"),a("a9e3");function b(t,e){var a=document.createElement("a");a.download=e,a.href=URL.createObjectURL(t),a.click(),URL.revokeObjectURL(a.href)}function f(t,e){var a=t-.5+Math.random()*(e-t+1);return Math.round(a)}function m(t,e,a){for(var n=new Array(t),i=0;i<t;i++)n[i]=f(e[i],a[i]);return n}var C=function(t){Object(c["a"])(a,t);var e=Object(h["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.canvasId="lab0-canvas",t.imgFile=null,t.currentCanvasWidth=500,t.currentCanvasHeight=500,t.newCanvasWidth=500,t.newCanvasHeight=500,t.newSizeChanged=!1,t}return Object(p["a"])(a,[{key:"canvas",get:function(){return document.getElementById(this.canvasId)}},{key:"drawImage",value:function(){var t=this;if(this.imgFile){console.log("drawImage",{imageName:this.imgFile.name,size:this.imgFile.size});var e=new Image;e.src=URL.createObjectURL(this.imgFile),e.onload=function(){var a=t.canvas,n=a.getContext("2d");t.newCanvasWidth=t.currentCanvasWidth=a.width=e.width,t.newCanvasHeight=t.currentCanvasHeight=a.height=e.height,t.newSizeChanged=!1,n.fillStyle="white",n.fillRect(0,0,e.width,e.height),n.drawImage(e,0,0),URL.revokeObjectURL(e.src)}}}},{key:"saveImage",value:function(){console.log("saveImage");var t=this.canvas;t.toBlob((function(t){t&&b(t,"CG result")}))}},{key:"onNewCanvasWidthChanged",value:function(){this.newSizeChanged=!0}},{key:"onNewCanvasHeightChanged",value:function(){this.newSizeChanged=!0}},{key:"resizeCanvas",value:function(){console.log("resizeCanvas",{Height:this.newCanvasHeight,Width:this.newCanvasWidth});var t="number"!==typeof this.newCanvasHeight?Number.parseInt(this.newCanvasHeight):this.newCanvasHeight,e="number"!==typeof this.newCanvasWidth?Number.parseInt(this.newCanvasWidth):this.newCanvasWidth,a=document.getElementById(this.canvasId);this.currentCanvasHeight=a.height=t,this.currentCanvasWidth=a.width=e,this.newSizeChanged=!1;var n=a.getContext("2d");n.fillStyle="white",n.fillRect(0,0,e,t)}},{key:"invertColors",value:function(){for(var t=this.canvas,e=t.getContext("2d"),a=e.getImageData(0,0,t.width,t.height),n=0;n<a.data.length;n+=4)a.data[n]=255-a.data[n],a.data[n+1]=255-a.data[n+1],a.data[n+2]=255-a.data[n+2],a.data[n+3]=255;e.putImageData(a,0,0)}},{key:"drawRandomLine",value:function(){var t=this.canvas,e=t.getContext("2d"),a=f(1,10),n=m(2,[0,0],[this.currentCanvasWidth,this.currentCanvasHeight]),i=Object(g["a"])(n,2),s=i[0],r=i[1];e.beginPath(),e.moveTo(s,r);for(var o=0;o<a;o++){var c=m(2,[0,0],[this.currentCanvasWidth,this.currentCanvasHeight]),h=Object(g["a"])(c,2);s=h[0],r=h[1],e.lineTo(s,r)}e.stroke()}},{key:"mounted",value:function(){console.log("mounted",{Height:this.currentCanvasHeight,Width:this.currentCanvasWidth,this:this});var t=document.getElementById(this.canvasId),e=t.getContext("2d");t.height=this.currentCanvasHeight,t.width=this.currentCanvasWidth;var a=e.createRadialGradient(this.currentCanvasWidth/2,this.currentCanvasHeight/2,5,this.currentCanvasWidth/2,this.currentCanvasHeight/2,100);a.addColorStop(0,"red"),a.addColorStop(1,"white"),e.fillStyle=a,e.fillRect(0,0,this.currentCanvasWidth,this.currentCanvasHeight)}}]),a}(l["b"]);Object(u["a"])([Object(l["c"])("newCanvasHeight")],C.prototype,"onNewCanvasWidthChanged",null),Object(u["a"])([Object(l["c"])("newCanvasWidth")],C.prototype,"onNewCanvasHeightChanged",null),C=Object(u["a"])([l["a"]],C);var w=C,y=w,k=(a("ee53"),a("2877")),j=Object(k["a"])(y,d,v,!1,null,"9bd90aa8",null),I=j.exports,O=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",{staticClass:"h-100",attrs:{fluid:""}},[a("b-row",{staticClass:"h-100"},[a("b-col",{staticClass:"h-100 p-3"},[a("b-form-group",[a("b-input-group",{attrs:{prepend:"(x, y):",size:"sm"}},[a("b-form-input",{attrs:{type:"number",min:"5",step:"1"},model:{value:t.newCanvasHeight,callback:function(e){t.newCanvasHeight=e},expression:"newCanvasHeight"}}),a("b-form-input",{attrs:{type:"number",min:"5",step:"1"},model:{value:t.newCanvasWidth,callback:function(e){t.newCanvasWidth=e},expression:"newCanvasWidth"}}),a("b-input-group-append",[a("b-input-group-text",[t._v("px")]),a("b-button",{attrs:{variant:t.newSizeChanged?"primary":"secondary"},on:{click:t.resizeCanvas}},[t._v("Обновить")])],1)],1)],1),a("b-form-group",[a("b-form-file",{attrs:{accept:"image/jpeg, image/png",size:"sm",placeholder:"Изображение для фона не выбрано","drop-placeholder":"Отпустите здесь","browse-text":"Выбрать"},model:{value:t.backgroundImageFile,callback:function(e){t.backgroundImageFile=e},expression:"backgroundImageFile"}})],1),a("b-form-group",[a("b-button",{attrs:{disabled:!t.points.length,variant:"danger",size:"sm"},on:{click:t.deletePoints}},[t._v(" Удалить точки ")])],1),a("b-form-group",[a("b-button",{attrs:{size:"sm"},on:{click:t.saveImage}},[t._v("Сохранить изображение")])],1)],1),a("b-col",{staticClass:"h-100 bg-secondary canvas-container",attrs:{cols:"9"}},[a("canvas",{attrs:{id:t.canvasId},on:{click:t.addPoint}})])],1)],1)},x=[],H=a("b85c"),W=(a("c35a"),function(){function t(e,a){Object(o["a"])(this,t),this.x=e,this.y=a}return Object(p["a"])(t,[{key:"length",get:function(){return Math.sqrt(this.x*this.x+this.y*this.y)}},{key:"add",value:function(t){return this.x+=t.x,this.y+=t.y,this}},{key:"subtract",value:function(t){return this.x-=t.x,this.y-=t.y,this}},{key:"multiply",value:function(t){return this.x*=t,this.y*=t,this}},{key:"divide",value:function(t){return this.x/=t,this.y/=t,this}},{key:"copy",get:function(){return console.log("copy vector",{x:this.x,y:this.y}),new t(this.x,this.y)}}]),t}()),z=function(t){Object(c["a"])(a,t);var e=Object(h["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.canvasId="lab1-canvas",t.backgroundImageFile=null,t.backgroundImage=null,t.imageIsLoaded=!1,t.points=[],t.currentCanvasWidth=500,t.currentCanvasHeight=500,t.newCanvasWidth=500,t.newCanvasHeight=500,t.newSizeChanged=!1,t}return Object(p["a"])(a,[{key:"canvas",get:function(){return document.getElementById(this.canvasId)}},{key:"onBackgroundImageFileChanged",value:function(t){var e=this;if(console.log("BackgroundImageChanged",{Name:null===t||void 0===t?void 0:t.name,Size:null===t||void 0===t?void 0:t.size}),this.imageIsLoaded&&URL.revokeObjectURL(this.backgroundImage.src),this.imageIsLoaded=!1,this.backgroundImage=null,t){var a=new Image;this.backgroundImage=a,a.src=URL.createObjectURL(t),a.onload=function(){console.log("image loaded",{name:t.name}),e.backgroundImage===a?(e.imageIsLoaded=!0,e.redraw()):URL.revokeObjectURL(a.src)}}else this.redraw()}},{key:"redraw",value:function(){this.drawBackground();var t,e=Object(H["a"])(this.points);try{for(e.s();!(t=e.n()).done;){var a=t.value;this.drawPoint(a)}}catch(n){e.e(n)}finally{e.f()}this.drawSpline()}},{key:"drawBackground",value:function(){console.log("Draw background");var t=this.canvas,e=t.getContext("2d");e.fillStyle="white",e.fillRect(0,0,this.currentCanvasWidth,this.currentCanvasHeight),this.imageIsLoaded&&e.drawImage(this.backgroundImage,0,0,this.backgroundImage.width,this.backgroundImage.height,0,0,t.width,t.height)}},{key:"drawPoint",value:function(t){var e=5,a="red",n=this.canvas.getContext("2d");n.strokeStyle=a,n.beginPath(),n.arc(t.x,t.y,e,0,2*Math.PI,!1),n.closePath(),n.stroke()}},{key:"drawSpline",value:function(){if(!(this.points.length<2)){var t=this.calculateAnchorPoints(),e=this.canvas.getContext("2d");e.strokeStyle="black",e.beginPath(),e.moveTo(this.points[0].x,this.points[0].y);for(var a=0;a<t.length;a++)e.bezierCurveTo(t[a][0].x,t[a][0].y,t[a][1].x,t[a][1].y,this.points[a+1].x,this.points[a+1].y);e.stroke()}}},{key:"addPoint",value:function(t){var e=this.canvas,a=e.getBoundingClientRect(),n=t.clientX-a.left,i=t.clientY-a.top,s=new W(n,i);this.points.push(s),console.log("point was added",{x:n,y:i}),this.redraw()}},{key:"deletePoints",value:function(){this.points=[],this.redraw()}},{key:"calculateAnchorPoints",value:function(){if(this.points.length<2)return[];var t=new Array(this.points.length-1),e=this.points[1].copy.add(this.points[0]).divide(2),a=this.points[1].copy.subtract(this.points[0]).length;t[0]=[this.points[0].copy,this.points[1].copy];for(var n=2;n<this.points.length;n++){var i=this.points[n].copy.add(this.points[n-1]).divide(2),s=this.points[n].copy.subtract(this.points[n-1]).length,r=i.copy.subtract(e).multiply(a/s/2);t[n-2][1].subtract(r),t[n-1]=[t[n-2][1].copy.add(i).subtract(e),this.points[n].copy],e=i,a=s}return t}},{key:"saveImage",value:function(){console.log("saveImage");var t=this.canvas;t.toBlob((function(t){t&&b(t,"CG result")}))}},{key:"onNewCanvasWidthChanged",value:function(){this.newSizeChanged=!0}},{key:"onNewCanvasHeightChanged",value:function(){this.newSizeChanged=!0}},{key:"resizeCanvas",value:function(){console.log("resizeCanvas",{Height:this.newCanvasHeight,Width:this.newCanvasWidth});var t,e="number"!==typeof this.newCanvasHeight?Number.parseFloat(this.newCanvasHeight):this.newCanvasHeight,a="number"!==typeof this.newCanvasWidth?Number.parseFloat(this.newCanvasWidth):this.newCanvasWidth,n=a/this.currentCanvasWidth,i=e/this.currentCanvasHeight,s=Object(H["a"])(this.points);try{for(s.s();!(t=s.n()).done;){var r=t.value;r.x*=n,r.y*=i}}catch(c){s.e(c)}finally{s.f()}var o=this.canvas;this.currentCanvasHeight=o.height=e,this.currentCanvasWidth=o.width=a,this.newSizeChanged=!1,this.redraw()}},{key:"mounted",value:function(){console.log("mounted",{Height:this.currentCanvasHeight,Width:this.currentCanvasWidth,this:this});var t=this.canvas;t.height=this.currentCanvasHeight,t.width=this.currentCanvasWidth,this.redraw()}}]),a}(l["b"]);Object(u["a"])([Object(l["c"])("backgroundImageFile")],z.prototype,"onBackgroundImageFileChanged",null),Object(u["a"])([Object(l["c"])("newCanvasHeight")],z.prototype,"onNewCanvasWidthChanged",null),Object(u["a"])([Object(l["c"])("newCanvasWidth")],z.prototype,"onNewCanvasHeightChanged",null),z=Object(u["a"])([l["a"]],z);var S=z,_=S,L=(a("f0d3"),Object(k["a"])(_,O,x,!1,null,"f7042e48",null)),R=L.exports,P=function(t){Object(c["a"])(a,t);var e=Object(h["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return a}(l["b"]);P=Object(u["a"])([Object(l["a"])({components:{Lab1:R,Lab0:I}})],P);var F=P,N=F,U=Object(k["a"])(N,s,r,!1,null,null,null),B=U.exports;n["default"].config.productionTip=!1,n["default"].use(i["a"]),new n["default"]({render:function(t){return t(B)}}).$mount("#app")},ee53:function(t,e,a){"use strict";a("59bf")},f0d3:function(t,e,a){"use strict";a("0d11")}});
//# sourceMappingURL=app.33fdc09a.js.map
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  UserPlus, ShieldCheck, Search, Mail, Download, CheckCircle2, Users,
  AlertCircle, Loader2, RotateCcw, QrCode, Printer, Trash2, Plus,
  LayoutDashboard, UsersRound, ClipboardList, Settings, X,
} from "lucide-react";
import { supabase } from "./supabaseClient";

// ---------- embedded QR encoder (kazuhikoarase/qrcode-generator, MIT) ----------
var qrcode=(function(){var N=function(x,w){var g=236,l=17,n=x,s=O[w],t=null,r=0,h=null,i=[],v={},_=function(a,f){r=n*4+17,t=(function(e){for(var u=new Array(e),o=0;o<e;o+=1){u[o]=new Array(e);for(var d=0;d<e;d+=1)u[o][d]=null}return u})(r),B(0,0),B(r-7,0),B(0,r-7),E(),b(),m(a,f),n>=7&&I(a),h==null&&(h=nr(n,s,i)),U(h,f)},B=function(a,f){for(var e=-1;e<=7;e+=1)if(!(a+e<=-1||r<=a+e))for(var u=-1;u<=7;u+=1)f+u<=-1||r<=f+u||(0<=e&&e<=6&&(u==0||u==6)||0<=u&&u<=6&&(e==0||e==6)||2<=e&&e<=4&&2<=u&&u<=4?t[a+e][f+u]=!0:t[a+e][f+u]=!1)},y=function(){for(var a=0,f=0,e=0;e<8;e+=1){_(!0,e);var u=k.getLostPoint(v);(e==0||a>u)&&(a=u,f=e)}return f},b=function(){for(var a=8;a<r-8;a+=1)t[a][6]==null&&(t[a][6]=a%2==0);for(var f=8;f<r-8;f+=1)t[6][f]==null&&(t[6][f]=f%2==0)},E=function(){for(var a=k.getPatternPosition(n),f=0;f<a.length;f+=1)for(var e=0;e<a.length;e+=1){var u=a[f],o=a[e];if(t[u][o]==null)for(var d=-2;d<=2;d+=1)for(var A=-2;A<=2;A+=1)d==-2||d==2||A==-2||A==2||d==0&&A==0?t[u+d][o+A]=!0:t[u+d][o+A]=!1}},I=function(a){for(var f=k.getBCHTypeNumber(n),e=0;e<18;e+=1){var u=!a&&(f>>e&1)==1;t[Math.floor(e/3)][e%3+r-8-3]=u}for(var e=0;e<18;e+=1){var u=!a&&(f>>e&1)==1;t[e%3+r-8-3][Math.floor(e/3)]=u}},m=function(a,f){for(var e=s<<3|f,u=k.getBCHTypeInfo(e),o=0;o<15;o+=1){var d=!a&&(u>>o&1)==1;o<6?t[o][8]=d:o<8?t[o+1][8]=d:t[r-15+o][8]=d}for(var o=0;o<15;o+=1){var d=!a&&(u>>o&1)==1;o<8?t[8][r-o-1]=d:o<9?t[8][15-o-1+1]=d:t[8][15-o-1]=d}t[r-8][8]=!a},U=function(a,f){for(var e=-1,u=r-1,o=7,d=0,A=k.getMaskFunction(f),p=r-1;p>0;p-=2)for(p==6&&(p-=1);;){for(var T=0;T<2;T+=1)if(t[u][p-T]==null){var C=!1;d<a.length&&(C=(a[d]>>>o&1)==1);var c=A(u,p-T);c&&(C=!C),t[u][p-T]=C,o-=1,o==-1&&(d+=1,o=7)}if(u+=e,u<0||r<=u){u-=e,e=-e;break}}},H=function(a,f){for(var e=0,u=0,o=0,d=new Array(f.length),A=new Array(f.length),p=0;p<f.length;p+=1){var T=f[p].dataCount,C=f[p].totalCount-T;u=Math.max(u,T),o=Math.max(o,C),d[p]=new Array(T);for(var c=0;c<d[p].length;c+=1)d[p][c]=255&a.getBuffer()[c+e];e+=T;var P=k.getErrorCorrectPolynomial(C),R=K(d[p],P.getLength()-1),j=R.mod(P);A[p]=new Array(P.getLength()-1);for(var c=0;c<A[p].length;c+=1){var X=c+j.getLength()-A[p].length;A[p][c]=X>=0?j.getAt(X):0}}for(var Z=0,c=0;c<f.length;c+=1)Z+=f[c].totalCount;for(var J=new Array(Z),Q=0,c=0;c<u;c+=1)for(var p=0;p<f.length;p+=1)c<d[p].length&&(J[Q]=d[p][c],Q+=1);for(var c=0;c<o;c+=1)for(var p=0;p<f.length;p+=1)c<A[p].length&&(J[Q]=A[p][c],Q+=1);return J},nr=function(a,f,e){for(var u=Y.getRSBlocks(a,f),o=G(),d=0;d<e.length;d+=1){var A=e[d];o.put(A.getMode(),4),o.put(A.getLength(),k.getLengthInBits(A.getMode(),a)),A.write(o)}for(var p=0,d=0;d<u.length;d+=1)p+=u[d].dataCount;if(o.getLengthInBits()>p*8)throw"code length overflow. ("+o.getLengthInBits()+">"+p*8+")";for(o.getLengthInBits()+4<=p*8&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(!1);for(;!(o.getLengthInBits()>=p*8||(o.put(g,8),o.getLengthInBits()>=p*8));)o.put(l,8);return H(o,u)};v.addData=function(a,f){f=f||"Byte";var e=null;switch(f){case"Numeric":e=$(a);break;case"Alphanumeric":e=W(a);break;case"Byte":e=V(a);break;case"Kanji":e=q(a);break;default:throw"mode:"+f}i.push(e),h=null},v.isDark=function(a,f){if(a<0||r<=a||f<0||r<=f)throw a+","+f;return t[a][f]},v.getModuleCount=function(){return r},v.make=function(){if(n<1){for(var a=1;a<40;a++){for(var f=Y.getRSBlocks(a,s),e=G(),u=0;u<i.length;u++){var o=i[u];e.put(o.getMode(),4),e.put(o.getLength(),k.getLengthInBits(o.getMode(),a)),o.write(e)}for(var d=0,u=0;u<f.length;u++)d+=f[u].dataCount;if(e.getLengthInBits()<=d*8)break}n=a}_(!1,y())},v.createTableTag=function(a,f){a=a||2,f=typeof f>"u"?a*4:f;var e="";e+='<table style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: "+f+"px;",e+='">',e+="<tbody>";for(var u=0;u<v.getModuleCount();u+=1){e+="<tr>";for(var o=0;o<v.getModuleCount();o+=1)e+='<td style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: 0px;",e+=" width: "+a+"px;",e+=" height: "+a+"px;",e+=" background-color: ",e+=v.isDark(u,o)?"#000000":"#ffffff",e+=";",e+='"/>';e+="</tr>"}return e+="</tbody>",e+="</table>",e},v.createSvgTag=function(a,f,e,u){var o={};typeof arguments[0]=="object"&&(o=arguments[0],a=o.cellSize,f=o.margin,e=o.alt,u=o.title),a=a||2,f=typeof f>"u"?a*4:f,e=typeof e=="string"?{text:e}:e||{},e.text=e.text||null,e.id=e.text?e.id||"qrcode-description":null,u=typeof u=="string"?{text:u}:u||{},u.text=u.text||null,u.id=u.text?u.id||"qrcode-title":null;var d=v.getModuleCount()*a+f*2,A,p,T,C,c="",P;for(P="l"+a+",0 0,"+a+" -"+a+",0 0,-"+a+"z ",c+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',c+=o.scalable?"":' width="'+d+'px" height="'+d+'px"',c+=' viewBox="0 0 '+d+" "+d+'" ',c+=' preserveAspectRatio="xMinYMin meet"',c+=u.text||e.text?' role="img" aria-labelledby="'+F([u.id,e.id].join(" ").trim())+'"':"",c+=">",c+=u.text?'<title id="'+F(u.id)+'">'+F(u.text)+"</title>":"",c+=e.text?'<description id="'+F(e.id)+'">'+F(e.text)+"</description>":"",c+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',c+='<path d="',T=0;T<v.getModuleCount();T+=1)for(C=T*a+f,A=0;A<v.getModuleCount();A+=1)v.isDark(T,A)&&(p=A*a+f,c+="M"+p+","+C+P);return c+='" stroke="transparent" fill="black"/>',c+="</svg>",c},v.createDataURL=function(a,f){a=a||2,f=typeof f>"u"?a*4:f;var e=v.getModuleCount()*a+f*2,u=f,o=e-f;return er(e,e,function(d,A){if(u<=d&&d<o&&u<=A&&A<o){var p=Math.floor((d-u)/a),T=Math.floor((A-u)/a);return v.isDark(T,p)?0:1}else return 1})},v.createImgTag=function(a,f,e){a=a||2,f=typeof f>"u"?a*4:f;var u=v.getModuleCount()*a+f*2,o="";return o+="<img",o+=' src="',o+=v.createDataURL(a,f),o+='"',o+=' width="',o+=u,o+='"',o+=' height="',o+=u,o+='"',e&&(o+=' alt="',o+=F(e),o+='"'),o+="/>",o};var F=function(a){for(var f="",e=0;e<a.length;e+=1){var u=a.charAt(e);switch(u){case"<":f+="&lt;";break;case">":f+="&gt;";break;case"&":f+="&amp;";break;case'"':f+="&quot;";break;default:f+=u;break}}return f},ar=function(a){var f=1;a=typeof a>"u"?f*2:a;var e=v.getModuleCount()*f+a*2,u=a,o=e-a,d,A,p,T,C,c={"\u2588\u2588":"\u2588","\u2588 ":"\u2580"," \u2588":"\u2584","  ":" "},P={"\u2588\u2588":"\u2580","\u2588 ":"\u2580"," \u2588":" ","  ":" "},R="";for(d=0;d<e;d+=2){for(p=Math.floor((d-u)/f),T=Math.floor((d+1-u)/f),A=0;A<e;A+=1)C="\u2588",u<=A&&A<o&&u<=d&&d<o&&v.isDark(p,Math.floor((A-u)/f))&&(C=" "),u<=A&&A<o&&u<=d+1&&d+1<o&&v.isDark(T,Math.floor((A-u)/f))?C+=" ":C+="\u2588",R+=a<1&&d+1>=o?P[C]:c[C];R+=`
`}return e%2&&a>0?R.substring(0,R.length-e-1)+Array(e+1).join("\u2580"):R.substring(0,R.length-1)};return v.createASCII=function(a,f){if(a=a||1,a<2)return ar(f);a-=1,f=typeof f>"u"?a*2:f;var e=v.getModuleCount()*a+f*2,u=f,o=e-f,d,A,p,T,C=Array(a+1).join("\u2588\u2588"),c=Array(a+1).join("  "),P="",R="";for(d=0;d<e;d+=1){for(p=Math.floor((d-u)/a),R="",A=0;A<e;A+=1)T=1,u<=A&&A<o&&u<=d&&d<o&&v.isDark(p,Math.floor((A-u)/a))&&(T=0),R+=T?C:c;for(p=0;p<a;p+=1)P+=R+`
`}return P.substring(0,P.length-1)},v.renderTo2dContext=function(a,f){f=f||2;for(var e=v.getModuleCount(),u=0;u<e;u++)for(var o=0;o<e;o++)a.fillStyle=v.isDark(u,o)?"black":"white",a.fillRect(o*f,u*f,f,f)},v};N.stringToBytesFuncs={default:function(x){for(var w=[],g=0;g<x.length;g+=1){var l=x.charCodeAt(g);w.push(l&255)}return w}},N.stringToBytes=N.stringToBytesFuncs.default,N.createStringToBytes=function(x,w){var g=(function(){for(var n=rr(x),s=function(){var b=n.read();if(b==-1)throw"eof";return b},t=0,r={};;){var h=n.read();if(h==-1)break;var i=s(),v=s(),_=s(),B=String.fromCharCode(h<<8|i),y=v<<8|_;r[B]=y,t+=1}if(t!=w)throw t+" != "+w;return r})(),l=63;return function(n){for(var s=[],t=0;t<n.length;t+=1){var r=n.charCodeAt(t);if(r<128)s.push(r);else{var h=g[n.charAt(t)];typeof h=="number"?(h&255)==h?s.push(h):(s.push(h>>>8),s.push(h&255)):s.push(l)}}return s}};var D={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},O={L:1,M:0,Q:3,H:2},L={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},k=(function(){var x=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],w=1335,g=7973,l=21522,n={},s=function(t){for(var r=0;t!=0;)r+=1,t>>>=1;return r};return n.getBCHTypeInfo=function(t){for(var r=t<<10;s(r)-s(w)>=0;)r^=w<<s(r)-s(w);return(t<<10|r)^l},n.getBCHTypeNumber=function(t){for(var r=t<<12;s(r)-s(g)>=0;)r^=g<<s(r)-s(g);return t<<12|r},n.getPatternPosition=function(t){return x[t-1]},n.getMaskFunction=function(t){switch(t){case L.PATTERN000:return function(r,h){return(r+h)%2==0};case L.PATTERN001:return function(r,h){return r%2==0};case L.PATTERN010:return function(r,h){return h%3==0};case L.PATTERN011:return function(r,h){return(r+h)%3==0};case L.PATTERN100:return function(r,h){return(Math.floor(r/2)+Math.floor(h/3))%2==0};case L.PATTERN101:return function(r,h){return r*h%2+r*h%3==0};case L.PATTERN110:return function(r,h){return(r*h%2+r*h%3)%2==0};case L.PATTERN111:return function(r,h){return(r*h%3+(r+h)%2)%2==0};default:throw"bad maskPattern:"+t}},n.getErrorCorrectPolynomial=function(t){for(var r=K([1],0),h=0;h<t;h+=1)r=r.multiply(K([1,M.gexp(h)],0));return r},n.getLengthInBits=function(t,r){if(1<=r&&r<10)switch(t){case D.MODE_NUMBER:return 10;case D.MODE_ALPHA_NUM:return 9;case D.MODE_8BIT_BYTE:return 8;case D.MODE_KANJI:return 8;default:throw"mode:"+t}else if(r<27)switch(t){case D.MODE_NUMBER:return 12;case D.MODE_ALPHA_NUM:return 11;case D.MODE_8BIT_BYTE:return 16;case D.MODE_KANJI:return 10;default:throw"mode:"+t}else if(r<41)switch(t){case D.MODE_NUMBER:return 14;case D.MODE_ALPHA_NUM:return 13;case D.MODE_8BIT_BYTE:return 16;case D.MODE_KANJI:return 12;default:throw"mode:"+t}else throw"type:"+r},n.getLostPoint=function(t){for(var r=t.getModuleCount(),h=0,i=0;i<r;i+=1)for(var v=0;v<r;v+=1){for(var _=0,B=t.isDark(i,v),y=-1;y<=1;y+=1)if(!(i+y<0||r<=i+y))for(var b=-1;b<=1;b+=1)v+b<0||r<=v+b||y==0&&b==0||B==t.isDark(i+y,v+b)&&(_+=1);_>5&&(h+=3+_-5)}for(var i=0;i<r-1;i+=1)for(var v=0;v<r-1;v+=1){var E=0;t.isDark(i,v)&&(E+=1),t.isDark(i+1,v)&&(E+=1),t.isDark(i,v+1)&&(E+=1),t.isDark(i+1,v+1)&&(E+=1),(E==0||E==4)&&(h+=3)}for(var i=0;i<r;i+=1)for(var v=0;v<r-6;v+=1)t.isDark(i,v)&&!t.isDark(i,v+1)&&t.isDark(i,v+2)&&t.isDark(i,v+3)&&t.isDark(i,v+4)&&!t.isDark(i,v+5)&&t.isDark(i,v+6)&&(h+=40);for(var v=0;v<r;v+=1)for(var i=0;i<r-6;i+=1)t.isDark(i,v)&&!t.isDark(i+1,v)&&t.isDark(i+2,v)&&t.isDark(i+3,v)&&t.isDark(i+4,v)&&!t.isDark(i+5,v)&&t.isDark(i+6,v)&&(h+=40);for(var I=0,v=0;v<r;v+=1)for(var i=0;i<r;i+=1)t.isDark(i,v)&&(I+=1);var m=Math.abs(100*I/r/r-50)/5;return h+=m*10,h},n})(),M=(function(){for(var x=new Array(256),w=new Array(256),g=0;g<8;g+=1)x[g]=1<<g;for(var g=8;g<256;g+=1)x[g]=x[g-4]^x[g-5]^x[g-6]^x[g-8];for(var g=0;g<255;g+=1)w[x[g]]=g;var l={};return l.glog=function(n){if(n<1)throw"glog("+n+")";return w[n]},l.gexp=function(n){for(;n<0;)n+=255;for(;n>=256;)n-=255;return x[n]},l})();function K(x,w){if(typeof x.length>"u")throw x.length+"/"+w;var g=(function(){for(var n=0;n<x.length&&x[n]==0;)n+=1;for(var s=new Array(x.length-n+w),t=0;t<x.length-n;t+=1)s[t]=x[t+n];return s})(),l={};return l.getAt=function(n){return g[n]},l.getLength=function(){return g.length},l.multiply=function(n){for(var s=new Array(l.getLength()+n.getLength()-1),t=0;t<l.getLength();t+=1)for(var r=0;r<n.getLength();r+=1)s[t+r]^=M.gexp(M.glog(l.getAt(t))+M.glog(n.getAt(r)));return K(s,0)},l.mod=function(n){if(l.getLength()-n.getLength()<0)return l;for(var s=M.glog(l.getAt(0))-M.glog(n.getAt(0)),t=new Array(l.getLength()),r=0;r<l.getLength();r+=1)t[r]=l.getAt(r);for(var r=0;r<n.getLength();r+=1)t[r]^=M.gexp(M.glog(n.getAt(r))+s);return K(t,0).mod(n)},l}var Y=(function(){var x=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],w=function(n,s){var t={};return t.totalCount=n,t.dataCount=s,t},g={},l=function(n,s){switch(s){case O.L:return x[(n-1)*4+0];case O.M:return x[(n-1)*4+1];case O.Q:return x[(n-1)*4+2];case O.H:return x[(n-1)*4+3];default:return}};return g.getRSBlocks=function(n,s){var t=l(n,s);if(typeof t>"u")throw"bad rs block @ typeNumber:"+n+"/errorCorrectionLevel:"+s;for(var r=t.length/3,h=[],i=0;i<r;i+=1)for(var v=t[i*3+0],_=t[i*3+1],B=t[i*3+2],y=0;y<v;y+=1)h.push(w(_,B));return h},g})(),G=function(){var x=[],w=0,g={};return g.getBuffer=function(){return x},g.getAt=function(l){var n=Math.floor(l/8);return(x[n]>>>7-l%8&1)==1},g.put=function(l,n){for(var s=0;s<n;s+=1)g.putBit((l>>>n-s-1&1)==1)},g.getLengthInBits=function(){return w},g.putBit=function(l){var n=Math.floor(w/8);x.length<=n&&x.push(0),l&&(x[n]|=128>>>w%8),w+=1},g},$=function(x){var w=D.MODE_NUMBER,g=x,l={};l.getMode=function(){return w},l.getLength=function(t){return g.length},l.write=function(t){for(var r=g,h=0;h+2<r.length;)t.put(n(r.substring(h,h+3)),10),h+=3;h<r.length&&(r.length-h==1?t.put(n(r.substring(h,h+1)),4):r.length-h==2&&t.put(n(r.substring(h,h+2)),7))};var n=function(t){for(var r=0,h=0;h<t.length;h+=1)r=r*10+s(t.charAt(h));return r},s=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-48;throw"illegal char :"+t};return l},W=function(x){var w=D.MODE_ALPHA_NUM,g=x,l={};l.getMode=function(){return w},l.getLength=function(s){return g.length},l.write=function(s){for(var t=g,r=0;r+1<t.length;)s.put(n(t.charAt(r))*45+n(t.charAt(r+1)),11),r+=2;r<t.length&&s.put(n(t.charAt(r)),6)};var n=function(s){if("0"<=s&&s<="9")return s.charCodeAt(0)-48;if("A"<=s&&s<="Z")return s.charCodeAt(0)-65+10;switch(s){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+s}};return l},V=function(x){var w=D.MODE_8BIT_BYTE,g=x,l=N.stringToBytes(x),n={};return n.getMode=function(){return w},n.getLength=function(s){return l.length},n.write=function(s){for(var t=0;t<l.length;t+=1)s.put(l[t],8)},n},q=function(x){var w=D.MODE_KANJI,g=x,l=N.stringToBytesFuncs.SJIS;if(!l)throw"sjis not supported.";(function(t,r){var h=l(t);if(h.length!=2||(h[0]<<8|h[1])!=r)throw"sjis not supported."})("\u53CB",38726);var n=l(x),s={};return s.getMode=function(){return w},s.getLength=function(t){return~~(n.length/2)},s.write=function(t){for(var r=n,h=0;h+1<r.length;){var i=(255&r[h])<<8|255&r[h+1];if(33088<=i&&i<=40956)i-=33088;else if(57408<=i&&i<=60351)i-=49472;else throw"illegal char at "+(h+1)+"/"+i;i=(i>>>8&255)*192+(i&255),t.put(i,13),h+=2}if(h<r.length)throw"illegal char at "+(h+1)},s},S=function(){var x=[],w={};return w.writeByte=function(g){x.push(g&255)},w.writeShort=function(g){w.writeByte(g),w.writeByte(g>>>8)},w.writeBytes=function(g,l,n){l=l||0,n=n||g.length;for(var s=0;s<n;s+=1)w.writeByte(g[s+l])},w.writeString=function(g){for(var l=0;l<g.length;l+=1)w.writeByte(g.charCodeAt(l))},w.toByteArray=function(){return x},w.toString=function(){var g="";g+="[";for(var l=0;l<x.length;l+=1)l>0&&(g+=","),g+=x[l];return g+="]",g},w},z=function(){var x=0,w=0,g=0,l="",n={},s=function(r){l+=String.fromCharCode(t(r&63))},t=function(r){if(!(r<0)){if(r<26)return 65+r;if(r<52)return 97+(r-26);if(r<62)return 48+(r-52);if(r==62)return 43;if(r==63)return 47}throw"n:"+r};return n.writeByte=function(r){for(x=x<<8|r&255,w+=8,g+=1;w>=6;)s(x>>>w-6),w-=6},n.flush=function(){if(w>0&&(s(x<<6-w),x=0,w=0),g%3!=0)for(var r=3-g%3,h=0;h<r;h+=1)l+="="},n.toString=function(){return l},n},rr=function(x){var w=x,g=0,l=0,n=0,s={};s.read=function(){for(;n<8;){if(g>=w.length){if(n==0)return-1;throw"unexpected end of file./"+n}var r=w.charAt(g);if(g+=1,r=="=")return n=0,-1;if(r.match(/^\s$/))continue;l=l<<6|t(r.charCodeAt(0)),n+=6}var h=l>>>n-8&255;return n-=8,h};var t=function(r){if(65<=r&&r<=90)return r-65;if(97<=r&&r<=122)return r-97+26;if(48<=r&&r<=57)return r-48+52;if(r==43)return 62;if(r==47)return 63;throw"c:"+r};return s},tr=function(x,w){var g=x,l=w,n=new Array(x*w),s={};s.setPixel=function(i,v,_){n[v*g+i]=_},s.write=function(i){i.writeString("GIF87a"),i.writeShort(g),i.writeShort(l),i.writeByte(128),i.writeByte(0),i.writeByte(0),i.writeByte(0),i.writeByte(0),i.writeByte(0),i.writeByte(255),i.writeByte(255),i.writeByte(255),i.writeString(","),i.writeShort(0),i.writeShort(0),i.writeShort(g),i.writeShort(l),i.writeByte(0);var v=2,_=r(v);i.writeByte(v);for(var B=0;_.length-B>255;)i.writeByte(255),i.writeBytes(_,B,255),B+=255;i.writeByte(_.length-B),i.writeBytes(_,B,_.length-B),i.writeByte(0),i.writeString(";")};var t=function(i){var v=i,_=0,B=0,y={};return y.write=function(b,E){if(b>>>E)throw"length over";for(;_+E>=8;)v.writeByte(255&(b<<_|B)),E-=8-_,b>>>=8-_,B=0,_=0;B=b<<_|B,_=_+E},y.flush=function(){_>0&&v.writeByte(B)},y},r=function(i){for(var v=1<<i,_=(1<<i)+1,B=i+1,y=h(),b=0;b<v;b+=1)y.add(String.fromCharCode(b));y.add(String.fromCharCode(v)),y.add(String.fromCharCode(_));var E=S(),I=t(E);I.write(v,B);var m=0,U=String.fromCharCode(n[m]);for(m+=1;m<n.length;){var H=String.fromCharCode(n[m]);m+=1,y.contains(U+H)?U=U+H:(I.write(y.indexOf(U),B),y.size()<4095&&(y.size()==1<<B&&(B+=1),y.add(U+H)),U=H)}return I.write(y.indexOf(U),B),I.write(_,B),I.flush(),E.toByteArray()},h=function(){var i={},v=0,_={};return _.add=function(B){if(_.contains(B))throw"dup key:"+B;i[B]=v,v+=1},_.size=function(){return v},_.indexOf=function(B){return i[B]},_.contains=function(B){return typeof i[B]<"u"},_};return s},er=function(x,w,g){for(var l=tr(x,w),n=0;n<w;n+=1)for(var s=0;s<x;s+=1)l.setPixel(s,n,g(s,n));var t=S();l.write(t);for(var r=z(),h=t.toByteArray(),i=0;i<h.length;i+=1)r.writeByte(h[i]);return r.flush(),"data:image/gif;base64,"+r};return N})();(function(){qrcode.stringToBytesFuncs["UTF-8"]=function(N){function D(O){for(var L=[],k=0;k<O.length;k++){var M=O.charCodeAt(k);M<128?L.push(M):M<2048?L.push(192|M>>6,128|M&63):M<55296||M>=57344?L.push(224|M>>12,128|M>>6&63,128|M&63):(k++,M=65536+((M&1023)<<10|O.charCodeAt(k)&1023),L.push(240|M>>18,128|M>>12&63,128|M>>6&63,128|M&63))}return L}return D(N)}})();

function qrMatrix(text) {
  try {
    const qr = qrcode(0, "M");
    qr.addData(text);
    qr.make();
    const n = qr.getModuleCount();
    const cells = [];
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) cells.push([r, c]);
    return { n, cells };
  } catch {
    return null;
  }
}
function QrSvg({ text, size = 260 }) {
  const data = qrMatrix(text);
  if (!data) return null;
  const { n, cells } = data;
  const cell = size / n;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges">
      <rect width={size} height={size} fill="#fff" />
      {cells.map(([r, c], i) => <rect key={i} x={c * cell} y={r * cell} width={cell} height={cell} fill="#131A33" />)}
    </svg>
  );
}

// ---------- helpers ----------
const todayISO = () => new Date().toISOString().slice(0, 10);
const prettyDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
const cardId = () => `${todayISO().replace(/-/g, "")}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

function downloadBlob(filename, text, type = "text/csv") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}
function csv(rows) {
  return rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
}

function drawBurst(ctx, cx, cy, rInner, rOuter, rays, color, alpha = 1) {
  ctx.save(); ctx.translate(cx, cy); ctx.strokeStyle = color; ctx.globalAlpha = alpha; ctx.lineCap = "round";
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2;
    ctx.lineWidth = i % 4 === 0 ? 5 : 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * rInner, Math.sin(a) * rInner);
    ctx.lineTo(Math.cos(a) * rOuter, Math.sin(a) * rOuter);
    ctx.stroke();
  }
  ctx.restore();
}
function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  const words = String(text).split(/\s+/); let line = "", lines = [];
  for (let w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; } else line = test;
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) { lines = lines.slice(0, maxLines); lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, "") + "…"; }
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight));
  return y + lines.length * lineHeight;
}
function renderCard(canvas, { clubName, name, homeClub, detail, date, id }) {
  const W = 1050, H = 600;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  const INK = "#090C16", INK2 = "#131A33", BLUE = "#3D6BFF", CORAL = "#FF6B4A", AMBER = "#FFB020", PAPER = "#F5F6FF";

  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, INK); grad.addColorStop(0.55, INK2); grad.addColorStop(1, "#1B2550");
  ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);

  drawBurst(ctx, W - 120, H - 90, 40, 260, 40, BLUE, 0.14);
  drawBurst(ctx, W - 120, H - 90, 40, 180, 40, CORAL, 0.10);

  const borderGrad = ctx.createLinearGradient(0, 0, W, 0);
  borderGrad.addColorStop(0, BLUE); borderGrad.addColorStop(1, CORAL);
  ctx.strokeStyle = borderGrad; ctx.lineWidth = 5; ctx.strokeRect(20, 20, W - 40, H - 40);

  const stubX = 300;
  ctx.setLineDash([2, 10]); ctx.strokeStyle = "rgba(245,246,255,0.25)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(stubX, 24); ctx.lineTo(stubX, H - 24); ctx.stroke(); ctx.setLineDash([]);

  const badgeGrad = ctx.createLinearGradient(0, H / 2 - 130, 0, H / 2 + 30);
  badgeGrad.addColorStop(0, BLUE); badgeGrad.addColorStop(1, CORAL);
  drawBurst(ctx, stubX / 2, H / 2 - 60, 20, 62, 24, AMBER, 0.9);
  ctx.fillStyle = badgeGrad; ctx.beginPath(); ctx.arc(stubX / 2, H / 2 - 60, 38, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = PAPER; ctx.textAlign = "center";
  ctx.font = "800 15px 'Space Grotesk', sans-serif"; ctx.fillText("ROTARY", stubX / 2, H / 2 - 64);
  ctx.font = "600 11px Inter, sans-serif"; ctx.fillText("MAKE-UP", stubX / 2, H / 2 - 47);
  ctx.fillStyle = AMBER; ctx.font = "italic 700 13px Inter, sans-serif"; ctx.fillText("“SERVICE ABOVE SELF”", stubX / 2, H / 2 + 40);
  ctx.font = "600 12px Inter, sans-serif"; ctx.fillStyle = "rgba(245,246,255,0.65)";
  if (homeClub) wrapText(ctx, `Visiting from ${homeClub}`, stubX / 2, H / 2 + 68, stubX - 40, 16, 2);

  const padX = stubX + 60;
  ctx.textAlign = "left";
  ctx.fillStyle = CORAL; ctx.font = "800 16px 'Space Grotesk', sans-serif"; ctx.fillText(clubName.toUpperCase(), padX, 96);
  ctx.fillStyle = PAPER; ctx.font = "800 46px 'Space Grotesk', sans-serif"; ctx.fillText("Make-Up Card", padX, 158);
  const lineGrad = ctx.createLinearGradient(padX, 0, W - 60, 0);
  lineGrad.addColorStop(0, BLUE); lineGrad.addColorStop(1, CORAL);
  ctx.strokeStyle = lineGrad; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(padX, 182); ctx.lineTo(W - 60, 182); ctx.stroke();

  ctx.fillStyle = "rgba(245,246,255,0.55)"; ctx.font = "700 13px Inter, sans-serif"; ctx.fillText("ISSUED TO", padX, 228);
  ctx.fillStyle = PAPER; ctx.font = "700 34px 'Space Grotesk', sans-serif"; ctx.fillText(name, padX, 268);
  ctx.fillStyle = "rgba(245,246,255,0.55)"; ctx.font = "700 13px Inter, sans-serif"; ctx.fillText("ACTIVITY / MAKE-UP DETAIL", padX, 323);
  ctx.fillStyle = PAPER; ctx.font = "500 21px Inter, sans-serif"; wrapText(ctx, detail || "—", padX, 351, W - padX - 60, 27, 3);
  ctx.fillStyle = "rgba(245,246,255,0.55)"; ctx.font = "700 13px Inter, sans-serif"; ctx.fillText("DATE", padX, 458);
  ctx.fillStyle = PAPER; ctx.font = "600 20px Inter, sans-serif"; ctx.fillText(prettyDate(date), padX, 484);

  ctx.fillStyle = "rgba(245,246,255,0.4)"; ctx.font = "500 13px 'JetBrains Mono', monospace";
  ctx.fillText(`CARD ID  ${id}`, padX, H - 55); ctx.fillText("Valid as proof of make-up attendance", padX, H - 34);
}

// ---------- main ----------
export default function App() {
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState("members");
  const [view, setView] = useState("landing"); // "landing" | "app"
  const enterApp = (t) => { setTab(t); setView("app"); };
  const [toast, setToast] = useState(null);
  const flash = (msg, kind = "ok") => { setToast({ msg, kind }); setTimeout(() => setToast(null), 3200); };

  const [settings, setSettings] = useState({ club_name: "Rotary Club of Kampala City", meeting_label: "Weekly Fellowship Meeting", sign_in_url: "", admin_pin: "1905" });
  const [settingsForm, setSettingsForm] = useState(settings);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [newPin, setNewPin] = useState("");

  const [buddyGroups, setBuddyGroups] = useState([]);
  const [newGroup, setNewGroup] = useState("");
  const [members, setMembers] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [makeups, setMakeups] = useState([]);

  const canvasRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

  const loadAll = useCallback(async () => {
    try {
      const [s, bg, m, v, mk] = await Promise.all([
        supabase.from("settings").select("*").eq("id", 1).single(),
        supabase.from("buddy_groups").select("*").order("name"),
        supabase.from("members").select("*").order("name"),
        supabase.from("visitors").select("*").order("registered_at", { ascending: false }),
        supabase.from("makeups").select("*").order("logged_at", { ascending: false }),
      ]);
      if (s.data) { setSettings(s.data); setSettingsForm(s.data); }
      setBuddyGroups(bg.data || []);
      setMembers(m.data || []);
      setVisitors(v.data || []);
      setMakeups(mk.data || []);
    } catch (e) {
      flash("Could not load data — check your Supabase connection.", "err");
    }
    setReady(true);
  }, []);
  useEffect(() => { loadAll(); }, [loadAll]);

  useEffect(() => {
    if (activeCard && canvasRef.current) {
      renderCard(canvasRef.current, {
        clubName: settings.club_name, name: activeCard.name, homeClub: activeCard.buddy_group,
        detail: activeCard.detail, date: activeCard.activity_date, id: activeCard.card_id,
      });
    }
  }, [activeCard, settings]);

  // ---- Visitors ----
  const [visForm, setVisForm] = useState({ name: "", club: "", email: "", category: "Guest" });
  const [showCardLookup, setShowCardLookup] = useState(false);
  const [cardLookupQuery, setCardLookupQuery] = useState("");
  const cardLookupResults = cardLookupQuery.trim()
    ? makeups.filter((m) => m.name.toLowerCase().includes(cardLookupQuery.trim().toLowerCase()))
    : [];
  const [visBusy, setVisBusy] = useState(false);
  const submitVisitor = async () => {
    const name = visForm.name.trim(), club = visForm.club.trim(), email = visForm.email.trim().toLowerCase();
    if (!name || !club || !emailOk(email)) { flash("Please fill in name, club, and a valid email.", "err"); return; }
    setVisBusy(true);
    const { data, error } = await supabase.from("visitors").insert({
      name, home_club: club, email, category: visForm.category, visit_date: todayISO(),
    }).select().single();
    if (error) { setVisBusy(false); flash("Could not save — try again.", "err"); return; }
    setVisitors([data, ...visitors]);

    if (visForm.category === "Rotarian" || visForm.category === "Rotaract") {
      const record = {
        name, email, buddy_group: club, // "buddy_group" column reused to hold the visitor's home club
        detail: `Attended ${settings.club_name}'s ${settings.meeting_label}`,
        activity_date: todayISO(), card_id: cardId(),
      };
      const mk = await supabase.from("makeups").insert(record).select().single();
      setVisBusy(false);
      if (!mk.error) {
        setMakeups([mk.data, ...makeups]);
        setActiveCard(mk.data);
        flash(`Welcome, ${name}! Here's your make-up card to take back to ${club}.`);
      } else {
        flash(`Welcome, ${name}! (Card couldn't be generated — let your admin know.)`, "err");
      }
    } else {
      setVisBusy(false);
      flash(`Welcome, ${name}! Thanks for visiting ${settings.club_name}.`);
    }
    setVisForm({ name: "", club: "", email: "", category: "Guest" });
  };

  // ---- Members ----
  const [memberQuery, setMemberQuery] = useState("");
  const matchedMember = members.find((m) => m.name.toLowerCase() === memberQuery.trim().toLowerCase());
  const memberSuggestions = members.filter((m) => memberQuery.trim() && m.name.toLowerCase().includes(memberQuery.trim().toLowerCase()) && m.name.toLowerCase() !== memberQuery.trim().toLowerCase());

  const [newMember, setNewMember] = useState({ name: "", buddyGroup: "", email: "" });
  const [memberBusy, setMemberBusy] = useState(false);
  const registerMember = async () => {
    const name = newMember.name.trim(), email = newMember.email.trim().toLowerCase();
    if (!name || !emailOk(email) || !newMember.buddyGroup) { flash("Enter your name, email, and pick a buddy group.", "err"); return; }
    if (members.some((m) => m.name.toLowerCase() === name.toLowerCase())) { flash("Someone with that name is already registered.", "err"); return; }
    setMemberBusy(true);
    const { data, error } = await supabase.from("members").insert({ name, buddy_group: newMember.buddyGroup, email }).select().single();
    setMemberBusy(false);
    if (error) { flash("Could not save — try again.", "err"); return; }
    setMembers([...members, data]);
    setMemberQuery(name);
    setNewMember({ name: "", buddyGroup: "", email: "" });
    flash(`Welcome to the club, ${name}!`);
  };

  const downloadCard = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `makeup-card-${activeCard.card_id}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };
  const emailCard = () => {
    if (!activeCard) return;
    const subject = encodeURIComponent(`${settings.club_name} — Make-Up Card`);
    const body = encodeURIComponent(`Hi ${activeCard.name},\n\nThis confirms your make-up: ${activeCard.detail}\nDate: ${prettyDate(activeCard.activity_date)}\nCard ID: ${activeCard.card_id}\n\nPlease attach the downloaded card image before sending.\n\n${settings.club_name}`);
    window.open(`mailto:${activeCard.email}?subject=${subject}&body=${body}`, "_blank");
  };

  // ---- Admin ----
  const tryUnlock = () => {
    const entered = pinInput.replace(/\s/g, ""), expected = String(settings.admin_pin).replace(/\s/g, "");
    if (entered.length > 0 && entered === expected) { setAdminUnlocked(true); setPinError(""); setPinInput(""); }
    else setPinError("Wrong PIN.");
  };
  const changePin = async () => {
    const clean = newPin.trim();
    if (!/^\d{4,8}$/.test(clean)) { flash("PIN must be 4–8 digits.", "err"); return; }
    const { error } = await supabase.from("settings").update({ admin_pin: clean }).eq("id", 1);
    if (error) { flash("Could not update PIN.", "err"); return; }
    setSettings({ ...settings, admin_pin: clean }); setNewPin(""); flash("Admin PIN updated.");
  };
  const saveSettings = async () => {
    const { error } = await supabase.from("settings").update({
      club_name: settingsForm.club_name, meeting_label: settingsForm.meeting_label, sign_in_url: settingsForm.sign_in_url,
    }).eq("id", 1);
    if (error) { flash("Could not save settings.", "err"); return; }
    setSettings({ ...settings, ...settingsForm }); flash("Club settings saved.");
  };
  const addGroup = async () => {
    const g = newGroup.trim();
    if (!g) return;
    const { data, error } = await supabase.from("buddy_groups").insert({ name: g }).select().single();
    if (error) { flash("That group already exists or could not be saved.", "err"); return; }
    setBuddyGroups([...buddyGroups, data].sort((a, b) => a.name.localeCompare(b.name)));
    setNewGroup(""); flash(`Added "${g}" buddy group.`);
  };
  const removeGroup = async (g) => {
    const { error } = await supabase.from("buddy_groups").delete().eq("id", g.id);
    if (error) { flash("Could not remove group.", "err"); return; }
    setBuddyGroups(buddyGroups.filter((x) => x.id !== g.id)); flash(`Removed "${g.name}".`);
  };
  const removeMember = async (m) => {
    const { error } = await supabase.from("members").delete().eq("id", m.id);
    if (error) { flash("Could not remove member.", "err"); return; }
    setMembers(members.filter((x) => x.id !== m.id)); flash("Member removed.");
  };
  const toggleVerified = async (mk) => {
    const next = !mk.verified;
    const { error } = await supabase.from("makeups").update({ verified: next, verified_at: next ? new Date().toISOString() : null }).eq("id", mk.id);
    if (error) { flash("Could not update verification.", "err"); return; }
    setMakeups(makeups.map((x) => (x.id === mk.id ? { ...x, verified: next } : x)));
    flash(next ? "Marked as verified." : "Marked as pending.");
  };
  const exportCsv = (which) => {
    if (which === "members") downloadBlob("rotary-members.csv", csv([["Name","Buddy Group","Email","Registered At"], ...members.map((m) => [m.name, m.buddy_group, m.email, m.registered_at])]));
    else if (which === "visitors") downloadBlob("rotary-visitors.csv", csv([["Name","Home Club","Email","Category","Date","Registered At"], ...visitors.map((v) => [v.name, v.home_club, v.email, v.category, v.visit_date, v.registered_at])]));
    else downloadBlob("rotary-makeups.csv", csv([["Name","Home Club","Email","Detail","Date","Verified","Card ID","Logged At"], ...makeups.map((m) => [m.name, m.buddy_group, m.email, m.detail, m.activity_date, m.verified ? "Yes" : "No", m.card_id, m.logged_at])]));
  };

  const todayVisitors = visitors.filter((v) => v.visit_date === todayISO());
  const [visitorFilter, setVisitorFilter] = useState("All");
  const filteredVisitors = visitorFilter === "All" ? visitors : visitors.filter((v) => v.category === visitorFilter);

  return (
    <div className="rot-wrap">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');
        .rot-wrap {
          --ink:#090C16; --ink2:#131A33; --deep:#1B2550; --blue:#3D6BFF; --coral:#FF6B4A; --amber:#FFB020;
          --paper:#F5F6FF; --line:rgba(245,246,255,0.12); --panel:#12162A;
          font-family:'Inter',system-ui,sans-serif; color:var(--paper);
          background:radial-gradient(circle at 15% -10%, #24306b 0%, transparent 45%), radial-gradient(circle at 100% 0%, #3a1f4a 0%, transparent 40%), linear-gradient(180deg, var(--ink) 0%, #0D1226 60%, var(--ink) 100%);
          min-height:100vh; box-sizing:border-box;
        }
        .rot-wrap * { box-sizing:border-box; }
        .rot-heading-font { font-family:'Space Grotesk', sans-serif; }

        /* ---- Landing screen ---- */
        .rot-landing { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 20px; position:relative; overflow:hidden; text-align:center; }
        .rot-landing-glow { position:absolute; width:900px; height:900px; border-radius:50%; background:radial-gradient(circle, rgba(61,107,255,0.28) 0%, transparent 65%); top:-380px; left:50%; transform:translateX(-50%); pointer-events:none; }
        .rot-bg-logo { position:absolute; width:900px; max-width:none; top:50%; left:50%; transform:translate(-50%,-50%); opacity:0.06; pointer-events:none; filter:grayscale(1) brightness(2); }
        .rot-logo-top { display:block; margin:0 auto 16px; height:64px; width:auto; }
        .rot-district-footer { text-align:center; padding:26px 0 6px; font-size:11px; letter-spacing:0.14em; color:rgba(245,246,255,0.35); text-transform:uppercase; position:relative; z-index:1; }
        .rot-landing-content { position:relative; z-index:1; max-width:680px; }
        .rot-landing-eyebrow { letter-spacing:0.22em; font-size:12px; font-weight:700; color:var(--amber); text-transform:uppercase; }
        .rot-landing-title { font-family:'Space Grotesk',sans-serif; font-weight:800; font-size:52px; line-height:1.05; margin:14px 0 4px; background:linear-gradient(100deg,#fff 20%,var(--blue) 60%,var(--coral) 100%); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .rot-landing-tagline { color:var(--amber); font-size:13px; font-weight:700; letter-spacing:0.16em; margin:0 0 18px; }
        .rot-landing-sub { color:rgba(245,246,255,0.65); font-size:16px; max-width:480px; margin:0 auto 34px; }
        .rot-landing-ctas { display:flex; gap:16px; flex-wrap:wrap; justify-content:center; }
        .rot-cta { flex:1; min-width:220px; max-width:260px; background:rgba(245,246,255,0.05); border:1px solid var(--line); backdrop-filter:blur(12px); border-radius:18px; padding:26px 22px; cursor:pointer; text-align:left; transition:transform .15s ease, border-color .15s ease, background .15s ease; }
        .rot-cta:hover { transform:translateY(-4px); border-color:rgba(245,246,255,0.3); background:rgba(245,246,255,0.08); }
        .rot-cta-icon { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; margin-bottom:14px; }
        .rot-cta-icon.blue { background:linear-gradient(135deg,var(--blue),#6f8fff); }
        .rot-cta-icon.coral { background:linear-gradient(135deg,var(--coral),var(--amber)); }
        .rot-cta h3 { font-family:'Space Grotesk',sans-serif; font-size:19px; margin:0 0 6px; }
        .rot-cta p { font-size:13.5px; color:rgba(245,246,255,0.6); margin:0; line-height:1.4; }
        .rot-landing-foot { margin-top:36px; display:flex; gap:14px; font-size:13px; justify-content:center; }
        .rot-landing-foot button { background:none; border:1px solid var(--line); color:rgba(245,246,255,0.6); cursor:pointer; font:inherit; padding:9px 18px; border-radius:20px; transition:border-color .15s, color .15s, background .15s; }
        .rot-landing-foot button:hover { color:var(--paper); border-color:rgba(245,246,255,0.35); background:rgba(245,246,255,0.04); }

        /* ---- App shell ---- */
        .rot-app { padding:24px 20px 40px; max-width:960px; margin:0 auto; }
        .rot-header { text-align:center; margin-bottom:18px; padding-top:44px; position:relative; }
        .rot-home-link { position:absolute; left:0; top:0; background:none; border:1px solid var(--line); color:rgba(245,246,255,0.6); font-size:13px; cursor:pointer; display:flex; align-items:center; gap:6px; padding:8px 14px; border-radius:20px; transition:border-color .15s, color .15s, background .15s; }
        .rot-home-link:hover { color:var(--paper); border-color:rgba(245,246,255,0.35); background:rgba(245,246,255,0.04); }
        .rot-eyebrow { letter-spacing:0.18em; font-size:12px; font-weight:700; color:var(--amber); text-transform:uppercase; }
        .rot-title { font-family:'Space Grotesk',sans-serif; font-weight:800; font-size:28px; margin:6px 0 2px; }
        .rot-sub { color:rgba(245,246,255,0.5); font-size:12px; font-weight:600; letter-spacing:0.14em; margin-top:2px; }
        .rot-tabs { display:flex; gap:6px; justify-content:center; flex-wrap:wrap; background:rgba(245,246,255,0.04); border:1px solid var(--line); border-radius:16px; padding:6px; margin:0 auto; }
        .rot-tab { display:flex; align-items:center; gap:6px; padding:10px 16px; font-weight:600; font-size:13.5px; background:none; border:none; border-radius:11px; cursor:pointer; color:rgba(245,246,255,0.55); transition:background .15s, color .15s; }
        .rot-tab.active { color:var(--ink); background:linear-gradient(120deg,var(--blue),var(--coral)); }
        .rot-panel { max-width:920px; margin:22px auto 0; background:var(--panel); border:1px solid var(--line); border-radius:16px; padding:26px; box-shadow:0 20px 50px rgba(0,0,0,0.25); }
        .rot-field { margin-bottom:14px; }
        .rot-field label { display:block; font-size:12px; font-weight:700; letter-spacing:0.04em; text-transform:uppercase; color:rgba(245,246,255,0.5); margin-bottom:6px; }
        .rot-field input, .rot-field select, .rot-field textarea { width:100%; padding:11px 13px; border:1px solid var(--line); background:rgba(245,246,255,0.04); border-radius:9px; font-size:15px; font-family:inherit; color:var(--paper); }
        .rot-field input::placeholder, .rot-field textarea::placeholder { color:rgba(245,246,255,0.3); }
        .rot-field input:focus, .rot-field select:focus, .rot-field textarea:focus { outline:2px solid var(--blue); outline-offset:1px; }
        .rot-row { display:flex; gap:14px; flex-wrap:wrap; }
        .rot-row > * { flex:1; min-width:180px; }
        .rot-radios { display:flex; gap:16px; }
        .rot-radios label { display:flex; align-items:center; gap:6px; font-weight:600; font-size:14px; color:var(--paper); }
        .rot-btn { display:inline-flex; align-items:center; gap:8px; justify-content:center; background:linear-gradient(120deg,var(--blue),#5b82ff); color:#fff; border:none; border-radius:10px; padding:11px 18px; font-weight:700; font-size:14px; cursor:pointer; transition:filter .15s, transform .1s; }
        .rot-btn:hover { filter:brightness(1.1); }
        .rot-btn:active { transform:scale(0.98); }
        .rot-btn:disabled { opacity:0.5; cursor:default; }
        .rot-btn.gold { background:linear-gradient(120deg,var(--coral),var(--amber)); color:var(--ink); }
        .rot-btn.ghost { background:none; color:var(--paper); border:1px solid var(--line); }
        .rot-btn.danger { background:none; color:#FF7B72; border:1px solid rgba(255,123,114,0.3); }
        .rot-list { margin-top:14px; display:flex; flex-direction:column; gap:8px; }
        .rot-person { display:flex; align-items:center; justify-content:space-between; padding:12px 14px; border:1px solid var(--line); border-radius:11px; gap:10px; background:rgba(245,246,255,0.02); }
        .rot-person .meta { font-size:13px; color:rgba(245,246,255,0.5); }
        .rot-badge { font-size:12px; font-weight:700; color:var(--amber); background:rgba(255,176,32,0.14); padding:3px 8px; border-radius:20px; white-space:nowrap; }
        .rot-badge-verified { color:#3DDC91; background:rgba(61,220,145,0.14); }
        .rot-badge-pending { color:#FF7B72; background:rgba(255,123,114,0.12); }
        .rot-toast { position:fixed; bottom:20px; left:50%; transform:translateX(-50%); padding:10px 18px; border-radius:10px; font-size:14px; font-weight:600; background:var(--ink2); border:1px solid var(--line); color:#fff; z-index:200; display:flex; gap:8px; align-items:center; box-shadow:0 10px 30px rgba(0,0,0,0.4); }
        .rot-toast.err { border-color:rgba(255,123,114,0.4); }
        .rot-stats { display:flex; gap:16px; margin-bottom:20px; flex-wrap:wrap; }
        .rot-stat { flex:1; min-width:120px; border:1px solid var(--line); border-radius:12px; padding:16px; text-align:center; background:rgba(245,246,255,0.02); }
        .rot-stat .n { font-family:'Space Grotesk',sans-serif; font-size:28px; font-weight:800; background:linear-gradient(120deg,var(--blue),var(--coral)); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .rot-stat .l { font-size:11px; color:rgba(245,246,255,0.5); text-transform:uppercase; letter-spacing:0.05em; }
        .rot-card-preview { display:flex; flex-direction:column; align-items:center; gap:14px; margin-top:18px; }
        .rot-card-preview canvas { width:100%; max-width:640px; border-radius:14px; box-shadow:0 20px 50px rgba(0,0,0,0.45); }
        .rot-modal-backdrop { position:fixed; inset:0; background:rgba(5,7,16,0.75); backdrop-filter:blur(4px); z-index:100; display:flex; align-items:center; justify-content:center; padding:20px; overflow-y:auto; }
        .rot-modal { position:relative; background:var(--panel); border:1px solid var(--line); border-radius:18px; padding:24px; max-width:680px; width:100%; box-shadow:0 30px 80px rgba(0,0,0,0.5); }
        .rot-modal-close { position:absolute; top:12px; right:12px; background:rgba(245,246,255,0.08); border:1px solid var(--line); border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--paper); }
        .rot-empty { text-align:center; color:rgba(245,246,255,0.4); font-size:14px; padding:24px 0; }
        .rot-makeup-actions { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .rot-card-lookup { margin-top:18px; padding-top:18px; border-top:1px dashed var(--line); }
        .rot-card-lookup-toggle { background:none; border:none; color:var(--amber); font-size:13px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:7px; padding:0; }
        .rot-card-lookup-toggle:hover { color:var(--paper); }
        .rot-notice { font-size:12.5px; color:rgba(245,246,255,0.55); background:rgba(61,107,255,0.08); border:1px dashed var(--line); border-radius:9px; padding:10px 12px; margin-top:10px; }
        .rot-subtabs { display:flex; gap:8px; margin-bottom:18px; flex-wrap:wrap; }
        .rot-subtab { padding:7px 14px; border-radius:20px; border:1px solid var(--line); background:rgba(245,246,255,0.03); font-size:13px; font-weight:600; cursor:pointer; color:rgba(245,246,255,0.6); }
        .rot-subtab.active { background:linear-gradient(120deg,var(--blue),var(--coral)); color:var(--ink); border-color:transparent; }
        .rot-doorsign { display:flex; flex-direction:column; align-items:center; gap:10px; padding:40px 26px; }
        .rot-doorsign-h { font-family:'Space Grotesk',sans-serif; font-size:24px; margin:4px 0 10px; text-align:center; }
        .rot-qr-img { width:260px; height:260px; border:1px solid var(--line); border-radius:14px; padding:10px; background:#fff; }
        .rot-doorsign-sub { color:rgba(245,246,255,0.55); margin-bottom:6px; }
        @media print { .rot-tabs,.rot-notice,.rot-btn,.rot-home-link { display:none !important; } .rot-qr-img { width:320px; height:320px; } }

        /* ---- Mobile layout ---- */
        @media (max-width: 640px) {
          .rot-landing-title { font-size:34px; }
          .rot-landing-sub { font-size:14px; }
          .rot-cta { min-width:100%; }
          .rot-app { padding:16px 12px 28px; }
          .rot-title { font-size:22px; }
          .rot-eyebrow { font-size:10px; letter-spacing:0.12em; }
          .rot-sub { font-size:13px; }
          .rot-home-link { position:static; margin-bottom:10px; justify-content:center; }
          .rot-tabs { gap:2px; overflow-x:auto; flex-wrap:nowrap; -webkit-overflow-scrolling:touch; scrollbar-width:none; justify-content:flex-start; }
          .rot-tabs::-webkit-scrollbar { display:none; }
          .rot-tab { padding:10px 10px; font-size:13px; white-space:nowrap; flex:0 0 auto; }
          .rot-panel { padding:16px; margin-top:16px; border-radius:12px; }
          .rot-row { flex-direction:column; gap:0; }
          .rot-row > * { min-width:100%; }
          .rot-radios { flex-wrap:wrap; gap:12px; }
          .rot-btn { padding:13px 16px; font-size:15px; }
          .rot-btn-block, .rot-card-preview button { width:100%; }
          .rot-stats { gap:10px; }
          .rot-stat { min-width: calc(50% - 5px); flex:0 0 calc(50% - 5px); padding:12px; }
          .rot-stat .n { font-size:22px; }
          .rot-subtabs { gap:6px; overflow-x:auto; flex-wrap:nowrap; -webkit-overflow-scrolling:touch; }
          .rot-subtab { padding:6px 12px; font-size:12px; white-space:nowrap; flex:0 0 auto; }
          .rot-person { flex-direction:column; align-items:flex-start; gap:8px; }
          .rot-person > button { width:100%; }
          .rot-makeup-actions { flex-direction:column; align-items:stretch; width:100%; }
          .rot-makeup-actions button { width:100%; }
          .rot-card-preview { gap:10px; }
          .rot-card-preview > div { display:flex; flex-direction:column; width:100%; gap:8px; }
          .rot-card-preview > div > button { width:100%; }
          .rot-qr-img { width:200px; height:200px; }
          .rot-doorsign-h { font-size:20px; }
          h4 { font-size:15px; }
          .rot-modal { padding:16px; border-radius:12px; }
          .rot-modal-backdrop { padding:10px; }
        }
      `}</style>

      {view === "landing" ? (
        <div className="rot-landing">
          <img className="rot-bg-logo" src="/rotary-logo.png" alt="" aria-hidden="true" />
          <div className="rot-landing-glow" />
          <div className="rot-landing-content">
            <img className="rot-logo-top" src="/rotary-logo.png" alt="Rotary International" />
            <div className="rot-landing-eyebrow">Attendance · Make-Up Cards</div>
            <h1 className="rot-landing-title">{settings.club_name}</h1>
            <div className="rot-landing-tagline">“SERVICE ABOVE SELF”</div>
            <p className="rot-landing-sub">Register as a visitor, or sign in as a member to log your make-up and get your card instantly.</p>
            <div className="rot-landing-ctas">
              <div className="rot-cta" onClick={() => enterApp("visitors")}>
                <div className="rot-cta-icon blue"><UserPlus size={20} color="#fff" /></div>
                <h3>I'm a Visitor</h3>
                <p>Register your name, home club, and whether you're a Rotarian, Rotaractor, or guest.</p>
              </div>
              <div className="rot-cta" onClick={() => enterApp("members")}>
                <div className="rot-cta-icon coral"><UsersRound size={20} color="#090C16" /></div>
                <h3>I'm a Member</h3>
                <p>Find your name, log a make-up, and get your card instantly.</p>
              </div>
            </div>
            <div className="rot-landing-foot">
              <button type="button" onClick={() => enterApp("qr")}>Scan code</button>
              <button type="button" onClick={() => enterApp("admin")}>Admin</button>
            </div>
          </div>
          <div className="rot-district-footer">District 9213</div>
        </div>
      ) : (
      <div className="rot-app">
      <div className="rot-header">
        <button type="button" className="rot-home-link" onClick={() => setView("landing")}>← Home</button>
        <img className="rot-logo-top" style={{ height: 44 }} src="/rotary-logo.png" alt="Rotary International" />
        <div className="rot-eyebrow">Visitors · Members · Make-Up Cards</div>
        <div className="rot-title">{settings.club_name}</div>
        <div className="rot-sub">“SERVICE ABOVE SELF”</div>
      </div>

      <div className="rot-tabs">
        <button className={`rot-tab ${tab === "visitors" ? "active" : ""}`} onClick={() => setTab("visitors")}><UserPlus size={16}/> Visitors</button>
        <button className={`rot-tab ${tab === "members" ? "active" : ""}`} onClick={() => setTab("members")}><UsersRound size={16}/> Members</button>
        <button className={`rot-tab ${tab === "qr" ? "active" : ""}`} onClick={() => setTab("qr")}><QrCode size={16}/> Scan Code</button>
        <button className={`rot-tab ${tab === "admin" ? "active" : ""}`} onClick={() => setTab("admin")}><ShieldCheck size={16}/> Admin {adminUnlocked ? "" : "🔒"}</button>
      </div>

      {!ready ? (
        <div className="rot-panel rot-empty"><Loader2 size={20}/> Loading club data…</div>
      ) : (
        <>
          {tab === "visitors" && (
            <div className="rot-panel">
              <p style={{ marginTop: 0, color: "rgba(245,246,255,0.55)", fontSize: 14 }}>Not a member of {settings.club_name}? Register here as a visitor — this is open to anyone.</p>
              <div className="rot-field"><label>Full name</label><input value={visForm.name} onChange={(e) => setVisForm({ ...visForm, name: e.target.value })} placeholder="e.g. Grace Nabatanzi" /></div>
              <div className="rot-row">
                <div className="rot-field"><label>Your club</label><input value={visForm.club} onChange={(e) => setVisForm({ ...visForm, club: e.target.value })} placeholder="e.g. Rotary Club of Entebbe" /></div>
                <div className="rot-field"><label>Email</label><input type="email" value={visForm.email} onChange={(e) => setVisForm({ ...visForm, email: e.target.value })} placeholder="you@example.com" /></div>
              </div>
              <div className="rot-field">
                <label>You are a</label>
                <div className="rot-radios">
                  {["Rotarian","Rotaract","Guest"].map((c) => (
                    <label key={c}><input type="radio" name="cat" checked={visForm.category === c} onChange={() => setVisForm({ ...visForm, category: c })} />{c}</label>
                  ))}
                </div>
                {(visForm.category === "Rotarian" || visForm.category === "Rotaract") && (
                  <div className="rot-notice">You'll get a make-up card after registering — proof of attendance to take back to your own club.</div>
                )}
              </div>
              <button type="button" className="rot-btn rot-btn-block" disabled={visBusy} onClick={submitVisitor}>{visBusy ? <Loader2 size={16}/> : <UserPlus size={16}/>} Register as visitor</button>
              <div className="rot-notice">{todayVisitors.length} visitor(s) registered today · {visitors.length} all-time.</div>

              <div className="rot-card-lookup">
                <button type="button" className="rot-card-lookup-toggle" onClick={() => setShowCardLookup(!showCardLookup)}>
                  <ClipboardList size={14} /> Already registered? Get your make-up card
                </button>
                {showCardLookup && (
                  <div style={{ marginTop: 12 }}>
                    <div className="rot-field">
                      <label>Type the name you registered with</label>
                      <input value={cardLookupQuery} onChange={(e) => setCardLookupQuery(e.target.value)} placeholder="Your full name" />
                    </div>
                    {cardLookupQuery.trim() && (
                      cardLookupResults.length === 0 ? (
                        <div className="rot-empty">No make-up card found for that name.</div>
                      ) : (
                        <div className="rot-list">
                          {cardLookupResults.map((mk) => (
                            <div className="rot-person" key={mk.id}>
                              <div><strong>{mk.name}</strong><div className="meta">Visiting from {mk.buddy_group} · {prettyDate(mk.activity_date)}</div></div>
                              <button type="button" className="rot-btn ghost" onClick={() => setActiveCard(mk)}>View card</button>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "members" && (
            <div className="rot-panel">
              <div className="rot-field">
                <label>Type your name</label>
                <div style={{ position: "relative" }}>
                  <Search size={16} style={{ position: "absolute", left: 12, top: 13, color: "rgba(245,246,255,0.35)" }} />
                  <input style={{ paddingLeft: 34 }} value={memberQuery} onChange={(e) => setMemberQuery(e.target.value)} placeholder="Start typing your name…" />
                </div>
                {memberSuggestions.length > 0 && (
                  <div className="rot-list">
                    {memberSuggestions.slice(0, 5).map((m) => (
                      <div className="rot-person" key={m.id} onClick={() => setMemberQuery(m.name)} style={{ cursor: "pointer" }}>
                        <div><strong>{m.name}</strong><div className="meta">{m.buddy_group}</div></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {matchedMember ? (
                <div className="rot-notice">You're already registered — <strong>{matchedMember.name}</strong> · {matchedMember.buddy_group} Buddy Group. No action needed here; make-up cards are issued to visiting Rotarians under the Visitors tab.</div>
              ) : (
                memberQuery.trim() && memberSuggestions.length === 0 && (
                  <div style={{ marginTop: 10 }}>
                    <div className="rot-notice">No member found with that exact name. New here? Register below.</div>
                    <div style={{ marginTop: 14 }}>
                      <div className="rot-field"><label>Full name</label><input value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} placeholder="Your full name" /></div>
                      <div className="rot-row">
                        <div className="rot-field">
                          <label>Buddy group</label>
                          {buddyGroups.length === 0 ? (
                            <select disabled><option>No groups yet — ask your admin</option></select>
                          ) : (
                            <select value={newMember.buddyGroup} onChange={(e) => setNewMember({ ...newMember, buddyGroup: e.target.value })}>
                              <option value="">Choose your group…</option>
                              {buddyGroups.map((g) => <option key={g.id} value={g.name}>{g.name}</option>)}
                            </select>
                          )}
                        </div>
                        <div className="rot-field"><label>Email</label><input type="email" value={newMember.email} onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} placeholder="you@example.com" /></div>
                      </div>
                      <button type="button" className="rot-btn rot-btn-block" disabled={memberBusy || buddyGroups.length === 0} onClick={registerMember}>{memberBusy ? <Loader2 size={16}/> : <UserPlus size={16}/>} Register as a member</button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {tab === "qr" && (
            <div className="rot-panel rot-doorsign">
              {!settings.sign_in_url ? (
                <div className="rot-empty">No link set yet. Go to <strong>Admin → Settings</strong> and paste your app's URL.</div>
              ) : (
                <>
                  <div className="rot-eyebrow">{settings.club_name}</div>
                  <h2 className="rot-doorsign-h">Scan to Register or Log a Make-Up</h2>
                  <div className="rot-qr-img"><QrSvg text={settings.sign_in_url} size={260} /></div>
                  <div className="rot-doorsign-sub">{settings.meeting_label}</div>
                  <button type="button" className="rot-btn ghost" onClick={() => window.print()}><Printer size={15}/> Print this sign</button>
                </>
              )}
            </div>
          )}

          {tab === "admin" && !adminUnlocked && (
            <div className="rot-panel" style={{ maxWidth: 380, margin: "24px auto 0" }}>
              <div className="rot-field"><label>Admin PIN</label>
                <input type="text" inputMode="numeric" autoComplete="off" value={pinInput} onChange={(e) => setPinInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && tryUnlock()} placeholder="e.g. 1905" autoFocus />
              </div>
              {pinError && <div className="rot-notice" style={{ color: "#FF7B72", borderColor: "rgba(255,123,114,0.4)" }}>{pinError}</div>}
              <button type="button" className="rot-btn rot-btn-block" style={{ marginTop: 10 }} onClick={tryUnlock}><ShieldCheck size={15}/> Unlock admin</button>
            </div>
          )}

          {tab === "admin" && adminUnlocked && (
            <AdminPanel
              settings={settings} settingsForm={settingsForm} setSettingsForm={setSettingsForm} saveSettings={saveSettings}
              buddyGroups={buddyGroups} newGroup={newGroup} setNewGroup={setNewGroup} addGroup={addGroup} removeGroup={removeGroup}
              members={members} removeMember={removeMember}
              visitors={visitors} filteredVisitors={filteredVisitors} visitorFilter={visitorFilter} setVisitorFilter={setVisitorFilter}
              makeups={makeups} setActiveCard={setActiveCard} toggleVerified={toggleVerified}
              newPin={newPin} setNewPin={setNewPin} changePin={changePin}
              exportCsv={exportCsv} loadAll={loadAll}
            />
          )}
        </>
      )}
      <div className="rot-district-footer">District 9213</div>
      </div>
      )}
      {toast && <div className={`rot-toast ${toast.kind === "err" ? "err" : ""}`}>{toast.kind === "err" ? <AlertCircle size={16}/> : <CheckCircle2 size={16}/>} {toast.msg}</div>}

      {activeCard && (
        <div className="rot-modal-backdrop" onClick={() => setActiveCard(null)}>
          <div className="rot-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="rot-modal-close" onClick={() => setActiveCard(null)}><X size={18}/></button>
            <div className="rot-card-preview">
              <canvas ref={canvasRef} />
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                <button type="button" className="rot-btn ghost" onClick={downloadCard}><Download size={15}/> Download card</button>
                <button type="button" className="rot-btn" onClick={emailCard}><Mail size={15}/> Email myself</button>
              </div>
              <div className="rot-notice" style={{ maxWidth: 500, textAlign: "center" }}>"Email myself" opens your own email app addressed to <strong>{activeCard.email}</strong>. Attach the downloaded card before sending.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminPanel(props) {
  const { settings, settingsForm, setSettingsForm, saveSettings, buddyGroups, newGroup, setNewGroup, addGroup, removeGroup,
    members, removeMember, visitors, filteredVisitors, visitorFilter, setVisitorFilter, makeups, setActiveCard, toggleVerified,
    newPin, setNewPin, changePin, exportCsv, loadAll } = props;
  const [section, setSection] = useState("dashboard");
  const [makeupFilter, setMakeupFilter] = useState("All");
  const filteredMakeups = makeupFilter === "All" ? makeups : makeups.filter((m) => (makeupFilter === "Verified" ? m.verified : !m.verified));
  return (
    <div className="rot-panel">
      <div className="rot-subtabs">
        {[["dashboard","Dashboard",LayoutDashboard],["groups","Buddy Groups",UsersRound],["members","Members",Users],["visitors","Visitors",UserPlus],["makeups","Make-Up Ledger",ClipboardList],["settings","Settings",Settings]].map(([id,label]) => (
          <button key={id} className={`rot-subtab ${section === id ? "active" : ""}`} onClick={() => setSection(id)}>{label}</button>
        ))}
      </div>

      {section === "dashboard" && (
        <>
          <div className="rot-stats">
            <div className="rot-stat"><div className="n">{members.length}</div><div className="l">Members</div></div>
            <div className="rot-stat"><div className="n">{buddyGroups.length}</div><div className="l">Buddy Groups</div></div>
            <div className="rot-stat"><div className="n">{visitors.length}</div><div className="l">Visitors (all-time)</div></div>
            <div className="rot-stat"><div className="n">{makeups.length}</div><div className="l">Make-Ups Logged</div></div>
            <div className="rot-stat"><div className="n">{makeups.filter((m) => !m.verified).length}</div><div className="l">Pending Verification</div></div>
          </div>
          <button type="button" className="rot-btn ghost" onClick={loadAll}><RotateCcw size={15}/> Refresh</button>
        </>
      )}

      {section === "groups" && (
        <>
          <div className="rot-row">
            <div className="rot-field"><label>New buddy group name</label><input value={newGroup} onChange={(e) => setNewGroup(e.target.value)} placeholder="e.g. Eagles Family" /></div>
            <button type="button" className="rot-btn" style={{ alignSelf: "flex-end", height: 43 }} onClick={addGroup}><Plus size={15}/> Add group</button>
          </div>
          {buddyGroups.length === 0 ? <div className="rot-empty">No buddy groups yet. Add your first one above.</div> : (
            <div className="rot-list">
              {buddyGroups.map((g) => {
                const count = members.filter((m) => m.buddy_group === g.name).length;
                return <div className="rot-person" key={g.id}><div><strong>{g.name}</strong><div className="meta">{count} member(s)</div></div><button type="button" className="rot-btn danger" onClick={() => removeGroup(g)}><Trash2 size={14}/></button></div>;
              })}
            </div>
          )}
        </>
      )}

      {section === "members" && (
        <>
          <button type="button" className="rot-btn ghost" onClick={() => exportCsv("members")} style={{ marginBottom: 14 }}><Download size={15}/> Export members CSV</button>
          {members.length === 0 ? <div className="rot-empty">No members registered yet.</div> : (
            <div className="rot-list">{members.map((m) => (
              <div className="rot-person" key={m.id}><div><strong>{m.name}</strong><div className="meta">{m.buddy_group} · {m.email}</div></div><button type="button" className="rot-btn danger" onClick={() => removeMember(m)}><Trash2 size={14}/></button></div>
            ))}</div>
          )}
        </>
      )}

      {section === "visitors" && (
        <>
          <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
            {["All","Rotarian","Rotaract","Guest"].map((f) => <button key={f} type="button" className={`rot-subtab ${visitorFilter === f ? "active" : ""}`} onClick={() => setVisitorFilter(f)}>{f}</button>)}
            <button type="button" className="rot-btn ghost" onClick={() => exportCsv("visitors")}><Download size={15}/> Export CSV</button>
          </div>
          {filteredVisitors.length === 0 ? <div className="rot-empty">No visitors match this filter.</div> : (
            <div className="rot-list">{filteredVisitors.map((v) => (
              <div className="rot-person" key={v.id}><div><strong>{v.name}</strong><div className="meta">{v.home_club} · {prettyDate(v.visit_date)}</div></div><span className="rot-badge">{v.category}</span></div>
            ))}</div>
          )}
        </>
      )}

      {section === "makeups" && (
        <>
          <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
            {["All","Pending","Verified"].map((f) => (
              <button key={f} type="button" className={`rot-subtab ${makeupFilter === f ? "active" : ""}`} onClick={() => setMakeupFilter(f)}>{f}</button>
            ))}
            <button type="button" className="rot-btn ghost" onClick={() => exportCsv("makeups")}><Download size={15}/> Export CSV</button>
          </div>
          {filteredMakeups.length === 0 ? <div className="rot-empty">No make-ups match this filter.</div> : (
            <div className="rot-list">{filteredMakeups.map((mk) => (
              <div className="rot-person" key={mk.id}>
                <div><strong>{mk.name}</strong><div className="meta">Visiting from {mk.buddy_group} · {prettyDate(mk.activity_date)} · {mk.detail}</div></div>
                <div className="rot-makeup-actions">
                  <span className={`rot-badge ${mk.verified ? "rot-badge-verified" : "rot-badge-pending"}`}>{mk.verified ? "Verified" : "Pending"}</span>
                  <button type="button" className="rot-btn ghost" onClick={() => setActiveCard(mk)}>View card</button>
                  <button type="button" className={mk.verified ? "rot-btn ghost" : "rot-btn gold"} onClick={() => toggleVerified(mk)}>{mk.verified ? "Unverify" : "Verify"}</button>
                </div>
              </div>
            ))}</div>
          )}
        </>
      )}

      {section === "settings" && (
        <>
          <div className="rot-field"><label>Club name</label><input value={settingsForm.club_name} onChange={(e) => setSettingsForm({ ...settingsForm, club_name: e.target.value })} /></div>
          <div className="rot-field"><label>Meeting label</label><input value={settingsForm.meeting_label} onChange={(e) => setSettingsForm({ ...settingsForm, meeting_label: e.target.value })} /></div>
          <div className="rot-field"><label>Sign-in link (for the QR code — your app's own URL, once deployed)</label><input value={settingsForm.sign_in_url} onChange={(e) => setSettingsForm({ ...settingsForm, sign_in_url: e.target.value })} placeholder="https://rotary-kampala.vercel.app" /></div>
          <button type="button" className="rot-btn" onClick={saveSettings}><ShieldCheck size={15}/> Save settings</button>
          <div className="rot-field" style={{ marginTop: 22, maxWidth: 260 }}>
            <label>Change admin PIN (4–8 digits)</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input inputMode="numeric" value={newPin} onChange={(e) => setNewPin(e.target.value)} placeholder="New PIN" />
              <button type="button" className="rot-btn ghost" onClick={changePin}>Update</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

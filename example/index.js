!function(){return function e(t,n,r){function o(u,c){if(!n[u]){if(!t[u]){var s="function"==typeof require&&require;if(!c&&s)return s(u,!0);if(i)return i(u,!0);var f=new Error("Cannot find module '"+u+"'");throw f.code="MODULE_NOT_FOUND",f}var a=n[u]={exports:{}};t[u][0].call(a.exports,function(e){return o(t[u][1][e]||e)},a,a.exports,e,t,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}}()({1:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});const r=new Terminal({cursorBlink:!0,rows:24,scrollback:48,tabStopWidth:2});r.open(document.querySelector("#console"));const o=JSON.stringify.bind(JSON);n.default=function(e){return function(...t){console.log(e,...t),r.writeln([e].concat(t.map(o)).join(" "))}}},{}],2:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function({dbname:e}){return{insert:t=>new Promise(function(n){setTimeout(n,1e3,{dbname:e,id:t.id,rev:"1-0123456789ABCDEF",status:200})})}}},{}],3:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});const r=e(6),o=e(4),i=e(2),u=e(1),{version:c}=e(5),s=r.default();s({version:()=>c,service:o.default}),s("db",i.default),s("dbname",()=>"app-store"),s(function({version:e,service:t}){u.default("version:")(e),t.save({id:"doc",foo:"foo"}).then(u.default("save:"))})},{1:1,2:2,4:4,5:5,6:6}],5:[function(e,t,n){t.exports={version:"0.2.0"}},{}],4:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function({version:e,db:t}){return{save:e=>t.insert(e).then(({dbname:e,id:t,rev:n})=>({dbname:e,id:t,rev:n}))}}},{}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e=Object.create(null)){return function t(n,r){switch(typeof n){case"function":return n(e);case"string":let o;Object.defineProperties(e,{[n]:{get:()=>o=o||r(e)}});break;case"object":Object.keys(n).forEach(function(e){t(e,n[e])})}return e}}},{}]},{},[3]);
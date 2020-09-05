(this["webpackJsonpkondo-decision"]=this["webpackJsonpkondo-decision"]||[]).push([[0],{26:function(e,t,n){e.exports=n(35)},31:function(e,t,n){},32:function(e,t,n){},35:function(e,t,n){"use strict";n.r(t);var a=n(3),o=n.n(a),r=n(22),s=n.n(r),c=(n(31),n(32),n(18)),i=n(15),u=n(23),l=n(16),d=n(2),m=Object(l.a)({id:"machine",initial:"status",context:{status:"In Progress",comment:""},states:{idle:{on:{click:"status"}},commentInput:{initial:"focus",states:{focus:{on:{SUBMIT:"#machine.status"}},blur:{}},on:{CLOSE:"status"}},status:{initial:"boot",states:{boot:{on:{INIT:[{target:"new",cond:function(e){return function(e){return"New"===e.status}(e)}},{target:"inProgress",cond:function(e){return function(e){return"In Progress"===e.status}(e)}},{target:"resolved",cond:function(e){return function(e){return"Resolved"===e.status}(e)}},{target:"onHold",cond:function(e){return function(e){return"On Hold"===e.status}(e)}},{target:"notDoing",cond:function(e){return function(e){return"Not Doing"===e.status}(e)}}]}},new:{on:{APPROVE:"inProgress",REJECT:"notDoing",HOLD:"onHold"},entry:Object(d.b)({status:"New"})},inProgress:{on:{REJECT:"notDoing",HOLD:"onHold",RESOLVED:"resolved"},entry:Object(d.b)({status:"In Progress"})},onHold:{on:{APPROVE:"inProgress",REJECT:"notDoing"},entry:Object(d.b)({status:"On Hold"})},notDoing:{on:{APPROVE:"inProgress",HOLD:"onHold"},entry:Object(d.b)({status:"Not Doing"})},resolved:{type:"final",entry:Object(d.b)({status:"Resolved"})}},on:{CLOSE:"idle",ADD_COMMENT:"commentInput"}}}}),g=function(e){var t=e.action,n=e.send;return o.a.createElement("span",{style:{marginRight:"5px"}},o.a.createElement("button",{style:{backgroundColor:"green",color:"white"},onClick:function(){return n(t)}},"\u2728",t,"\u2728"))},E=function(e){var t=e.send;return o.a.createElement("span",{style:{marginRight:"5px"}},o.a.createElement("button",{style:{backgroundColor:"blue",color:"white"},onClick:function(){return t("ADD_COMMENT")}},"\ud83d\udc4b UPDATE"))},f=function(e){var t=e.send;return o.a.createElement("button",{style:{backgroundColor:"gainsboro",marginLeft:"5px"},onClick:function(){return t("REJECT")}},"\ud83d\udc4e REJECT")},b=function(e){var t=e.send;return o.a.createElement("div",null,o.a.createElement("p",null,"Add Comment"),o.a.createElement("input",{type:"text"}),o.a.createElement("button",{onClick:function(){return t("SUBMIT")}},"Add Comment"))},O=function(e){var t,n=e.data,a=e.handleStatusChange,r=n,s=Object(u.useMachine)(m.withContext({status:r.status,comment:""})),c=Object(i.a)(s,2),l=c[0],d=c[1];return o.a.useEffect((function(){a({id:r.id,status:l.context.status})}),[l.context.status]),o.a.useEffect((function(){d("INIT")})),o.a.createElement("div",{style:{border:"2px solid ".concat((t=r.status,{New:"blue","In Progress":"green","On Hold":"orange",Resolved:"chartreuse","Not Doing":"gainsboro"}[t])),padding:"3px",margin:"3px"}},o.a.createElement("p",null,"Name: ",r.name," | ",r.id),o.a.createElement("p",null,"Assignee: ",r.assignee),o.a.createElement("p",null,"Status: ",r.status),o.a.createElement("small",null,o.a.createElement("p",null,"current.value: ",JSON.stringify(l.value)),o.a.createElement("p",null,"current.context: ",JSON.stringify(l.context))),l.matches("status.new")&&o.a.createElement(o.a.Fragment,null,o.a.createElement(g,{action:"APPROVE",send:d}),o.a.createElement(f,{send:d})),l.matches("status.inProgress")&&o.a.createElement(o.a.Fragment,null,o.a.createElement("button",{style:{backgroundColor:"green",color:"white",marginRight:"5px"},onClick:function(){return d("RESOLVED")}},"\u2714\ufe0f RESOLVE"),o.a.createElement(E,{send:d})),l.matches("status.onHold")&&o.a.createElement(o.a.Fragment,null,o.a.createElement(g,{action:"APPROVE",send:d}),o.a.createElement(f,{send:d})),l.matches("status.notDoing")&&o.a.createElement(o.a.Fragment,null,o.a.createElement(g,{action:"APPROVE",send:d})),!l.matches("commentInput")&&o.a.createElement("div",{style:{textAlign:"right"}},o.a.createElement("button",{style:{backgroundColor:"blue",color:"white"},onClick:function(){return d("ADD_COMMENT")}},"\ud83d\ude03 Add Comment")),l.matches("commentInput")&&o.a.createElement("div",null,o.a.createElement(b,{send:d})))},h=n(25),p=[{id:"1",name:"Excessive operation",status:"New",assignee:"bill"},{id:"2",name:"Status Mismatch",status:"New",assignee:"bob"},{id:"3",name:"Food court open",status:"Resolved",assignee:"jane"},{id:"4",name:"Magic mountain",status:"Resolved",assignee:"billy"},{id:"5",name:"Turn gas office",status:"Not Doing",assignee:"jason"},{id:"6",name:"Stage 4 Restriction",status:"On Hold",assignee:"teddy"}],v=function(e){var t=e.data,n=void 0===t?p:t,a=o.a.useState(n),r=Object(i.a)(a,2),s=r[0],u=r[1],l=function(e){var t=e.id,n=e.status;u(s.map((function(e){return e.id===t?Object(c.a)(Object(c.a)({},e),{},{status:n}):e})))};return o.a.createElement("div",null,function(e){var t={New:1,"In Progress":2,"On Hold":3,Resolved:4,"Not Doing":5};return Object(h.sortBy)(e,(function(e){return t[e.status]}))}(s).map((function(e){return o.a.createElement(O,{key:e.id,data:e,handleStatusChange:l})})))};var C=function(){return o.a.createElement("div",{className:"App"},o.a.createElement("h1",null,"Kondo Actions"),o.a.createElement(v,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[26,1,2]]]);
//# sourceMappingURL=main.f69e3361.chunk.js.map
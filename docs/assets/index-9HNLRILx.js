(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const h of n.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&l(h)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();var r=[];for(var b=0;b<256;++b)r.push((b+256).toString(16).slice(1));function P(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}var y,L=new Uint8Array(16);function E(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(L)}var A=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const v={randomUUID:A};function x(e,t,i){if(v.randomUUID&&!t&&!e)return v.randomUUID();e=e||{};var l=e.random||(e.rng||E)();return l[6]=l[6]&15|64,l[8]=l[8]&63|128,P(l)}class p{constructor(t){this.id=x(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"all",Completed:"completed",Pending:"pending"},d={todos:[new p("Piedra del alma"),new p("Piedra del infinito"),new p("Piedra del tiempo"),new p("Piedra del Poder"),new p("Piedra del Realidad")],filter:a.All},U=()=>{T()},I=(e=a.All)=>{switch(e){case a.All:return[...d.todos];case a.Completed:return d.todos.filter(t=>t.done);case a.Pending:return d.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}},T=()=>{const e=localStorage.getItem("state");if(e){const{todos:t=[],filter:i=a.All}=JSON.parse(e);d.todos=t,d.filter=i}},m=()=>{localStorage.setItem("state",JSON.stringify(d))},q=e=>{if(!e)throw new Error("description is required");d.todos.push(new p(e)),m()},D=e=>{d.todos=d.todos.filter(t=>t.id!==e),m()},F=e=>{d.todos=d.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),m()},O=()=>{d.todos=d.todos.filter(e=>!e.done),m()},k=(e=a.All)=>{d.filter=e,m()},M=()=>d.filter,c={initStore:U,loadStore:T,addTodo:q,deletTodo:D,toggleTodo:F,deleteCompleted:O,setFilter:k,getTodos:I,getCurrentFilter:M,sesionStorage:m},N=e=>{if(!e)throw new Error("A todo object is required");const{description:t,done:i,id:l}=e,o=`
        <div class="view">
                <input class="toggle" type="checkbox" ${i?"checked":""}>
                <label>${t}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
    `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",l),i&&n.classList.add("completed"),n};let f;const R=(e,t=[])=>{if(f||(f=document.querySelector(e)),!f)throw new Error(`Element ${e} not found`);f.innerHTML="",t.forEach(i=>{f.append(N(i))})};let w;const V=e=>{if(w||(w=document.querySelector(e)),!w)throw new Error("Element id inválida");w.innerText=c.getTodos(a.Pending).length},H=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="selected filtro" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`,u={TodoList:".todo-list",NewToDoInput:"#new-todo-input",BotonesFilter:".filtro",ClearCompleted:".clear-completed",Pendientes:"#pending-count"},$=e=>{const t=()=>{const s=c.getTodos(c.getCurrentFilter());R(u.TodoList,s),i()},i=()=>{V(u.Pendientes)};(()=>{const s=document.createElement("div");s.innerHTML=H,document.querySelector(e).append(s),c.initStore(),t()})();const l=document.querySelector(u.NewToDoInput),o=document.querySelector(u.TodoList),n=document.querySelectorAll(u.BotonesFilter),h=document.querySelector(u.ClearCompleted);l.addEventListener("keyup",s=>{s.keyCode!==13||s.target.value.trim().length==0||(c.addTodo(s.target.value),t(),s.target.value="")}),o.addEventListener("click",s=>{const g=s.target.closest("[data-id]");s.target.className==="destroy"?(c.deletTodo(g.getAttribute("data-id")),t()):(c.toggleTodo(g.getAttribute("data-id")),t())}),h.addEventListener("click",s=>{c.deleteCompleted(),t()});const C={Todos:a.All,Pendientes:a.Pending,Completados:a.Completed};n.forEach(s=>{s.addEventListener("click",g=>{n.forEach(S=>S.classList.remove("selected")),g.target.classList.add("selected"),c.setFilter(C[g.target.innerText]),t()})})};c.initStore();$("#app");

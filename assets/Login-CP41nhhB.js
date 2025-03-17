import{r as a,j as e}from"./index-BRKVqLoG.js";import{F as h,a as f,b,c as w}from"./index-CBXDEUiC.js";import{_ as j}from"./index-L7cnjMkO.js";function E(){const[o,u]=a.useState(""),[n,m]=a.useState(""),[l,p]=a.useState(!1),[t,x]=a.useState({username:"",password:""}),g=async s=>{s.preventDefault();let r={};if(o||(r.username="username can't be blank"),n||(r.password="Password can't be blank"),x(r),Object.keys(r).length===0)try{const d=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:o,password:n})}),c=await d.json();if(!d.ok)throw new Error(c.message||"Login failed");console.log("User logged in successfully:",c)}catch(i){console.error("Error logging in:",i.message)}else j.error("Invalid Credentials")};return e.jsxs("div",{className:"flex flex-column justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",children:[e.jsx("h2",{className:"text-3xl font-bold text-center text-gray-800 mb-6",children:"Login"}),e.jsx("div",{className:"bg-white m-8 p-8 rounded-2xl shadow-xl w-96 md:w-[450px] h-2/4",children:e.jsxs("form",{id:"signup-form",onSubmit:g,children:[e.jsxs("div",{className:"relative mb-6",children:[e.jsx(h,{className:"absolute left-4 top-3 text-gray-500",size:20}),e.jsx("input",{type:"text",id:"username",placeholder:"Enter Username",className:"pl-12 pr-4 py-3 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100",value:o,onChange:s=>u(s.target.value)}),t.username&&e.jsx("div",{className:"text-red-500 text-sm mt-1",children:t.username})]}),e.jsxs("div",{className:"relative mb-6",children:[e.jsx(f,{className:"absolute left-4 top-3 text-gray-500",size:20}),e.jsx("input",{type:l?"text":"password",id:"password",placeholder:"Enter Password",className:"pl-12 pr-12 py-3 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100",value:n,onChange:s=>m(s.target.value)}),e.jsx("button",{type:"button",className:"absolute right-4 top-3 text-gray-500",onClick:()=>p(!l),children:l?e.jsx(b,{}):e.jsx(w,{})}),t.password&&e.jsx("div",{className:"text-red-500 text-sm mt-1",children:t.password})]}),e.jsx("button",{type:"submit",className:"w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-300",children:"Log In"})]})}),e.jsx("p",{className:"mt-4 text-center text-gray-700",children:e.jsx("a",{href:"/auth/forget-password",className:"text-purple-600 hover:underline font-semibold",children:"Forget Password"})}),e.jsxs("p",{className:"mt-4 text-center text-gray-700",children:["Don't have an account?"," ",e.jsx("a",{href:"/auth/signup",className:"text-purple-600 hover:underline font-semibold",children:"Register"})]})]})}export{E as default};

(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{746:function(t,e,n){"use strict";n.r(e);var o=n(143),r=n(735),l={name:"RegisterPage",components:{CText:o.default,FormRegisterPage:r.default},layout:"auth",middleware:["guest"],data:function(){return{headerTitle:"Daftar Akun"}},computed:{mobile:function(){return this.$vuetify.breakpoint.mobile}}},c=n(27),d=n(25),m=n.n(d),f=n(549),v=n(564),w=n(566),h=n(565),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-col",{attrs:{sm:"10",md:"8",lg:"6"}},[n("v-container",{class:"mb-5 "+(t.mobile?"":"bg-container pa-10"),staticStyle:{"border-radius":"10px"}},[n("v-row",{attrs:{justify:"center"}},[n("v-col",[t.mobile?t._e():n("c-text",{staticClass:"text-center mb-10",attrs:{"font-size":"24","font-weight":"bold"},domProps:{textContent:t._s(t.headerTitle)}}),t._v(" "),n("FormRegisterPage")],1)],1)],1),t._v(" "),t.mobile?t._e():n("v-container",[n("v-row",{attrs:{justify:"center"}},[n("div",[n("c-text",{attrs:{color:"primary","font-size":"14"},domProps:{textContent:t._s("Sudah Punya akun ?")}}),t._v(" "),n("v-btn",{attrs:{color:"primary",width:"100%",elevation:"0"},domProps:{textContent:t._s("Masuk")},on:{click:function(){return t.$router.push("/login")}}})],1)])],1)],1)}),[],!1,null,null,null);e.default=component.exports;m()(component,{CText:n(143).default}),m()(component,{VBtn:f.a,VCol:v.a,VContainer:w.a,VRow:h.a})}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{547:function(t,e,r){var content=r(551);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(18).default)("194e5e83",content,!0,{sourceMap:!1})},550:function(t,e,r){"use strict";r(547)},551:function(t,e,r){var o=r(17)(!1);o.push([t.i,".statistics-wrapper[data-v-50b17ec5]{transform:translateY(-100px)}",""]),t.exports=o},566:function(t,e,r){"use strict";r.r(e);var o={name:"StatisticsCardSection",data:function(){return{statisticsList:[{title:"Download Users",value:"2.000"},{title:"Cloud Users",value:"1.000"},{title:"Community Contributors",value:"500"}]}},computed:{mobile:function(){return this.$vuetify.breakpoint.mobile},breakPoint:function(){return{sm:this.$vuetify.breakpoint.sm,md:this.$vuetify.breakpoint.md,lg:this.$vuetify.breakpoint.lg}}}},n=(r(550),r(22)),l=r(25),c=r.n(l),d=r(228),f=r(532),m=r(545),v=r(533),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-row",{attrs:{justify:"center"}},[r("v-col",{attrs:{sm:"12",md:"10",lg:"10"}},[r("v-container",{class:t.mobile?"":"statistics-wrapper",style:t.breakPoint.md?"transform: translateY(-100px)":"",attrs:{fluid:""}},[r("v-row",t._l(t.statisticsList,(function(e,o){return r("v-col",{key:o,attrs:{sm:"12",md:"4",lg:"4"}},[r("v-card",{staticClass:"py-5 px-15",attrs:{elevation:"4","data-aos":"fade-up","data-aos-delay":"1000"}},[r("c-text",{staticClass:"text-center",attrs:{"font-size":"24","font-weight":"bold",color:"primary"},domProps:{textContent:t._s(e.value)}}),t._v(" "),r("c-text",{staticClass:"text-center ma-0",attrs:{"font-weight":"600",color:"primary"},domProps:{textContent:t._s(e.title)}})],1)],1)})),1)],1)],1)],1)}),[],!1,null,"50b17ec5",null);e.default=component.exports;c()(component,{CText:r(200).default}),c()(component,{VCard:d.a,VCol:f.a,VContainer:m.a,VRow:v.a})}}]);
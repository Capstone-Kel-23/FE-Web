(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{581:function(t,e,r){"use strict";r.r(e),r.d(e,"currency",(function(){return o})),r.d(e,"number",(function(){return n}));var o=function(t){return Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0}).format(t)},n=function(t){return Intl.NumberFormat().format(t)}},599:function(t,e,r){var content=r(627);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(14).default)("0f6a835e",content,!0,{sourceMap:!1})},626:function(t,e,r){"use strict";r(599)},627:function(t,e,r){var o=r(13)(!1);o.push([t.i,".date-report-input[data-v-4fe401d9]{border:2px solid var(--v-primary-base)}",""]),t.exports=o},665:function(t,e,r){"use strict";r.r(e);var o=r(581),n={name:"ProductReportDashboardPage",props:{dateReportSelected:{type:String,default:""},dateReportPicker:{type:String,default:""},dataProductReports:{type:null,default:[]}},emits:["on-changed-date-picker","save-selected-date","set-date-picker"],data:function(){return{dateReportMenu:!1}},computed:{format:function(){return o}},methods:{onChangedDateReportPicker:function(t){return this.$emit("on-changed-date-picker",t)},setDatePicker:function(){return this.$emit("set-date-picker")},saveSelectedDate:function(){return this.dateReportMenu=!this.dateReportMenu,this.$emit("save-selected-date")}}},c=(r(626),r(28)),d=r(26),l=r.n(d),v=r(552),f=r(234),m=r(567),h=r(569),k=r(746),_=r(553),y=r(233),R=r(203),w=r(554),C=r(568),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{staticClass:"pa-5"},[r("v-container",{attrs:{fluid:""}},[r("v-row",{attrs:{justify:"space-between"}},[r("v-col",{attrs:{cols:"auto"}},[r("c-text",{attrs:{"font-weight":"bold","font-size":"20"},domProps:{textContent:t._s("Product Report")}})],1),t._v(" "),r("v-col",{attrs:{sm:"12",md:"5",lg:"5"}},[r("v-menu",{attrs:{transition:"slide-y-transition","close-on-click":!1,"close-on-content-click":!1,"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return[r("v-card",t._g(t._b({staticClass:"pa-1 ps-2 date-report-input d-flex justify-space-between",attrs:{outlined:""},on:{click:t.setDatePicker}},"v-card",n,!1),o),[t._v("\n              "+t._s(t.dateReportSelected)+"\n              "),r("v-icon",{attrs:{color:"black"},domProps:{textContent:t._s(t.dateReportMenu?"mdi-chevron-up":"mdi-chevron-down")}})],1)]}}]),model:{value:t.dateReportMenu,callback:function(e){t.dateReportMenu=e},expression:"dateReportMenu"}},[t._v(" "),r("v-card",{staticClass:"pa-3"},[r("v-date-picker",{attrs:{"full-width":t.$vuetify.breakpoint.mobile,value:t.dateReportPicker,"no-title":"",color:"primary","event-color":"primary"},on:{input:function(e){return t.onChangedDateReportPicker(e)}}}),t._v(" "),r("v-divider"),t._v(" "),r("v-container",[r("v-row",{attrs:{justify:"space-between"}},[r("v-col",[r("v-btn",{attrs:{small:"",width:"100%",outlined:"",color:"primary"},domProps:{textContent:t._s("CANCEL")},on:{click:function(e){t.dateReportMenu=!t.dateReportMenu}}})],1),t._v(" "),r("v-col",[r("v-btn",{attrs:{small:"",width:"100%",color:"primary"},domProps:{textContent:t._s("SAVE")},on:{click:t.saveSelectedDate}})],1)],1)],1)],1)],1)],1)],1)],1),t._v(" "),r("v-container",t._l(t.dataProductReports,(function(e,o){return r("v-row",{key:o},[r("v-col",{attrs:{cols:"auto"}},[r("v-img",{attrs:{"max-width":"40","max-height":"40",src:e.icon}})],1),t._v(" "),r("v-col",[r("c-text",{staticClass:"ma-0",attrs:{color:"neutral700"},domProps:{textContent:t._s(e.title)}}),t._v(" "),r("c-text",{staticClass:"ma-0",attrs:{"font-size":"20","font-weight":"bold"},domProps:{textContent:t._s(e.value)}})],1)],1)})),1)],1)}),[],!1,null,"4fe401d9",null);e.default=component.exports;l()(component,{CText:r(144).default}),l()(component,{VBtn:v.a,VCard:f.a,VCol:m.a,VContainer:h.a,VDatePicker:k.a,VDivider:_.a,VIcon:y.a,VImg:R.a,VMenu:w.a,VRow:C.a})}}]);
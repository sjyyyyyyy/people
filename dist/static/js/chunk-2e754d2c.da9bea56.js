(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2e754d2c"],{2205:function(t,e,n){"use strict";n("aff2")},"4aaa":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"location-list"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.locationData}},[n("el-table-column",{attrs:{prop:"addressid",label:"地址id"}}),n("el-table-column",{attrs:{prop:"addressname",label:"地址名称"}}),n("el-table-column",{attrs:{prop:"longitude",label:"经度"}}),n("el-table-column",{attrs:{prop:"latitude",label:"纬度"}}),n("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(n){return n.preventDefault(),t.deleteRow(e.row)}}},[t._v(" 移除 ")])]}}])})],1)],1)},o=[],i=n("e91b"),s={data:function(){return{locationData:[],loading:!1}},methods:{getLocationList:function(){var t=this;this.loading=!0,Object(i["c"])().then((function(e){console.log(e),t.locationData=e.data,t.loading=!1})).catch((function(e){console.log(e),t.loading=!1}))},deleteRow:function(t){var e=this;this.$confirm("此操作将永久删除该等级, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(i["b"])({addressid:t.addressid}).then((function(t){console.log(t),e.$message({type:"success",message:t.message}),e.getLocationList()})).catch((function(t){console.log(t)}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))}},created:function(){this.getLocationList()}},c=s,l=(n("2205"),n("2877")),r=Object(l["a"])(c,a,o,!1,null,"2e89d3f2",null);e["default"]=r.exports},aff2:function(t,e,n){},e91b:function(t,e,n){"use strict";n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return s}));var a=n("b775");function o(){return Object(a["a"])({url:"/showAddresses",method:"get"})}function i(t){return Object(a["a"])({url:"/insertOneAddress",method:"post",data:t})}function s(t){return Object(a["a"])({url:"/delOneAddress",method:"get",params:t})}}}]);
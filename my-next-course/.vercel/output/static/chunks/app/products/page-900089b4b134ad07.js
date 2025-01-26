(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[571],{75769:(e,t,o)=>{Promise.resolve().then(o.bind(o,33923))},76046:(e,t,o)=>{"use strict";var r=o(66658);o.o(r,"useRouter")&&o.d(t,{useRouter:function(){return r.useRouter}})},33923:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>w});var r=o(95155),n=o(12115),s=o(76046),l=function(e,t){return(l=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(e,t)},i=function(){return(i=Object.assign||function(e){for(var t,o=1,r=arguments.length;o<r;o++)for(var n in t=arguments[o])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},a={Pixel:"Pixel",Percent:"Percent"},c={unit:a.Percent,value:.8};function h(e){return"number"==typeof e?{unit:a.Percent,value:100*e}:"string"==typeof e?e.match(/^(\d*(\.\d+)?)px$/)?{unit:a.Pixel,value:parseFloat(e)}:e.match(/^(\d*(\.\d+)?)%$/)?{unit:a.Percent,value:parseFloat(e)}:(console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'),c):(console.warn("scrollThreshold should be string or number"),c)}var p=function(e){function t(t){var o=e.call(this,t)||this;return o.lastScrollTop=0,o.actionTriggered=!1,o.startY=0,o.currentY=0,o.dragging=!1,o.maxPullDownDistance=0,o.getScrollableTarget=function(){return o.props.scrollableTarget instanceof HTMLElement?o.props.scrollableTarget:"string"==typeof o.props.scrollableTarget?document.getElementById(o.props.scrollableTarget):(null===o.props.scrollableTarget&&console.warn("You are trying to pass scrollableTarget but it is null. This might\n        happen because the element may not have been added to DOM yet.\n        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.\n      "),null)},o.onStart=function(e){!o.lastScrollTop&&(o.dragging=!0,e instanceof MouseEvent?o.startY=e.pageY:e instanceof TouchEvent&&(o.startY=e.touches[0].pageY),o.currentY=o.startY,o._infScroll&&(o._infScroll.style.willChange="transform",o._infScroll.style.transition="transform 0.2s cubic-bezier(0,0,0.31,1)"))},o.onMove=function(e){o.dragging&&(e instanceof MouseEvent?o.currentY=e.pageY:e instanceof TouchEvent&&(o.currentY=e.touches[0].pageY),o.currentY<o.startY||(o.currentY-o.startY>=Number(o.props.pullDownToRefreshThreshold)&&o.setState({pullToRefreshThresholdBreached:!0}),o.currentY-o.startY>1.5*o.maxPullDownDistance||!o._infScroll||(o._infScroll.style.overflow="visible",o._infScroll.style.transform="translate3d(0px, "+(o.currentY-o.startY)+"px, 0px)")))},o.onEnd=function(){o.startY=0,o.currentY=0,o.dragging=!1,o.state.pullToRefreshThresholdBreached&&(o.props.refreshFunction&&o.props.refreshFunction(),o.setState({pullToRefreshThresholdBreached:!1})),requestAnimationFrame(function(){o._infScroll&&(o._infScroll.style.overflow="auto",o._infScroll.style.transform="none",o._infScroll.style.willChange="unset")})},o.onScrollListener=function(e){"function"==typeof o.props.onScroll&&setTimeout(function(){return o.props.onScroll&&o.props.onScroll(e)},0);var t=o.props.height||o._scrollableNode?e.target:document.documentElement.scrollTop?document.documentElement:document.body;o.actionTriggered||((o.props.inverse?o.isElementAtTop(t,o.props.scrollThreshold):o.isElementAtBottom(t,o.props.scrollThreshold))&&o.props.hasMore&&(o.actionTriggered=!0,o.setState({showLoader:!0}),o.props.next&&o.props.next()),o.lastScrollTop=t.scrollTop)},o.state={showLoader:!1,pullToRefreshThresholdBreached:!1,prevDataLength:t.dataLength},o.throttledOnScrollListener=(function(e,t,o,r){var n,s=!1,l=0;function i(){n&&clearTimeout(n)}function a(){var a=this,c=Date.now()-l,h=arguments;function p(){l=Date.now(),o.apply(a,h)}s||(r&&!n&&p(),i(),void 0===r&&c>e?p():!0!==t&&(n=setTimeout(r?function(){n=void 0}:p,void 0===r?e-c:e)))}return"boolean"!=typeof t&&(r=o,o=t,t=void 0),a.cancel=function(){i(),s=!0},a})(150,o.onScrollListener).bind(o),o.onStart=o.onStart.bind(o),o.onMove=o.onMove.bind(o),o.onEnd=o.onEnd.bind(o),o}return!function(e,t){function o(){this.constructor=e}l(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}(t,e),t.prototype.componentDidMount=function(){if(void 0===this.props.dataLength)throw Error('mandatory prop "dataLength" is missing. The prop is needed when loading more content. Check README.md for usage');if(this._scrollableNode=this.getScrollableTarget(),this.el=this.props.height?this._infScroll:this._scrollableNode||window,this.el&&this.el.addEventListener("scroll",this.throttledOnScrollListener),"number"==typeof this.props.initialScrollY&&this.el&&this.el instanceof HTMLElement&&this.el.scrollHeight>this.props.initialScrollY&&this.el.scrollTo(0,this.props.initialScrollY),this.props.pullDownToRefresh&&this.el&&(this.el.addEventListener("touchstart",this.onStart),this.el.addEventListener("touchmove",this.onMove),this.el.addEventListener("touchend",this.onEnd),this.el.addEventListener("mousedown",this.onStart),this.el.addEventListener("mousemove",this.onMove),this.el.addEventListener("mouseup",this.onEnd),this.maxPullDownDistance=this._pullDown&&this._pullDown.firstChild&&this._pullDown.firstChild.getBoundingClientRect().height||0,this.forceUpdate(),"function"!=typeof this.props.refreshFunction))throw Error('Mandatory prop "refreshFunction" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage\'')},t.prototype.componentWillUnmount=function(){this.el&&(this.el.removeEventListener("scroll",this.throttledOnScrollListener),this.props.pullDownToRefresh&&(this.el.removeEventListener("touchstart",this.onStart),this.el.removeEventListener("touchmove",this.onMove),this.el.removeEventListener("touchend",this.onEnd),this.el.removeEventListener("mousedown",this.onStart),this.el.removeEventListener("mousemove",this.onMove),this.el.removeEventListener("mouseup",this.onEnd)))},t.prototype.componentDidUpdate=function(e){this.props.dataLength!==e.dataLength&&(this.actionTriggered=!1,this.setState({showLoader:!1}))},t.getDerivedStateFromProps=function(e,t){return e.dataLength!==t.prevDataLength?i(i({},t),{prevDataLength:e.dataLength}):null},t.prototype.isElementAtTop=function(e,t){void 0===t&&(t=.8);var o=e===document.body||e===document.documentElement?window.screen.availHeight:e.clientHeight,r=h(t);return r.unit===a.Pixel?e.scrollTop<=r.value+o-e.scrollHeight+1:e.scrollTop<=r.value/100+o-e.scrollHeight+1},t.prototype.isElementAtBottom=function(e,t){void 0===t&&(t=.8);var o=e===document.body||e===document.documentElement?window.screen.availHeight:e.clientHeight,r=h(t);return r.unit===a.Pixel?e.scrollTop+o>=e.scrollHeight-r.value:e.scrollTop+o>=r.value/100*e.scrollHeight},t.prototype.render=function(){var e=this,t=i({height:this.props.height||"auto",overflow:"auto",WebkitOverflowScrolling:"touch"},this.props.style),o=this.props.hasChildren||!!(this.props.children&&this.props.children instanceof Array&&this.props.children.length),r=this.props.pullDownToRefresh&&this.props.height?{overflow:"auto"}:{};return n.createElement("div",{style:r,className:"infinite-scroll-component__outerdiv"},n.createElement("div",{className:"infinite-scroll-component "+(this.props.className||""),ref:function(t){return e._infScroll=t},style:t},this.props.pullDownToRefresh&&n.createElement("div",{style:{position:"relative"},ref:function(t){return e._pullDown=t}},n.createElement("div",{style:{position:"absolute",left:0,right:0,top:-1*this.maxPullDownDistance}},this.state.pullToRefreshThresholdBreached?this.props.releaseToRefreshContent:this.props.pullDownToRefreshContent)),this.props.children,!this.state.showLoader&&!o&&this.props.hasMore&&this.props.loader,this.state.showLoader&&this.props.hasMore&&this.props.loader,!this.props.hasMore&&this.props.endMessage))},t}(n.Component),u=o(72110);o(85716);var d=o(18281),f=o(5565);let m=e=>{let{product:t,onAddToWishlist:o,onSeeDetail:n}=e;return(0,r.jsxs)(d.Card,{className:"w-96",children:[(0,r.jsx)(d.CardHeader,{shadow:!1,floated:!1,className:"h-96",children:(0,r.jsx)(f.default,{src:t.thumbnail,alt:t.title,className:"h-full w-full object-cover",width:500,height:500})}),(0,r.jsxs)(d.CardBody,{children:[(0,r.jsxs)("div",{className:"mb-2 flex items-center justify-between",children:[(0,r.jsx)(d.Typography,{color:"blue-gray",className:"font-medium",children:t.title}),(0,r.jsxs)(d.Typography,{color:"blue-gray",className:"font-medium",children:["$",t.price]})]}),(0,r.jsx)(d.Typography,{variant:"small",color:"gray",className:"font-normal opacity-75",children:t.excerpt})]}),(0,r.jsxs)(d.CardFooter,{className:"pt-0 flex flex-col gap-2",children:[(0,r.jsx)(d.Button,{ripple:!1,fullWidth:!0,className:"bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100",onClick:o,children:"Add to Wishlist"}),(0,r.jsx)(d.Button,{ripple:!1,fullWidth:!0,className:"bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100",onClick:n,children:"See Detail"})]})]})};var g=o(7186),v=o.n(g);function w(){let e=(0,s.useRouter)(),[t,o]=(0,n.useState)([]),[l,i]=(0,n.useState)(1),[a,c]=(0,n.useState)(""),[h,d]=(0,n.useState)(!0),[f,g]=(0,n.useState)(!1);(0,n.useEffect)(()=>{g(!!document.cookie.split("; ").find(e=>e.startsWith("access_token=")))},[]);let w=(0,n.useCallback)(async function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];try{console.log("trying to fetch");let r=await fetch("/api/courses?page=".concat(e,"&limit=6&search=").concat(a),{method:"GET",headers:{"Content-Type":"application/json"}});if(!r.ok)throw Error("Failed to fetch products");let n=await r.json();console.log("\uD83D\uDE80 ~ fetchProducts ~ data:",n),o(e=>t?n.courses:[...e,...n.courses]),i(e+1),d(n.courses.length>0)}catch(e){console.error("\uD83D\uDE80 ~ fetchProducts ~ error:",e),u.oR.error("Error loading products")}},[a]);(0,n.useEffect)(()=>{let e=setTimeout(()=>{w(1,!0)},500);return()=>clearTimeout(e)},[a,w]);let y=async e=>{if(!f){u.oR.error("Please login to add to wishlist");return}try{let t=await fetch("/api/wishlists",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({productId:e})}),o=await t.json();if(!t.ok)throw Error(o.error||"Failed to add to wishlist");u.oR.success("✅ Added to Wishlist!")}catch(e){console.error("\uD83D\uDE80 ~ handleAddToWishlist ~ error:",e),u.oR.error("❌ ".concat(e.message||"Error adding to wishlist"))}};return(0,r.jsxs)("div",{className:v().container,children:[(0,r.jsx)("h1",{children:"Product Listings"}),(0,r.jsx)("input",{type:"text",placeholder:"Search products...",className:v().searchInput,value:a,onChange:e=>c(e.target.value)}),(0,r.jsx)(p,{dataLength:t.length,next:()=>w(l),hasMore:h,loader:(0,r.jsx)("h4",{className:v().loader,children:"Loading more products..."}),children:(0,r.jsx)("div",{className:v().productGrid,children:t.map(t=>(0,r.jsx)(m,{product:t,onAddToWishlist:()=>y(t._id),onSeeDetail:()=>e.push("/products/".concat(t.slug))},t._id))})})]})}},85716:()=>{},7186:e=>{e.exports={container:"products_container__xARcC",title:"products_title__w0RVR",searchInput:"products_searchInput__GWGXW",productGrid:"products_productGrid__nVGJE",loader:"products_loader__Mhp6p"}}},e=>{var t=t=>e(e.s=t);e.O(0,[233,103,565,242,110,441,517,358],()=>t(75769)),_N_E=e.O()}]);
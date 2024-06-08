(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();var Qe;class dt extends Error{}dt.prototype.name="InvalidTokenError";function mi(r){return decodeURIComponent(atob(r).replace(/(.)/g,(t,e)=>{let s=e.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))}function yi(r){let t=r.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return mi(t)}catch{return atob(t)}}function Ss(r,t){if(typeof r!="string")throw new dt("Invalid token specified: must be a string");t||(t={});const e=t.header===!0?0:1,s=r.split(".")[e];if(typeof s!="string")throw new dt(`Invalid token specified: missing part #${e+1}`);let i;try{i=yi(s)}catch(n){throw new dt(`Invalid token specified: invalid base64 for part #${e+1} (${n.message})`)}try{return JSON.parse(i)}catch(n){throw new dt(`Invalid token specified: invalid json for part #${e+1} (${n.message})`)}}const vi="mu:context",de=`${vi}:change`;class _i{constructor(t,e){this._proxy=$i(t,e)}get value(){return this._proxy}set value(t){Object.assign(this._proxy,t)}apply(t){this.value=t(this.value)}}class Se extends HTMLElement{constructor(t){super(),console.log("Constructing context provider",this),this.context=new _i(t,this),this.style.display="contents"}attach(t){return this.addEventListener(de,t),t}detach(t){this.removeEventListener(de,t)}}function $i(r,t){return new Proxy(r,{get:(s,i,n)=>{if(i==="then")return;const o=Reflect.get(s,i,n);return console.log(`Context['${i}'] => `,o),o},set:(s,i,n,o)=>{const l=r[i];console.log(`Context['${i.toString()}'] <= `,n);const a=Reflect.set(s,i,n,o);if(a){let p=new CustomEvent(de,{bubbles:!0,cancelable:!0,composed:!0});Object.assign(p,{property:i,oldValue:l,value:n}),t.dispatchEvent(p)}else console.log(`Context['${i}] was not set to ${n}`);return a}})}function bi(r,t){const e=Ps(t,r);return new Promise((s,i)=>{if(e){const n=e.localName;customElements.whenDefined(n).then(()=>s(e))}else i({context:t,reason:`No provider for this context "${t}:`})})}function Ps(r,t){const e=`[provides="${r}"]`;if(!t||t===document.getRootNode())return;const s=t.closest(e);if(s)return s;const i=t.getRootNode();if(i instanceof ShadowRoot)return Ps(r,i.host)}class wi extends CustomEvent{constructor(t,e="mu:message"){super(e,{bubbles:!0,composed:!0,detail:t})}}function ks(r="mu:message"){return(t,...e)=>t.dispatchEvent(new wi(e,r))}class Pe{constructor(t,e,s="service:message",i=!0){this._pending=[],this._context=e,this._update=t,this._eventType=s,this._running=i}attach(t){t.addEventListener(this._eventType,e=>{e.stopPropagation();const s=e.detail;this.consume(s)})}start(){this._running||(console.log(`Starting ${this._eventType} service`),this._running=!0,this._pending.forEach(t=>this.process(t)))}apply(t){this._context.apply(t)}consume(t){this._running?this.process(t):(console.log(`Queueing ${this._eventType} message`,t),this._pending.push(t))}process(t){console.log(`Processing ${this._eventType} message`,t);const e=this._update(t,this.apply.bind(this));e&&e(this._context.value)}}function Ai(r){return t=>({...t,...r})}const pe="mu:auth:jwt",Tt=class Cs extends Pe{constructor(t,e){super((s,i)=>this.update(s,i),t,Cs.EVENT_TYPE),this._redirectForLogin=e}update(t,e){switch(t[0]){case"auth/signin":const{token:s,redirect:i}=t[1];return e(Si(s)),ne(i);case"auth/signout":return e(Xe()),ne(this._redirectForLogin);case"auth/redirect":return e(Xe()),ne(this._redirectForLogin,{next:window.location.href});default:const n=t[0];throw new Error(`Unhandled Auth message "${n}"`)}}};Tt.EVENT_TYPE="auth:message";Tt.dispatch=ks(Tt.EVENT_TYPE);let xi=Tt;function ne(r,t={}){if(!r)return;const e=window.location.href,s=new URL(r,e);return Object.entries(t).forEach(([i,n])=>s.searchParams.set(i,n)),()=>{console.log("Redirecting to ",r),window.location.assign(s)}}class Ei extends Se{get redirect(){return this.getAttribute("redirect")||void 0}constructor(){super({user:tt.authenticateFromLocalStorage()})}connectedCallback(){new xi(this.context,this.redirect).attach(this)}}class X{constructor(){this.authenticated=!1,this.username="anonymous"}static deauthenticate(t){return t.authenticated=!1,t.username="anonymous",localStorage.removeItem(pe),t}}class tt extends X{constructor(t){super();const e=Ss(t);console.log("Token payload",e),this.token=t,this.authenticated=!0,this.username=e.username}static authenticate(t){const e=new tt(t);return localStorage.setItem(pe,t),e}static authenticateFromLocalStorage(){const t=localStorage.getItem(pe);return t?tt.authenticate(t):new X}}function Si(r){return Ai({user:tt.authenticate(r),token:r})}function Xe(){return r=>{const t=r.user;return{user:t&&t.authenticated?X.deauthenticate(t):t,token:""}}}function Pi(r){return r.authenticated?{Authorization:`Bearer ${r.token||"NO_TOKEN"}`}:{}}function ki(r){return r.authenticated?Ss(r.token||""):{}}const U=Object.freeze(Object.defineProperty({__proto__:null,AuthenticatedUser:tt,Provider:Ei,User:X,headers:Pi,payload:ki},Symbol.toStringTag,{value:"Module"}));function Rt(r,t,e){const s=r.target,i=new CustomEvent(t,{bubbles:!0,composed:!0,detail:e});console.log(`Relaying event from ${r.type}:`,i),s.dispatchEvent(i),r.stopPropagation()}function fe(r,t="*"){return r.composedPath().find(s=>{const i=s;return i.tagName&&i.matches(t)})}const Gt=Object.freeze(Object.defineProperty({__proto__:null,originalTarget:fe,relay:Rt},Symbol.toStringTag,{value:"Module"})),Ci=new DOMParser;function wt(r,...t){const e=r.map((o,l)=>l?[t[l-1],o]:[o]).flat().join(""),s=Ci.parseFromString(e,"text/html"),i=s.head.childElementCount?s.head.children:s.body.children,n=new DocumentFragment;return n.replaceChildren(...i),n}function Zt(r){const t=r.firstElementChild,e=t&&t.tagName==="TEMPLATE"?t:void 0;return{attach:s};function s(i,n={mode:"open"}){const o=i.attachShadow(n);return e&&o.appendChild(e.content.cloneNode(!0)),o}}const Os=class Ts extends HTMLElement{constructor(){super(),this._state={},Zt(Ts.template).attach(this),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,i=e.value;s&&(this._state[s]=i)}}),this.form&&this.form.addEventListener("submit",t=>{t.preventDefault(),Rt(t,"mu-form:submit",this._state)})}set init(t){this._state=t||{},Ti(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}};Os.template=wt`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;let Oi=Os;function Ti(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;case"date":o.value=i.toISOString().substr(0,10);break;default:o.value=i;break}}}return r}const Rs=Object.freeze(Object.defineProperty({__proto__:null,Element:Oi},Symbol.toStringTag,{value:"Module"})),Us=class zs extends Pe{constructor(t){super((e,s)=>this.update(e,s),t,zs.EVENT_TYPE)}update(t,e){switch(t[0]){case"history/navigate":{const{href:s,state:i}=t[1];e(Ui(s,i));break}case"history/redirect":{const{href:s,state:i}=t[1];e(zi(s,i));break}}}};Us.EVENT_TYPE="history:message";let ke=Us;class ts extends Se{constructor(){super({location:document.location,state:{}}),this.addEventListener("click",t=>{const e=Ri(t);if(e){const s=new URL(e.href);s.origin===this.context.value.location.origin&&(console.log("Preventing Click Event on <A>",t),t.preventDefault(),Ce(e,"history/navigate",{href:s.pathname+s.search}))}}),window.addEventListener("popstate",t=>{console.log("Popstate",t.state),this.context.value={location:document.location,state:t.state}})}connectedCallback(){new ke(this.context).attach(this)}}function Ri(r){const t=r.currentTarget,e=s=>s.tagName=="A"&&s.href;if(r.button===0)if(r.composed){const i=r.composedPath().find(e);return i||void 0}else{for(let s=r.target;s;s===t?null:s.parentElement)if(e(s))return s;return}}function Ui(r,t={}){return history.pushState(t,"",r),()=>({location:document.location,state:history.state})}function zi(r,t={}){return history.replaceState(t,"",r),()=>({location:document.location,state:history.state})}const Ce=ks(ke.EVENT_TYPE),Oe=Object.freeze(Object.defineProperty({__proto__:null,HistoryProvider:ts,Provider:ts,Service:ke,dispatch:Ce},Symbol.toStringTag,{value:"Module"}));class At{constructor(t,e){this._effects=[],this._target=t,this._contextLabel=e}observe(t=void 0){return new Promise((e,s)=>{if(this._provider){const i=new es(this._provider,t);this._effects.push(i),e(i)}else bi(this._target,this._contextLabel).then(i=>{const n=new es(i,t);this._provider=i,this._effects.push(n),i.attach(o=>this._handleChange(o)),e(n)}).catch(i=>console.log(`Observer ${this._contextLabel} failed to locate a provider`,i))})}_handleChange(t){console.log("Received change event for observers",t,this._effects),this._effects.forEach(e=>e.runEffect())}}class es{constructor(t,e){this._provider=t,e&&this.setEffect(e)}get context(){return this._provider.context}get value(){return this.context.value}setEffect(t){this._effectFn=t,this.runEffect()}runEffect(){this._effectFn&&this._effectFn(this.context.value)}}const Te=class Ns extends HTMLElement{constructor(){super(),this._state={},this._user=new X,this._authObserver=new At(this,"blazing:auth"),Zt(Ns.template).attach(this),this.form&&this.form.addEventListener("submit",t=>{if(t.preventDefault(),this.src||this.action){if(console.log("Submitting form",this._state),this.action)this.action(this._state);else if(this.src){const e=this.isNew?"POST":"PUT",s=this.isNew?"created":"updated",i=this.isNew?this.src.replace(/[/][$]new$/,""):this.src;Li(i,this._state,e,this.authorization).then(n=>ct(n,this)).then(n=>{const o=`mu-rest-form:${s}`,l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,[s]:n,url:i}});this.dispatchEvent(l)})}}}),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,i=e.value;s&&(this._state[s]=i)}})}get src(){return this.getAttribute("src")}get isNew(){return this.hasAttribute("new")}set init(t){this._state=t||{},ct(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}get authorization(){var t;return(t=this._user)!=null&&t.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){this._authObserver.observe(({user:t})=>{t&&(this._user=t,this.src&&!this.isNew&&ge(this.src,this.authorization).then(e=>{this._state=e,ct(e,this)}))})}attributeChangedCallback(t,e,s){switch(t){case"src":this.src&&s&&s!==e&&!this.isNew&&ge(this.src,this.authorization).then(i=>{this._state=i,ct(i,this)});break;case"new":s&&(this._state={},ct({},this));break}}};Te.observedAttributes=["src","new","action"];Te.template=wt`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;let Ni=Te;function ge(r,t){return fetch(r,{headers:t}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).catch(e=>console.log(`Failed to load form from ${r}:`,e))}function ct(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;default:o.value=i;break}}}return r}function Li(r,t,e="PUT",s={}){return fetch(r,{method:e,headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(i=>{if(i.status!=200&&i.status!=201)throw`Form submission failed: Status ${i.status}`;return i.json()}).catch(i=>console.log("Error submitting form:",i))}const Ls=Object.freeze(Object.defineProperty({__proto__:null,FormElement:Ni,fetchData:ge},Symbol.toStringTag,{value:"Module"})),js=class Ms extends Pe{constructor(t,e){super(e,t,Ms.EVENT_TYPE,!1)}};js.EVENT_TYPE="mu:message";let Hs=js;class ji extends Se{constructor(t,e,s){super(e),this._user=new X,this._updateFn=t,this._authObserver=new At(this,s)}connectedCallback(){const t=new Hs(this.context,(e,s)=>this._updateFn(e,s,this._user));t.attach(this),this._authObserver.observe(({user:e})=>{console.log("Store got auth",e),e&&(this._user=e),t.start()})}}const Mi=Object.freeze(Object.defineProperty({__proto__:null,Provider:ji,Service:Hs},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ct=globalThis,Re=Ct.ShadowRoot&&(Ct.ShadyCSS===void 0||Ct.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ue=Symbol(),ss=new WeakMap;let Is=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Ue)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Re&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=ss.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ss.set(e,t))}return t}toString(){return this.cssText}};const Hi=r=>new Is(typeof r=="string"?r:r+"",void 0,Ue),Ii=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new Is(e,r,Ue)},Di=(r,t)=>{if(Re)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=Ct.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},is=Re?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Hi(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Fi,defineProperty:Bi,getOwnPropertyDescriptor:qi,getOwnPropertyNames:Wi,getOwnPropertySymbols:Yi,getPrototypeOf:Ji}=Object,et=globalThis,rs=et.trustedTypes,Ki=rs?rs.emptyScript:"",ns=et.reactiveElementPolyfillSupport,pt=(r,t)=>r,Ut={toAttribute(r,t){switch(t){case Boolean:r=r?Ki:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ze=(r,t)=>!Fi(r,t),os={attribute:!0,type:String,converter:Ut,reflect:!1,hasChanged:ze};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),et.litPropertyMetadata??(et.litPropertyMetadata=new WeakMap);let G=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=os){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Bi(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=qi(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const l=i==null?void 0:i.call(this);n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??os}static _$Ei(){if(this.hasOwnProperty(pt("elementProperties")))return;const t=Ji(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(pt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(pt("properties"))){const e=this.properties,s=[...Wi(e),...Yi(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(is(i))}else t!==void 0&&e.push(is(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Di(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var s;const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:Ut).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var s;const i=this.constructor,n=i._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const o=i.getPropertyOptions(n),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:Ut;this._$Em=n,this[n]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??ze)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$EO)==null||t.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(s)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}};G.elementStyles=[],G.shadowRootOptions={mode:"open"},G[pt("elementProperties")]=new Map,G[pt("finalized")]=new Map,ns==null||ns({ReactiveElement:G}),(et.reactiveElementVersions??(et.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zt=globalThis,Nt=zt.trustedTypes,as=Nt?Nt.createPolicy("lit-html",{createHTML:r=>r}):void 0,Ds="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,Fs="?"+N,Vi=`<${Fs}>`,W=document,mt=()=>W.createComment(""),yt=r=>r===null||typeof r!="object"&&typeof r!="function",Bs=Array.isArray,Gi=r=>Bs(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",oe=`[ 	
\f\r]`,ht=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ls=/-->/g,cs=/>/g,D=RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),hs=/'/g,us=/"/g,qs=/^(?:script|style|textarea|title)$/i,Zi=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),ae=Zi(1),st=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),ds=new WeakMap,B=W.createTreeWalker(W,129);function Ws(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return as!==void 0?as.createHTML(t):t}const Qi=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":"",o=ht;for(let l=0;l<e;l++){const a=r[l];let p,f,u=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===ht?f[1]==="!--"?o=ls:f[1]!==void 0?o=cs:f[2]!==void 0?(qs.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=D):f[3]!==void 0&&(o=D):o===D?f[0]===">"?(o=i??ht,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,p=f[1],o=f[3]===void 0?D:f[3]==='"'?us:hs):o===us||o===hs?o=D:o===ls||o===cs?o=ht:(o=D,i=void 0);const h=o===D&&r[l+1].startsWith("/>")?" ":"";n+=o===ht?a+Vi:u>=0?(s.push(p),a.slice(0,u)+Ds+a.slice(u)+N+h):a+N+(u===-2?l:h)}return[Ws(r,n+(r[e]||"<?>")+(t===2?"</svg>":"")),s]};let me=class Ys{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[p,f]=Qi(t,e);if(this.el=Ys.createElement(p,s),B.currentNode=this.el.content,e===2){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=B.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(Ds)){const c=f[o++],h=i.getAttribute(u).split(N),d=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:d[2],strings:h,ctor:d[1]==="."?tr:d[1]==="?"?er:d[1]==="@"?sr:Qt}),i.removeAttribute(u)}else u.startsWith(N)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(qs.test(i.tagName)){const u=i.textContent.split(N),c=u.length-1;if(c>0){i.textContent=Nt?Nt.emptyScript:"";for(let h=0;h<c;h++)i.append(u[h],mt()),B.nextNode(),a.push({type:2,index:++n});i.append(u[c],mt())}}}else if(i.nodeType===8)if(i.data===Fs)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(N,u+1))!==-1;)a.push({type:7,index:n}),u+=N.length-1}n++}}static createElement(t,e){const s=W.createElement("template");return s.innerHTML=t,s}};function it(r,t,e=r,s){var i,n;if(t===st)return t;let o=s!==void 0?(i=e._$Co)==null?void 0:i[s]:e._$Cl;const l=yt(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==l&&((n=o==null?void 0:o._$AO)==null||n.call(o,!1),l===void 0?o=void 0:(o=new l(r),o._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=o:e._$Cl=o),o!==void 0&&(t=it(r,o._$AS(r,t.values),o,s)),t}let Xi=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??W).importNode(e,!0);B.currentNode=i;let n=B.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new Ne(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new ir(n,this,t)),this._$AV.push(p),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=B.nextNode(),o++)}return B.currentNode=W,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},Ne=class Js{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=it(this,t,e),yt(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==st&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Gi(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==b&&yt(this._$AH)?this._$AA.nextSibling.data=t:this.T(W.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=me.createElement(Ws(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)==null?void 0:e._$AD)===n)this._$AH.p(s);else{const o=new Xi(n,this),l=o.u(this.options);o.p(s),this.T(l),this._$AH=o}}_$AC(t){let e=ds.get(t.strings);return e===void 0&&ds.set(t.strings,e=new me(t)),e}k(t){Bs(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new Js(this.S(mt()),this.S(mt()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}},Qt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=it(this,t,e,0),o=!yt(t)||t!==this._$AH&&t!==st,o&&(this._$AH=t);else{const l=t;let a,p;for(t=n[0],a=0;a<n.length-1;a++)p=it(this,l[s+a],e,a),p===st&&(p=this._$AH[a]),o||(o=!yt(p)||p!==this._$AH[a]),p===b?t=b:t!==b&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!i&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},tr=class extends Qt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}},er=class extends Qt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}},sr=class extends Qt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=it(this,t,e,0)??b)===st)return;const s=this._$AH,i=t===b&&s!==b||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==b&&(s===b||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}},ir=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){it(this,t)}};const ps=zt.litHtmlPolyfillSupport;ps==null||ps(me,Ne),(zt.litHtmlVersions??(zt.litHtmlVersions=[])).push("3.1.3");const rr=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new Ne(t.insertBefore(mt(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Q=class extends G{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=rr(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return st}};Q._$litElement$=!0,Q.finalized=!0,(Qe=globalThis.litElementHydrateSupport)==null||Qe.call(globalThis,{LitElement:Q});const fs=globalThis.litElementPolyfillSupport;fs==null||fs({LitElement:Q});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.5");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nr={attribute:!0,type:String,converter:Ut,reflect:!1,hasChanged:ze},or=(r=nr,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.P(o,void 0,r),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function Ks(r){return(t,e)=>typeof e=="object"?or(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}function ar(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function lr(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Vs={};(function(r){var t=function(){var e=function(u,c,h,d){for(h=h||{},d=u.length;d--;h[u[d]]=c);return h},s=[1,9],i=[1,10],n=[1,11],o=[1,12],l=[5,11,12,13,14,15],a={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(c,h,d,m,g,v,te){var C=v.length-1;switch(g){case 1:return new m.Root({},[v[C-1]]);case 2:return new m.Root({},[new m.Literal({value:""})]);case 3:this.$=new m.Concat({},[v[C-1],v[C]]);break;case 4:case 5:this.$=v[C];break;case 6:this.$=new m.Literal({value:v[C]});break;case 7:this.$=new m.Splat({name:v[C]});break;case 8:this.$=new m.Param({name:v[C]});break;case 9:this.$=new m.Optional({},[v[C-1]]);break;case 10:this.$=c;break;case 11:case 12:this.$=c.slice(1);break}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[2,2]},e(l,[2,4]),e(l,[2,5]),e(l,[2,6]),e(l,[2,7]),e(l,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},e(l,[2,10]),e(l,[2,11]),e(l,[2,12]),{1:[2,1]},e(l,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:s,12:[1,16],13:i,14:n,15:o},e(l,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(c,h){if(h.recoverable)this.trace(c);else{let d=function(m,g){this.message=m,this.hash=g};throw d.prototype=Error,new d(c,h)}},parse:function(c){var h=this,d=[0],m=[null],g=[],v=this.table,te="",C=0,Ve=0,di=2,Ge=1,pi=g.slice.call(arguments,1),$=Object.create(this.lexer),H={yy:{}};for(var ee in this.yy)Object.prototype.hasOwnProperty.call(this.yy,ee)&&(H.yy[ee]=this.yy[ee]);$.setInput(c,H.yy),H.yy.lexer=$,H.yy.parser=this,typeof $.yylloc>"u"&&($.yylloc={});var se=$.yylloc;g.push(se);var fi=$.options&&$.options.ranges;typeof H.yy.parseError=="function"?this.parseError=H.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var gi=function(){var K;return K=$.lex()||Ge,typeof K!="number"&&(K=h.symbols_[K]||K),K},k,I,O,ie,J={},Pt,R,Ze,kt;;){if(I=d[d.length-1],this.defaultActions[I]?O=this.defaultActions[I]:((k===null||typeof k>"u")&&(k=gi()),O=v[I]&&v[I][k]),typeof O>"u"||!O.length||!O[0]){var re="";kt=[];for(Pt in v[I])this.terminals_[Pt]&&Pt>di&&kt.push("'"+this.terminals_[Pt]+"'");$.showPosition?re="Parse error on line "+(C+1)+`:
`+$.showPosition()+`
Expecting `+kt.join(", ")+", got '"+(this.terminals_[k]||k)+"'":re="Parse error on line "+(C+1)+": Unexpected "+(k==Ge?"end of input":"'"+(this.terminals_[k]||k)+"'"),this.parseError(re,{text:$.match,token:this.terminals_[k]||k,line:$.yylineno,loc:se,expected:kt})}if(O[0]instanceof Array&&O.length>1)throw new Error("Parse Error: multiple actions possible at state: "+I+", token: "+k);switch(O[0]){case 1:d.push(k),m.push($.yytext),g.push($.yylloc),d.push(O[1]),k=null,Ve=$.yyleng,te=$.yytext,C=$.yylineno,se=$.yylloc;break;case 2:if(R=this.productions_[O[1]][1],J.$=m[m.length-R],J._$={first_line:g[g.length-(R||1)].first_line,last_line:g[g.length-1].last_line,first_column:g[g.length-(R||1)].first_column,last_column:g[g.length-1].last_column},fi&&(J._$.range=[g[g.length-(R||1)].range[0],g[g.length-1].range[1]]),ie=this.performAction.apply(J,[te,Ve,C,H.yy,O[1],m,g].concat(pi)),typeof ie<"u")return ie;R&&(d=d.slice(0,-1*R*2),m=m.slice(0,-1*R),g=g.slice(0,-1*R)),d.push(this.productions_[O[1]][0]),m.push(J.$),g.push(J._$),Ze=v[d[d.length-2]][d[d.length-1]],d.push(Ze);break;case 3:return!0}}return!0}},p=function(){var u={EOF:1,parseError:function(h,d){if(this.yy.parser)this.yy.parser.parseError(h,d);else throw new Error(h)},setInput:function(c,h){return this.yy=h||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var h=c.match(/(?:\r\n?|\n).*/g);return h?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},unput:function(c){var h=c.length,d=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-h),this.offset-=h;var m=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),d.length-1&&(this.yylineno-=d.length-1);var g=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:d?(d.length===m.length?this.yylloc.first_column:0)+m[m.length-d.length].length-d[0].length:this.yylloc.first_column-h},this.options.ranges&&(this.yylloc.range=[g[0],g[0]+this.yyleng-h]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(c){this.unput(this.match.slice(c))},pastInput:function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var c=this.pastInput(),h=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+h+"^"},test_match:function(c,h){var d,m,g;if(this.options.backtrack_lexer&&(g={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(g.yylloc.range=this.yylloc.range.slice(0))),m=c[0].match(/(?:\r\n?|\n).*/g),m&&(this.yylineno+=m.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:m?m[m.length-1].length-m[m.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],d=this.performAction.call(this,this.yy,this,h,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),d)return d;if(this._backtrack){for(var v in g)this[v]=g[v];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,h,d,m;this._more||(this.yytext="",this.match="");for(var g=this._currentRules(),v=0;v<g.length;v++)if(d=this._input.match(this.rules[g[v]]),d&&(!h||d[0].length>h[0].length)){if(h=d,m=v,this.options.backtrack_lexer){if(c=this.test_match(d,g[v]),c!==!1)return c;if(this._backtrack){h=!1;continue}else return!1}else if(!this.options.flex)break}return h?(c=this.test_match(h,g[m]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var h=this.next();return h||this.lex()},begin:function(h){this.conditionStack.push(h)},popState:function(){var h=this.conditionStack.length-1;return h>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(h){return h=this.conditionStack.length-1-Math.abs(h||0),h>=0?this.conditionStack[h]:"INITIAL"},pushState:function(h){this.begin(h)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(h,d,m,g){switch(m){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:return"LITERAL";case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};return u}();a.lexer=p;function f(){this.yy={}}return f.prototype=a,a.Parser=f,new f}();typeof lr<"u"&&(r.parser=t,r.Parser=t.Parser,r.parse=function(){return t.parse.apply(t,arguments)})})(Vs);function V(r){return function(t,e){return{displayName:r,props:t,children:e||[]}}}var Gs={Root:V("Root"),Concat:V("Concat"),Literal:V("Literal"),Splat:V("Splat"),Param:V("Param"),Optional:V("Optional")},Zs=Vs.parser;Zs.yy=Gs;var cr=Zs,hr=Object.keys(Gs);function ur(r){return hr.forEach(function(t){if(typeof r[t]>"u")throw new Error("No handler defined for "+t.displayName)}),{visit:function(t,e){return this.handlers[t.displayName].call(this,t,e)},handlers:r}}var Qs=ur,dr=Qs,pr=/[\-{}\[\]+?.,\\\^$|#\s]/g;function Xs(r){this.captures=r.captures,this.re=r.re}Xs.prototype.match=function(r){var t=this.re.exec(r),e={};if(t)return this.captures.forEach(function(s,i){typeof t[i+1]>"u"?e[s]=void 0:e[s]=decodeURIComponent(t[i+1])}),e};var fr=dr({Concat:function(r){return r.children.reduce((function(t,e){var s=this.visit(e);return{re:t.re+s.re,captures:t.captures.concat(s.captures)}}).bind(this),{re:"",captures:[]})},Literal:function(r){return{re:r.props.value.replace(pr,"\\$&"),captures:[]}},Splat:function(r){return{re:"([^?]*?)",captures:[r.props.name]}},Param:function(r){return{re:"([^\\/\\?]+)",captures:[r.props.name]}},Optional:function(r){var t=this.visit(r.children[0]);return{re:"(?:"+t.re+")?",captures:t.captures}},Root:function(r){var t=this.visit(r.children[0]);return new Xs({re:new RegExp("^"+t.re+"(?=\\?|$)"),captures:t.captures})}}),gr=fr,mr=Qs,yr=mr({Concat:function(r,t){var e=r.children.map((function(s){return this.visit(s,t)}).bind(this));return e.some(function(s){return s===!1})?!1:e.join("")},Literal:function(r){return decodeURI(r.props.value)},Splat:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Param:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Optional:function(r,t){var e=this.visit(r.children[0],t);return e||""},Root:function(r,t){t=t||{};var e=this.visit(r.children[0],t);return e?encodeURI(e):!1}}),vr=yr,_r=cr,$r=gr,br=vr;xt.prototype=Object.create(null);xt.prototype.match=function(r){var t=$r.visit(this.ast),e=t.match(r);return e||!1};xt.prototype.reverse=function(r){return br.visit(this.ast,r)};function xt(r){var t;if(this?t=this:t=Object.create(xt.prototype),typeof r>"u")throw new Error("A route spec is required");return t.spec=r,t.ast=_r.parse(r),t}var wr=xt,Ar=wr,xr=Ar;const Er=ar(xr);var Sr=Object.defineProperty,Pr=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Sr(t,e,i),i};class Lt extends Q{constructor(t,e){super(),this._cases=[],this._fallback=()=>ae`
      <h1>Not Found</h1>
    `,this._cases=t.map(s=>({...s,route:new Er(s.path)})),this._historyObserver=new At(this,e)}connectedCallback(){this._historyObserver.observe(({location:t})=>{console.log("New location",t),t&&(this._match=this.matchRoute(t))}),super.connectedCallback()}render(){return console.log("Rendering for match",this._match),ae`
      <main>${(()=>{if(this._match){if("view"in this._match)return this._match.view(this._match.params||{});if("redirect"in this._match){const e=this._match.redirect;if(typeof e=="string")return this.redirect(e),ae`
              <h1>Redirecting to ${e}…</h1>
            `}}return this._fallback({})})()}</main>
    `}updated(t){t.has("_match")&&this.requestUpdate()}matchRoute(t){const{search:e,pathname:s}=t,i=new URLSearchParams(e),n=s+e;for(const o of this._cases){const l=o.route.match(n);if(l)return{...o,path:s,params:l,query:i}}}redirect(t){Ce(this,"history/redirect",{href:t})}}Lt.styles=Ii`
    :host,
    main {
      display: contents;
    }
  `;Pr([Ks()],Lt.prototype,"_match");const kr=Object.freeze(Object.defineProperty({__proto__:null,Element:Lt,Switch:Lt},Symbol.toStringTag,{value:"Module"})),ti=class ei extends HTMLElement{constructor(){if(super(),Zt(ei.template).attach(this),this.shadowRoot){const t=this.shadowRoot.querySelector("slot[name='actuator']");t&&t.addEventListener("click",()=>this.toggle())}}toggle(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","open")}};ti.template=wt`
    <template>
      <slot name="actuator"><button>Menu</button></slot>
      <div id="panel">
        <slot></slot>
      </div>

      <style>
        :host {
          position: relative;
        }
        #is-shown {
          display: none;
        }
        #panel {
          display: none;

          position: absolute;
          right: 0;
          margin-top: var(--size-spacing-small);
          width: max-content;
          padding: var(--size-spacing-small);
          border-radius: var(--size-radius-small);
          background: var(--color-background-card);
          color: var(--color-text);
          box-shadow: var(--shadow-popover);
        }
        :host([open]) #panel {
          display: block;
        }
      </style>
    </template>
  `;let Cr=ti;const Or=Object.freeze(Object.defineProperty({__proto__:null,Element:Cr},Symbol.toStringTag,{value:"Module"})),si=class ii extends HTMLElement{constructor(){super(),this._array=[],Zt(ii.template).attach(this),this.addEventListener("input-array:add",t=>{t.stopPropagation(),this.append(ri("",this._array.length))}),this.addEventListener("input-array:remove",t=>{t.stopPropagation(),this.removeClosestItem(t.target)}),this.addEventListener("change",t=>{t.stopPropagation();const e=t.target;if(e&&e!==this){const s=new Event("change",{bubbles:!0}),i=e.value,n=e.closest("label");if(n){const o=Array.from(this.children).indexOf(n);this._array[o]=i,this.dispatchEvent(s)}}}),this.addEventListener("click",t=>{fe(t,"button.add")?Rt(t,"input-array:add"):fe(t,"button.remove")&&Rt(t,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(t){this._array=Array.isArray(t)?t:[t],Rr(this._array,this)}removeClosestItem(t){const e=t.closest("label");if(console.log("Removing closest item:",e,t),e){const s=Array.from(this.children).indexOf(e);this._array.splice(s,1),e.remove()}}};si.template=wt`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add one</slot>
        <style>
          :host {
            display: contents;
          }
          ul {
            display: contents;
          }
          button.add {
            grid-column: input / input-end;
          }
          ::slotted(label) {
            display: contents;
          }
        </style>
      </button>
    </template>
  `;let Tr=si;function Rr(r,t){t.replaceChildren(),r.forEach((e,s)=>t.append(ri(e)))}function ri(r,t){const e=r===void 0?"":`value="${r}"`;return wt`
    <label>
      <input ${e} />
      <button class="remove" type="button">Remove</button>
    </label>
  `}const ni=Object.freeze(Object.defineProperty({__proto__:null,Element:Tr},Symbol.toStringTag,{value:"Module"}));function T(r){return Object.entries(r).map(([t,e])=>{customElements.get(t)||customElements.define(t,e)}),customElements}var Ur=Object.defineProperty,zr=Object.getOwnPropertyDescriptor,Nr=(r,t,e,s)=>{for(var i=zr(t,e),n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Ur(t,e,i),i};class Et extends Q{constructor(t){super(),this._pending=[],this._observer=new At(this,t)}get model(){return this._lastModel=this._context?this._context.value:{},this._lastModel}connectedCallback(){var t;super.connectedCallback(),(t=this._observer)==null||t.observe().then(e=>{console.log("View effect (initial)",this,e),this._context=e.context,this._pending.length&&this._pending.forEach(([s,i])=>{console.log("Dispatching queued event",i,s),s.dispatchEvent(i)}),e.setEffect(()=>{var s;if(console.log("View effect",this,e,(s=this._context)==null?void 0:s.value),this._context)console.log("requesting update"),this.requestUpdate();else throw"View context not ready for effect"})})}dispatchMessage(t,e=this){const s=new CustomEvent("mu:message",{bubbles:!0,composed:!0,detail:t});this._context?(console.log("Dispatching message event",s),e.dispatchEvent(s)):(console.log("Queueing message event",s),this._pending.push([e,s]))}ref(t){return this.model?this.model[t]:void 0}}Nr([Ks()],Et.prototype,"model");/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ot=globalThis,Le=Ot.ShadowRoot&&(Ot.ShadyCSS===void 0||Ot.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,je=Symbol(),gs=new WeakMap;let oi=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==je)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Le&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=gs.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&gs.set(e,t))}return t}toString(){return this.cssText}};const Lr=r=>new oi(typeof r=="string"?r:r+"",void 0,je),_=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new oi(e,r,je)},jr=(r,t)=>{if(Le)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=Ot.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},ms=Le?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Lr(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Mr,defineProperty:Hr,getOwnPropertyDescriptor:Ir,getOwnPropertyNames:Dr,getOwnPropertySymbols:Fr,getPrototypeOf:Br}=Object,j=globalThis,ys=j.trustedTypes,qr=ys?ys.emptyScript:"",le=j.reactiveElementPolyfillSupport,ft=(r,t)=>r,jt={toAttribute(r,t){switch(t){case Boolean:r=r?qr:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Me=(r,t)=>!Mr(r,t),vs={attribute:!0,type:String,converter:jt,reflect:!1,hasChanged:Me};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),j.litPropertyMetadata??(j.litPropertyMetadata=new WeakMap);class Z extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=vs){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Hr(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=Ir(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const l=i==null?void 0:i.call(this);n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??vs}static _$Ei(){if(this.hasOwnProperty(ft("elementProperties")))return;const t=Br(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ft("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ft("properties"))){const e=this.properties,s=[...Dr(e),...Fr(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(ms(i))}else t!==void 0&&e.push(ms(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return jr(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var n;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:jt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var n;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const o=s.getPropertyOptions(i),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((n=o.converter)==null?void 0:n.fromAttribute)!==void 0?o.converter:jt;this._$Em=i,this[i]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??Me)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(e)):this._$EU()}catch(i){throw t=!1,this._$EU(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}Z.elementStyles=[],Z.shadowRootOptions={mode:"open"},Z[ft("elementProperties")]=new Map,Z[ft("finalized")]=new Map,le==null||le({ReactiveElement:Z}),(j.reactiveElementVersions??(j.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gt=globalThis,Mt=gt.trustedTypes,_s=Mt?Mt.createPolicy("lit-html",{createHTML:r=>r}):void 0,ai="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,li="?"+L,Wr=`<${li}>`,Y=document,vt=()=>Y.createComment(""),_t=r=>r===null||typeof r!="object"&&typeof r!="function",ci=Array.isArray,Yr=r=>ci(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",ce=`[ 	
\f\r]`,ut=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$s=/-->/g,bs=/>/g,F=RegExp(`>|${ce}(?:([^\\s"'>=/]+)(${ce}*=${ce}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ws=/'/g,As=/"/g,hi=/^(?:script|style|textarea|title)$/i,Jr=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),y=Jr(1),rt=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),xs=new WeakMap,q=Y.createTreeWalker(Y,129);function ui(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return _s!==void 0?_s.createHTML(t):t}const Kr=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":"",o=ut;for(let l=0;l<e;l++){const a=r[l];let p,f,u=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===ut?f[1]==="!--"?o=$s:f[1]!==void 0?o=bs:f[2]!==void 0?(hi.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=F):f[3]!==void 0&&(o=F):o===F?f[0]===">"?(o=i??ut,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,p=f[1],o=f[3]===void 0?F:f[3]==='"'?As:ws):o===As||o===ws?o=F:o===$s||o===bs?o=ut:(o=F,i=void 0);const h=o===F&&r[l+1].startsWith("/>")?" ":"";n+=o===ut?a+Wr:u>=0?(s.push(p),a.slice(0,u)+ai+a.slice(u)+L+h):a+L+(u===-2?l:h)}return[ui(r,n+(r[e]||"<?>")+(t===2?"</svg>":"")),s]};class $t{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[p,f]=Kr(t,e);if(this.el=$t.createElement(p,s),q.currentNode=this.el.content,e===2){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=q.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(ai)){const c=f[o++],h=i.getAttribute(u).split(L),d=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:d[2],strings:h,ctor:d[1]==="."?Gr:d[1]==="?"?Zr:d[1]==="@"?Qr:Xt}),i.removeAttribute(u)}else u.startsWith(L)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(hi.test(i.tagName)){const u=i.textContent.split(L),c=u.length-1;if(c>0){i.textContent=Mt?Mt.emptyScript:"";for(let h=0;h<c;h++)i.append(u[h],vt()),q.nextNode(),a.push({type:2,index:++n});i.append(u[c],vt())}}}else if(i.nodeType===8)if(i.data===li)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(L,u+1))!==-1;)a.push({type:7,index:n}),u+=L.length-1}n++}}static createElement(t,e){const s=Y.createElement("template");return s.innerHTML=t,s}}function nt(r,t,e=r,s){var o,l;if(t===rt)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const n=_t(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=nt(r,i._$AS(r,t.values),i,s)),t}class Vr{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??Y).importNode(e,!0);q.currentNode=i;let n=q.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new St(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new Xr(n,this,t)),this._$AV.push(p),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=q.nextNode(),o++)}return q.currentNode=Y,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class St{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=nt(this,t,e),_t(t)?t===w||t==null||t===""?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==rt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Yr(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==w&&_t(this._$AH)?this._$AA.nextSibling.data=t:this.T(Y.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=$t.createElement(ui(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{const o=new Vr(i,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=xs.get(t.strings);return e===void 0&&xs.set(t.strings,e=new $t(t)),e}k(t){ci(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new St(this.S(vt()),this.S(vt()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Xt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=nt(this,t,e,0),o=!_t(t)||t!==this._$AH&&t!==rt,o&&(this._$AH=t);else{const l=t;let a,p;for(t=n[0],a=0;a<n.length-1;a++)p=nt(this,l[s+a],e,a),p===rt&&(p=this._$AH[a]),o||(o=!_t(p)||p!==this._$AH[a]),p===w?t=w:t!==w&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!i&&this.j(t)}j(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Gr extends Xt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===w?void 0:t}}class Zr extends Xt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==w)}}class Qr extends Xt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=nt(this,t,e,0)??w)===rt)return;const s=this._$AH,i=t===w&&s!==w||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==w&&(s===w||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Xr{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){nt(this,t)}}const he=gt.litHtmlPolyfillSupport;he==null||he($t,St),(gt.litHtmlVersions??(gt.litHtmlVersions=[])).push("3.1.3");const tn=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new St(t.insertBefore(vt(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class A extends Z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=tn(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return rt}}var Es;A._$litElement$=!0,A.finalized=!0,(Es=globalThis.litElementHydrateSupport)==null||Es.call(globalThis,{LitElement:A});const ue=globalThis.litElementPolyfillSupport;ue==null||ue({LitElement:A});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.5");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const en={attribute:!0,type:String,converter:jt,reflect:!1,hasChanged:Me},sn=(r=en,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.P(o,void 0,r),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function x(r){return(t,e)=>typeof e=="object"?sn(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function rn(r){return x({...r,state:!0,attribute:!1})}const E=_`
  a {
    color: var(--color-text);
    padding: var(--size-spacing-small) var(--size-spacing-large) var(--size-spacing-med) var(--size-spacing-large);
    margin: 0 var(--size-spacing-med) 0 var(--size-spacing-med);
    text-decoration: none;
  }

  a:hover {
    background-color: var(--color-page-background);
    cursor: pointer;
  }

  a.selected {
    background-color: var(--color-page-background);
  }

  body {
    background-color: var(--color-page-background);
    color: var(--color-text);
    display: block;
    font-family: var(--font-family-main);
    font-style: normal;
  }

  button {
    background-color: var(--color-button);
    border: none;
    color: var(--color-text);
    cursor: pointer;
    font-size: var(--size-type-small);
    font-weight: bold;
    margin: var(--size-spacing-med);
    padding: var(--size-spacing-large);
  }

  button:hover {
    background-color: var(--color-button-hover);
  }

  footer {
    align-items: center;
    display: flex;
    font-size: var(--size-type-footer);
    justify-content: center;
  }

  form {
    display: grid;
    gap: var(--size-spacing-med);
    margin: var(--size-type-form);
  }

  form.login {
    align-items: center;
    display: flex;
    font-size: var(--size-type-med);
    justify-content: center;
  }

  form.search {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  h1 {
    background-color: var(--color-page-element);
    box-shadow: var(--color-shadow);
    box-sizing: border-box;
    font-size: var(--size-type-xlarge);
    text-align: center;
  }

  h2 {
    border-bottom: 2px solid var(--color-page-background);
    display: flex;
    font-size: var(--size-type-large);
    margin: var(--size-spacing-large);
  }
  
  h2.profile {
    text-align: center;
    display: block;
  }

  h3 {
    font-size: var(--size-type-small);
    font-weight: normal;
    margin: var(--size-spacing-large);
  }

  h4 {
    font-size: var(--size-type-small);
    font-style: italic;
    font-weight: normal;
    margin: var(--size-spacing-large);
  }

  header {
    color: var(--color-text);
    font-family: var(--font-family-main);
    font-style: normal;
    font-variant: normal;
    font-weight: bold;
    margin: var(--size-spacing-med);
  }

  img.profile {
    border-radius: 50%;
    display: block;
    height: 200px;
    margin: 1rem auto 1rem auto;
    width: 200px;
  }

  input {
    font-size: var(--size-type-input);
  }

  li {
    align-items: center;
    border-bottom: 2px solid var(--color-page-element);
    border-top: 2px solid var(--color-page-element);
    display: grid;
    font-size: var(--size-type-small);
    font-weight: normal;
    grid-template-columns: repeat(20, 1fr);
    margin: var(--size-spacing-large);
  }

  li>button {
    grid-column: span 1;
  }

  li>h2 {
    grid-column: span 6;
    word-wrap: break-word;
  }

  li>h3 {
    grid-column: span 4;
    word-wrap: break-word;
  }

  li>h4 {
    grid-column: span 3;
    word-wrap: break-word;
  }

  main {
    background-color: var(--color-page-element);
    box-shadow: var(--color-shadow);
    margin: var(--size-spacing-med);
    padding: var(--size-spacing-large);
  }

  nav {
    background-color: var(--color-page-element);
    box-shadow: var(--color-shadow);
    box-sizing: border-box;
    color: var(--color-text);
    display: inline-block;
    font-family: var(--font-family-main);
    font-weight: bold;
    margin-bottom: var(--size-spacing-med);
    padding: var(--size-spacing-med);
    text-align: center;
    text-decoration: none;
  }

  nav.profile {
    display: block;
  }

  ol {
    list-style: none;
    padding: 0;
    padding: 0;
  }

  ul>li {
    align-items: center;
    border-bottom: 2px solid var(--color-page-element);
    border-top: 2px solid var(--color-page-element);
    display: grid;
    font-size: var(--size-type-small);
    font-weight: normal;
    grid-template-columns: repeat(1, 1fr);
    margin: var(--size-spacing-large);
  }

  ul>li:hover {
    align-items: center;
    border-bottom: 2px solid var(--color-page-element);
    border-top: 2px solid var(--color-page-element);
    display: grid;
    font-size: var(--size-type-small);
    font-weight: normal;
    grid-template-columns: repeat(1, 1fr);
    margin: var(--size-spacing-large);
  }

  section.playlist {
    border: 2px solid var(--color-page-background);
    display: block;
    margin: var(--size-spacing-large);
  }
`,S=_`
  * {
      margin: 0;
      box-sizing: border-box;
    }

    body {
      line-height: 1.5;
    }
    
    img {
      max-width: 100%;
    }
`,P=_`
  :root {
      /* Color */
      --color-accent: #858AE3;
      --color-button: #858AE3;
      --color-button-hover: #613DC1;
      --color-page-background: #333;
      --color-page-element: #444;
      --color-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
      --color-text: #fff;

      /* Typography */
      --font-family-main: Tahoma, Verdana, Segoe, sans-serif;
      --size-type-xlarge: 2rem;
      --size-type-large: 1.75rem;
      --size-type-med: 1.25rem;
      --size-type-small: 1rem;
      --size-type-footer: 0.85rem;
      --size-type-input: 1.15rem;
      --size-type-form: 1.5rem;

      /* Spacing */
      --size-spacing-large: 10px;
      --size-spacing-med: 5px;
      --size-spacing-small: 2.5px;
  }

  body.light-mode {
      /* Color */
      --color-page-background: #fff;
      --color-page-element: #eee;
      --color-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
      --color-text: #333;
  }
`;var nn=Object.defineProperty,on=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&nn(t,e,i),i};const Bt=class Bt extends A{constructor(){super(...arguments),this._authObserver=new At(this,"page:auth")}render(){return y`
      <header>
        <nav>
          <a href="/app">Log In</a>
          <a href="/app/profile/${this.username}">Profile</a>
          <a href="/app/users">Users</a>
          <a href="/app/songs">Explore ♬</a>
        </nav>
        <drop-down>
          <a href="#" slot="actuator">
            <slot name="greeting">Hello, ${this.username}!</slot></a>
          <ul>
            <li>
              <label @change=${an}>
                <input type="checkbox" autocomplete="off" />
                Light mode
              </label>
            </li>
            <li>
              <a
                href="/app" @click=${ln}>Sign out</a>
            </li>
          </ul>
        </drop-down>
      </header>
      <h1>♫ GrooveShare ♫</h1>
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this.username=t.username)})}};Bt.uses=T({"drop-down":Or.Element}),Bt.styles=[E,S,P,_`
      ul {
        list-style: none;
        padding: var(--size-spacing-medium);
      }

      ul > li {
        margin: 0px;
        padding: var(--size-spacing-medium);
        border-top: none;
        border-bottom: none;
      }

      h1 {
        background: var(--color-button);
        font-style: italic;
      }
      
      li {
        background: var(--color-page-background);
        display: grid;
        font-size: var(--size-type-small);
        font-weight: normal;
        margin: 0px;
      }
    `];let Ht=Bt;on([x()],Ht.prototype,"username");function an(r){const e=r.target.checked;Gt.relay(r,"light-mode",{checked:e})}function ln(r){Gt.relay(r,"auth:message",["auth/signout"])}const cn={};function hn(r,t,e){switch(console.log("Updating for message:",r),r[0]){case"users/get":dn(e).then(i=>t(n=>({...n,users:i})));break;case"songs/get":un(e).then(i=>t(n=>({...n,songs:i})));break;case"profile/save":pn(r[1],e).then(i=>t(n=>({...n,profile:i}))).then(()=>{const{onSuccess:i}=r[1];i&&i()}).catch(i=>{const{onFailure:n}=r[1];n&&n(i)});break;case"profile/select":fn(r[1],e).then(i=>t(n=>({...n,profile:i})));break;case"playlist/select":gn(r[1],e).then(i=>t(n=>({...n,playlist:i})));break;case"playlist/save":mn(r[1],e).then(i=>t(n=>({...n,playlist:i}))).then(()=>{const{onSuccess:i}=r[1];i&&i()}).catch(i=>{const{onFailure:n}=r[1];n&&n(i)});break;default:const s=r[0];throw new Error(`Unhandled Auth message "${s}"`)}}function un(r){return fetch("/api/songs",{headers:U.headers(r)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Songs:",t),t})}function dn(r){return fetch("/api/profiles/",{headers:U.headers(r)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Users:",t),t})}function pn(r,t){return fetch(`/api/profiles/${r.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...U.headers(t)},body:JSON.stringify(r.profile)}).then(e=>{if(e.status===200)return e.json();throw new Error(`Failed to save profile for ${r.userid}`)}).then(e=>{if(e)return e})}function fn(r,t){return fetch(`/api/profiles/${r.userid}`,{headers:U.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Profile:",e),e})}function gn(r,t){return fetch(`/api/playlists/${r.playlistid}/${r.ownerid}`,{headers:U.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Playlist:",e),e})}function mn(r,t){const e={playlistid:r.playlistid,ownerid:r.ownerid};return fetch(`/api/playlists/${r.playlistid}/${r.ownerid}`,{method:"PUT",headers:{"Content-Type":"application/json",...U.headers(t)},body:JSON.stringify(e)}).then(s=>{if(s.status===200)return s.json();throw new Error(`Failed to save playlist for ${r.playlistid}`)}).then(s=>{if(s)return s})}var yn=Object.defineProperty,vn=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&yn(t,e,i),i};const He=class He extends A{render(){return y`
      <div
        class="avatar"
        style="
        ${this.src?`background-image: url('${this.src}');`:""}
      "></div>
    `}};He.styles=[E,S,P,_`
      :host {
        display: contents;
        --avatar-size: 100px;
      }
      
      .avatar {
        grid-column: key;
        justify-self: end;
        position: relative;
        width: var(--avatar-size);
        aspect-ratio: 1;
        background-size: cover;
        border-radius: 50%;
        text-align: center;
        line-height: var(--avatar-size);
        font-size: calc(0.66 * var(--avatar-size));
        overflow: hidden;
      }
  `];let It=He;vn([x()],It.prototype,"src");var _n=Object.defineProperty,$n=Object.getOwnPropertyDescriptor,lt=(r,t,e,s)=>{for(var i=s>1?void 0:s?$n(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&_n(t,e,i),i};const Ie=class Ie extends A{render(){return y`
      <section>
        <slot name="avatar"></slot>
        <div class="header-container">
          <h2 class="profile"><slot name="name"></slot></h2>
          <nav class="profile">
            <a href="${this.username}/edit" class="edit">Edit</a>
          </nav>
        </div>
        <dl>
          <h3 class="bio">Bio:</h3>
          <h4 class="bio"><slot name="bio"></slot></h4>
          <h3>Playlists:</h3>
          <dd><slot name="playlists"></slot></dd>
        </dl>
      </section>
    `}};Ie.styles=[E,S,P,_`
      h3 {
        font-weight: bold;
      }

      h3.bio, h4.bio {
        text-align: center
      }

      slot[name="avatar"] {
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .header-container {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `];let Dt=Ie;lt([x()],Dt.prototype,"username",2);const qt=class qt extends A{render(){return y`
      <section>
        <slot name="avatar"></slot>
        <div class="header-container">
          <h1><slot name="name"></slot></h1>
          <nav>
            <a class="close" href="../${this.username}">Close</a>
            <button class="delete">Delete</button>
          </nav>
        </div>
        <mu-form .init=${this.init}>
          <label>
            <span>Username</span>
            <input disabled name="userid" />
          </label>
          <label>
            <span>Name</span>
            <input name="name" />
          </label>
          <label>
            <span>Bio</span>
            <input name="bio" />
          </label>
          <label>
            <span>Playlists</span>
            <input-array name="playlists">
              <span slot="label-add">Add a playlist</span>
            </input-array>
          </label>
          <label>
            <span>Avatar</span>
            <input name="avatar" />
          </label>
        </mu-form>
      </section>
    `}};qt.uses=T({"mu-form":Rs.Element,"input-array":ni.Element}),qt.styles=[E,S,P,_`
      mu-form {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      h3 {
        font-weight: bold;
      }

      h3.bio, h4.bio {
        text-align: center
      }

      slot[name="avatar"] {
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      mu-form {
        grid-column: key / end;
      }
      
      mu-form input {
        grid-column: input;
      }

      .header-container {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      button.delete {
        grid-column: input;
        justify-self: start;
        padding: 5px;
        margin: 0.5px;
      }

      button.remove {
        justify-self: start;
        padding: 5px;
      }
    `];let bt=qt;lt([x()],bt.prototype,"username",2);lt([x({attribute:!1})],bt.prototype,"init",2);const Wt=class Wt extends Et{constructor(){super("page:model"),this.edit=!1,this.userid=""}get profile(){return this.model.profile}attributeChangedCallback(t,e,s){super.attributeChangedCallback(t,e,s),t==="user-id"&&e!==s&&s&&(console.log("Profile Page:",s),this.dispatchMessage(["profile/select",{userid:s}]))}render(){const{userid:t,avatar:e,name:s,bio:i,playlists:n=[]}=this.profile||{},o=n.map(a=>y`
          <li>
            <a href="../playlist/${a}/${t}">${a}</a>
          </li>
        `),l=y`
      <profile-avatar slot="avatar" src=${e}></profile-avatar>
    `;return this.edit?y`
        <profile-editor
            username=${t}
            .init=${this.profile}
            @mu-form:submit=${a=>this._handleSubmit(a)}>
            ${l}
        </profile-editor>
      `:y`
        <profile-viewer username=${t}>
          ${l}
          <span slot="name">${s}</span>
          <span slot="bio">${i}</span>
          <ul slot="playlists">
            ${o}
          </ul>
        </profile-viewer>
    `}_handleSubmit(t){console.log("Handling submit of mu-form"),this.dispatchMessage(["profile/save",{userid:this.userid,profile:t.detail,onSuccess:()=>Oe.dispatch(this,"history/navigate",{href:`/app/profile/${this.userid}`}),onFailure:e=>console.log("ERROR:",e)}])}};Wt.uses=T({"profile-viewer":Dt,"profile-avatar":It,"profile-editor":bt}),Wt.styles=[E,S,P,_`
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0px;
      }

      a:hover {
        color: var(--color-button);
      }
    `];let ot=Wt;lt([x({type:Boolean,reflect:!0})],ot.prototype,"edit",2);lt([x({attribute:"user-id",reflect:!0})],ot.prototype,"userid",2);lt([x()],ot.prototype,"profile",1);const De=class De extends A{render(){return y`
        <dl>
          <dd><slot name="users"></slot></dd>
        </dl>
      </section>
    `}};De.styles=[E,S,P,_`
      ol {
        list-style: none;
        margin: 0;
        padding: 0;
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0px;
      }

      .header-container {
        display: flex;
        align-items: center;
      }
    `];let ye=De;const Yt=class Yt extends Et{constructor(){super("page:model")}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["users/get"])}render(){return y`
      </nav>
      <users-viewer>
        <ol slot="users">
          ${(this.model.users||[]).map(s=>y`
            <li>
              <h3><a href="/app/profile/${s.userid}">${s.name}</a></h3>
            </li>
          `)}
        </ol>
      </users-viewer>
    `}};Yt.uses=T({"users-viewer":ye}),Yt.styles=[E,S,P,_`
      nav, a {
        display: flex;
        align-items: center;
        width: fit-content;
        margin: 10px;
        padding: 1px;
      }

      a:hover {
        color: var(--color-button);
      }
    `];let ve=Yt;const Fe=class Fe extends A{_handleChange(t){const e=new CustomEvent("artist-filter:select",{bubbles:!0,composed:!0,detail:{artist:t}});this.dispatchEvent(e)}render(){return y`
      <input
        @change="${t=>{const e=t.target;this._handleChange(e.value)}}"
        placeholder="Filter by artist..."
      >
    `}};Fe.styles=[E,S,P];let _e=Fe;var bn=Object.defineProperty,wn=Object.getOwnPropertyDescriptor,z=(r,t,e,s)=>{for(var i=s>1?void 0:s?wn(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&bn(t,e,i),i};const Be=class Be extends A{constructor(){super(...arguments),this.ownerid=""}render(){return y`
      <section>
        <div class="header-container">
          <h2><slot name="playlistid"></slot></h2>
          <h2><artist-filter></artist-filter></h2>
        </div>
        <div class="header-container2">
          <h3>Title:</h3><h3>Artist:</h3>
        </div>
        <dl>
          <dd><slot name="songs"></slot></dd>
        </dl>
      </section>
    `}};Be.styles=[E,S,P,_`
      ol {
        list-style: none;
        margin: 0;
        padding: 0;
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0px;
      }

      .header-container {
        display: flex;
        align-items: center;
      }

      .header-container2 {
        display: flex;
        align-items: center;
        gap: 255px;
      }
    `];let Ft=Be;z([x({attribute:"owner-id",reflect:!0})],Ft.prototype,"ownerid",2);const Jt=class Jt extends A{constructor(){super(...arguments),this.name="",this.owner=""}render(){return y`
      <section>
        <div class="header-container">
          <h1><slot name="name"></slot></h1>
          <nav>
            <a class="close" href="../${this.name}/${this.owner}">
              Close
            </a>
            <button class="delete">Delete</button>
          </nav>
        </div>
        <mu-form .init=${this.init}>
          <label>
            <span>Songs</span>
            <input-array name="songs">
              <span slot="label-add">Add a song</span>
            </input-array>
          </label>
        </mu-form>
      </section>
    `}};Jt.uses=T({"mu-form":Rs.Element,"input-array":ni.Element}),Jt.styles=[E,S,P,_`
      mu-form {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      h3 {
        font-weight: bold;
      }

      h3.bio, h4.bio {
        text-align: center
      }

      slot[name="avatar"] {
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      mu-form {
        grid-column: key / end;
      }
      
      mu-form input {
        grid-column: input;
      }

      .header-container {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      button.delete {
        grid-column: input;
        justify-self: start;
        padding: 5px;
        margin: 0.5px;
      }

      button.remove {
        justify-self: start;
        padding: 5px;
      }

      nav {
        margin: 8px;
      }
    `];let at=Jt;z([x({attribute:"playlist-id",reflect:!0})],at.prototype,"name",2);z([x({attribute:"owner-id",reflect:!0})],at.prototype,"owner",2);z([x({attribute:!1})],at.prototype,"init",2);const Kt=class Kt extends Et{constructor(){super("page:model"),this.edit=!1,this.playlistid="",this.ownerid="",this.addEventListener("artist-filter:select",t=>{const{detail:e}=t,{artist:s}=e;this.selectedArtist=s})}get playlist(){return this.model.playlist}attributeChangedCallback(t,e,s){super.attributeChangedCallback(t,e,s),t==="playlist-id"&&e!==s&&s?(console.log("Playlist Page:",s),this.dispatchMessage(["playlist/select",{playlistid:s,ownerid:this.ownerid}])):t==="owner-id"&&e!==s&&s&&(console.log("Playlist Page:",s),this.dispatchMessage(["playlist/select",{playlistid:this.playlistid,ownerid:s}]))}render(){const{playlistid:t,songs:e=[]}=this.playlist||{};console.log(`SONGS ${e.map(i=>i.title)}`);const s=()=>{let i;return this.selectedArtist?i=e.filter(n=>{var o;return n.artist.toLocaleLowerCase()===((o=this.selectedArtist)==null?void 0:o.toLocaleLowerCase())}):i=e,i.map(n=>y`
            <li>
              <h3>${n.title}</h3>
              <h4>${n.artist}</h4>
            </li>
          `)};return this.edit?y`
        <playlist-editor
            name=${t}
            owner=${this.ownerid}
            .init=${this.playlist}
            @mu-form:submit=${()=>this._handleSubmit()}>
          </playlist-editor>
      `:y`
        <nav class="profile">
          <a href="/app/playlist/${t}/${this.ownerid}/edit"
            class="edit">
              Edit
          </a>
        </nav>
        <playlist-viewer>
          <span slot="playlistid">${t}</span>
          <ol slot="songs">
            ${s()}
          </ol>
        </playlist-viewer>
    `}_handleSubmit(){console.log("Handling submit of mu-form"),this.dispatchMessage(["playlist/save",{playlistid:this.playlistid,ownerid:this.ownerid,onSuccess:()=>Oe.dispatch(this,"history/navigate",{href:`/app/playlist/${this.playlistid}/${this.ownerid}`}),onFailure:t=>console.log("ERROR:",t)}])}};Kt.uses=T({"playlist-viewer":Ft,"artist-filter":_e,"playlist-editor":at}),Kt.styles=[E,S,P,_`
      nav, a {
        display: flex;
        align-items: center;
        width: fit-content;
        margin: 10px;
        padding: 1px;
      }
    `];let M=Kt;z([x({type:Boolean,reflect:!0})],M.prototype,"edit",2);z([x({attribute:"playlist-id",reflect:!0})],M.prototype,"playlistid",2);z([x({attribute:"owner-id",reflect:!0})],M.prototype,"ownerid",2);z([x()],M.prototype,"playlist",1);z([rn()],M.prototype,"selectedArtist",2);const qe=class qe extends A{render(){return y`
        <dl>
          <dd><slot name="songs"></slot></dd>
        </dl>
      </section>
    `}};qe.styles=[E,S,P,_`
      ol {
        list-style: none;
        margin: 0;
        padding: 0;
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0px;
      }

      .header-container {
        display: flex;
        align-items: center;
      }
    `];let $e=qe;const Vt=class Vt extends Et{constructor(){super("page:model")}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["songs/get"])}render(){return y`
      </nav>
      <song-viewer>
        <ol slot="songs">
          ${(this.model.songs||[]).map(s=>y`
            <li>
              <h3>${s.title}</h3>
              <h4>${s.artist}</h4>
            </li>
          `)}
        </ol>
      </song-viewer>
    `}};Vt.uses=T({"song-viewer":$e}),Vt.styles=[E,S,P,_`
      nav, a {
        display: flex;
        align-items: center;
        width: fit-content;
        margin: 10px;
        padding: 1px;
      }
    `];let be=Vt;T({"restful-form":Ls.FormElement});const We=class We extends A{render(){return y`
      <restful-form new src="/auth/login">
        <slot></slot>
        <!-- <button type="submit" slot="submit">Submit</button> -->
      </restful-form>
    `}get next(){return new URLSearchParams(document.location.search).get("next")}constructor(){super(),this.addEventListener("mu-rest-form:created",t=>{const e=t.detail,{token:s}=e.created,i=this.next||"/";console.log("Login successful",e,i),Gt.relay(t,"auth:message",["auth/signin",{token:s,redirect:i}])})}};We.styles=[E,S,P,_`
      ::slotted(*) {
        padding: 8px;
      }

      button {
        grid-column: input;
        justify-self: start;
        padding: 5px;
        margin: 0px;
      }

      restful-form {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `];let we=We;T({"mu-auth":U.Provider,"login-form":we});const Ye=class Ye extends A{render(){return y`
      <body class="page">
        <mu-auth>
          <h2>User Login</h2>
          <main class="card">
            <login-form>
              <label>
                <span>Username:</span>
                <input name="username" autocomplete="off" />
              </label>
              <label>
                <span>Password:</span>
                <input type="password" name="password" />
              </label>
            </login-form>
          </main>
          <p>
            Or did you want to
            <a href="/app/register">Sign up as a new user</a>?
          </p>
        </mu-auth>
      </body>
    `}};Ye.styles=[_`
      login-form::slotted(button) {
        background-color: var(--color-button);
        border: none;
        color: var(--color-text);
        cursor: pointer;
        font-size: var(--size-type-small);
        font-weight: bold;
        margin: var(--size-spacing-med);
        padding: var(--size-spacing-large);
      }

      a {
        text-decoration: none;
        color: #007BFF;
        font-weight: bold;
        font-size: var(--size-type-footer);
        padding: 5px 10px;
        border-radius: 4px;
        transition: background-color 0.3s, color 0.3s;
      }

      a:hover {
        background-color: #007BFF;
        color: white;
      }

      a:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
      }

      button:hover {
        background-color: var(--color-button-hover);
      }

      .page {
        height: 100vh;
        grid-template-rows: 1fr fit-content(1fr) 1fr;
      }

      main.card {
        align-self: center;
        grid-column: 3 / span 4;
      }

      h2 {
        text-align: center;
      }

      p {
        grid-column: 2 / -2;
        text-align: center;
      }
    `];let Ae=Ye;T({"restful-form":Ls.FormElement});const Je=class Je extends A{render(){return y`
      <restful-form new src="/auth/register">
        <slot></slot>
        <!-- <button slot="submit" type="submit">Submit</button> -->
      </restful-form>
    `}get next(){return new URLSearchParams(document.location.search).get("next")}constructor(){super(),this.addEventListener("mu-rest-form:created",t=>{const e=t.detail,{token:s}=e.created,i=this.next||"/";console.log("Signup successful",e,i),Gt.relay(t,"auth:message",["auth/signin",{token:s,redirect:i}])})}};Je.styles=[E,S,P,_`
      ::slotted(*) {
        padding: 8px;
      }

      button {
        grid-column: input;
        justify-self: start;
        padding: 5px;
        margin: 0px;
      }

      restful-form {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `];let xe=Je;T({"mu-auth":U.Provider,"signup-form":xe});const Ke=class Ke extends A{render(){return y`
    </head>
    <body class="page">
      <mu-auth>
        <h2>New User Registration</h2>
        <main class="card">
          <signup-form>
            <label>
              <span>Username:</span>
              <input name="username" autocomplete="off" />
            </label>
            <label>
              <span>Password:</span>
              <input type="password" name="password" />
            </label>
          </signup-form>
        </main>
        <p>
          Already have an account and want to
          <a href="/app">Log In</a>
          instead?
        </p>
      </mu-auth>
      </body>
    `}};Ke.styles=[_`
      .page {
        height: 100vh;
        grid-template-rows: 1fr fit-content(1fr) 1fr;
      }

      a {
        text-decoration: none;
        color: #007BFF;
        font-weight: bold;
        font-size: var(--size-type-footer);
        padding: 5px 10px;
        border-radius: 4px;
        transition: background-color 0.3s, color 0.3s;
      }

      a:hover {
        background-color: #007BFF;
        color: white;
      }

      a:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
      }

      main.card {
        align-self: center;
        grid-column: 3 / span 4;
      }

      h2 {
        grid-column: start / end;
        align-self: end;
        text-align: center;
      }
      
      p {
        grid-column: 2 / -2;
        text-align: center;
      }
    `];let Ee=Ke;const An=[{path:"/app/songs",view:()=>y`
      <song-view></song-view>
    `},{path:"/app/users",view:()=>y`
      <users-view></users-view>
    `},{path:"/app/profile/:id",view:r=>y`
      <profile-view user-id=${r.id}></profile-view>
    `},{path:"/app/profile/:id/edit",view:r=>y`
      <profile-view edit user-id=${r.id}></profile-view>
    `},{path:"/app/playlist/:id/:owner",view:r=>y`
      <playlist-view playlist-id=${r.id} owner-id=${r.owner}>
      </playlist-view>
    `},{path:"/app/playlist/:id/:owner/edit",view:r=>y`
      <playlist-view edit playlist-id=${r.id} owner-id=${r.owner}>
      </playlist-view>
    `},{path:"/app/register",view:()=>y`
      <registration-view></registration-view>
    `},{path:"/app",view:()=>y`
      <landing-view></landing-view>
    `},{path:"/",redirect:"/app"}];T({"mu-auth":U.Provider,"mu-store":class extends Mi.Provider{constructor(){super(hn,cn,"page:auth")}},"mu-history":Oe.Provider,"mu-switch":class extends kr.Element{constructor(){super(An,"page:history")}},"landing-view":Ae,"registration-view":Ee,"users-view":ve,"profile-view":ot,"playlist-view":M,"song-view":be,"page-header":Ht});

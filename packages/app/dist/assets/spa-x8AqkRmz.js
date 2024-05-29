import{u as M,f as S,s as g,O as U,d as v,x as n,i as f,e as _,D as T,a as b,V as j,b as q,h as A,_ as L}from"./lit-element-C29doGuC.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:S},B=(s=N,e,t)=>{const{kind:a,metadata:i}=t;let l=globalThis.litPropertyMetadata.get(i);if(l===void 0&&globalThis.litPropertyMetadata.set(i,l=new Map),l.set(t.name,s),a==="accessor"){const{name:r}=t;return{set(o){const m=e.get.call(this);e.set.call(this,o),this.requestUpdate(r,m,s)},init(o){return o!==void 0&&this.P(r,void 0,s),o}}}if(a==="setter"){const{name:r}=t;return function(o){const m=this[r];e.call(this,o),this.requestUpdate(r,m,s)}}throw Error("Unsupported decorator location: "+a)};function d(s){return(e,t)=>typeof t=="object"?B(s,e,t):((a,i,l)=>{const r=i.hasOwnProperty(l);return i.constructor.createProperty(l,r?{...a,wrapped:!0}:a),r?Object.getOwnPropertyDescriptor(i,l):void 0})(s,e,t)}var J=Object.defineProperty,F=(s,e,t,a)=>{for(var i=void 0,l=s.length-1,r;l>=0;l--)(r=s[l])&&(i=r(e,t,i)||i);return i&&J(e,t,i),i};const h=class h extends g{constructor(){super(...arguments),this.username="anonymous",this._authObserver=new U(this,"page:auth")}render(){return n`
      <header>
        <h1>My App</h1>
        <drop-down>
          <a href="#" slot="actuator">
            <slot name="greeting">Hello, ${this.username}</slot></a>
          <ul>
            <li>
              <label @change=${G}>
                <input type="checkbox" autocomplete="off" />
                Light mode
              </label>
            </li>
            <li>
              <a
                href="#" @click=${I}>Sign out</a>
            </li>
          </ul>
        </drop-down>
      </header>
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:e})=>{e&&(this.username=e.username)})}};h.uses=v({"drop-down":T}),h.styles=f`
    :host {
      display: contents;
    }
    * {
      margin: 0;
      box-sizing: border-box;
    }
    header {
      grid-column: start / end;
      margin: 0 calc(-0.5);
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding: var(--size-spacing-med);
      background-color: var(--color-page-background);
      color: var(--color-text);
    }
    header a[href] {
      color: var(--color--age-element);
    }
    h1 {
      font-family: var(--font-family-main);
      font-size: var(--size-type-xlarge);
      font-style: oblique;
      line-height: 1;
    }
    ul {
      list-style: none;
      padding: var(--size-spacing-med);
    }
  `;let u=h;F([d()],u.prototype,"username");function G(s){const t=s.target.checked;_.relay(s,"light-mode",{checked:t})}function I(s){_.relay(s,"auth:message",["auth/signout"])}const K={};function Q(s,e,t){switch(s[0]){case"profile/save":R(s[1],t).then(i=>e(l=>({...l,profile:i})));break;case"profile/select":W(s[1],t).then(i=>e(l=>({...l,profile:i})));break;case"playlist/select":X(s[1],t).then(i=>e(l=>({...l,playlist:i})));break;default:const a=s[0];throw new Error(`Unhandled Auth message "${a}"`)}}function R(s,e){return fetch(`/api/profiles/${s.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...b.headers(e)},body:JSON.stringify(s.profile)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return t})}function W(s,e){return fetch(`/api/profiles/${s.userid}`,{headers:b.headers(e)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Profile:",t),t})}function X(s,e){return fetch(`/api/playlists/${s.playlistid}`,{headers:b.headers(e)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Playlist:",t),t})}var Y=Object.defineProperty,Z=Object.getOwnPropertyDescriptor,x=(s,e,t,a)=>{for(var i=a>1?void 0:a?Z(e,t):e,l=s.length-1,r;l>=0;l--)(r=s[l])&&(i=(a?r(e,t,i):r(i))||i);return a&&i&&Y(e,t,i),i};const $=class $ extends g{render(){return n`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <nav>
          <button class="new">New…</button>
          <button class="edit">Edit</button>
          <button class="close">Close</button>
          <button class="delete">Delete</button>
        </nav>
        <dl>
          <dt>Bio</dt>
          <dd><slot name="bio"></slot></dd>
          <dt>Playlists</dt>
          <dd><slot name="playlists"></slot></dd>
        </dl>
        <a href="/app/playlist/Test Playlist">click</a>
      </section>
    `}};$.styles=f`
    :host {
      --display-new-button: inline-block;
      --display-edit-button: inline-block;
      --display-close-button: none;
      --display-delete-button: none;
    }
    :host([mode="edit"]) {
      --display-new-button: none;
      --display-edit-button: none;
      --display-close-button: inline-block;
      --display-delete-button: inline-block;
    }
    :host([mode="new"]) {
      --display-new-button: none;
      --display-edit-button: none;
      --display-close-button: inline-block;
    }
    * {
      margin: 0;
      box-sizing: border-box;
    }
    section {
      display: grid;
      grid-template-columns: [key] 1fr [value] 3fr [controls] 1fr [end];
      gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
      align-items: end;
    }
    h1 {
      grid-row: 4;
      grid-column: value;
    }
    slot[name="avatar"] {
      display: block;
      grid-row: 1 / span 4;
    }
    nav {
      display: contents;
      text-align: right;
    }
    nav > * {
      grid-column: controls;
    }
    nav > .new {
      display: var(--display-new-button);
    }
    nav > .edit {
      display: var(--display-edit-button);
    }
    nav > .close {
      display: var(--display-close-button);
    }
    nav > .delete {
      display: var(--display-delete-button);
    }
    restful-form {
      display: none;
      grid-column: key / end;
    }
    restful-form input {
      grid-column: input;
    }
    restful-form[src] {
      display: block;
    }
    dl {
      display: grid;
      grid-column: key / end;
      grid-template-columns: subgrid;
      gap: 0 var(--size-spacing-xlarge);
      align-items: baseline;
    }
    restful-form[src] + dl {
      display: none;
    }
    dt {
      grid-column: key;
      justify-self: end;
      color: var(--color-accent);
      font-family: var(--font-family-display);
    }
    dd {
      grid-column: value;
    }
    ::slotted(ul) {
      list-style: none;
      display: flex;
      gap: var(--size-spacing-medium);
    }
  `;let w=$;const z=class z extends g{render(){return n`
      <div
        class="avatar"
        style="
        ${this.src?`background-image: url('${this.src}');`:""}
      "></div>
    `}};z.styles=f`
    :host {
      display: contents;
      --avatar-backgroundColor: var(--color-accent);
      --avatar-size: 100px;
    }
    .avatar {
      grid-column: key;
      justify-self: end;
      position: relative;
      width: var(--avatar-size);
      aspect-ratio: 1;
      background-color: var(--avatar-backgroundColor);
      background-size: cover;
      border-radius: 50%;
      text-align: center;
      line-height: var(--avatar-size);
      font-size: calc(0.66 * var(--avatar-size));
      font-family: var(--font-family-display);
      color: var(--color-link-inverted);
      overflow: hidden;
    }
  `;let y=z;x([d()],y.prototype,"src",2);const C=class C extends j{constructor(){super("page:model"),this.userid=""}get profile(){return this.model.profile}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),e==="user-id"&&t!==a&&a&&(console.log("Profile Page:",a),this.dispatchMessage(["profile/select",{userid:a}]))}render(){const{avatar:e,name:t,bio:a,playlists:i=[]}=this.profile||{},l=i.map(r=>n`
          <li>${r}</li>
        `);return n`
      <profile-viewer>
        <profile-avatar slot="avatar" src=${e}></profile-avatar>
        <span slot="name">${t}</span>
        <span slot="bio">${a}</span>
        <ul slot="playlists">
          ${l}
        </ul>
      </profile-viewer>
    `}};C.uses=v({"profile-viewer":w,"profile-avatar":y});let c=C;x([d({attribute:"user-id",reflect:!0})],c.prototype,"userid",2);x([d()],c.prototype,"profile",1);var H=Object.defineProperty,E=Object.getOwnPropertyDescriptor,D=(s,e,t,a)=>{for(var i=a>1?void 0:a?E(e,t):e,l=s.length-1,r;l>=0;l--)(r=s[l])&&(i=(a?r(e,t,i):r(i))||i);return a&&i&&H(e,t,i),i};const O=class O extends g{render(){return n`
      <section>
        <h2><slot name="playlistid"></slot></h2>
        <dl>
          <dt>Songs</dt>
          <dd><slot name="songs"></slot></dd>
        </dl>
      </section>
    `}};O.styles=f`
    :host {
      --display-new-button: inline-block;
      --display-edit-button: inline-block;
      --display-close-button: none;
      --display-delete-button: none;
    }
    :host([mode="edit"]) {
      --display-new-button: none;
      --display-edit-button: none;
      --display-close-button: inline-block;
      --display-delete-button: inline-block;
    }
    :host([mode="new"]) {
      --display-new-button: none;
      --display-edit-button: none;
      --display-close-button: inline-block;
    }
    * {
      margin: 0;
      box-sizing: border-box;
    }
    section {
      display: grid;
      grid-template-columns: [key] 1fr [value] 3fr [controls] 1fr [end];
      gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
      align-items: end;
    }
    h1 {
      grid-row: 4;
      grid-column: value;
    }
    slot[name="avatar"] {
      display: block;
      grid-row: 1 / span 4;
    }
    nav {
      display: contents;
      text-align: right;
    }
    nav > * {
      grid-column: controls;
    }
    nav > .new {
      display: var(--display-new-button);
    }
    nav > .edit {
      display: var(--display-edit-button);
    }
    nav > .close {
      display: var(--display-close-button);
    }
    nav > .delete {
      display: var(--display-delete-button);
    }
    restful-form {
      display: none;
      grid-column: key / end;
    }
    restful-form input {
      grid-column: input;
    }
    restful-form[src] {
      display: block;
    }
    dl {
      display: grid;
      grid-column: key / end;
      grid-template-columns: subgrid;
      gap: 0 var(--size-spacing-xlarge);
      align-items: baseline;
    }
    restful-form[src] + dl {
      display: none;
    }
    dt {
      grid-column: key;
      justify-self: end;
      color: var(--color-accent);
      font-family: var(--font-family-display);
    }
    dd {
      grid-column: value;
    }
    ::slotted(ul) {
      list-style: none;
      display: flex;
      gap: var(--size-spacing-medium);
    }
  `;let k=O;const P=class P extends j{constructor(){super("page:model"),this.playlistid=""}get playlist(){return this.model.playlist}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),e==="playlist-id"&&t!==a&&a&&(console.log("Playlist Page:",a),this.dispatchMessage(["playlist/select",{playlistid:a}]))}render(){const{playlistid:e,songs:t=[]}=this.playlist||{};console.log(t);const a=t.map(i=>n`
          <li>${i.title} ${i.artist}</li>
        `);return n`
      <playlist-viewer>
        <span slot="playlistid">${e}</span>
        <ul slot="songs">
          ${a}
        </ul>
      </playlist-viewer>
    `}};P.uses=v({"playlist-viewer":k});let p=P;D([d({attribute:"playlist-id",reflect:!0})],p.prototype,"playlistid",2);D([d()],p.prototype,"playlist",1);const V=[{path:"/app/profile/:id",view:s=>n`
      <profile-view user-id=${s.id}></profile-view>
    `},{path:"/app/playlist/:id",view:s=>n`
      <playlist-view playlist-id=${s.id}></playlist-view>
    `},{path:"/",redirect:"/app"}];v({"mu-auth":b.Provider,"mu-store":class extends q.Provider{constructor(){super(Q,K,"page:auth")}},"mu-history":A.Provider,"mu-switch":class extends L.Element{constructor(){super(V,"page:history")}},"profile-view":c,"playlist-view":p,"page-header":u});

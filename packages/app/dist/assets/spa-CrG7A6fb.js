import{u as T,f as F,i as m,s as g,O as E,d as v,a as R,x as n,e as j,b as z,c as q,g as B,V as A,h as S,j as J,_ as G}from"./lit-element-BV8raNrG.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I={attribute:!0,type:String,converter:T,reflect:!1,hasChanged:F},K=(a=I,t,e)=>{const{kind:i,metadata:r}=e;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),s.set(e.name,a),i==="accessor"){const{name:o}=e;return{set(d){const p=t.get.call(this);t.set.call(this,d),this.requestUpdate(o,p,a)},init(d){return d!==void 0&&this.P(o,void 0,a),d}}}if(i==="setter"){const{name:o}=e;return function(d){const p=this[o];t.call(this,d),this.requestUpdate(o,p,a)}}throw Error("Unsupported decorator location: "+i)};function l(a){return(t,e)=>typeof e=="object"?K(a,t,e):((i,r,s)=>{const o=r.hasOwnProperty(s);return r.constructor.createProperty(s,o?{...i,wrapped:!0}:i),o?Object.getOwnPropertyDescriptor(r,s):void 0})(a,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function N(a){return l({...a,state:!0,attribute:!1})}const M=m`
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
    border-bottom: 2px solid var(--color-page-background);
    border-top: 2px solid var(--color-page-background);
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
    border-bottom: none;
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

  section.playlist {
    border: 2px solid var(--color-page-background);
    display: block;
    margin: var(--size-spacing-large);
  }
`,D=m`
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
`,U=m`
  :root {
      /* Color */
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
`;var Q=Object.defineProperty,W=(a,t,e,i)=>{for(var r=void 0,s=a.length-1,o;s>=0;s--)(o=a[s])&&(r=o(t,e,r)||r);return r&&Q(t,e,r),r};const w=class w extends g{constructor(){super(...arguments),this.username="anonymous",this._authObserver=new E(this,"page:auth")}render(){return n`
      <header>
        <h1>My App</h1>
        <drop-down>
          <a href="#" slot="actuator">
            <slot name="greeting">Hello, ${this.username}</slot></a>
          <ul>
            <li>
              <label @change=${X}>
                <input type="checkbox" autocomplete="off" />
                Light mode
              </label>
            </li>
            <li>
              <a
                href="#" @click=${Y}>Sign out</a>
            </li>
          </ul>
        </drop-down>
      </header>
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this.username=t.username)})}};w.uses=v({"drop-down":R.Element}),w.styles=[M,D,U];let y=w;W([l()],y.prototype,"username");function X(a){const e=a.target.checked;j.relay(a,"light-mode",{checked:e})}function Y(a){j.relay(a,"auth:message",["auth/signout"])}const Z={};function H(a,t,e){switch(console.log("Updating for message:",a),a[0]){case"profile/save":V(a[1],e).then(r=>t(s=>({...s,profile:r}))).then(()=>{const{onSuccess:r}=a[1];r&&r()}).catch(r=>{const{onFailure:s}=a[1];s&&s(r)});break;case"profile/select":ee(a[1],e).then(r=>t(s=>({...s,profile:r})));break;case"playlist/select":te(a[1],e).then(r=>t(s=>({...s,playlist:r})));break;default:const i=a[0];throw new Error(`Unhandled Auth message "${i}"`)}}function V(a,t){return fetch(`/api/profiles/${a.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...z.headers(t)},body:JSON.stringify(a.profile)}).then(e=>{if(e.status===200)return e.json();throw new Error(`Failed to save profile for ${a.userid}`)}).then(e=>{if(e)return e})}function ee(a,t){return fetch(`/api/profiles/${a.userid}`,{headers:z.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Profile:",e),e})}function te(a,t){return fetch(`/api/playlists/${a.playlistid}/${a.ownerid}`,{headers:z.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Playlist:",e),e})}var re=Object.defineProperty,ae=(a,t,e,i)=>{for(var r=void 0,s=a.length-1,o;s>=0;s--)(o=a[s])&&(r=o(t,e,r)||r);return r&&re(t,e,r),r};const k=class k extends g{render(){return n`
      <div
        class="avatar"
        style="
        ${this.src?`background-image: url('${this.src}');`:""}
      "></div>
    `}};k.styles=[M,D,U,m`
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
  `];let b=k;ae([l()],b.prototype,"src");var ie=Object.defineProperty,se=Object.getOwnPropertyDescriptor,h=(a,t,e,i)=>{for(var r=i>1?void 0:i?se(t,e):t,s=a.length-1,o;s>=0;s--)(o=a[s])&&(r=(i?o(t,e,r):o(r))||r);return i&&r&&ie(t,e,r),r};class L extends g{render(){return n`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <nav>
          <a href="${this.username}/edit" class="edit">Edit</a>
        </nav>
        <dl>
          <dt>Bio</dt>
          <dd><slot name="bio"></slot></dd>
          <dt>Playlists</dt>
          <dd><slot name="playlists"></slot></dd>
        </dl>
      </section>
    `}}h([l()],L.prototype,"username",2);const C=class C extends g{render(){return n`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <nav>
          <a class="close" href="../${this.username}">Close</a>
          <button class="delete">Delete</button>
        </nav>
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
    `}};C.uses=v({"mu-form":q.Element,"input-array":B.Element});let f=C;h([l()],f.prototype,"username",2);h([l({attribute:!1})],f.prototype,"init",2);const P=class P extends A{constructor(){super("page:model"),this.edit=!1,this.userid=""}get profile(){return this.model.profile}attributeChangedCallback(t,e,i){super.attributeChangedCallback(t,e,i),t==="user-id"&&e!==i&&i&&(console.log("Profile Page:",i),this.dispatchMessage(["profile/select",{userid:i}]))}render(){const{userid:t,avatar:e,name:i,bio:r,playlists:s=[]}=this.profile||{},o=s.map(p=>n`
          <li>
            <a href="../playlist/${p}/${t}">${p}</a>
          </li>
        `),d=n`
      <profile-avatar slot="avatar" src=${e}></profile-avatar>
    `;return this.edit?n`
        <profile-editor
            username=${t}
            .init=${this.profile}
            @mu-form:submit=${p=>this._handleSubmit(p)}>
            ${d}
          </profile-editor>
      `:n`
        <profile-viewer username=${t}>
          ${d}
          <span slot="name">${i}</span>
          <span slot="bio">${r}</span>
          <ul slot="playlists">
            ${o}
          </ul>
        </profile-viewer>
    `}_handleSubmit(t){console.log("Handling submit of mu-form"),this.dispatchMessage(["profile/save",{userid:this.userid,profile:t.detail,onSuccess:()=>S.dispatch(this,"history/navigate",{href:`/app/profile/${this.userid}`}),onFailure:e=>console.log("ERROR:",e)}])}};P.uses=v({"profile-viewer":L,"profile-avatar":b,"profile-editor":f});let u=P;h([l({type:Boolean,reflect:!0})],u.prototype,"edit",2);h([l({attribute:"user-id",reflect:!0})],u.prototype,"userid",2);h([l()],u.prototype,"profile",1);class oe extends g{_handleChange(t){const e=new CustomEvent("artist-filter:select",{bubbles:!0,composed:!0,detail:{artist:t}});this.dispatchEvent(e)}render(){return n`
      <input @change="${t=>{const e=t.target;this._handleChange(e.value)}}">
    `}}var ne=Object.defineProperty,le=Object.getOwnPropertyDescriptor,x=(a,t,e,i)=>{for(var r=i>1?void 0:i?le(t,e):t,s=a.length-1,o;s>=0;s--)(o=a[s])&&(r=(i?o(t,e,r):o(r))||r);return i&&r&&ne(t,e,r),r};const _=class _ extends g{render(){return n`
      <section>
        <h2><slot name="playlistid"></slot></h2>
        <dl>
          <dt>Songs</dt>
          <dd><slot name="songs"></slot></dd>
        </dl>
      </section>
    `}};_.styles=m`
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
  `;let $=_;const O=class O extends A{constructor(){super("page:model"),this.playlistid="",this.ownerid="",this.addEventListener("artist-filter:select",t=>{const{detail:e}=t,{artist:i}=e;this.selectedArtist=i})}get playlist(){return this.model.playlist}attributeChangedCallback(t,e,i){super.attributeChangedCallback(t,e,i),t==="playlist-id"&&e!==i&&i?(console.log("Playlist Page:",i),this.dispatchMessage(["playlist/select",{playlistid:i,ownerid:this.ownerid}])):t==="owner-id"&&e!==i&&i&&(console.log("Playlist Page:",i),this.dispatchMessage(["playlist/select",{playlistid:this.playlistid,ownerid:i}]))}render(){const{playlistid:t,songs:e=[]}=this.playlist||{};return console.log(e),n`
      <artist-filter></artist-filter>
      <playlist-viewer>
        <span slot="playlistid">${t}</span>
        <ul slot="songs">
          ${this.selectedArtist?e.filter(r=>{var s;return r.artist.toLocaleLowerCase()===((s=this.selectedArtist)==null?void 0:s.toLocaleLowerCase())}).map(r=>n`
              <li>${r.title} ${r.artist}</li>
            `):e.map(r=>n`
              <li>${r.title} ${r.artist}</li>
            `)}
        </ul>
      </playlist-viewer>
    `}};O.uses=v({"playlist-viewer":$,"artist-filter":oe});let c=O;x([l({attribute:"playlist-id",reflect:!0})],c.prototype,"playlistid",2);x([l({attribute:"owner-id",reflect:!0})],c.prototype,"ownerid",2);x([l()],c.prototype,"playlist",1);x([N()],c.prototype,"selectedArtist",2);const de=[{path:"/app/profile/:id",view:a=>n`
      <profile-view user-id=${a.id}></profile-view>
    `},{path:"/app/profile/:id/edit",view:a=>n`
      <profile-view edit user-id=${a.id}></profile-view>
    `},{path:"/app/playlist/:id/:owner",view:a=>n`
      <playlist-view playlist-id=${a.id} owner-id=${a.owner}>
      </playlist-view>
    `},{path:"/",redirect:"/app"}];v({"mu-auth":z.Provider,"mu-store":class extends J.Provider{constructor(){super(H,Z,"page:auth")}},"mu-history":S.Provider,"mu-switch":class extends G.Element{constructor(){super(de,"page:history")}},"profile-view":u,"playlist-view":c,"page-header":y});

import{_ as o,n as c,h as $,i as C,t as A,I as f,m as L,a as d,u as m,k as I,R as B,D as h,B as R,s as M}from"./index-CgJD-gYR.js";class v extends ${constructor(){super(...arguments),this.inset=!1,this.insetStart=!1,this.insetEnd=!1}}o([c({type:Boolean,reflect:!0})],v.prototype,"inset",void 0);o([c({type:Boolean,reflect:!0,attribute:"inset-start"})],v.prototype,"insetStart",void 0);o([c({type:Boolean,reflect:!0,attribute:"inset-end"})],v.prototype,"insetEnd",void 0);const N=C`:host{box-sizing:border-box;color:var(--md-divider-color,var(--md-sys-color-outline-variant,#cac4d0));display:flex;height:var(--md-divider-thickness,1px);width:100%}:host([inset-start]),:host([inset]){padding-inline-start:16px}:host([inset-end]),:host([inset]){padding-inline-end:16px}:host::before{background:currentColor;content:"";height:100%;width:100%}@media(forced-colors:active){:host::before{background:CanvasText}}`;let y=class extends v{};y.styles=[N];y=o([A("md-divider")],y);function H(a,t){t.bubbles&&(!a.shadowRoot||t.composed)&&t.stopPropagation();const e=Reflect.construct(t.constructor,[t.type,t]),i=a.dispatchEvent(e);return i||t.preventDefault(),i}const V={dialog:[[[{transform:"translateY(-50px)"},{transform:"translateY(0)"}],{duration:500,easing:f.EMPHASIZED}]],scrim:[[[{opacity:0},{opacity:.32}],{duration:500,easing:"linear"}]],container:[[[{opacity:0},{opacity:1}],{duration:50,easing:"linear",pseudoElement:"::before"}],[[{height:"35%"},{height:"100%"}],{duration:500,easing:f.EMPHASIZED,pseudoElement:"::before"}]],headline:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],content:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:0},{opacity:0,offset:.5},{opacity:1}],{duration:300,easing:"linear",fill:"forwards"}]]},W={dialog:[[[{transform:"translateY(0)"},{transform:"translateY(-50px)"}],{duration:150,easing:f.EMPHASIZED_ACCELERATE}]],scrim:[[[{opacity:.32},{opacity:0}],{duration:150,easing:"linear"}]],container:[[[{height:"100%"},{height:"35%"}],{duration:150,easing:f.EMPHASIZED_ACCELERATE,pseudoElement:"::before"}],[[{opacity:"1"},{opacity:"0"}],{delay:100,duration:50,easing:"linear",pseudoElement:"::before"}]],headline:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],content:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]]};const Z=L($);class s extends Z{get open(){return this.isOpen}set open(t){t!==this.isOpen&&(this.isOpen=t,t?(this.setAttribute("open",""),this.show()):(this.removeAttribute("open"),this.close()))}constructor(){super(),this.quick=!1,this.returnValue="",this.noFocusTrap=!1,this.getOpenAnimation=()=>V,this.getCloseAnimation=()=>W,this.isOpen=!1,this.isOpening=!1,this.isConnectedPromise=this.getIsConnectedPromise(),this.isAtScrollTop=!1,this.isAtScrollBottom=!1,this.nextClickIsFromContent=!1,this.hasHeadline=!1,this.hasActions=!1,this.hasIcon=!1,this.escapePressedWithoutCancel=!1,this.treewalker=document.createTreeWalker(this,NodeFilter.SHOW_ELEMENT),this.addEventListener("submit",this.handleSubmit)}async show(){var i;this.isOpening=!0,await this.isConnectedPromise,await this.updateComplete;const t=this.dialog;if(t.open||!this.isOpening){this.isOpening=!1;return}if(!this.dispatchEvent(new Event("open",{cancelable:!0}))){this.open=!1,this.isOpening=!1;return}t.showModal(),this.open=!0,this.scroller&&(this.scroller.scrollTop=0),(i=this.querySelector("[autofocus]"))==null||i.focus(),await this.animateDialog(this.getOpenAnimation()),this.dispatchEvent(new Event("opened")),this.isOpening=!1}async close(t=this.returnValue){if(this.isOpening=!1,!this.isConnected){this.open=!1;return}await this.updateComplete;const e=this.dialog;if(!e.open||this.isOpening){this.open=!1;return}const i=this.returnValue;if(this.returnValue=t,!this.dispatchEvent(new Event("close",{cancelable:!0}))){this.returnValue=i;return}await this.animateDialog(this.getCloseAnimation()),e.close(t),this.open=!1,this.dispatchEvent(new Event("closed"))}connectedCallback(){super.connectedCallback(),this.isConnectedPromiseResolve()}disconnectedCallback(){super.disconnectedCallback(),this.isConnectedPromise=this.getIsConnectedPromise()}render(){const t=this.open&&!(this.isAtScrollTop&&this.isAtScrollBottom),e={"has-headline":this.hasHeadline,"has-actions":this.hasActions,"has-icon":this.hasIcon,scrollable:t,"show-top-divider":t&&!this.isAtScrollTop,"show-bottom-divider":t&&!this.isAtScrollBottom},i=this.open&&!this.noFocusTrap,n=I`<div class="focus-trap" tabindex="0" aria-hidden="true" @focus="${this.handleFocusTrapFocus}"></div>`,{ariaLabel:r}=this;return I`<div class="scrim"></div><dialog class="${B(e)}" aria-label="${r||h}" aria-labelledby="${this.hasHeadline?"headline":h}" role="${this.type==="alert"?"alertdialog":h}" @cancel="${this.handleCancel}" @click="${this.handleDialogClick}" @close="${this.handleClose}" @keydown="${this.handleKeydown}" .returnValue="${this.returnValue||h}">${i?n:h}<div class="container" @click="${this.handleContentClick}"><div class="headline"><div class="icon" aria-hidden="true"><slot name="icon" @slotchange="${this.handleIconChange}"></slot></div><h2 id="headline" aria-hidden="${!this.hasHeadline||h}"><slot name="headline" @slotchange="${this.handleHeadlineChange}"></slot></h2><md-divider></md-divider></div><div class="scroller"><div class="content"><div class="top anchor"></div><slot name="content"></slot><div class="bottom anchor"></div></div></div><div class="actions"><md-divider></md-divider><slot name="actions" @slotchange="${this.handleActionsChange}"></slot></div></div>${i?n:h}</dialog>`}firstUpdated(){this.intersectionObserver=new IntersectionObserver(t=>{for(const e of t)this.handleAnchorIntersection(e)},{root:this.scroller}),this.intersectionObserver.observe(this.topAnchor),this.intersectionObserver.observe(this.bottomAnchor)}handleDialogClick(){if(this.nextClickIsFromContent){this.nextClickIsFromContent=!1;return}this.dispatchEvent(new Event("cancel",{cancelable:!0}))&&this.close()}handleContentClick(){this.nextClickIsFromContent=!0}handleSubmit(t){const e=t.target,{submitter:i}=t;e.method!=="dialog"||!i||this.close(i.getAttribute("value")??this.returnValue)}handleCancel(t){if(t.target!==this.dialog)return;this.escapePressedWithoutCancel=!1;const e=!H(this,t);t.preventDefault(),!e&&this.close()}handleClose(){var t;this.escapePressedWithoutCancel&&(this.escapePressedWithoutCancel=!1,(t=this.dialog)==null||t.dispatchEvent(new Event("cancel",{cancelable:!0})))}handleKeydown(t){t.key==="Escape"&&(this.escapePressedWithoutCancel=!0,setTimeout(()=>{this.escapePressedWithoutCancel=!1}))}async animateDialog(t){var k;if((k=this.cancelAnimations)==null||k.abort(),this.cancelAnimations=new AbortController,this.quick)return;const{dialog:e,scrim:i,container:n,headline:r,content:l,actions:p}=this;if(!e||!i||!n||!r||!l||!p)return;const{container:u,dialog:E,scrim:_,headline:g,content:D,actions:O}=t,z=[[e,E??[]],[i,_??[]],[n,u??[]],[r,g??[]],[l,D??[]],[p,O??[]]],F=[];for(const[b,P]of z)for(const S of P){const T=b.animate(...S);this.cancelAnimations.signal.addEventListener("abort",()=>{T.cancel()}),F.push(T)}await Promise.all(F.map(b=>b.finished.catch(()=>{})))}handleHeadlineChange(t){const e=t.target;this.hasHeadline=e.assignedElements().length>0}handleActionsChange(t){const e=t.target;this.hasActions=e.assignedElements().length>0}handleIconChange(t){const e=t.target;this.hasIcon=e.assignedElements().length>0}handleAnchorIntersection(t){const{target:e,isIntersecting:i}=t;e===this.topAnchor&&(this.isAtScrollTop=i),e===this.bottomAnchor&&(this.isAtScrollBottom=i)}getIsConnectedPromise(){return new Promise(t=>{this.isConnectedPromiseResolve=t})}handleFocusTrapFocus(t){var g;const[e,i]=this.getFirstAndLastFocusableChildren();if(!e||!i){(g=this.dialog)==null||g.focus();return}const n=t.target===this.firstFocusTrap,r=!n,l=t.relatedTarget===e,p=t.relatedTarget===i,u=!l&&!p;if(r&&p||n&&u){e.focus();return}if(n&&l||r&&u){i.focus();return}}getFirstAndLastFocusableChildren(){if(!this.treewalker)return[null,null];let t=null,e=null;for(this.treewalker.currentNode=this.treewalker.root;this.treewalker.nextNode();){const i=this.treewalker.currentNode;q(i)&&(t||(t=i),e=i)}return[t,e]}}o([c({type:Boolean})],s.prototype,"open",null);o([c({type:Boolean})],s.prototype,"quick",void 0);o([c({attribute:!1})],s.prototype,"returnValue",void 0);o([c()],s.prototype,"type",void 0);o([c({type:Boolean,attribute:"no-focus-trap"})],s.prototype,"noFocusTrap",void 0);o([d("dialog")],s.prototype,"dialog",void 0);o([d(".scrim")],s.prototype,"scrim",void 0);o([d(".container")],s.prototype,"container",void 0);o([d(".headline")],s.prototype,"headline",void 0);o([d(".content")],s.prototype,"content",void 0);o([d(".actions")],s.prototype,"actions",void 0);o([m()],s.prototype,"isAtScrollTop",void 0);o([m()],s.prototype,"isAtScrollBottom",void 0);o([d(".scroller")],s.prototype,"scroller",void 0);o([d(".top.anchor")],s.prototype,"topAnchor",void 0);o([d(".bottom.anchor")],s.prototype,"bottomAnchor",void 0);o([d(".focus-trap")],s.prototype,"firstFocusTrap",void 0);o([m()],s.prototype,"hasHeadline",void 0);o([m()],s.prototype,"hasActions",void 0);o([m()],s.prototype,"hasIcon",void 0);function q(a){var r;const t=":is(button,input,select,textarea,object,:is(a,area)[href],[tabindex],[contenteditable=true])",e=":not(:disabled,[disabled])";return a.matches(t+e+':not([tabindex^="-"])')?!0:!a.localName.includes("-")||!a.matches(e)?!1:((r=a.shadowRoot)==null?void 0:r.delegatesFocus)??!1}const Y=C`:host{border-start-start-radius:var(--md-dialog-container-shape-start-start,var(--md-dialog-container-shape,var(--md-sys-shape-corner-extra-large,28px)));border-start-end-radius:var(--md-dialog-container-shape-start-end,var(--md-dialog-container-shape,var(--md-sys-shape-corner-extra-large,28px)));border-end-end-radius:var(--md-dialog-container-shape-end-end,var(--md-dialog-container-shape,var(--md-sys-shape-corner-extra-large,28px)));border-end-start-radius:var(--md-dialog-container-shape-end-start,var(--md-dialog-container-shape,var(--md-sys-shape-corner-extra-large,28px)));display:contents;margin:auto;max-height:min(560px,100% - 48px);max-width:min(560px,100% - 48px);min-height:140px;min-width:280px;position:fixed;height:fit-content;width:fit-content}dialog{background:rgba(0,0,0,0);border:none;border-radius:inherit;flex-direction:column;height:inherit;margin:inherit;max-height:inherit;max-width:inherit;min-height:inherit;min-width:inherit;outline:0;overflow:visible;padding:0;width:inherit}dialog[open]{display:flex}::backdrop{background:0 0}.scrim{background:var(--md-sys-color-scrim,#000);display:none;inset:0;opacity:32%;pointer-events:none;position:fixed;z-index:1}:host([open]) .scrim{display:flex}h2{all:unset;align-self:stretch}.headline{align-items:center;color:var(--md-dialog-headline-color,var(--md-sys-color-on-surface,#1d1b20));display:flex;flex-direction:column;font-family:var(--md-dialog-headline-font, var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto)));font-size:var(--md-dialog-headline-size, var(--md-sys-typescale-headline-small-size, 1.5rem));line-height:var(--md-dialog-headline-line-height, var(--md-sys-typescale-headline-small-line-height, 2rem));font-weight:var(--md-dialog-headline-weight,var(--md-sys-typescale-headline-small-weight,var(--md-ref-typeface-weight-regular,400)));position:relative}slot[name=headline]::slotted(*){align-items:center;align-self:stretch;box-sizing:border-box;display:flex;gap:8px;padding:24px 24px 0}.icon{display:flex}slot[name=icon]::slotted(*){color:var(--md-dialog-icon-color,var(--md-sys-color-secondary,#625b71));fill:currentColor;font-size:var(--md-dialog-icon-size, 24px);margin-top:24px;height:var(--md-dialog-icon-size,24px);width:var(--md-dialog-icon-size,24px)}.has-icon slot[name=headline]::slotted(*){justify-content:center;padding-top:16px}.scrollable slot[name=headline]::slotted(*){padding-bottom:16px}.scrollable.has-headline slot[name=content]::slotted(*){padding-top:8px}.container{border-radius:inherit;display:flex;flex-direction:column;flex-grow:1;overflow:hidden;position:relative;transform-origin:top}.container::before{background:var(--md-dialog-container-color,var(--md-sys-color-surface-container-high,#ece6f0));border-radius:inherit;content:"";inset:0;position:absolute}.scroller{display:flex;flex:1;flex-direction:column;overflow:hidden;z-index:1}.scrollable .scroller{overflow-y:scroll}.content{color:var(--md-dialog-supporting-text-color,var(--md-sys-color-on-surface-variant,#49454f));font-family:var(--md-dialog-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-dialog-supporting-text-size, var(--md-sys-typescale-body-medium-size, .875rem));line-height:var(--md-dialog-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));flex:1;font-weight:var(--md-dialog-supporting-text-weight,var(--md-sys-typescale-body-medium-weight,var(--md-ref-typeface-weight-regular,400)));height:min-content;position:relative}slot[name=content]::slotted(*){box-sizing:border-box;padding:24px}.anchor{position:absolute}.top.anchor{top:0}.bottom.anchor{bottom:0}.actions{position:relative}slot[name=actions]::slotted(*){box-sizing:border-box;display:flex;gap:8px;justify-content:flex-end;padding:16px 24px 24px}.has-actions slot[name=content]::slotted(*){padding-bottom:8px}md-divider{display:none;position:absolute}.has-actions.show-bottom-divider .actions md-divider,.has-headline.show-top-divider .headline md-divider{display:flex}.headline md-divider{bottom:0}.actions md-divider{top:0}@media(forced-colors:active){dialog{outline:2px solid WindowText}}`;let x=class extends s{};x.styles=[Y];x=o([A("md-dialog")],x);class G extends R{}const U=C`:host{--_container-height:var(--md-text-button-container-height, 40px);--_disabled-label-text-color:var(--md-text-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity:var(--md-text-button-disabled-label-text-opacity, 0.38);--_focus-label-text-color:var(--md-text-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color:var(--md-text-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color:var(--md-text-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity:var(--md-text-button-hover-state-layer-opacity, 0.08);--_label-text-color:var(--md-text-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font:var(--md-text-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height:var(--md-text-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size:var(--md-text-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight:var(--md-text-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color:var(--md-text-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color:var(--md-text-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity:var(--md-text-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color:var(--md-text-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity:var(--md-text-button-disabled-icon-opacity, 0.38);--_focus-icon-color:var(--md-text-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color:var(--md-text-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color:var(--md-text-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size:var(--md-text-button-icon-size, 18px);--_pressed-icon-color:var(--md-text-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start:var(--md-text-button-container-shape-start-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end:var(--md-text-button-container-shape-start-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end:var(--md-text-button-container-shape-end-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start:var(--md-text-button-container-shape-end-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space:var(--md-text-button-leading-space, 12px);--_trailing-space:var(--md-text-button-trailing-space, 12px);--_with-leading-icon-leading-space:var(--md-text-button-with-leading-icon-leading-space, 12px);--_with-leading-icon-trailing-space:var(--md-text-button-with-leading-icon-trailing-space, 16px);--_with-trailing-icon-leading-space:var(--md-text-button-with-trailing-icon-leading-space, 16px);--_with-trailing-icon-trailing-space:var(--md-text-button-with-trailing-icon-trailing-space, 12px);--_container-color:none;--_disabled-container-color:none;--_disabled-container-opacity:0}`;let w=class extends G{};w.styles=[M,U];w=o([A("md-text-button")],w);function j(a,t,e=!1,i=!1){let n=a;t||(t=a.name.replace(/([a-zA-Z])(?=[A-Z])/g,"$1-").toLowerCase()),t.includes("-")||(t+="-element");let r=-1;do r++;while(globalThis.customElements.get(`${t}${r!==0?"-${i}":""}`));return(e||i)&&(n=class extends a{constructor(){if(super(...arguments),e&&document.body.prepend(this),i){this.style.setProperty("position","relative");const l=document.createElement("div");l.style.cssText="position:absolute;top:0;right:0;z-index:9999;background-color:black;color:white;font-family:monospace;font-size:0.8em;",l.textContent=t,this.shadowRoot?this.shadowRoot.prepend(l):this.prepend(l)}}}),a._$litElement$&&(a.finalize(),a.styles=a.elementStyles),globalThis.customElements.define(`${t}${r!==0?"-${i}":""}`,n),n}function tt({name:a,inject:t=!1,debug:e=!1}={}){return function(i){return j(i,a,t,e)}}export{tt as c,H as r};

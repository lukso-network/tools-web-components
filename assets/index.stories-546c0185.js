import{y as d}from"./lit-html-bb3a9a44.js";import{e as m,a as b,T as f,o as h,w as v,b as x}from"./tailwind.element-a46445e5.js";import"./_commonjsHelpers-87174ba5.js";import"./index-356e4a49.js";import"./uniq-9b43ae33.js";import"./_getTag-7a3ef05e.js";import"./index-92073c91.js";var S=Object.defineProperty,_=Object.getOwnPropertyDescriptor,p=(e,r,n,o)=>{for(var t=o>1?void 0:o?_(r,n):r,l=e.length-1,i;l>=0;l--)(i=e[l])&&(t=(o?i(r,n,t):i(t))||t);return o&&t&&S(r,n,t),t};let s=class extends f{constructor(){super(...arguments),this.variant="primary",this.disabled=!1,this.defaultStyles="flex justify-center items-center w-[334px] relative gap-2 px-[81px] py-3 px-6 rounded-xl border border-solid cursor-pointer",this.secondaryStyles=" bg-neutral-100 border-neutral-90 text-neutral-20",this.primaryStyles=" bg-neutral-20 border-neutral-20 text-neutral-100 disabled:bg-neutral-90 disabled:border-neutral-90"}render(){return d`
      <button
        data-testid="button"
        ?disabled=${this.disabled}
        class=${h({[this.defaultStyles]:!0,[this.primaryStyles]:this.variant==="primary",[this.secondaryStyles]:this.variant!=="primary"})}
      >
        <slot></slot>
      </button>
    `}};p([m()],s.prototype,"variant",2);p([m()],s.prototype,"disabled",2);s=p([b("lukso-button")],s);const B={title:"Design System/Button"};function a(){return d`<lukso-button variant="primary" disabled="true"
    >Hello World</lukso-button
  >`}function u(){return d`<lukso-button variant="secondary">Hello World</lukso-button>`}a.play=async({canvasElement:e})=>{const r=v(e);await x(r.getByText("Hello World")).toBeInTheDocument()};var y;a.parameters={...a.parameters,storySource:{source:`function Primary() {
  return html\`<lukso-button variant="primary" disabled="true"
    >Hello World</lukso-button
  >\`;
}`,...(y=a.parameters)==null?void 0:y.storySource}};var c;u.parameters={...u.parameters,storySource:{source:'function Secondary() {\n  return html`<lukso-button variant="secondary">Hello World</lukso-button>`;\n}',...(c=u.parameters)==null?void 0:c.storySource}};const D=["Primary","Secondary"];export{a as Primary,u as Secondary,D as __namedExportsOrder,B as default};
//# sourceMappingURL=index.stories-546c0185.js.map

import{y as p}from"./lit-html-bb3a9a44.js";import{e as c,i as y,t as m,a as b,b as h,T as v,w as x,c as f}from"./directive-9aa0afd6.js";import"./_commonjsHelpers-87174ba5.js";import"./index-356e4a49.js";import"./uniq-9b43ae33.js";import"./_getTag-7a3ef05e.js";import"./index-92073c91.js";class g extends y{constructor(t){var e;if(super(t),t.type!==m.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw new Error("`customClassMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}}const S=c(g);var w=Object.defineProperty,_=Object.getOwnPropertyDescriptor,u=(r,t,e,n)=>{for(var s=n>1?void 0:n?_(t,e):t,i=r.length-1,l;i>=0;i--)(l=r[i])&&(s=(n?l(t,e,s):l(s))||s);return n&&s&&w(t,e,s),s};let o=class extends v{constructor(){super(...arguments),this.variant="primary",this.disabled=!1,this.defaultStyles="flex justify-center items-center w-[334px] relative gap-2 px-[81px] py-3 px-6 rounded-xl border border-solid cursor-pointer",this.secondaryStyles="bg-neutral-100 border-neutral-90 text-neutral-20 disabled:bg-neutral-90 disabled:border-neutral-90 disabled:text-neutral-100",this.primaryStyles="bg-neutral-20 border-neutral-20 text-neutral-100 disabled:bg-neutral-90 disabled:border-neutral-90"}render(){return p`
      <button
        data-testid="button"
        ?disabled=${this.disabled}
        class=${S({[this.defaultStyles]:!0,[this.primaryStyles]:this.variant==="primary",[this.secondaryStyles]:this.variant==="secondary"})}
      >
        <slot></slot>
      </button>
    `}};u([b({type:String})],o.prototype,"variant",2);u([b({type:Boolean})],o.prototype,"disabled",2);o=u([h("lukso-button")],o);const D={title:"Design System/Button",component:"lukso-button"};function a({variant:r,disabled:t}){return p`<lukso-button variant=${r} ?disabled=${t}
    >Hello World</lukso-button
  >`}a.args={variant:"primary",disabled:!1};a.argTypes={variant:{options:["primary","secondary"]}};a.play=async({canvasElement:r})=>{const t=x(r);await f(t.getByText("Hello World")).toBeInTheDocument()};var d;a.parameters={...a.parameters,storySource:{source:`function Primary({
  variant,
  disabled
}) {
  return html\`<lukso-button variant=\${variant} ?disabled=\${disabled}
    >Hello World</lukso-button
  >\`;
}`,...(d=a.parameters)==null?void 0:d.storySource}};const E=["Primary"];export{a as Primary,E as __namedExportsOrder,D as default};
//# sourceMappingURL=index.stories-58369dc3.js.map

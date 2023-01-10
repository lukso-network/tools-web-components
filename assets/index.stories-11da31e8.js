import{y as p}from"./lit-html-bb3a9a44.js";import{e as b,a as y,T as m,o as c,w as v,b as h}from"./tailwind.element-a46445e5.js";import"./_commonjsHelpers-87174ba5.js";import"./index-356e4a49.js";import"./uniq-9b43ae33.js";import"./_getTag-7a3ef05e.js";import"./index-92073c91.js";var f=Object.defineProperty,x=Object.getOwnPropertyDescriptor,d=(e,t,n,s)=>{for(var r=s>1?void 0:s?x(t,n):t,i=e.length-1,l;i>=0;i--)(l=e[i])&&(r=(s?l(t,n,r):l(r))||r);return s&&r&&f(t,n,r),r};let o=class extends m{constructor(){super(...arguments),this.variant="primary",this.disabled=!1,this.defaultStyles="flex justify-center items-center w-[334px] relative gap-2 px-[81px] py-3 px-6 rounded-xl border border-solid cursor-pointer",this.secondaryStyles="bg-neutral-100 border-neutral-90 text-neutral-20",this.primaryStyles="bg-neutral-20 border-neutral-20 text-neutral-100 disabled:bg-neutral-90 disabled:border-neutral-90"}render(){return p`
      <button
        data-testid="button"
        ?disabled=${this.disabled}
        class=${c({[this.defaultStyles]:!0,[this.primaryStyles]:this.variant==="primary"&&!this.disabled,[this.secondaryStyles]:this.variant!=="primary"&&!this.disabled})}
      >
        <slot></slot>
      </button>
    `}};d([b({type:String})],o.prototype,"variant",2);d([b({type:Boolean})],o.prototype,"disabled",2);o=d([y("lukso-button")],o);const O={title:"Design System/Button",component:"lukso-button"};function a({variant:e,disabled:t}){return p`<lukso-button variant=${e} ?disabled=${t}
    >Hello World</lukso-button
  >`}a.args={variant:"primary",disabled:!1};a.argTypes={variant:{options:["primary","secondary"]}};a.play=async({canvasElement:e})=>{const t=v(e);await h(t.getByText("Hello World")).toBeInTheDocument()};var u;a.parameters={...a.parameters,storySource:{source:`function Primary({
  variant,
  disabled
}) {
  return html\`<lukso-button variant=\${variant} ?disabled=\${disabled}
    >Hello World</lukso-button
  >\`;
}`,...(u=a.parameters)==null?void 0:u.storySource}};const T=["Primary"];export{a as Primary,T as __namedExportsOrder,O as default};
//# sourceMappingURL=index.stories-11da31e8.js.map

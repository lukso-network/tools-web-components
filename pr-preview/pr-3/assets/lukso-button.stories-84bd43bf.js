import{y as c}from"./lit-html-bb3a9a44.js";import{e as h,i as v,t as S,a as y,b as g,T as f,w as x,c as w}from"./directive-2d5da02a.js";import"./_commonjsHelpers-87174ba5.js";import"./index-356e4a49.js";import"./isEqual-4091ce64.js";import"./_getTag-17ceb949.js";import"./index-92073c91.js";import"./uniq-2a27e146.js";class $ extends v{constructor(t){var e;if(super(t),t.type!==S.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw new Error("`customClassMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}}const T=h($);var _=Object.defineProperty,B=Object.getOwnPropertyDescriptor,u=(r,t,e,o)=>{for(var a=o>1?void 0:o?B(t,e):t,i=r.length-1,d;i>=0;i--)(d=r[i])&&(a=(o?d(t,e,a):d(a))||a);return o&&a&&_(t,e,a),a};let l=class extends f{constructor(){super(...arguments),this.variant="primary",this.disabled=!1,this.defaultStyles=`flex justify-center items-center relative gap-2 py-3 px-6 rounded-xl
    border border-solid cursor-pointer paragraph-16-semi-bold`,this.secondaryStyles=`bg-neutral-100 border-neutral-90 text-neutral-20 disabled:bg-neutral-90
    disabled:border-neutral-90 disabled:text-neutral-100 hover:shadow-button-hover-secondary`,this.primaryStyles=`bg-neutral-20 border-neutral-20 text-neutral-100 disabled:bg-neutral-90
    disabled:border-neutral-90 hover:shadow-button-hover-primary`}render(){return c`
      <button
        data-testid="button"
        ?disabled=${this.disabled}
        class=${T({[this.defaultStyles]:!0,[this.primaryStyles]:this.variant==="primary",[this.secondaryStyles]:this.variant==="secondary"})}
      >
        <slot></slot>
      </button>
    `}};u([y({type:String})],l.prototype,"variant",2);u([y({type:Boolean})],l.prototype,"disabled",2);l=u([g("lukso-button")],l);const W={title:"Design System/Atoms/Button",component:"lukso-button",argTypes:{variant:{control:{type:"select"},options:["primary","secondary"]},disabled:{control:{type:"boolean"},defaultValue:!1}},parameters:{controls:{exclude:["defaultStyles","secondaryStyles","primaryStyles"]}}},m=({variant:r,disabled:t})=>c`<lukso-button variant=${r} ?disabled=${t}
    >Hello World</lukso-button
  >`,s=m.bind({});s.args={variant:"primary"};s.play=async({canvasElement:r})=>{const t=x(r);await w(t.getByText("Hello World")).toBeInTheDocument()};const n=m.bind({});n.args={variant:"secondary"};var p;s.parameters={...s.parameters,storySource:{source:`({
  variant,
  disabled
}) => html\`<lukso-button variant=\${variant} ?disabled=\${disabled}
    >Hello World</lukso-button
  >\``,...(p=s.parameters)==null?void 0:p.storySource}};var b;n.parameters={...n.parameters,storySource:{source:`({
  variant,
  disabled
}) => html\`<lukso-button variant=\${variant} ?disabled=\${disabled}
    >Hello World</lukso-button
  >\``,...(b=n.parameters)==null?void 0:b.storySource}};const M=["Primary","Secondary"];export{s as Primary,n as Secondary,M as __namedExportsOrder,W as default};
//# sourceMappingURL=lukso-button.stories-84bd43bf.js.map

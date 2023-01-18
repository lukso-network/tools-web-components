import{y as h}from"./lit-html-bb3a9a44.js";import{e as g,i as S,t as f,a as v,b as x,T as $,w,c as T}from"./directive-3dcb3509.js";import"./_commonjsHelpers-87174ba5.js";import"./index-356e4a49.js";import"./isEqual-4091ce64.js";import"./_getTag-17ceb949.js";import"./index-92073c91.js";import"./uniq-2a27e146.js";class _ extends S{constructor(t){var e;if(super(t),t.type!==f.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw new Error("`customClassMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}}const k=g(_);var B=Object.defineProperty,O=Object.getOwnPropertyDescriptor,b=(r,t,e,o)=>{for(var a=o>1?void 0:o?O(t,e):t,d=r.length-1,u;d>=0;d--)(u=r[d])&&(a=(o?u(t,e,a):u(a))||a);return o&&a&&B(t,e,a),a};let i=class extends ${constructor(){super(...arguments),this.variant="primary",this.disabled=!1,this.defaultStyles=`flex justify-center items-center relative gap-2 py-3 px-6 rounded-xl
    border border-solid cursor-pointer paragraph-16-semi-bold`,this.secondaryStyles=`bg-neutral-100 border-neutral-90 text-neutral-20 disabled:bg-neutral-90
    disabled:border-neutral-90 disabled:text-neutral-100 hover:shadow-button-hover-secondary`,this.primaryStyles=`bg-neutral-20 border-neutral-20 text-neutral-100
    disabled:bg-neutral-90
    disabled:border-neutral-90
    hover:shadow-button-hover-primary
  `,this.landingStyles=`bg-purple-51 border-purple-51 text-neutral-100
    disabled:bg-neutral-90 disabled:border-neutral-90
    hover:shadow-button-hover-primary hover:bg-purple-58 hover:border-purple-58`}render(){return h`
      <button
        data-testid="button"
        ?disabled=${this.disabled}
        class=${k({[this.defaultStyles]:!0,[this.primaryStyles]:this.variant==="primary",[this.secondaryStyles]:this.variant==="secondary",[this.landingStyles]:this.variant==="landing"})}
      >
        <slot></slot>
      </button>
    `}};b([v({type:String})],i.prototype,"variant",2);b([v({type:Boolean})],i.prototype,"disabled",2);i=b([x("lukso-button")],i);const A={title:"Design System/Atoms/Button",component:"lukso-button",argTypes:{variant:{control:{type:"select"},options:["primary","secondary","landing"]},disabled:{control:{type:"boolean"},defaultValue:!1}},parameters:{controls:{exclude:["defaultStyles","secondaryStyles","primaryStyles"]}}},p=({variant:r,disabled:t})=>h`<lukso-button variant=${r} ?disabled=${t}
    >Hello World</lukso-button
  >`,s=p.bind({});s.args={variant:"primary"};s.play=async({canvasElement:r})=>{const t=w(r);T(t.getByText("Hello World")).toBeInTheDocument()};const n=p.bind({});n.args={variant:"secondary"};const l=p.bind({});l.args={variant:"landing"};var c;s.parameters={...s.parameters,storySource:{source:`({
  variant,
  disabled
}) => html\`<lukso-button variant=\${variant} ?disabled=\${disabled}
    >Hello World</lukso-button
  >\``,...(c=s.parameters)==null?void 0:c.storySource}};var y;n.parameters={...n.parameters,storySource:{source:`({
  variant,
  disabled
}) => html\`<lukso-button variant=\${variant} ?disabled=\${disabled}
    >Hello World</lukso-button
  >\``,...(y=n.parameters)==null?void 0:y.storySource}};var m;l.parameters={...l.parameters,storySource:{source:`({
  variant,
  disabled
}) => html\`<lukso-button variant=\${variant} ?disabled=\${disabled}
    >Hello World</lukso-button
  >\``,...(m=l.parameters)==null?void 0:m.storySource}};const L=["Primary","Secondary","Landing"];export{l as Landing,s as Primary,n as Secondary,L as __namedExportsOrder,A as default};
//# sourceMappingURL=lukso-button.stories-41e30f2b.js.map

/**
 * SSR-safe custom element decorator that prevents duplicate registration errors.
 *
 * ## Why this exists
 *
 * The standard `@customElement()` decorator from Lit will throw an error if
 * a component is registered twice. This can happen in SSR environments where:
 * - Components are dynamically imported via multiple paths
 * - HMR causes modules to be re-executed during development
 * - Server and client bundles both try to register components
 *
 * This is especially common when a library (e.g., @lukso/transaction-view-core)
 * imports @lukso/web-components, AND the consuming app ALSO imports
 * @lukso/web-components directly via dynamic imports.
 *
 * ## Usage
 *
 * Use this instead of `@customElement()`:
 * ```ts
 * import { safeCustomElement } from '@/shared/safe-custom-element'
 *
 * @safeCustomElement('lukso-button')
 * export class LuksoButton extends LitElement {
 *   // ...
 * }
 * ```
 *
 * @param tagName - The custom element tag name (must contain a hyphen)
 * @returns A class decorator that safely registers the element
 */
export function safeCustomElement(tagName: string): ClassDecorator {
  return ((classOrDescriptor: CustomElementConstructor) => {
    // Only register if not already defined
    if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
      customElements.define(tagName, classOrDescriptor)
    }
    return classOrDescriptor
  }) as ClassDecorator
}

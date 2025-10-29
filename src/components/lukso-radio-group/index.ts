import { html } from 'lit'
import { safeCustomElement } from '@/shared/safe-custom-element'
import { customElement, property, state } from 'lit/decorators.js'

import { TailwindElement } from '@/shared/tailwind-element'

import type { LuksoRadio } from '../lukso-radio'

type HTMLRadioElement = HTMLInputElement & {
  checked: boolean
  isDisabled: boolean
  isReadonly: boolean
}

@safeCustomElement('lukso-radio-group')
export class LuksoRadioGroup extends TailwindElement {
  @property({ type: String })
  name = ''

  @property({ type: String })
  value = ''

  @property({ type: Boolean })
  autofocus = false

  // Track the currently focused radio index
  @state()
  private focusedIndex = -1

  @state()
  private radios: HTMLElement[] = []

  // Detect if radio group is laid out horizontally or vertically
  private isHorizontalLayout(): boolean {
    // If the radios are in a horizontal container (e.g., flex row)
    // we should use left/right arrows as primary navigation
    const firstRadio = this.querySelector('lukso-radio')
    if (!firstRadio) return false

    const secondRadio = firstRadio.nextElementSibling as HTMLElement
    if (!secondRadio) return false

    // Check if radios are positioned horizontally
    const firstRect = firstRadio.getBoundingClientRect()
    const secondRect = secondRadio.getBoundingClientRect()

    // If second radio is to the right of the first, it's horizontal
    return (
      Math.abs(secondRect.left - firstRect.left) >
      Math.abs(secondRect.top - firstRect.top)
    )
  }

  private handleChange(e: CustomEvent) {
    const newValue = e.detail.value
    this.value = newValue

    // Update all radios
    this.updateRadios()
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    )
  }

  private updateRadios() {
    const radios = this.querySelectorAll('lukso-radio')

    for (const el of radios) {
      // Set checked state based on value comparison
      el.checked = el.value === this.value
    }
  }

  // Make sure radios are updated when they become available
  private setupInitialState() {
    // Try to update radios immediately
    this.updateRadios()

    // Also try after a short delay to ensure all radio elements are ready
    setTimeout(() => this.updateRadios(), 50)

    // And after a longer delay as a fallback
    setTimeout(() => this.updateRadios(), 150)
  }

  private handleKeydown(e: KeyboardEvent) {
    // Cache all radios for performance
    this.radios = Array.from(this.querySelectorAll('lukso-radio'))
    if (!this.radios.length) return

    // Find the currently selected radio
    const selectedIndex = this.radios.findIndex(
      (radio: HTMLRadioElement) => radio.checked
    )

    // Start from selected radio or first radio if none selected
    if (this.focusedIndex === -1) {
      this.focusedIndex = selectedIndex >= 0 ? selectedIndex : 0
    }

    let newIndex = this.focusedIndex

    // Determine layout direction
    const isHorizontal = this.isHorizontalLayout()

    // Handle arrow navigation based on layout
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        // In vertical layout: down goes to next, in horizontal: down should do nothing
        if (!isHorizontal) {
          newIndex = (this.focusedIndex + 1) % this.radios.length
        }
        break
      case 'ArrowRight':
        e.preventDefault()
        // Right always goes to next
        newIndex = (this.focusedIndex + 1) % this.radios.length
        break
      case 'ArrowUp':
        e.preventDefault()
        // In vertical layout: up goes to previous, in horizontal: up should do nothing
        if (!isHorizontal) {
          newIndex =
            (this.focusedIndex - 1 + this.radios.length) % this.radios.length
        }
        break
      case 'ArrowLeft':
        e.preventDefault()
        // Left always goes to previous
        newIndex =
          (this.focusedIndex - 1 + this.radios.length) % this.radios.length
        break
      case 'Home':
        e.preventDefault()
        newIndex = 0
        break
      case 'End':
        e.preventDefault()
        newIndex = this.radios.length - 1
        break
      default:
        return // Not a navigation key, exit
    }

    // Move focus to the new radio button
    if (newIndex !== this.focusedIndex) {
      this.focusedIndex = newIndex
      const radioToFocus = this.radios[newIndex] as HTMLRadioElement

      // Only focus and select if not disabled
      if (!radioToFocus.isDisabled && !radioToFocus.isReadonly) {
        radioToFocus.focus()

        // Update selection
        this.value = radioToFocus.value
        this.updateRadios()

        // Dispatch change event
        this.dispatchEvent(
          new CustomEvent('change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
          })
        )
      }
    }
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('on-change', this.handleChange as EventListener)
    this.addEventListener('keydown', this.handleKeydown as EventListener)

    // Set up initial state with multiple timing attempts
    this.setupInitialState()

    // Setup auto-focus if enabled
    if (this.autofocus) {
      setTimeout(() => this.handleGroupFocus(), 50)
    }
  }

  // Called after the first update and subsequent updates
  updated(changedProperties: Map<string, unknown>) {
    super.updated?.(changedProperties)

    // If value changed, update radio buttons
    if (changedProperties.has('value')) {
      this.updateRadios()
    }
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    super.attributeChangedCallback(name, oldVal, newVal)

    // When value changes externally, update radio buttons
    if (name === 'value' && oldVal !== newVal && this.isConnected) {
      this.updateRadios()
    }
  }

  disconnectedCallback(): void {
    this.removeEventListener('on-change', this.handleChange as EventListener)
    this.removeEventListener('keydown', this.handleKeydown as EventListener)
    super.disconnectedCallback()
  }

  // When the group gets focus, we should move focus to the selected radio or first available
  private handleGroupFocus() {
    if (!this.isConnected) return

    const radios = Array.from(
      this.querySelectorAll('lukso-radio')
    ) as LuksoRadio[]
    if (!radios.length) return

    // Find the selected radio or the first enabled radio
    const selectedRadio = radios.find(
      radio => radio.checked && !radio.isDisabled && !radio.isReadonly
    )
    const firstEnabledRadio = radios.find(
      radio => !radio.isDisabled && !radio.isReadonly
    )

    const radioToFocus = selectedRadio || firstEnabledRadio
    if (radioToFocus) {
      // Move focus to the radio
      setTimeout(() => radioToFocus.focus(), 0)
    }
  }

  render() {
    return html`
      <div
        role="radiogroup"
        aria-label="${this.name}"
        tabindex="0"
        @focus="${this.handleGroupFocus}"
      >
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-radio-group': LuksoRadioGroup
  }
}

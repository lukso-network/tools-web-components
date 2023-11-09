import { nothing } from 'lit-html'
import { Directive, directive, PartInfo, PartType } from 'lit/directive.js'

export interface StyleInfoList {
  readonly [styleList: string]: boolean
}

export class CustomStyleMapDirective extends Directive {
  constructor(partInfo: PartInfo) {
    super(partInfo)
    if (
      partInfo.type !== PartType.ATTRIBUTE ||
      partInfo.name !== 'style' ||
      (partInfo.strings?.length as number) > 2
    ) {
      throw new Error(
        '`customStyleMap()` can only be used in the `style` attribute ' +
          'and must be the only part in the attribute.'
      )
    }
  }

  render(styleInfoList: StyleInfoList) {
    const styles = Object.keys(styleInfoList).filter(key => styleInfoList[key])

    if (styles.length === 0) {
      return nothing
    }

    return ` ${styles.join('; ')} `
  }
}

/**
 * A directive that applies dynamic CSS styles.
 * Since build in `styleMap` directive doesn't allow to add conditional styles
 *
 * Example `{'foo bar': baz}` applies the style `foo bar` if the value of `baz` is
 * truthy.
 *
 * @param styleInfoList
 */
export const customStyleMap = directive(CustomStyleMapDirective)

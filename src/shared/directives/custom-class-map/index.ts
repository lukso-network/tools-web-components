import { Directive, directive, PartInfo, PartType } from 'lit/directive.js'

export interface ClassInfoList {
  readonly [classList: string]: boolean
}

export class CustomClassMapDirective extends Directive {
  constructor(partInfo: PartInfo) {
    super(partInfo)
    if (
      partInfo.type !== PartType.ATTRIBUTE ||
      partInfo.name !== 'class' ||
      (partInfo.strings?.length as number) > 2
    ) {
      throw new Error(
        '`customClassMap()` can only be used in the `class` attribute ' +
          'and must be the only part in the attribute.'
      )
    }
  }

  render(classInfoList: ClassInfoList) {
    return (
      ' ' +
      Object.keys(classInfoList)
        .filter(key => classInfoList[key])
        .join(' ') +
      ' '
    )
  }
}

/**
 * A directive that applies dynamic CSS classes.
 * Since build in `classMap` directive can only apply one class name,
 * this directive is allowing to apply multiple class names.
 *
 * This must be used in the `class` attribute and must be the only part used in
 * the attribute. It takes each property in the `classInfoList` argument and adds
 * the property names to the element's `classList` if the property value is
 * truthy; if the property value is falsey, the property name is removed from
 * the element's `class`.
 *
 * For example `{'foo bar': baz}` applies the class `foo bar` if the value of `baz` is
 * truthy.
 *
 * @param classInfoList
 */
export const customClassMap = directive(CustomClassMapDirective)

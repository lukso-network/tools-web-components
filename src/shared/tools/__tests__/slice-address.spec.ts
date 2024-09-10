import { expect, it } from 'vitest'

import { sliceAddress } from '../slice-address'

describe('sliceAddress', () => {
  it('should return empty string', () => {
    expect(sliceAddress()).toEqual('')
    expect(sliceAddress('')).toEqual('')
    // @ts-expect-error
    expect(sliceAddress({})).toEqual('')
    expect(sliceAddress(null)).toEqual('')
  })

  it('should return sliced address', () => {
    expect(sliceAddress('0xA60DDd4eB501bd5bfeC3d50187C3889B658775B5')).toEqual(
      '0xA60DDd...8775B5'
    )
  })

  it('should return sliced address with custom slice', () => {
    expect(
      sliceAddress('0xA60DDd4eB501bd5bfeC3d50187C3889B658775B5', 3)
    ).toEqual('0xA60...5B5')
    expect(
      sliceAddress('0xA60DDd4eB501bd5bfeC3d50187C3889B658775B5', 3, 6)
    ).toEqual('0xA60...8775B5')
    expect(sliceAddress('0xA60DDd4eB51', 10)).toEqual('0xA60DDd4eB51')
  })
})

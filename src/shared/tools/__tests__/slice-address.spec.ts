import { sliceAddress } from '../slice-address'

test('sliceAddress', () => {
  expect(sliceAddress()).toEqual('')
  expect(sliceAddress('0xA60DDd4eB501bd5bfeC3d50187C3889B658775B5')).toEqual(
    '0xA60DDd...8775B5'
  )
  expect(sliceAddress('0xA60DDd4eB501bd5bfeC3d50187C3889B658775B5', 3)).toEqual(
    '0xA60...5B5'
  )
  expect(
    sliceAddress('0xA60DDd4eB501bd5bfeC3d50187C3889B658775B5', 3, 6)
  ).toEqual('0xA60...8775B5')
  expect(sliceAddress('0xA60DDd4eB51', 10)).toEqual('0xA60DDd4eB51')
})

/**
 * Shorten address by removing middle part, i.e: 0x123...789
 *
 * @param address - the address
 * @param sliceBy - slice by amount from top and end, it doesn't include 0x
 * @returns sliced address
 */
export const sliceAddress = (
  address?: string,
  startSliceBy = 6,
  endSliceBy?: number
): string => {
  if (!address) {
    return ''
  }

  let sliceAddress = ''
  endSliceBy = endSliceBy || startSliceBy

  if (address.length < startSliceBy + endSliceBy) {
    return address
  }

  sliceAddress =
    address.length > startSliceBy + 2
      ? `${address.slice(0, startSliceBy + 2)}...${address.slice(-endSliceBy)}`
      : address

  return sliceAddress
}

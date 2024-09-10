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
  if (!address || typeof address !== 'string') {
    return ''
  }

  let sliceAddress = ''
  const effectiveEndSliceBy = endSliceBy || startSliceBy

  if (address.length < startSliceBy + effectiveEndSliceBy) {
    return address
  }

  sliceAddress =
    address.length > startSliceBy + 2
      ? `${address.slice(0, startSliceBy + 2)}...${address.slice(
          -effectiveEndSliceBy
        )}`
      : address

  return sliceAddress
}

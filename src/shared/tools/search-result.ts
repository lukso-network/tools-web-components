type NftResultFields = {
  name?: string
  symbol?: string
  collectionName?: string
  tokenId?: string
}

const compareText = (value?: string) =>
  (value || '').normalize('NFKC').trim().toLowerCase()

/**
 * Muted text shown after the name of an `nft` search result. A single NFT
 * (with `tokenId`) shows its collection name, unless its own name already
 * starts with it (`Luksouls #2845`). A collection shows its symbol.
 *
 * @param result - the `nft` search result
 * @returns the text, empty when there is nothing to add
 */
export const nftResultSubtitle = (result: NftResultFields): string => {
  if (!result.tokenId) {
    return result.symbol || ''
  }

  const collectionName = result.collectionName?.trim() || ''

  if (
    !collectionName ||
    compareText(result.name).startsWith(compareText(collectionName))
  ) {
    return ''
  }

  return collectionName
}

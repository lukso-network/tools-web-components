import { SEARCH_RESULT_TYPES } from '../enums'

type NftResultFields = {
  name?: string
  symbol?: string
  collectionName?: string
  tokenId?: string
}

type SearchResultRow = {
  type?: string
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

/**
 * Position (1-based, like `selected` and `data-index`) of the next result the
 * arrow keys can select, checked from `start` in `step` direction. A search
 * hint row holds examples to click, not an option, so it is skipped. Going
 * back from a selection left beyond shorter results starts at the last one.
 *
 * @param results - the parsed results
 * @param start - first position to check
 * @param step - `1` for ArrowDown, `-1` for ArrowUp
 * @returns the position, `undefined` when there is none in that direction
 */
export const selectableResultPosition = (
  results: SearchResultRow[],
  start: number,
  step: 1 | -1
): number | undefined => {
  for (
    let position = step < 0 ? Math.min(start, results.length) : start;
    position >= 1 && position <= results.length;
    position += step
  ) {
    if (results[position - 1]?.type !== SEARCH_RESULT_TYPES.SEARCH_HINT) {
      return position
    }
  }
}

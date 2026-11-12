import { expect, it, describe } from 'vitest'

import { nftResultSubtitle, selectableResultPosition } from '../search-result'

describe('nftResultSubtitle', () => {
  it('should return the collection name of a single NFT', () => {
    expect(
      nftResultSubtitle({
        name: 'Message from Fabian',
        collectionName: 'Forever Moments',
        tokenId: '0x01',
      })
    ).toEqual('Forever Moments')
  })

  it('should omit the collection name when the NFT name starts with it', () => {
    expect(
      nftResultSubtitle({
        name: 'Luksouls #2845',
        collectionName: 'Luksouls',
        tokenId: '0x0b1d',
      })
    ).toEqual('')
    expect(
      nftResultSubtitle({
        name: 'LUKSOULS #1',
        collectionName: ' Luksouls ',
        tokenId: '0x01',
      })
    ).toEqual('')
  })

  it('should keep a collection name the NFT name only shares a prefix with', () => {
    expect(
      nftResultSubtitle({
        name: 'Babe #17',
        collectionName: 'BABES',
        tokenId: '0x11',
      })
    ).toEqual('BABES')
  })

  it('should return empty string for a single NFT without collection name', () => {
    expect(nftResultSubtitle({ name: 'Untitled', tokenId: '0x01' })).toEqual('')
    expect(
      nftResultSubtitle({ name: 'Untitled', collectionName: ' ', tokenId: '1' })
    ).toEqual('')
  })

  it('should return the symbol of a collection', () => {
    expect(
      nftResultSubtitle({
        name: 'Luksouls',
        symbol: 'LUK',
        collectionName: 'Luksouls',
      })
    ).toEqual('LUK')
    expect(nftResultSubtitle({ name: 'Luksouls' })).toEqual('')
  })
})

describe('selectableResultPosition', () => {
  const results = [
    { type: 'search-hint' },
    { type: 'recent-search' },
    { type: 'profile' },
    { type: 'search-hint' },
    { type: 'asset' },
  ]

  it('should return the start position of a result that is not a hint', () => {
    expect(selectableResultPosition(results, 2, 1)).toEqual(2)
    expect(selectableResultPosition(results, 3, -1)).toEqual(3)
  })

  it('should skip search hint rows in both directions', () => {
    expect(selectableResultPosition(results, 1, 1)).toEqual(2)
    expect(selectableResultPosition(results, 4, 1)).toEqual(5)
    expect(selectableResultPosition(results, 4, -1)).toEqual(3)
  })

  it('should return undefined when only hints or nothing follow', () => {
    expect(selectableResultPosition(results, 1, -1)).toBeUndefined()
    expect(selectableResultPosition(results, 6, 1)).toBeUndefined()
    expect(selectableResultPosition(results, 0, -1)).toBeUndefined()
    expect(selectableResultPosition([{ type: 'search-hint' }], 1, 1)).toBe(
      undefined
    )
    expect(selectableResultPosition([], 1, 1)).toBeUndefined()
  })

  it('should go back from a selection beyond shorter results', () => {
    expect(selectableResultPosition(results, 9, -1)).toEqual(5)
    expect(selectableResultPosition(results.slice(0, 4), 9, -1)).toEqual(3)
    expect(selectableResultPosition(results, 9, 1)).toBeUndefined()
  })

  it('should treat results without type as selectable', () => {
    expect(selectableResultPosition([{}, { type: 'string' }], 1, 1)).toEqual(1)
  })
})

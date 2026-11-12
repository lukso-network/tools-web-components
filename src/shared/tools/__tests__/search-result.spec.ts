import { expect, it, describe } from 'vitest'

import { nftResultSubtitle } from '../search-result'

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

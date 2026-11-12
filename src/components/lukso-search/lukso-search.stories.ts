import { useArgs } from 'storybook/preview-api'
import { html, nothing } from 'lit-html'
import { LSP4_TOKEN_TYPES } from '@lukso/lsp-smart-contracts'
import { expect } from '@storybook/test'

import { SEARCH_RESULT_TYPES, STANDARDS } from '@/shared/enums'

import type { Meta, StoryObj } from '@storybook/web-components-vite'
import type { LuksoSearch, SearchResult } from './index'

import './index'

// mainnet NFTs and collections as the universaleverything.io search shows them
const NFT_RESULTS: SearchResult[] = [
  {
    id: '0x719b36427c9868162df1b4c9e6ddc28f5c36d72d-0x0000000000000000000000000000000000000000000000000000000000000b1d',
    address: '0x719b36427c9868162df1b4c9e6ddc28f5c36d72d',
    tokenId:
      '0x0000000000000000000000000000000000000000000000000000000000000b1d',
    name: 'Luksouls #2845',
    collectionName: 'Luksouls',
    ownerName: 'cryptodaddi',
    image:
      'https://api.universalprofile.cloud/image/bafybeifixhubols6an3xhj4htqmyjpaa5gqiae7vl3r7oeak4wij7z3wd4/2845.png?method=keccak256(bytes)&data=0xeda9f7e480dc0d3d142869e4c7db7ca4251da209eb662eba5fa8cbf0bf9c4d49',
    type: SEARCH_RESULT_TYPES.NFT,
    standard: STANDARDS.LSP8,
    tokenType: LSP4_TOKEN_TYPES.NFT,
  },
  {
    id: '0xef54710b5a78b4926104a65594539521eb440d37-0x000000000000000000000000a862e8dd5a4075a654a08bf61e78084ce0790cb1',
    address: '0xef54710b5a78b4926104a65594539521eb440d37',
    tokenId:
      '0x000000000000000000000000a862e8dd5a4075a654a08bf61e78084ce0790cb1',
    name: 'Message from Fabian',
    collectionName: 'Forever Moments',
    ownerName: 'wolfoflukso',
    image:
      'https://api.universalprofile.cloud/image/bafybeicvcru3a7pb2pz3ah6vt7kz5kdem5prrldme5q7d3tiixm4z5usqq?method=keccak256(bytes)&data=0xded52736fbb0c10c66ef925e5702e85651d38982e6350f13ecb172fa6b37c23f',
    type: SEARCH_RESULT_TYPES.NFT,
    standard: STANDARDS.LSP8,
    tokenType: LSP4_TOKEN_TYPES.COLLECTION,
  },
  {
    id: '0xef54710b5a78b4926104a65594539521eb440d37-0x000000000000000000000000618cb78c144d76c7feac26e19ea83c57dac3335f',
    address: '0xef54710b5a78b4926104a65594539521eb440d37',
    tokenId:
      '0x000000000000000000000000618cb78c144d76c7feac26e19ea83c57dac3335f',
    name: 'Tom & Fabian',
    collectionName: 'Forever Moments',
    ownerName: 'tlee',
    image:
      'https://api.universalprofile.cloud/image/Qmc88ssvHRAWZCWJ3j8q6239o1eieqsRT1yfzepHg9qwQ1?method=keccak256(bytes)&data=0x152b6391507e5652294fa3c7fb7152f1fec5781315180f9f9cb727ba107b8ee1',
    type: SEARCH_RESULT_TYPES.NFT,
    standard: STANDARDS.LSP8,
    tokenType: LSP4_TOKEN_TYPES.COLLECTION,
  },
  // NFT without image and owner name
  {
    id: '0x970dd88542c20941be83f67784cfbde090f5ce53-0x00000000000000000000000016d30e1bfb1a6ebf342067f55e97616fd0f29a5c',
    address: '0x970dd88542c20941be83f67784cfbde090f5ce53',
    tokenId:
      '0x00000000000000000000000016d30e1bfb1a6ebf342067f55e97616fd0f29a5c',
    name: 'Vitalik & Fabian & Charles',
    collectionName: 'Forever Moments',
    type: SEARCH_RESULT_TYPES.NFT,
    standard: STANDARDS.LSP8,
    tokenType: LSP4_TOKEN_TYPES.COLLECTION,
  },
  // collections
  {
    id: '0x719b36427c9868162df1b4c9e6ddc28f5c36d72d',
    address: '0x719b36427c9868162df1b4c9e6ddc28f5c36d72d',
    name: 'Luksouls',
    symbol: 'LUK',
    image:
      'https://api.universalprofile.cloud/image/bafkreib3m3wmvpvddbkombc24vq2ixrhkpxd4ub2v7ewvrqmcch7dnisrq?method=keccak256(bytes)&data=0x3e55fb370e05e9622aa9bf64497d10b06bfe6bfd2de64ce290da76ff7b082eed',
    type: SEARCH_RESULT_TYPES.NFT,
    standard: STANDARDS.LSP8,
    tokenType: LSP4_TOKEN_TYPES.NFT,
  },
  {
    id: '0xef54710b5a78b4926104a65594539521eb440d37',
    address: '0xef54710b5a78b4926104a65594539521eb440d37',
    name: 'Forever Moments',
    symbol: 'MOMENTS',
    image:
      'https://api.universalprofile.cloud/image/QmQyJw3KsShSHyh3eADvqicnMRyKRyqHnfBXARh88wtqXf/images-0-180x100?method=keccak256(bytes)&data=0x511dd6f23e6ff6d8b02dde620aa2d15a9d2060d9801112b8711ca39fab8486a6',
    type: SEARCH_RESULT_TYPES.NFT,
    standard: STANDARDS.LSP8,
    tokenType: LSP4_TOKEN_TYPES.COLLECTION,
  },
]

// example searches of the universaleverything.io global search
const SEARCH_HINTS = [
  { query: 'feindura', description: 'profile name' },
  { query: 'feindura#cdec', description: 'name + start of address' },
  { query: '0xcdec11', description: 'address' },
  { query: 'luksouls 2845', description: 'NFT by number' },
  { query: 'owned by feindura', description: 'NFTs a profile owns' },
]

const SEARCH_HINT_RESULT: SearchResult = {
  id: 'search-hints',
  type: SEARCH_RESULT_TYPES.SEARCH_HINT,
  value: SEARCH_HINTS.map(({ query, description }) => ({
    id: query,
    type: SEARCH_RESULT_TYPES.STRING,
    value: query,
    description,
  })),
}

const getSearch = (canvasElement: HTMLElement) =>
  canvasElement.querySelector('lukso-search') as LuksoSearch

const getOptions = (search: LuksoSearch) => [
  ...(search.shadowRoot?.querySelectorAll('lukso-dropdown-option') || []),
]

const mutedTexts = (option: Element) =>
  [...option.querySelectorAll('span.text-neutral-60')].map(span =>
    span.textContent?.trim()
  )

/**  Documentation and examples of `lukso-search` component. Components share most of `lukso-input` attributes.  */
const meta: Meta = {
  title: 'Design System/Forms/lukso-search',
  component: 'lukso-search',
  argTypes: {
    value: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    name: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    autocomplete: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    id: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    placeholder: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    label: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    description: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    error: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    isReadonly: {
      name: 'is-readonly',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isFullWidth: {
      name: 'is-full-width',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isDisabled: {
      name: 'is-disabled',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    hasReset: {
      name: 'has-reset',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    customClass: {
      name: 'custom-class',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    autofocus: {
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    borderless: {
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    results: {
      control: { type: 'object' },
      table: {
        category: 'Attributes',
      },
    },
    debounce: {
      control: { type: 'number' },
      description:
        'Debounce search event to re-trigger when user type into input field. Value is in milliseconds.',
      table: {
        category: 'Attributes',
      },
    },
    rightIcon: {
      name: 'right-icon',
      description: 'Right icon to be displayed in the input field.',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    isSearching: {
      name: 'is-searching',
      description: 'Manually show loading state.',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    showNoResults: {
      name: 'show-no-results',
      description: 'Show no results state.',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    availableText: {
      name: 'available-text',
      description: 'Text displayed on available state.',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    unavailableText: {
      name: 'unavailable-text',
      description: 'Text displayed on unavailable state.',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    ownedByText: {
      name: 'owned-by-text',
      description: 'Text displayed before the owner name of a single NFT.',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    noResultsText: {
      name: 'no-results-text',
      description: 'Text displayed on no results state.',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    selected: {
      control: { type: 'number' },
      description: 'Manually select an item from the dropdown.',
      table: {
        category: 'Attributes',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'x-large'],
      table: {
        category: 'Attributes',
      },
    },
    hideLoading: {
      name: 'hide-loading',
      description: 'Hide loading state from appearing.',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    maxHeight: {
      name: 'max-height',
      description: 'Set max-height of the dropdown.',
      control: { type: 'number' },
      table: {
        category: 'Attributes',
      },
    },
    groupLabels: {
      name: 'group-labels',
      description:
        'JSON object with group labels for the results. The keys are the result types and the values are the labels.',
      control: { type: 'object' },
      table: {
        category: 'Attributes',
      },
    },
    withGroupLabels: {
      name: 'with-group-labels',
      description:
        'If true, the search will display group labels for the results. The labels are defined in the `groupLabels` attribute.',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    onSearch: {
      name: 'on-search',
      description: 'Emitted on search.',
      table: {
        category: 'Events',
      },
    },
    onSelect: {
      name: 'on-select',
      description: 'Emitted on select element from the dropdown.',
      table: {
        category: 'Events',
      },
    },
    onInputClick: {
      name: 'on-input-click',
      description: 'Emitted on input click event.',
      table: {
        category: 'Events',
      },
    },
    onBlur: {
      name: 'on-blur',
      description: 'Emitted on input blur event.',
      table: {
        category: 'Events',
      },
    },
    onReset: {
      name: 'on-reset',
      description: 'Emitted on reset event.',
      table: {
        category: 'Events',
      },
    },
    onKeyUp: {
      name: 'on-key-up',
      description: 'Emitted on key up event.',
      table: {
        category: 'Events',
      },
    },
    onOutsideClick: {
      name: 'on-outside-click',
      description: 'Emitted on outside click event.',
      table: {
        category: 'Events',
      },
    },
    keepValueOnEscapeHit: {
      name: 'keep-value-on-escape-hit',
      description:
        'Bu default `Escape` key will clear the value. Setting true prevents that.',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    'available-text': {
      name: 'availableText',
    },
    'unavailable-text': {
      name: 'unavailableText',
    },
    'owned-by-text': {
      name: 'ownedByText',
    },
    'is-full-width': {
      name: 'isFullWidth',
    },
    'custom-class': {
      name: 'customClass',
    },
    'is-readonly': {
      name: 'isReadonly',
    },
    'is-disabled': {
      name: 'isDisabled',
    },
    'is-searching': {
      name: 'isSearching',
    },
    'show-no-results': {
      name: 'showNoResults',
    },
    'right-icon': {
      name: 'rightIcon',
    },
    'no-results-text': {
      name: 'noResultsText',
    },
    'hide-loading': {
      name: 'hideLoading',
    },
    'has-reset': {
      name: 'hasReset',
    },
    'max-height': {
      name: 'maxHeight',
    },
    'group-labels': {
      name: 'groupLabels',
    },
    'with-group-labels': {
      name: 'withGroupLabels',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'subtle'],
      table: {
        category: 'Attributes',
      },
    },
  },
  args: {
    value: '',
    size: 'large',
    name: '',
    label: '',
    description: '',
    error: '',
    customClass: '',
    placeholder: '',
    availableText: undefined,
    unavailableText: undefined,
    ownedByText: undefined,
    isReadonly: false,
    isFullWidth: false,
    isDisabled: false,
    autofocus: false,
    borderless: false,
    isSearching: false,
    showNoResults: false,
    hideLoading: false,
    hasReset: false,
    rightIcon: undefined,
    keepValueOnEscapeHit: false,
    withGroupLabels: false,
    id: 'search',
    autocomplete: 'off',
    results: [
      {
        id: '1',
        value: 'First result',
      },
      {
        id: '2',
        value: 'Second result',
      },
      {
        id: '3',
        value: 'Third result',
      },
    ],
    debounce: undefined,
    noResultsText: 'No results found...',
    selected: undefined,
    maxHeight: undefined,
    groupLabels: undefined,
    variant: 'default',
  },
  parameters: {
    controls: {
      exclude: [
        'isFullWidth',
        'customClass',
        'isReadonly',
        'isDisabled',
        'isSearching',
        'availableText',
        'unavailableText',
        'ownedByText',
        'isDebouncing',
        'debounceTimer',
        'styles',
        'showNoResults',
        'noResultsText',
        'margin',
        'rightIcon',
        'resultsParsed',
        'searchTerm',
        'hideLoading',
        'inputStyles',
        'resultStyles',
        'hasReset',
        'keepValueOnEscapeHit',
        'maxHeight',
        'groupLabels',
        'withGroupLabels',
      ],
    },
  },
}

export default meta

const Template = ({
  value,
  name,
  placeholder,
  label,
  description,
  error,
  isFullWidth,
  autofocus,
  isReadonly,
  isDisabled,
  customClass,
  borderless,
  debounce,
  isSearching,
  showNoResults,
  noResultsText,
  margin,
  onBlur,
  selected,
  onInputClick,
  size,
  hideLoading,
  hasReset,
  onReset,
  onKeyUp,
  onOutsideClick,
  rightIcon,
  keepValueOnEscapeHit,
  maxHeight,
  groupLabels,
  withGroupLabels,
  variant,
  ownedByText,
}) => {
  const [{ results }, updateArgs] = useArgs()

  const onSearch = (event: CustomEvent) => {
    if (event.detail.value !== '') {
      updateArgs({
        results: [
          {
            id: '1',
            value: 'First result',
          },
          {
            id: '2',
            value: 'Second result',
          },
          {
            id: '3',
            value: 'Third result',
          },
        ],
      })
    } else {
      updateArgs({ results: undefined })
    }
  }

  const onSelect = () => {
    updateArgs({ results: undefined })
  }

  return html`<lukso-search
    value=${value ? value : nothing}
    name=${name ? name : nothing}
    placeholder=${placeholder ? placeholder : nothing}
    label=${label ? label : nothing}
    description=${description ? description : nothing}
    error=${error ? error : nothing}
    ?is-full-width=${isFullWidth}
    ?autofocus=${autofocus}
    ?is-readonly=${isReadonly}
    ?is-disabled=${isDisabled}
    ?borderless=${borderless}
    ?is-searching=${isSearching}
    ?show-no-results=${showNoResults}
    ?hide-loading=${hideLoading}
    ?has-reset=${hasReset}
    ?keep-value-on-escape-hit=${keepValueOnEscapeHit}
    ?with-group-labels=${withGroupLabels}
    right-icon=${rightIcon ? rightIcon : nothing}
    custom-class=${customClass ? customClass : nothing}
    debounce=${debounce ? debounce : nothing}
    no-results-text=${noResultsText}
    selected=${selected ? selected : nothing}
    size=${size ? size : nothing}
    variant=${variant}
    max-height=${maxHeight ? maxHeight : nothing}
    group-labels=${groupLabels ? groupLabels : nothing}
    owned-by-text=${ownedByText ? ownedByText : nothing}
    results=${results ? JSON.stringify(results) : nothing}
    @on-search=${onSearch}
    @on-select=${onSelect}
    @on-blur=${onBlur}
    @on-input-click=${onInputClick}
    @on-reset=${onReset}
    @on-key-up=${onKeyUp}
    @on-outside-click=${onOutsideClick}
    style="margin-bottom: ${margin}px;"
  ></lukso-search>`
}

/** Example of search with `string` type results.  */
export const ResultString = Template.bind({})
ResultString.args = {
  placeholder: 'Type to search...',
  margin: 150,
}

/** Example of search with `profile` type results.  */
export const ResultProfile = Template.bind({})
ResultProfile.args = {
  placeholder: 'Type to search...',
  results: [
    {
      address: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      name: 'profile1',
      image: 'images/sample-avatar.jpg',
      type: SEARCH_RESULT_TYPES.PROFILE,
      standard: STANDARDS.LSP3,
    },
    {
      address: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      name: 'profile1',
      image: '',
      type: 'profile',
      standard: STANDARDS.LSP3,
    },
    // Anonymous UP
    {
      address: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      name: '',
      image: '',
      type: SEARCH_RESULT_TYPES.PROFILE,
      standard: STANDARDS.LSP3,
    },
    // Non UP and Non EOA Address
    {
      address: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      type: SEARCH_RESULT_TYPES.PROFILE,
      standard: STANDARDS.UNKNOWN,
    },
    {
      address: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      type: SEARCH_RESULT_TYPES.PROFILE,
      standard: STANDARDS.EOA,
    },
  ],
  margin: 250,
}

/** Example of search with `universal-name` type results.  */
export const ResultUniversalName = Template.bind({})
ResultUniversalName.args = {
  placeholder: 'Type to search...',
  results: [
    {
      value: 'Peter Pan',
      status: true,
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      type: SEARCH_RESULT_TYPES.UNIVERSAL_NAME,
    },
    {
      value: 'Peter Parker',
      status: false,
      id: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      type: SEARCH_RESULT_TYPES.UNIVERSAL_NAME,
    },
  ],
  margin: 100,
  size: 'x-large',
}

/** Example of search with `asset` type results.  */
export const ResultAsset = Template.bind({})
ResultAsset.args = {
  placeholder: 'Search asset...',
  results: [
    {
      name: 'My Sample Token',
      symbol: 'MST',
      image: 'images/sample-asset.jpg',
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      address: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      type: SEARCH_RESULT_TYPES.ASSET,
      standard: STANDARDS.LSP7,
      tokenType: LSP4_TOKEN_TYPES.TOKEN,
    },
    {
      name: 'My Sample NFT',
      symbol: 'MSN',
      image: 'images/sample-asset.jpg',
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      address: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      type: SEARCH_RESULT_TYPES.ASSET,
      standard: STANDARDS.LSP8,
      tokenType: LSP4_TOKEN_TYPES.NFT,
    },
    {
      name: 'My Sample Token',
      symbol: 'MST',
      image: '',
      id: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      address: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      type: SEARCH_RESULT_TYPES.ASSET,
      standard: STANDARDS.LSP7,
      tokenType: LSP4_TOKEN_TYPES.TOKEN,
    },
    {
      name: 'My Sample NFT',
      symbol: 'MSN',
      image: '',
      id: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      address: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      type: SEARCH_RESULT_TYPES.ASSET,
      standard: STANDARDS.LSP8,
      tokenType: LSP4_TOKEN_TYPES.NFT,
    },
  ],
  margin: 200,
}

/** Example of search with `nft` type results. A single NFT (with `tokenId`) shows its own image as a rounded square, its name, its collection name (left out when the name starts with it) and, from the `sm` breakpoint up, its owner (`ownerName`, prefixed with `owned-by-text`). A collection shows its image, name and symbol. Below fungible tokens (`asset` type) as a separate group.  */
export const ResultNft = Template.bind({})
ResultNft.args = {
  placeholder: 'Search...',
  value: 'fabian',
  isFullWidth: true,
  results: [
    {
      name: 'Fabian',
      symbol: 'FAB',
      image: '',
      id: '0x60b687a728574f550921d4d320b193159d30c944',
      address: '0x60b687a728574f550921d4d320b193159d30c944',
      type: SEARCH_RESULT_TYPES.ASSET,
      standard: STANDARDS.LSP7,
      tokenType: LSP4_TOKEN_TYPES.TOKEN,
    },
    {
      name: 'Fabian when new listing?',
      symbol: 'FWHNELI',
      image:
        'https://api.universalprofile.cloud/image/QmdfH8QMVUNnv3hjjYSsikNBf6UXvgiqxkoXk6ck4MXz5X?method=keccak256(bytes)&data=0xe2a74bf83555ad9531e34fedcf5840d69a6b188c40b8a572c13fd4ec4713caab',
      id: '0xa1ef810b84aa1ec9e1dfc4a40be54d0d8ab5ee1f',
      address: '0xa1ef810b84aa1ec9e1dfc4a40be54d0d8ab5ee1f',
      type: SEARCH_RESULT_TYPES.ASSET,
      standard: STANDARDS.LSP7,
      tokenType: LSP4_TOKEN_TYPES.TOKEN,
    },
    ...NFT_RESULTS,
  ],
  margin: 450,
  maxHeight: 600,
  groupLabels: JSON.stringify({
    [SEARCH_RESULT_TYPES.ASSET]: 'Tokens',
    [SEARCH_RESULT_TYPES.NFT]: 'NFTs',
  }),
  withGroupLabels: true,
}

/** Example of search with `app` type results.  */
export const ResultApp = Template.bind({})
ResultApp.args = {
  placeholder: 'Search app...',
  results: [
    {
      name: 'My Sample App',
      image: 'images/sample-avatar.jpg',
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      address: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      type: SEARCH_RESULT_TYPES.APP,
      standard: STANDARDS.LSP3,
    },
    {
      name: 'My Sample App',
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      address: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      type: SEARCH_RESULT_TYPES.APP,
      standard: STANDARDS.LSP3,
    },
  ],
  margin: 100,
}

/** Example of search with mixed result types.  */
export const ResultMixed = Template.bind({})
ResultMixed.args = {
  placeholder: 'Search...',
  results: [
    {
      id: 'recent-searches',
      type: SEARCH_RESULT_TYPES.RECENT_SEARCH,
      value: [
        {
          id: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
          address: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
          name: 'Profile',
          image: 'images/sample-avatar.jpg',
          type: SEARCH_RESULT_TYPES.PROFILE,
          standard: STANDARDS.LSP3,
        },
        {
          id: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
          address: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
          name: 'My Sample Token',
          symbol: 'MST',
          image: 'images/sample-asset.jpg',
          type: SEARCH_RESULT_TYPES.ASSET,
          standard: STANDARDS.LSP7,
          tokenType: LSP4_TOKEN_TYPES.TOKEN,
        },
        {
          id: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
          address: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
          type: SEARCH_RESULT_TYPES.PROFILE,
          standard: STANDARDS.EOA,
        },
        {
          id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
          address: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
          name: 'My Sample App',
          image: 'images/sample-avatar.jpg',
          type: SEARCH_RESULT_TYPES.APP,
          standard: STANDARDS.LSP3,
        },
        {
          id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49-0x01',
          address: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
          tokenId:
            '0x0000000000000000000000000000000000000000000000000000000000000001',
          name: 'My Sample NFT #1',
          collectionName: 'My Sample NFT',
          image: 'images/sample-asset.jpg',
          type: SEARCH_RESULT_TYPES.NFT,
          standard: STANDARDS.LSP8,
          tokenType: LSP4_TOKEN_TYPES.COLLECTION,
        },
      ],
    },
    {
      id: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      address: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      name: 'Profile',
      image: 'images/sample-avatar.jpg',
      type: SEARCH_RESULT_TYPES.PROFILE,
      standard: STANDARDS.LSP3,
    },
    {
      id: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      address: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      type: SEARCH_RESULT_TYPES.PROFILE,
      standard: STANDARDS.EOA,
    },
    {
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      address: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      name: 'My Sample Token',
      symbol: 'MST',
      image: 'images/sample-asset.jpg',
      type: SEARCH_RESULT_TYPES.ASSET,
      standard: STANDARDS.LSP7,
      tokenType: LSP4_TOKEN_TYPES.TOKEN,
    },
    {
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      address: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      name: 'My Sample NFT',
      symbol: 'MSN',
      image: 'images/sample-asset.jpg',
      type: SEARCH_RESULT_TYPES.ASSET,
      standard: STANDARDS.LSP8,
      tokenType: LSP4_TOKEN_TYPES.NFT,
    },
    {
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49-0x01',
      address: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      tokenId:
        '0x0000000000000000000000000000000000000000000000000000000000000001',
      name: 'My Sample NFT #1',
      collectionName: 'My Sample NFT',
      ownerName: 'profile1',
      image: 'images/sample-asset.jpg',
      type: SEARCH_RESULT_TYPES.NFT,
      standard: STANDARDS.LSP8,
      tokenType: LSP4_TOKEN_TYPES.COLLECTION,
    },
    {
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      address: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      name: 'My Sample App',
      image: 'images/sample-avatar.jpg',
      type: SEARCH_RESULT_TYPES.APP,
      standard: STANDARDS.LSP3,
    },
    {
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      address: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      name: 'My Sample App',
      type: SEARCH_RESULT_TYPES.APP,
      standard: STANDARDS.LSP3,
    },
  ],
  margin: 500,
  maxHeight: 600,
  groupLabels: JSON.stringify({
    [SEARCH_RESULT_TYPES.PROFILE]: 'Trending profiles',
    [SEARCH_RESULT_TYPES.ASSET]: 'Trending assets',
    [SEARCH_RESULT_TYPES.NFT]: 'Trending NFTs',
    [SEARCH_RESULT_TYPES.APP]: 'Trending apps',
    [SEARCH_RESULT_TYPES.RECENT_SEARCH]: 'Recent searches',
  }),
  withGroupLabels: true,
}

/** Example of search with a `search-hint` result: example searches shown as a list, one per line, e.g. above recent searches and trending results for empty input. Its `value` holds the examples as `string` results; the optional `description` of an example is a short explanation shown after it in grey. A click on a line puts its example into the input and fires the same debounced `on-search` event as typed input, so the host needs no extra handling; no `on-select` event is emitted. Like the entries of `recent-search`, the examples are for pointer input only, and the arrow keys skip them. */
export const ResultSearchHint = Template.bind({})
ResultSearchHint.args = {
  placeholder: 'Search profiles, tokens, or NFTs',
  isFullWidth: true,
  results: [
    SEARCH_HINT_RESULT,
    {
      id: '0xcdec110f9c255357e37f46cd2687be1f7e9b02f7',
      address: '0xcdec110f9c255357e37f46cd2687be1f7e9b02f7',
      name: 'feindura',
      image: 'images/sample-avatar.jpg',
      type: SEARCH_RESULT_TYPES.PROFILE,
      standard: STANDARDS.LSP3,
    },
    {
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      address: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      name: 'My Sample Token',
      symbol: 'MST',
      image: 'images/sample-asset.jpg',
      type: SEARCH_RESULT_TYPES.ASSET,
      standard: STANDARDS.LSP7,
      tokenType: LSP4_TOKEN_TYPES.TOKEN,
    },
  ],
  margin: 250,
  groupLabels: JSON.stringify({
    [SEARCH_RESULT_TYPES.SEARCH_HINT]: 'Try searching for',
    [SEARCH_RESULT_TYPES.PROFILE]: 'Trending profiles',
    [SEARCH_RESULT_TYPES.ASSET]: 'Trending tokens',
    [SEARCH_RESULT_TYPES.STRING]: 'Results',
  }),
  withGroupLabels: true,
}

/** To indicate when search is processing results you can add `is-searching` attribute. */
export const SearchingState = Template.bind({})
SearchingState.args = {
  isSearching: true,
  results: undefined,
  value: '123',
  margin: 250,
}

/** To show that search hes no results add `show-no-results` attribute. You can also customize no results text with `no-results-text` attribute. */
export const NoResults = Template.bind({})
NoResults.args = {
  showNoResults: true,
  noResultsText: 'Oops, nothing here...',
  results: undefined,
  margin: 50,
}

/** Example of custom right-icon */
export const CustomRightIcon = Template.bind({})
CustomRightIcon.args = {
  rightIcon: 'edit',
  results: undefined,
}

/** Example of selected option.  */
export const SelectedOption = Template.bind({})
SelectedOption.args = {
  margin: 150,
  selected: 1,
}

/** Example of small search.  */
export const Small = Template.bind({})
Small.args = {
  margin: 100,
  size: 'small',
}

/** Test story for `nft` results: collection name, owner, image and group label. */
export const TestNftResults: StoryObj = {
  name: 'Test: NFT results',
  render: Template,
  args: {
    results: NFT_RESULTS,
    withGroupLabels: true,
    ownedByText: 'held by',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const search = getSearch(canvasElement)
    await search.updateComplete
    const options = getOptions(search)
    const header = search.shadowRoot?.querySelector('lukso-dropdown > div')

    expect(header?.textContent?.trim()).toBe('NFTs')
    expect(options.length).toBe(NFT_RESULTS.length)
    expect(options.map(option => option.getAttribute('data-id'))).toEqual(
      NFT_RESULTS.map(result => result.id)
    )

    // the name starts with the collection name, so only the owner is added
    expect(options[0].textContent).toContain('Luksouls #2845')
    expect(mutedTexts(options[0])).toEqual(['· held by @cryptodaddi'])
    expect(mutedTexts(options[1])).toEqual([
      'Forever Moments',
      '· held by @wolfoflukso',
    ])
    // the owner is hidden below the `sm` breakpoint
    expect(
      options[1].querySelector('span.paragraph-inter-12-regular')?.className
    ).toContain('hidden sm:inline')
    // no owner name, no owner text
    expect(mutedTexts(options[3])).toEqual(['Forever Moments'])
    // collections show their symbol
    expect(mutedTexts(options[4])).toEqual(['LUK'])

    const nftImage = options[1].querySelector('lukso-profile')
    const collectionImage = options[4].querySelector('lukso-profile')

    expect(nftImage?.hasAttribute('is-square')).toBe(true)
    expect(nftImage?.hasAttribute('has-identicon')).toBe(false)
    expect(nftImage?.getAttribute('profile-url')).toBe(NFT_RESULTS[1].image)
    expect(collectionImage?.hasAttribute('is-square')).toBe(true)
    expect(collectionImage?.hasAttribute('has-identicon')).toBe(true)
    expect(
      options[3].querySelector('lukso-profile')?.getAttribute('placeholder')
    ).toBe('/assets/images/token-default.svg')
  },
}

/** Test story for selecting an `nft` result with the keyboard. */
export const TestNftKeyboardSelect: StoryObj = {
  name: 'Test: NFT keyboard selection',
  render: Template,
  args: {
    results: NFT_RESULTS,
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const search = getSearch(canvasElement)
    await search.updateComplete
    const selected = new Promise<SearchResult>(resolve => {
      search.addEventListener(
        'on-select',
        event => resolve((event as CustomEvent).detail.value),
        { once: true }
      )
    })
    // record which of its options a long list scrolls to
    const prototype = Element.prototype as Element & {
      scrollIntoViewIfNeeded?: () => void
    }
    const scrollIntoViewIfNeeded = prototype.scrollIntoViewIfNeeded
    const scrolledTo: (string | null)[] = []

    prototype.scrollIntoViewIfNeeded = function () {
      if (this.getRootNode() === search.shadowRoot) {
        scrolledTo.push(this.getAttribute('data-index'))
      }
    }

    try {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
      await search.updateComplete
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
      await search.updateComplete
    } finally {
      prototype.scrollIntoViewIfNeeded = scrollIntoViewIfNeeded
    }

    expect(
      getOptions(search)[1].hasAttribute('is-selected') &&
        !getOptions(search)[0].hasAttribute('is-selected')
    ).toBe(true)
    expect(scrolledTo).toEqual(['1', '2'])

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

    expect(await selected).toEqual(NFT_RESULTS[1])
  },
}

/** Test story for the `search-hint` result: a list of examples with explanations, a click on a line searches its example. */
export const TestSearchHint: StoryObj = {
  name: 'Test: search hints',
  render: Template,
  args: {
    results: [
      {
        ...SEARCH_HINT_RESULT,
        value: [
          ...(SEARCH_HINT_RESULT.value as SearchResult[]),
          { id: 'lukso', type: SEARCH_RESULT_TYPES.STRING, value: 'lukso' },
        ],
      },
      ...NFT_RESULTS.slice(0, 2),
    ],
    withGroupLabels: true,
    debounce: 10,
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const search = getSearch(canvasElement)
    await search.updateComplete
    const header = search.shadowRoot?.querySelector('lukso-dropdown > div')
    const hintRow = search.shadowRoot?.querySelector(
      `[data-id="${SEARCH_HINT_RESULT.id}"]`
    ) as HTMLElement
    const hints = [...hintRow.querySelectorAll('button')]
    const texts = (hint: Element) =>
      [...hint.querySelectorAll('span')].map(span => span.textContent?.trim())

    expect(header?.textContent?.trim()).toBe('Try searching for')
    // one line per example: the example, then its explanation; an example
    // without explanation shows just the example
    expect(hints.map(texts)).toEqual([
      ...SEARCH_HINTS.map(({ query, description }) => [query, description]),
      ['lukso'],
    ])

    const tops = hints.map(hint => hint.getBoundingClientRect().top)

    expect(tops.every((top, index) => !index || top > tops[index - 1])).toBe(
      true
    )

    // narrow (mobile): the example text never breaks, a long explanation is cut
    hintRow.style.width = '200px'
    const [example, description] = [...hints[4].querySelectorAll('span')]
    const exampleText = document.createRange()
    exampleText.selectNodeContents(example)

    expect(exampleText.getClientRects().length).toBe(1)
    expect(description.scrollWidth).toBeGreaterThan(description.clientWidth)

    hintRow.style.width = ''

    // the hint row is no option, the arrow keys start at the result after it
    expect(getOptions(search).length).toBe(2)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await search.updateComplete

    expect(search.selected).toBe(2)
    expect(getOptions(search)[0].hasAttribute('is-selected')).toBe(true)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))
    await search.updateComplete

    expect(search.selected).toBe(2)

    // a selection left from earlier, longer results: Enter emits nothing for
    // the hint row or a missing result, ArrowUp goes back to the last result
    const selections: unknown[] = []

    search.addEventListener('on-select', event => selections.push(event))
    search.selected = 1
    await search.updateComplete
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    search.selected = 9
    await search.updateComplete
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await search.updateComplete

    expect(selections).toEqual([])

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))
    await search.updateComplete

    expect(search.selected).toBe(3)

    // a click searches the example like typed input and selects nothing
    const searched = new Promise<string>(resolve => {
      search.addEventListener(
        'on-search',
        event => resolve((event as CustomEvent).detail.value),
        { once: true }
      )
    })

    // not bubbling: search elements of earlier stories keep their window click
    // listener and would report an outside click
    hints[1].dispatchEvent(new MouseEvent('click'))

    expect(await searched).toBe('feindura#cdec')
    expect(search.value).toBe('feindura#cdec')
    expect(selections).toEqual([])
  },
}

import { useArgs } from 'storybook/preview-api'
import { html, nothing } from 'lit-html'

import { SEARCH_RESULT_TYPES, STANDARDS } from '@/shared/enums'

import type { Meta } from '@storybook/web-components-vite'

import './index'

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
    max-height=${maxHeight ? maxHeight : nothing}
    group-labels=${groupLabels ? groupLabels : nothing}
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
      type: SEARCH_RESULT_TYPES.ASSET,
      standard: STANDARDS.LSP7,
    },
    {
      name: 'My Sample NFT',
      symbol: 'MSN',
      image: 'images/sample-asset.jpg',
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      type: SEARCH_RESULT_TYPES.ASSET,
      standard: STANDARDS.LSP8,
    },
    {
      name: 'My Sample Token',
      symbol: 'MST',
      image: '',
      id: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      type: SEARCH_RESULT_TYPES.ASSET,
      standard: STANDARDS.LSP7,
    },
    {
      name: 'My Sample NFT',
      symbol: 'MSN',
      image: '',
      id: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      type: SEARCH_RESULT_TYPES.ASSET,
      standard: STANDARDS.LSP8,
    },
  ],
  margin: 200,
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
      type: SEARCH_RESULT_TYPES.APP,
      standard: STANDARDS.LSP3,
    },
    {
      name: 'My Sample App',
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
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
      address: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      name: 'profile1',
      image: 'images/sample-avatar.jpg',
      type: SEARCH_RESULT_TYPES.PROFILE,
      standard: STANDARDS.LSP3,
    },
    {
      address: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      type: SEARCH_RESULT_TYPES.PROFILE,
      standard: STANDARDS.EOA,
    },
    {
      name: 'My Sample Token',
      symbol: 'MST',
      image: 'images/sample-asset.jpg',
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      type: SEARCH_RESULT_TYPES.ASSET,
      standard: STANDARDS.LSP7,
    },
    {
      name: 'My Sample NFT',
      symbol: 'MSN',
      image: 'images/sample-asset.jpg',
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      type: SEARCH_RESULT_TYPES.ASSET,
      standard: STANDARDS.LSP8,
    },
    {
      name: 'My Sample App',
      image: 'images/sample-avatar.jpg',
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      type: SEARCH_RESULT_TYPES.APP,
      standard: STANDARDS.LSP3,
    },
    {
      name: 'My Sample App',
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      type: SEARCH_RESULT_TYPES.APP,
      standard: STANDARDS.LSP3,
    },
  ],
  margin: 400,
  maxHeight: 600,
  groupLabels: JSON.stringify({
    [SEARCH_RESULT_TYPES.PROFILE]: 'Trending profiles',
    [SEARCH_RESULT_TYPES.ASSET]: 'Trending assets',
    [SEARCH_RESULT_TYPES.APP]: 'Trending apps',
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

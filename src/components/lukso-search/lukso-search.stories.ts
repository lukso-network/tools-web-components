import { html } from 'lit-html'
import { Meta } from '@storybook/web-components'
import { useArgs } from '@storybook/client-api'

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
      description: 'Debounce events in milliseconds.',
      table: {
        category: 'Attributes',
      },
    },
    isSearching: {
      name: 'is-searching',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    showNoResults: {
      name: 'show-no-results',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    noResultsText: {
      name: 'no-results-text',
      control: { type: 'text' },
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
    'no-results-text': {
      name: 'noResultsText',
    },
  },
  args: {
    type: 'text',
    value: '',
    name: 'input',
    label: '',
    description: '',
    error: '',
    isReadonly: false,
    customClass: '',
    placeholder: '',
    isFullWidth: false,
    isDisabled: false,
    autofocus: false,
    borderless: false,
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
    debounce: 700,
    isSearching: false,
    showNoResults: false,
    noResultsText: 'No results found...',
  },
  parameters: {
    controls: {
      exclude: [
        'defaultInputStyles',
        'defaultUnitStyles',
        'isFullWidth',
        'hasFocus',
        'hasHighlight',
        'customClass',
        'isReadonly',
        'isDisabled',
        'isSearching',
        'isDebouncing',
        'debounceTimer',
        'styles',
        'showNoResults',
        'noResultsText',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=420%3A3617&t=JAexoWba0Re3ntDk-4',
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
    value=${value}
    name=${name}
    placeholder=${placeholder}
    label=${label}
    description=${description}
    error=${error}
    ?is-full-width=${isFullWidth}
    ?autofocus=${autofocus}
    ?is-readonly=${isReadonly}
    ?is-disabled=${isDisabled}
    custom-class=${customClass}
    ?borderless=${borderless}
    results=${JSON.stringify(results)}
    debounce=${debounce}
    ?is-searching=${isSearching}
    no-results-text=${noResultsText}
    ?show-no-results=${showNoResults}
    @on-search=${onSearch}
    @on-select=${onSelect}
    class="mb-[200px]"
  ></lukso-search>`
}

/** Example of search with `string` values.  */
export const DefaultSearch = Template.bind({})
DefaultSearch.args = {
  placeholder: 'Type to search...',
}

/** Example of search with `profile` values.  */
export const ProfileSearch = Template.bind({})
ProfileSearch.args = {
  placeholder: 'Type to search...',
  results: [
    {
      address: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      name: 'profile1',
      image:
        'data:image/webp;base64,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',
    },
    {
      address: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      name: 'profile1',
      image: '',
    },
    {
      address: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
    },
  ],
}

/** To indicate when search is processing results you can add `is-searching` attribute. */
export const SearchingState = Template.bind({})
SearchingState.args = {
  isSearching: true,
  results: undefined,
}

/** To show that search hes no results add `show-no-results` attribute. You can also customize no results text with `no-results-text` attribute. */
export const NoResults = Template.bind({})
NoResults.args = {
  showNoResults: true,
  noResultsText: 'Oops, nothing here...',
  results: undefined,
}

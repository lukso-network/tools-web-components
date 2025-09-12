import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'

import './index'

/**  Documentation and examples of `lukso-text-editor` component.  */
const meta: Meta = {
  title: 'Design System/Components/lukso-text-editor',
  component: 'lukso-text-editor',
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
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
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
    isReadonly: {
      name: 'is-readonly',
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
    isPreview: {
      name: 'is-preview',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    textColor: {
      name: 'text-color',
      control: { type: 'select' },
      options: [
        '',
        'neutral-20',
        'neutral-35',
        'purple-51',
        'green-54',
        'blue-50',
        'red-55',
        'honey-72',
      ],
      table: {
        category: 'Attributes',
      },
    },
    colorGroupsJson: {
      name: 'color-groups',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
      description:
        'JSON string defining custom color groups for the color picker',
    },
    'is-full-width': {
      name: 'isFullWidth',
    },
    'is-readonly': {
      name: 'isReadonly',
    },
    'is-disabled': {
      name: 'isDisabled',
    },
    'is-preview': {
      name: 'isPreview',
    },
    'text-color': {
      name: 'textColor',
    },
    'color-groups': {
      name: 'colorGroupsJson',
    },
    onChange: {
      name: 'on-change',
      description: 'Emitted on text editor value change.',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    value:
      '# Welcome to LUKSO Text Editor\n\nWrite your **markdown** content here and switch to preview mode to see the results!\n\n- Feature 1\n- Feature 2\n- Feature 3\n\nCheck out [LUKSO](https://lukso.network) for more information.',
    label: 'Text Editor',
    description:
      'Use the toolbar buttons to format text and toggle preview mode',
    name: 'editor',
    size: 'large',
    isFullWidth: false,
    isReadonly: false,
    isDisabled: false,
    isPreview: false,
    textColor: '',
    colorGroupsJson: '',
    error: '',
  },
  parameters: {
    controls: {
      exclude: [
        'isFullWidth',
        'isReadonly',
        'isDisabled',
        'isPreview',
        'textColor',
        'colorGroupsJson',
      ],
    },
  },
}

export default meta

const Template = ({
  value,
  name,
  label,
  description,
  error,
  size,
  isFullWidth,
  isReadonly,
  isDisabled,
  isPreview,
  textColor,
  colorGroupsJson,
  onChange,
}) =>
  html`<lukso-text-editor
    .value=${value}
    name=${name}
    label=${label}
    description=${description}
    error=${error}
    size=${size ? size : nothing}
    text-color=${textColor ? textColor : nothing}
    color-groups=${colorGroupsJson ? colorGroupsJson : nothing}
    ?is-full-width=${isFullWidth}
    ?is-readonly=${isReadonly}
    ?is-disabled=${isDisabled}
    ?is-preview=${isPreview}
    @on-change=${onChange}
  ></lukso-text-editor>`

/** Example of default text editor with sample content.  */
export const Default = Template.bind({})
Default.args = {}

/** Example of text editor with empty content. */
export const Empty = Template.bind({})
Empty.args = {
  value: '',
  label: 'Create new document',
  description: 'Start writing your markdown content',
}

/** Example of text editor in preview mode. */
export const PreviewMode = Template.bind({})
PreviewMode.args = {
  isPreview: true,
  label: 'Preview Mode',
}

/** Example with custom text color. */
export const ColoredText = Template.bind({})
ColoredText.args = {
  textColor: 'purple-51',
  label: 'Purple Text Editor',
  value:
    '# Purple Heading\n\nThis text will appear in **purple color** in both edit and preview modes.',
}

/** Example of full width editor. */
export const FullWidth = Template.bind({})
FullWidth.args = {
  isFullWidth: true,
  label: 'Full Width Editor',
}

/** Example of readonly editor. */
export const Readonly = Template.bind({})
Readonly.args = {
  isReadonly: true,
  label: 'Read-only Content',
  description: 'This content cannot be modified',
  value:
    '# Read-only Document\n\nThis content is **read-only** and cannot be edited.',
}

/** Example of disabled editor. */
export const Disabled = Template.bind({})
Disabled.args = {
  isDisabled: true,
  label: 'Disabled Editor',
  description: 'This editor is currently disabled',
}

/** Example with error state. */
export const WithError = Template.bind({})
WithError.args = {
  error: 'Please provide valid markdown content',
  label: 'Editor with Error',
}

/** Example of small size editor. */
export const SmallSize = Template.bind({})
SmallSize.args = {
  size: 'small',
  label: 'Small Editor',
  value: '# Small Editor\n\nCompact markdown editor.',
}

/** Complex markdown example showing various features. */
export const ComplexMarkdown = Template.bind({})
ComplexMarkdown.args = {
  isFullWidth: true,
  label: 'Advanced Markdown Example',
  value: `# Advanced Markdown Features

## Typography

This editor supports **bold text**, *italic text*, and even ***bold italic***.

## Lists

### Unordered Lists
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3

### Ordered Lists
1. First item
2. Second item
3. Third item

## Links and Code

Visit [LUKSO Network](https://lukso.network) for more information.

Here's some \`inline code\` and a code block:

\`\`\`javascript
const greeting = "Hello, LUKSO!"
console.log(greeting)
\`\`\`

## Tables

| Feature | Status | Notes |
|---------|--------|--------|
| Headings | ✅ | H1, H2, H3 |
| Formatting | ✅ | Bold, Italic |
| Links | ✅ | Auto-generated |
| Colors | ✅ | Tailwind palette |

## Quotes

> This is a blockquote demonstrating 
> the markdown rendering capabilities.

---

*Use the toolbar buttons above to add these elements easily!*`,
}

/** Example demonstrating smart selection-aware formatting. */
export const SelectionFormatting = Template.bind({})
SelectionFormatting.args = {
  label: 'Smart Selection Formatting',
  description:
    'Try selecting text and using the formatting buttons. Notice how buttons show active states!',
  value: `# Selection-Aware Formatting Demo

Try these interactions:

1. **Select this bold text** - notice the B button becomes active
2. Select *this italic text* - notice the I button becomes active  
3. Click in [this link](https://lukso.network) - notice the Link button becomes active
4. Click on this heading line - notice the H button becomes active and shows H1

## Instructions:
- Select text and click formatting buttons to toggle on/off
- Click in formatted text to see active button states
- Empty selections expand to current word for smart formatting
- Link button toggles: creates links or removes them
- Heading dropdown: click H button to see heading options
- Heading options work on entire lines

Try selecting "example text" and making it **bold** or *italic*!`,
}

/** Example demonstrating inline color formatting. */
export const InlineColorFormatting = Template.bind({})
InlineColorFormatting.args = {
  label: 'Inline Color Formatting',
  description:
    'Select text and use the "Text color" dropdown to apply colors. Colors are preserved in preview mode!',
  value: `# Color Formatting Demo

This editor supports <span style="color: var(--purple-51)">inline color formatting</span> using HTML span elements that work in both edit and preview modes.

## Try It Yourself:

1. Select some text below
2. Click the "Text color" button in the toolbar
3. Choose a color from the palette
4. Switch to preview mode to see the result!

Example: Make this text <span style="color: var(--green-54)">green</span>, this text <span style="color: var(--red-55)">red</span>, or this text <span style="color: var(--blue-50)">blue</span>.

### Color Update Test:
Here's some <span style="color: var(--purple-51)">purple text</span> that you can select and change to a different color. Notice how it updates the existing span instead of nesting tags!

### Features:
- ✅ **Selection preserved**: Color dropdown doesn't lose your text selection
- ✅ **Toggle colors**: Apply, change, or remove colors easily
- ✅ **Active states**: Color button shows when text has color formatting
- ✅ **Preview compatible**: Colors render properly in markdown preview
- ✅ **Smart selection**: Empty selections expand to current word
- ✅ **Undo/Redo**: Color changes are tracked in undo history

**Instructions**: Select the word "awesome" below and try different colors!

LUKSO is awesome and supports many great features.`,
}

/** Example with custom color groups for the color picker. */
export const CustomColorGroups = Template.bind({})
CustomColorGroups.args = {
  label: 'Custom Color Groups',
  description:
    'This editor uses a custom set of colors in the color picker palette',
  colorGroupsJson: JSON.stringify({
    neutral: ['20', '60', '90'],
    purple: ['51', '31'],
    green: ['54', '85'],
    blue: ['50', '85'],
    red: ['55', '85'],
    honey: ['72'],
    coral: ['74'],
    lukso: ['50', '70', '90'],
    measure: ['50', '80'],
  }),
  value: `# Custom Color Picker Demo

This editor uses custom color groups defined via the \`color-groups\` attribute.

The color picker now includes LUKSO brand colors and measure colors, with a reduced neutral palette.

**Try selecting text and see the custom color options!**

You can customize the color picker by providing a JSON string with your desired color groups and shades.`,
}

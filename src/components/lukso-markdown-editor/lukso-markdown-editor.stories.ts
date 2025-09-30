import { html, nothing } from 'lit-html'
import { expect, userEvent } from '@storybook/test'

import { wait } from '../../../.storybook/test-helpers'

import type { Meta, StoryObj } from '@storybook/web-components-vite'

import './index'

/**  Documentation and examples of `lukso-markdown-editor` component.  */
const meta: Meta = {
  title: 'Design System/Forms/lukso-markdown-editor',
  component: 'lukso-markdown-editor',
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
    isNonResizable: {
      name: 'is-non-resizable',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
      description:
        'If true, the text editor height will be fixed and not user-resizable',
    },
    autofocus: {
      control: { type: 'boolean' },
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
    rows: {
      control: { type: 'number' },
      table: {
        category: 'Attributes',
      },
    },
    previewBackgroundColor: {
      name: 'preview-background-color',
      control: { type: 'color' },
      table: {
        category: 'Styles',
        defaultValue: { summary: '#ffffff' },
      },
    },
    previewTextColor: {
      name: 'preview-text-color',
      control: { type: 'color' },
      table: {
        category: 'Styles',
        defaultValue: { summary: '#374151' },
      },
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
    'is-non-resizable': {
      name: 'isNonResizable',
    },
    'preview-background-color': {
      name: 'previewBackgroundColor',
    },
    'preview-text-color': {
      name: 'previewTextColor',
    },
    onMarkdownChange: {
      name: 'on-markdown-change',
      description: 'Emitted on text editor value change.',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    value:
      '# Welcome to LUKSO Markdown Editor\n\nWrite your **markdown** content here and switch to preview mode to see the results!\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n1. Numbered item\n2. Another item\n3. Final item\n\nCheck out [LUKSO](https://lukso.network) for more information.',
    label: 'Markdown Editor',
    description:
      'Use the toolbar buttons to format text and toggle preview mode',
    name: 'editor',
    size: 'large',
    isFullWidth: false,
    isReadonly: false,
    isDisabled: false,
    isPreview: false,
    isNonResizable: false,
    autofocus: false,
    error: '',
    placeholder: '',
    rows: 6,
    previewBackgroundColor: undefined,
  },
  parameters: {
    controls: {
      exclude: [
        'isFullWidth',
        'isReadonly',
        'isDisabled',
        'isPreview',
        'isNonResizable',
        'savedSelectionForPreview',
        'isHeadingDropdownOpen',
        'isColorDropdownOpen',
        'isListDropdownOpen',
        'headingTriggerId',
        'colorTriggerId',
        'listTriggerId',
        'currentSelection',
        'savedSelection',
        'activeFormats',
        'undoStack',
        'redoStack',
        'isUndoRedoAction',
        'lastSavedValue',
        'undoTimeout',
        'MAX_UNDO_STACK_SIZE',
        'UNDO_SAVE_DELAY',
        'textareaEl',
        'handleOutsideClick',
        'toolbarButton',
        'defaultColor',
        'colorSamples',
        'handleTextareaInput',
        'handleTextareaKeyUp',
        'handleTextareaClick',
        'handleKeyDown',
        'styles',
        'previewBackgroundColor',
        'previewTextColor',
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
  isNonResizable,
  autofocus,
  onMarkdownChange,
  placeholder,
  rows,
  previewBackgroundColor,
  previewTextColor,
}) =>
  html`<lukso-markdown-editor
    .value=${value}
    name=${name ? name : nothing}
    label=${label ? label : nothing}
    description=${description ? description : nothing}
    error=${error ? error : nothing}
    size=${size ? size : nothing}
    placeholder=${placeholder ? placeholder : nothing}
    rows=${rows ? rows : nothing}
    preview-background-color=${previewBackgroundColor
      ? previewBackgroundColor
      : nothing}
    preview-text-color=${previewTextColor ? previewTextColor : nothing}
    ?is-full-width=${isFullWidth}
    ?is-readonly=${isReadonly}
    ?is-disabled=${isDisabled}
    ?is-preview=${isPreview}
    ?is-non-resizable=${isNonResizable}
    ?autofocus=${autofocus}
    @on-markdown-change=${onMarkdownChange}
  ></lukso-markdown-editor>`

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
    1. Nested item
    2. Another nested item
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

## Alignment

<div style="text-align: center;">Center</div>

<div style="text-align: right;">Right</div>
`,
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
- Click on this unordered list item - notice the List button becomes active

## Instructions:
- Select text and click formatting buttons to toggle on/off
- Click in formatted text to see active button states
- Empty selections expand to current word for smart formatting
- Link button toggles: creates links or removes them
- Heading dropdown: click H button to see heading options
- List dropdown: click List button to create ordered/unordered lists
- Heading and list options work on entire lines

### List Examples:
Unordered list:
- Item 1
- Item 2
- Item 3

Ordered list:
1. First item
2. Second item
3. Third item

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

/** Example of custom preview background and text color */
export const CustomPreviewBackgroundAndText = Template.bind({})
CustomPreviewBackgroundAndText.args = {
  label: 'Custom Preview Background',
  description: 'Select a background color for the preview area.',
  previewBackgroundColor: '#000000',
  previewTextColor: '#7cbff2',
  isPreview: true,
}

/** Example of accessibility checker in preview mode */
export const AccessibilityChecker = Template.bind({})
AccessibilityChecker.args = {
  label: 'Accessibility Checker Demo',
  description:
    'This story demonstrates the accessibility checker with content containing violations',
  isPreview: true,
  value: `# Welcome to Accessibility Testing

This content has some accessibility issues that should trigger the checker:

## Images without alt text
![](https://example.com/image.jpg)

<img src="https://example.com/another.jpg">

## Table without headers
| Data | Values |
|------|--------|
| Item | 100 |
| Test | 200 |

## Proper content (no violations)

**Bold text** works fine, *italic text* too.

[Links with text](https://lukso.network) are good.

![Proper image](https://example.com/good.jpg)

## Color contrast issues
<span style="color: #cccccc;">Light gray text that might be hard to read</span>

## Form elements without labels
<input type="text" placeholder="Enter your name">

<select>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>

Switch to preview mode to see the accessibility violations indicator!`,
}

/***************** */

const getEditorElements = async (canvasElement: HTMLElement) => {
  // Wait for the editor element to be present
  const editor = canvasElement.querySelector('lukso-markdown-editor')
  if (!editor) {
    throw new Error('lukso-markdown-editor not found in canvas element')
  }

  // Wait for shadow DOM to be ready
  await new Promise(resolve => {
    const checkShadowDOM = () => {
      if (editor.shadowRoot) {
        const textareaComponent =
          editor.shadowRoot.querySelector('lukso-textarea')
        if (textareaComponent?.shadowRoot) {
          const textarea =
            textareaComponent.shadowRoot.querySelector('textarea')
          if (textarea) {
            resolve(undefined)
          } else {
            setTimeout(checkShadowDOM, 50)
          }
        } else {
          setTimeout(checkShadowDOM, 50)
        }
      } else {
        setTimeout(checkShadowDOM, 50)
      }
    }
    checkShadowDOM()
  })

  const textarea = editor.shadowRoot
    ?.querySelector('lukso-textarea')
    ?.shadowRoot?.querySelector('textarea')

  const preview = editor?.shadowRoot?.querySelector('lukso-markdown')

  const boldButton = editor?.shadowRoot?.querySelector('[aria-label="Bold"]')

  const italicButton = editor?.shadowRoot?.querySelector(
    '[aria-label="Italic"]'
  )
  const linkButton = editor?.shadowRoot?.querySelector('[aria-label="Link"]')

  const previewButton = editor?.shadowRoot?.querySelector(
    '[aria-label="Toggle preview"]'
  )

  const headerDropdown = editor?.shadowRoot?.querySelector(
    '[aria-label="Heading options"]'
  )

  const listDropdown = editor?.shadowRoot?.querySelector(
    '[aria-label="List options"]'
  )

  const colorDropdown = editor?.shadowRoot?.querySelector(
    '[aria-label="Text color"]'
  )

  const alignmentDropdown = editor?.shadowRoot?.querySelector(
    '[aria-label="Text alignment"]'
  )

  const selectHeader = (_editor: HTMLElement, number: number) =>
    _editor?.shadowRoot?.querySelector(
      `#headingDropdown lukso-dropdown-option:nth-child(${number})`
    )

  const selectColor = (_editor: HTMLElement, color: string) =>
    _editor?.shadowRoot
      ?.querySelector('#colorDropdown')
      ?.querySelector(`[aria-label="Color ${color}"]`)

  const clearColor = (_editor: HTMLElement) =>
    _editor?.shadowRoot
      ?.querySelector('#colorDropdown')
      ?.querySelector('button[aria-label="Clear color"]')

  const selectList = (_editor: HTMLElement, number: number) =>
    _editor?.shadowRoot?.querySelector(
      `#listDropdown lukso-dropdown-option:nth-child(${number})`
    )

  const selectAlignment = (_editor: HTMLElement, alignment: string) =>
    _editor?.shadowRoot
      ?.querySelector('#alignmentDropdown')
      ?.querySelector(`[aria-label="Align ${alignment}"]`)

  const accessibilityIndicator = (_editor: HTMLElement) =>
    _editor?.shadowRoot?.querySelector('.accessibility-indicator')

  return {
    editor,
    textarea,
    preview,
    accessibilityIndicator,
    boldButton,
    italicButton,
    linkButton,
    previewButton,
    headerDropdown,
    listDropdown,
    colorDropdown,
    selectHeader,
    selectColor,
    clearColor,
    selectList,
    alignmentDropdown,
    selectAlignment,
  }
}

const getMarkdown = (editor: HTMLElement) => {
  const markdownElement = editor?.shadowRoot?.querySelector('lukso-markdown')
  const sanitizeElement =
    markdownElement?.shadowRoot?.querySelector('lukso-sanitize')
  const html = sanitizeElement?.shadowRoot?.querySelector('div.prose')

  return {
    html,
    innerHtml: html?.innerHTML,
  }
}

const selectText = async (textarea: HTMLTextAreaElement, text: string) => {
  const start = textarea.value.indexOf(text)
  const end = start + text.length
  textarea.setSelectionRange(start, end)
  textarea.focus()
  await wait(500)
}

const selectAtCharacter = async (
  textarea: HTMLTextAreaElement,
  place: number
) => {
  textarea.setSelectionRange(place, place)
  textarea.focus()
  await wait(500)
}

const waitForAccessibilityCheck = async (editor: HTMLElement) => {
  let attempts = 0
  const maxAttempts = 10
  while (attempts < maxAttempts) {
    await wait(500)
    const _accessibilityIndicator = editor?.shadowRoot?.querySelector(
      '.accessibility-indicator'
    )
    if (_accessibilityIndicator) break
    attempts++
  }
}

const getAccessabilityTooltipText = (accessibilityIndicator: Element) => {
  const tooltipElement = accessibilityIndicator?.querySelector('lukso-tooltip')
  expect(tooltipElement).toBeTruthy()

  const tooltipSlot = tooltipElement?.querySelector('[slot="text"]')
  const tooltipText = tooltipSlot?.textContent

  return tooltipText
}

/** Test story for preview functionality. */
export const TestPreviewFunctionality: StoryObj = {
  name: 'Test: Preview Functionality',
  args: {
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
    1. Nested item
    2. Another nested item
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

## Alignment

<div style="text-align: center;">Center</div>

<div style="text-align: right;">Right</div>
`,
    label: 'Test: Preview Functionality',
    description: 'This story tests the preview functionality.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, previewButton, editor } =
      await getEditorElements(canvasElement)

    expect(textarea.value).toBe(`# Advanced Markdown Features

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
    1. Nested item
    2. Another nested item
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

## Alignment

<div style="text-align: center;">Center</div>

<div style="text-align: right;">Right</div>
`)
    await userEvent.click(previewButton)
    const { innerHtml } = getMarkdown(editor)
    expect(innerHtml).toBe(`<h1>Advanced Markdown Features</h1>
<h2>Typography</h2>
<p>This editor supports <strong>bold text</strong>, <em>italic text</em>, and even <em><strong>bold italic</strong></em>.</p>
<h2>Lists</h2>
<h3>Unordered Lists</h3>
<ul>
<li>Item 1</li>
<li>Item 2<ul>
<li>Nested item</li>
<li>Another nested item</li>
</ul>
</li>
<li>Item 3</li>
</ul>
<h3>Ordered Lists</h3>
<ol>
<li>First item</li>
<li>Second item<ol>
<li>Nested item</li>
<li>Another nested item</li>
</ol>
</li>
<li>Third item</li>
</ol>
<h2>Links and Code</h2>
<p>Visit <a href="https://lukso.network">LUKSO Network</a> for more information.</p>
<p>Here's some <code>inline code</code> and a code block:</p>
<pre><code class="language-javascript">const greeting = "Hello, LUKSO!"
console.log(greeting)
</code></pre>
<h2>Tables</h2>
<table>
<thead>
<tr>
<th>Feature</th>
<th>Status</th>
<th>Notes</th>
</tr>
</thead>
<tbody><tr>
<td>Headings</td>
<td>✅</td>
<td>H1, H2, H3</td>
</tr>
<tr>
<td>Formatting</td>
<td>✅</td>
<td>Bold, Italic</td>
</tr>
<tr>
<td>Links</td>
<td>✅</td>
<td>Auto-generated</td>
</tr>
<tr>
<td>Colors</td>
<td>✅</td>
<td>Tailwind palette</td>
</tr>
</tbody></table>
<h2>Quotes</h2>
<blockquote>
<p>This is a blockquote demonstrating
the markdown rendering capabilities.</p>
</blockquote>
<h2>Alignment</h2>
<div style="text-align: center;">Center</div>

<div style="text-align: right;">Right</div>\n`)
  },
}

/** Test story for bold formatting functionality. */
export const TestBoldFormatting: StoryObj = {
  name: 'Test: Bold Formatting',
  args: {
    value: 'test',
    label: 'Test: Bold Formatting',
    description: 'This story tests the bold formatting functionality.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, boldButton } = await getEditorElements(canvasElement)

    expect(textarea.value).toBe('test')
    await userEvent.click(boldButton)
    expect(textarea.value).toBe('**test**')
  },
}

/** Test story for italic formatting functionality. */
export const TestItalicFormatting: StoryObj = {
  name: 'Test: Italic Formatting',
  args: {
    value: 'test',
    label: 'Test: Italic Formatting',
    description: 'This story tests the italic formatting functionality.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, italicButton } = await getEditorElements(canvasElement)

    expect(textarea.value).toBe('test')
    await userEvent.click(italicButton)
    expect(textarea.value).toBe('*test*')
  },
}

/** Test story for link creation functionality. */
export const TestLinkCreation: StoryObj = {
  name: 'Test: Link Creation',
  args: {
    value: 'click',
    label: 'Test: Link Creation',
    description: 'This story tests the link creation functionality.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, linkButton } = await getEditorElements(canvasElement)

    expect(textarea.value).toBe('click')
    await userEvent.click(linkButton)
    expect(textarea.value).toBe('[click]()')
  },
}

/** Test story for adding h1 header. */
export const TestAddH1Header: StoryObj = {
  name: 'Test: Add H1 Header',
  args: {
    value: 'Header',
    label: 'Test: Add H1 Header',
    description: 'This story tests adding an H1 header.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, headerDropdown, editor, selectHeader } =
      await getEditorElements(canvasElement)

    expect(textarea.value).toBe('Header')
    await userEvent.click(headerDropdown)
    const h1Option = selectHeader(editor, 2)
    await userEvent.click(h1Option)
    expect(textarea.value).toBe('# Header')
  },
}

/** Test story for adding h2 header. */
export const TestAddH2Header: StoryObj = {
  name: 'Test: Add H2 Header',
  args: {
    value: 'Header',
    label: 'Test: Add H2 Header',
    description: 'This story tests adding an H2 header.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, headerDropdown, editor, selectHeader } =
      await getEditorElements(canvasElement)

    expect(textarea.value).toBe('Header')
    await userEvent.click(headerDropdown)
    const h2Option = selectHeader(editor, 3)
    await userEvent.click(h2Option)
    expect(textarea.value).toBe('## Header')
  },
}

/** Test story for adding h3 header. */
export const TestAddH3Header: StoryObj = {
  name: 'Test: Add H3 Header',
  args: {
    value: 'Header',
    label: 'Test: Add H3 Header',
    description: 'This story tests adding an H3 header.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, headerDropdown, editor, selectHeader } =
      await getEditorElements(canvasElement)

    expect(textarea.value).toBe('Header')
    await userEvent.click(headerDropdown)
    const h3Option = selectHeader(editor, 4)
    await userEvent.click(h3Option)
    expect(textarea.value).toBe('### Header')
  },
}

/** Test story for adding h4 header. */
export const TestAddH4Header: StoryObj = {
  name: 'Test: Add H4 Header',
  args: {
    value: 'Header',
    label: 'Test: Add H4 Header',
    description: 'This story tests adding an H4 header.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, headerDropdown, editor, selectHeader } =
      await getEditorElements(canvasElement)

    expect(textarea.value).toBe('Header')
    await userEvent.click(headerDropdown)
    const h4Option = selectHeader(editor, 5)
    await userEvent.click(h4Option)
    expect(textarea.value).toBe('#### Header')
  },
}

/** Test story for removing header. */
export const TestRemoveHeader: StoryObj = {
  name: 'Test: Remove Header',
  args: {
    value: '# Header',
    label: 'Test: Remove Header',
    description: 'This story tests removing an header.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, headerDropdown, editor, selectHeader } =
      await getEditorElements(canvasElement)

    expect(textarea.value).toBe('# Header')
    await userEvent.click(headerDropdown)
    const noHeaderOption = selectHeader(editor, 1)
    await userEvent.click(noHeaderOption)
    expect(textarea.value).toBe('Header')
  },
}

/** Test story for applying text color */
export const TestApplyTextColor: StoryObj = {
  name: 'Test: Apply Text Color',
  args: {
    value: 'This is Color text.',
    label: 'Test: Apply Text Color',
    description: 'This story tests applying text color formatting.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, colorDropdown, editor, selectColor } =
      await getEditorElements(canvasElement)

    expect(textarea.value).toBe('This is Color text.')
    await selectText(textarea, 'Color')
    await userEvent.click(colorDropdown)
    const redOption = selectColor(editor, '#FF4D4D')
    await userEvent.click(redOption)
    expect(textarea.value).toBe(
      'This is <span style="color: #FF4D4D">Color</span> text.'
    )
  },
}

/** Test story for removing text color */
export const TestRemoveTextColor: StoryObj = {
  name: 'Test: Remove Text Color',
  args: {
    value: 'This is <span style="color: #FF4D4D">Color</span> text.',
    label: 'Test: Remove Text Color',
    description: 'This story tests removing text color formatting.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, colorDropdown, editor, clearColor } =
      await getEditorElements(canvasElement)

    expect(textarea.value).toBe(
      'This is <span style="color: #FF4D4D">Color</span> text.'
    )
    await selectText(textarea, 'Color')
    await userEvent.click(colorDropdown)
    await userEvent.click(clearColor(editor))
    expect(textarea.value).toBe('This is Color text.')
  },
}

/** Test story for creating unordered list */
export const TestCreateUnorderedList: StoryObj = {
  name: 'Test: Create Unordered List',
  args: {
    value: 'Item',
    label: 'Test: Create Unordered List',
    description: 'This story tests creating an unordered list.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, listDropdown, editor, selectList } =
      await getEditorElements(canvasElement)

    expect(textarea.value).toBe('Item')
    await userEvent.click(listDropdown)
    const unorderedOption = selectList(editor, 2)
    await userEvent.click(unorderedOption)
    expect(textarea.value).toBe('- Item')
  },
}

/** Test story for adding next item to unordered list */
export const TestAddNextItemUnorderedList: StoryObj = {
  name: 'Test: Add Next Item to Unordered List',
  args: {
    value: '- Item',
    label: 'Test: Add Next Item to Unordered List',
    description: 'This story tests adding the next item to an unordered list.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea } = await getEditorElements(canvasElement)

    expect(textarea.value).toBe('- Item')
    await selectAtCharacter(textarea, 6)
    await userEvent.keyboard('{Enter}')
    expect(textarea.value).toBe('- Item\n- ')
    await userEvent.keyboard('Next item')
    expect(textarea.value).toBe('- Item\n- Next item')
  },
}

/** Test story for removing item from unordered list */
export const TestRemoveItemUnorderedList: StoryObj = {
  name: 'Test: Remove Item from Unordered List',
  args: {
    value: '- Item\n- Next item',
    label: 'Test: Remove Item from Unordered List',
    description: 'This story tests removing an item from an unordered list.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea } = await getEditorElements(canvasElement)

    expect(textarea.value).toBe('- Item\n- Next item')
    await selectText(textarea, 'Next item')
    await userEvent.keyboard('{Backspace}') // Remove selection
    await userEvent.keyboard('{Backspace}') // Remove list item
    expect(textarea.value).toBe('- Item')
  },
}

/** Test story for adding nested item from unordered list */
export const TestAddNestedItemUnorderedList: StoryObj = {
  name: 'Test: Add Nested Item to Unordered List',
  args: {
    value: '- Item',
    label: 'Test: Add Nested Item to Unordered List',
    description: 'This story tests adding a nested item to an unordered list.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea } = await getEditorElements(canvasElement)

    expect(textarea.value).toBe('- Item')
    await selectAtCharacter(textarea, 6)
    await userEvent.keyboard('{Enter}')
    await selectAtCharacter(textarea, 10)
    await userEvent.keyboard('{Tab}')
    await userEvent.keyboard('Next item')
    expect(textarea.value).toBe('- Item\n    - Next item')
  },
}

/** Test story for creating ordered list */
export const TestCreateOrderedList: StoryObj = {
  name: 'Test: Create Ordered List',
  args: {
    value: 'Item',
    label: 'Test: Create Ordered List',
    description: 'This story tests creating an ordered list.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, listDropdown, editor, selectList } =
      await getEditorElements(canvasElement)

    expect(textarea.value).toBe('Item')
    await userEvent.click(listDropdown)
    const orderedOption = selectList(editor, 3)
    await userEvent.click(orderedOption)
    expect(textarea.value).toBe('1. Item')
  },
}

/** Test story for adding next item to ordered list */
export const TestAddNextItemOrderedList: StoryObj = {
  name: 'Test: Add Next Item to Ordered List',
  args: {
    value: '1. Item\n2. Next item',
    label: 'Test: Add Next Item to Ordered List',
    description: 'This story tests adding the next item to an ordered list.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea } = await getEditorElements(canvasElement)

    expect(textarea.value).toBe('1. Item\n2. Next item')
    await selectAtCharacter(textarea, 7)
    await userEvent.keyboard('{Enter}')
    expect(textarea.value).toBe('1. Item\n2. \n3. Next item')
    await userEvent.keyboard('New item')
    expect(textarea.value).toBe('1. Item\n2. New item\n3. Next item')
  },
}

/** Test story for removing item from ordered list */
export const TestRemoveItemOrderedList: StoryObj = {
  name: 'Test: Remove Item from Ordered List',
  args: {
    value: '1. Item\n2. Next item\n3. Another item',
    label: 'Test: Remove Item from Ordered List',
    description: 'This story tests removing an item from an ordered list.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea } = await getEditorElements(canvasElement)

    expect(textarea.value).toBe('1. Item\n2. Next item\n3. Another item')
    await selectText(textarea, 'Next item')
    await userEvent.keyboard('{Backspace}') // Remove selection
    await userEvent.keyboard('{Backspace}') // Remove list item
    expect(textarea.value).toBe('1. Item\n2. Another item')
  },
}

/** Test story for adding nested item from ordered list */
export const TestAddNestedItemOrderedList: StoryObj = {
  name: 'Test: Add Nested Item to Ordered List',
  args: {
    value: '1. Item\n2. Next item\n3. Another item',
    label: 'Test: Add Nested Item to Ordered List',
    description: 'This story tests adding a nested item to an ordered list.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea } = await getEditorElements(canvasElement)

    expect(textarea.value).toBe('1. Item\n2. Next item\n3. Another item')
    await selectAtCharacter(textarea, 10) // Place cursor at second item
    await userEvent.keyboard('{Tab}')
    // Wait for tab - doesn't create nesting in this context
    expect(textarea.value).toBe('1. Item\n    1. Next item\n2. Another item')
  },
}

/** Test story for converting unnested item to another nested item */
export const TestConvertUnnestedToNestedItem: StoryObj = {
  name: 'Test: Convert Unnested to Nested Item',
  args: {
    value: '1. Item\n    1. Next item\n2. Another item',
    label: 'Test: Convert Unnested to Nested Item',
    description:
      'This story tests converting an unnested item to a nested item.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea } = await getEditorElements(canvasElement)

    expect(textarea.value).toBe('1. Item\n    1. Next item\n2. Another item')
    await selectAtCharacter(textarea, 29) // Place cursor at second item
    await userEvent.keyboard('{Tab}')
    // Wait for tab indentation - affects both items
    expect(textarea.value).toBe(
      '1. Item\n    1. Next item\n    2. Another item'
    )
  },
}

/** Test story for aligning text in center */
export const TestAlignTextCenter: StoryObj = {
  name: 'Test: Align Text Center',
  args: {
    value: 'Center',
    label: 'Test: Align Text Center',
    description: 'This story tests aligning text to the center.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, alignmentDropdown, editor, selectAlignment } =
      await getEditorElements(canvasElement)

    expect(textarea.value).toBe('Center')
    await selectText(textarea, 'Center')
    await userEvent.click(alignmentDropdown)
    const centerOption = selectAlignment(editor, 'center')
    await userEvent.click(centerOption)
    expect(textarea.value).toBe('<div style="text-align: center;">Center</div>')
  },
}

/** Test story for aligning text to the right */
export const TestAlignTextRight: StoryObj = {
  name: 'Test: Align Text Right',
  args: {
    value: 'Right',
    label: 'Test: Align Text Right',
    description: 'This story tests aligning text to the right.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, alignmentDropdown, editor, selectAlignment } =
      await getEditorElements(canvasElement)

    expect(textarea.value).toBe('Right')
    await selectText(textarea, 'Right')
    await userEvent.click(alignmentDropdown)
    const rightOption = selectAlignment(editor, 'right')
    await userEvent.click(rightOption)
    expect(textarea.value).toBe('<div style="text-align: right;">Right</div>')
  },
}

/** Test story for aligning bold text */
export const TestAlignBoldText: StoryObj = {
  name: 'Test: Align Bold Text',
  args: {
    value: '**Bold**',
    label: 'Test: Align Bold Text',
    description: 'This story tests aligning bold text.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, alignmentDropdown, editor, selectAlignment } =
      await getEditorElements(canvasElement)

    expect(textarea.value).toBe('**Bold**')
    await selectText(textarea, 'Bold')
    await userEvent.click(alignmentDropdown)
    const centerOption = selectAlignment(editor, 'center')
    await userEvent.click(centerOption)
    expect(textarea.value).toBe(
      '**<div style="text-align: center;">Bold</div>**'
    )
  },
}

/** Test story for aligning italic text */
export const TestAlignItalicText: StoryObj = {
  name: 'Test: Align Italic Text',
  args: {
    value: '*Italic*',
    label: 'Test: Align Italic Text',
    description: 'This story tests aligning italic text.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, alignmentDropdown, editor, selectAlignment } =
      await getEditorElements(canvasElement)

    expect(textarea.value).toBe('*Italic*')
    await selectText(textarea, 'Italic')
    await userEvent.click(alignmentDropdown)
    const centerOption = selectAlignment(editor, 'center')
    await userEvent.click(centerOption)
    expect(textarea.value).toBe(
      '*<div style="text-align: center;">Italic</div>*'
    )
  },
}

/** Test story for aligning header text */
export const TestAlignHeaderText: StoryObj = {
  name: 'Test: Align Header Text',
  args: {
    value: '# Header',
    label: 'Test: Align Header Text',
    description: 'This story tests aligning header text.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, alignmentDropdown, editor, selectAlignment } =
      await getEditorElements(canvasElement)

    expect(textarea.value).toBe('# Header')
    await selectText(textarea, 'Header')
    await userEvent.click(alignmentDropdown)
    const centerOption = selectAlignment(editor, 'center')
    await userEvent.click(centerOption)
    expect(textarea.value).toBe(
      '# <div style="text-align: center;">Header</div>'
    )
  },
}

/** Test story for aligning link text */
export const TestAlignLinkText: StoryObj = {
  name: 'Test: Align Link Text',
  args: {
    value: '[LUKSO](https://lukso.network)',
    label: 'Test: Align Link Text',
    description: 'This story tests aligning link text.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { textarea, alignmentDropdown, editor, selectAlignment } =
      await getEditorElements(canvasElement)

    expect(textarea.value).toBe('[LUKSO](https://lukso.network)')
    await selectText(textarea, 'LUKSO')
    await userEvent.click(alignmentDropdown)
    const centerOption = selectAlignment(editor, 'center')
    await userEvent.click(centerOption)
    expect(textarea.value).toBe(
      '[<div style="text-align: center;">LUKSO</div>](https://lukso.network)'
    )
  },
}

/** Test story for accessibility checker contrast issues */
export const TestAccessibilityContrast: StoryObj = {
  name: 'Test: Accessibility Contrast',
  args: {
    value: `# Accessibility Test

## Color Contrast Issues
<div style="background: white; padding: 10px;">
  <p style="color: #ccc;">Light gray text on white (poor contrast)</p>
  <p style="color: #ddd;">Very light gray text (poor contrast)</p>
  <span style="color: yellow;">Yellow text on white background</span>
</div>

<div style="background: #f8f8f8; padding: 10px;">
  <p style="color: white;">White text on very light gray</p>
  <small style="color: #bbb;">Light text in small size</small>
</div>`,
    label: 'Test: Accessibility Contrast',
    description: 'This story tests the accessibility contrast issues.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { accessibilityIndicator, editor, previewButton } =
      await getEditorElements(canvasElement)
    await userEvent.click(previewButton)
    const accessibilityIndicatorElement = accessibilityIndicator(editor)
    expect(accessibilityIndicatorElement).toBeFalsy()
    await waitForAccessibilityCheck(editor)
    expect(accessibilityIndicator).toBeTruthy()
    const tooltipText = getAccessabilityTooltipText(
      accessibilityIndicator(editor)
    )
    expect(tooltipText).toContain('Accessibility Issues Found')
    expect(tooltipText).toContain('5 elements affected')
    expect(tooltipText).toContain(
      'Elements must meet minimum color contrast ratio thresholds'
    )
  },
}

/** Test story for accessibility checker image alt issues */
export const TestAccessibilityImageAlt: StoryObj = {
  name: 'Test: Accessibility Image Alt',
  args: {
    value: `# Accessibility Test

## Images Without Alt Text
<img src="missing-alt.jpg">
<img src="another-image.png">`,
    label: 'Test: Accessibility Image Alt',
    description: 'This story tests the accessibility image alt issues.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { accessibilityIndicator, editor, previewButton } =
      await getEditorElements(canvasElement)
    await userEvent.click(previewButton)
    const accessibilityIndicatorElement = accessibilityIndicator(editor)
    expect(accessibilityIndicatorElement).toBeFalsy()
    await waitForAccessibilityCheck(editor)
    expect(accessibilityIndicator).toBeTruthy()
    const tooltipText = getAccessabilityTooltipText(
      accessibilityIndicator(editor)
    )
    expect(tooltipText).toContain('Accessibility Issues Found')
    expect(tooltipText).toContain('2 elements affected')
    expect(tooltipText).toContain('Images must have alternative text')
  },
}

/** Test story for accessibility checker link issues */
export const TestAccessibilityLinkIssues: StoryObj = {
  name: 'Test: Accessibility Link Issues',
  args: {
    value: `# Accessibility Test

## Links Without Text
<a href="#"></a>
<a href="https://example.com"><img src="icon.png"></a>`,
    label: 'Test: Accessibility Link Issues',
    description: 'This story tests the accessibility link issues.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { accessibilityIndicator, editor, previewButton } =
      await getEditorElements(canvasElement)
    await userEvent.click(previewButton)
    const accessibilityIndicatorElement = accessibilityIndicator(editor)
    expect(accessibilityIndicatorElement).toBeFalsy()
    await waitForAccessibilityCheck(editor)
    expect(accessibilityIndicator).toBeTruthy()
    const tooltipText = getAccessabilityTooltipText(
      accessibilityIndicator(editor)
    )
    expect(tooltipText).toContain('Accessibility Issues Found')
    expect(tooltipText).toContain('2 elements affected')
    expect(tooltipText).toContain('Links must have discernible text')
  },
}

/** Test story for accessibility checker header issues */
export const TestAccessibilityHeaderIssues: StoryObj = {
  name: 'Test: Accessibility Header Issues',
  args: {
    value: `# Accessibility Test

## Missing Headings Structure
<h1>Main Title</h1>
<h3>Skipped H2 - goes straight to H3</h3>
<h5>Skipped H4 - goes to H5</h5>`,
    label: 'Test: Accessibility Header Issues',
    description: 'This story tests the accessibility header issues.',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { accessibilityIndicator, editor, previewButton } =
      await getEditorElements(canvasElement)
    await userEvent.click(previewButton)
    const accessibilityIndicatorElement = accessibilityIndicator(editor)
    expect(accessibilityIndicatorElement).toBeFalsy()
    await waitForAccessibilityCheck(editor)
    expect(accessibilityIndicator).toBeTruthy()
    const tooltipText = getAccessabilityTooltipText(
      accessibilityIndicator(editor)
    )
    expect(tooltipText).toContain('Accessibility Issues Found')
    expect(tooltipText).toContain('2 elements affected')
    expect(tooltipText).toContain('Heading levels should only increase by one')
  },
}

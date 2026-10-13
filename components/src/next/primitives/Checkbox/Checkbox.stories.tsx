// Copyright The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import type { Story } from '@ladle/react';
import { useState } from 'react';
import type { CSSProperties, ReactElement } from 'react';

import { ResponsiveBreakpointsNote } from '../../stories/ResponsiveBreakpointsNote';
import { Sample, Stack } from '../../stories/Sample';
import type { Responsive as ResponsiveValue } from '../system/responsive';
import type { SpacingToken } from '../system/spacing';
import { Checkbox } from './Checkbox';
import type { CheckboxColor, CheckboxSize } from './Checkbox';

const colors: CheckboxColor[] = ['primary', 'secondary', 'error', 'warning', 'success', 'info'];
const sizes: CheckboxSize[] = ['sm', 'md', 'lg'];
const ROW_STYLE: CSSProperties = { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' };
const COLUMN_STYLE: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '0.75rem' };
const DASHED: CSSProperties = { border: '1px dashed var(--perses-border-default)', padding: '1rem' };
const DASHED_COLUMN: CSSProperties = { ...DASHED, display: 'flex', flexDirection: 'column', gap: '0.5rem' };
const NARROW_STYLE: CSSProperties = { width: '20rem' };
const PRIVACY_LINK = <a href="#privacy">Review the privacy policy</a>;

const responsivePadding: ResponsiveValue<SpacingToken> = { default: 'sm', md: 'lg', xl: '3xl' };
const responsiveWidth: ResponsiveValue<CSSProperties['width']> = { default: '100%', md: 240 };
const responsiveDisplay: ResponsiveValue<CSSProperties['display']> = {
  default: 'none',
  md: 'inline-flex',
  lg: 'inline-flex',
  xl: 'inline-flex',
};

function ControlledCheckbox(): ReactElement {
  const [checked, setChecked] = useState(false);

  return <Checkbox checked={checked} onCheckedChange={setChecked} label="Enable notifications" />;
}

const basicCode = `const [checked, setChecked] = useState(false);

<Checkbox checked={checked} onCheckedChange={setChecked} label="Enable notifications" />`;

export const Basic: Story = () => (
  <Stack>
    <p>
      <code>Checkbox</code> toggles a boolean option. It accepts responsive style props — spacing (<code>p</code>,{' '}
      <code>m</code>), sizing (<code>width</code>…) and display (<code>display</code>) — plus any native attribute.
      Style props apply to the outermost element: the field wrapper when a label, description or body is rendered,
      otherwise the control.
    </p>
    <Sample title="Minimal usage" code={basicCode}>
      <ControlledCheckbox />
    </Sample>
  </Stack>
);
Basic.storyName = 'Basic';

const variantsCode = `// size:  'sm' | 'md' | 'lg'
// color: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info'
<Checkbox size="lg" color="error" defaultChecked label="Delete" />`;
const positionCode = `// labelPosition: 'end' (default) | 'start'
<Checkbox labelPosition="start" label="Label before the control" />`;

export const AllVariantsAndColors: Story = () => (
  <Stack>
    <Sample title="Sizes and colors" code={variantsCode}>
      <div style={COLUMN_STYLE}>
        <div style={ROW_STYLE}>
          {sizes.map((size) => (
            <Checkbox key={size} size={size} defaultChecked label={size} />
          ))}
        </div>
        <div style={ROW_STYLE}>
          {colors.map((color) => (
            <Checkbox key={color} color={color} defaultChecked label={color} />
          ))}
        </div>
      </div>
    </Sample>

    <Sample title="Label position" code={positionCode}>
      <Checkbox label="Label before the control" labelPosition="start" />
    </Sample>
  </Stack>
);
AllVariantsAndColors.storyName = 'Variants';

const statesCode = `<Checkbox label="Unchecked" />
<Checkbox label="Checked" defaultChecked />
<Checkbox label="Partially selected" indeterminate />
<Checkbox label="Disabled" disabled />
<Checkbox label="Read only" readOnly checked />
<Checkbox label="Required" required />
<Checkbox label="Invalid" invalid />`;
const supportingCode = `<Checkbox
  label="Share usage data"
  description="Help improve Perses by sending anonymous usage information."
  body={<a href="#privacy">Review the privacy policy</a>}
/>`;
const standaloneCode = `// Without a label, pass aria-label
<Checkbox aria-label="Select all rows" indeterminate />`;
const longCode = `<div style={{ width: '20rem' }}>
  <Checkbox
    label="Use this option for every dashboard in the current project, including dashboards added later"
    description="You can change this setting at any time from project preferences."
  />
</div>`;

export const States: Story = () => (
  <Stack>
    <Sample title="States" code={statesCode}>
      <div style={COLUMN_STYLE}>
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Partially selected" indeterminate />
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled and checked" disabled checked />
        <Checkbox label="Read only" readOnly checked />
        <Checkbox label="Required" required />
        <Checkbox label="Invalid" invalid />
      </div>
    </Sample>

    <Sample title="Supporting content" code={supportingCode}>
      <Checkbox
        label="Share usage data"
        description="Help improve Perses by sending anonymous usage information."
        body={PRIVACY_LINK}
      />
    </Sample>

    <Sample title="Standalone" code={standaloneCode}>
      <Checkbox aria-label="Select all rows" indeterminate />
    </Sample>

    <Sample title="Long content" code={longCode}>
      <div style={NARROW_STYLE}>
        <Checkbox
          label="Use this option for every dashboard in the current project, including dashboards added later"
          description="You can change this setting at any time from project preferences."
        />
      </div>
    </Sample>
  </Stack>
);
States.storyName = 'States';

const paddingCode = `// p accepts any spacing token: 0, xs, sm, md, lg, xl, 2xl, 3xl, 4xl
<Checkbox p="xl" label="Extra padding" />`;
const paddingDirCode = `<Checkbox px="3xl" py="xs" label="horizontal 3xl, vertical xs" />`;
const marginCode = `<Checkbox mx="xl" my="md" label="offset from its container" />`;

export const Spacing: Story = () => (
  <Stack>
    <Sample title="Padding (p)" code={paddingCode}>
      <Checkbox p="xl" label="Extra padding" />
    </Sample>

    <Sample title="Directional padding (px, py)" code={paddingDirCode}>
      <Checkbox px="3xl" py="xs" label="horizontal 3xl, vertical xs" />
    </Sample>

    <Sample title="Directional margin (mx, my)" code={marginCode}>
      <div style={DASHED}>
        <Checkbox mx="xl" my="md" label="offset from its container" />
      </div>
    </Sample>
  </Stack>
);
Spacing.storyName = 'Spacing';

const widthCode = `<Checkbox width={240} label="Fixed 240px wide" />
<Checkbox width="100%" label="Full width" />`;
const minMaxCode = `<Checkbox minWidth={160} maxWidth={200} label="minWidth 160, maxWidth 200" />`;

export const Sizing: Story = () => (
  <Stack>
    <Sample title="Fixed and relative width — a number means pixels" code={widthCode}>
      <div style={DASHED_COLUMN}>
        <Checkbox width={240} label="Fixed 240px wide" />
        <Checkbox width="100%" label="Full width" />
      </div>
    </Sample>

    <Sample title="Min / max constraints" code={minMaxCode}>
      <Checkbox minWidth={160} maxWidth={200} label="minWidth 160, maxWidth 200" />
    </Sample>
  </Stack>
);
Sizing.storyName = 'Sizing';

const responsiveSpacingCode = `// Resize the window: padding grows with the breakpoint.
// Always include \`default\` — breakpoints without a value fall back to the browser default.
<Checkbox p={{ default: 'sm', md: 'lg', xl: '3xl' }} label="Padding changes per breakpoint" />`;
const responsiveWidthCode = `// Full width on small screens, fixed width from md up.
<Checkbox width={{ default: '100%', md: 240 }} label="Width changes per breakpoint" />`;
const responsiveDisplayCode = `// Hidden below md, shown (as inline-flex) from md up.
<Checkbox display={{ default: 'none', md: 'inline-flex', lg: 'inline-flex', xl: 'inline-flex' }} label="Visible from md up" />`;

export const Responsive: Story = () => (
  <Stack>
    <ResponsiveBreakpointsNote />
    <Sample title="Responsive spacing" code={responsiveSpacingCode}>
      <Checkbox p={responsivePadding} label="Padding changes per breakpoint" />
    </Sample>

    <Sample title="Responsive width" code={responsiveWidthCode}>
      <Checkbox width={responsiveWidth} label="Width changes per breakpoint" />
    </Sample>

    <Sample title="Responsive display" code={responsiveDisplayCode}>
      <Checkbox display={responsiveDisplay} label="Visible from md up" />
    </Sample>
  </Stack>
);
Responsive.storyName = 'Responsive';

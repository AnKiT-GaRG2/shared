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
import type { Size } from '../types';
import { Switch } from './Switch';

const sizes: Size[] = ['sm', 'md', 'lg'];
const noop = (): void => {};
const columnStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '0.5rem' };
const rowStyle: CSSProperties = { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' };
const dashed: CSSProperties = { border: '1px dashed var(--perses-border-default)', padding: '1rem' };
const dashedColumn: CSSProperties = { ...dashed, ...columnStyle };

const responsivePadding: ResponsiveValue<SpacingToken> = { default: 'sm', md: 'lg', xl: '3xl' };
const responsiveWidth: ResponsiveValue<CSSProperties['width']> = { default: '100%', md: 240 };
const responsiveDisplay: ResponsiveValue<CSSProperties['display']> = {
  default: 'none',
  md: 'inline-flex',
  lg: 'inline-flex',
  xl: 'inline-flex',
};

const basicCode = `const [checked, setChecked] = useState(false);

<Switch checked={checked} onCheckedChange={setChecked} label="Enable feature" />`;

function ControlledSwitch(): ReactElement {
  const [checked, setChecked] = useState(false);
  return <Switch checked={checked} onCheckedChange={setChecked} label="Enable feature" />;
}

export const Basic: Story = () => (
  <Stack>
    <p>
      <code>Switch</code> toggles a setting on or off. It accepts responsive style props — spacing (<code>p</code>,{' '}
      <code>m</code>), sizing (<code>width</code>…) and display (<code>display</code>) — plus any native attribute.
      Style props apply to the outermost element: the label wrapper when <code>label</code> is set, otherwise the
      switch.
    </p>
    <Sample title="Minimal usage" code={basicCode}>
      <ControlledSwitch />
    </Sample>
  </Stack>
);
Basic.storyName = 'Basic';

const sizesCode = `// size: 'sm' | 'md' | 'lg'
<Switch size="lg" checked onCheckedChange={setChecked} label="lg" />`;
const withoutLabelCode = `// Without a label, pass aria-label
<Switch aria-label="Enable feature" checked={checked} onCheckedChange={setChecked} />`;

export const AllSizes: Story = () => (
  <Stack>
    <Sample title="Sizes" code={sizesCode}>
      <div style={rowStyle}>
        {sizes.map((size) => (
          <Switch key={size} size={size} checked onCheckedChange={noop} label={size} />
        ))}
      </div>
    </Sample>

    <Sample title="Without a label" code={withoutLabelCode}>
      <Switch aria-label="Enable feature" checked={false} onCheckedChange={noop} />
    </Sample>
  </Stack>
);
AllSizes.storyName = 'Variants';

const disabledCode = `<Switch checked={false} disabled label="Disabled, off" />
<Switch checked disabled label="Disabled, on" />`;
const readOnlyCode = `<Switch checked readOnly label="Read-only, on" />
<Switch checked={false} readOnly label="Read-only, off" />`;

export const States: Story = () => (
  <Stack>
    <Sample title="Disabled" code={disabledCode}>
      <div style={columnStyle}>
        <Switch checked={false} onCheckedChange={noop} disabled label="Disabled, off" />
        <Switch checked onCheckedChange={noop} disabled label="Disabled, on" />
      </div>
    </Sample>

    <Sample title="Read only" code={readOnlyCode}>
      <div style={columnStyle}>
        <Switch checked readOnly onCheckedChange={noop} label="Read-only, on" />
        <Switch checked={false} readOnly onCheckedChange={noop} label="Read-only, off" />
      </div>
    </Sample>
  </Stack>
);
States.storyName = 'States';

const paddingCode = `// p accepts any spacing token: 0, xs, sm, md, lg, xl, 2xl, 3xl, 4xl
<Switch p="xl" label="Extra padding" />`;
const paddingDirCode = `<Switch px="3xl" py="xs" label="horizontal 3xl, vertical xs" />`;
const marginCode = `<Switch mx="xl" my="md" label="offset from its container" />`;

export const Spacing: Story = () => (
  <Stack>
    <Sample title="Padding (p)" code={paddingCode}>
      <Switch p="xl" label="Extra padding" />
    </Sample>

    <Sample title="Directional padding (px, py)" code={paddingDirCode}>
      <Switch px="3xl" py="xs" label="horizontal 3xl, vertical xs" />
    </Sample>

    <Sample title="Directional margin (mx, my)" code={marginCode}>
      <div style={dashed}>
        <Switch mx="xl" my="md" label="offset from its container" />
      </div>
    </Sample>
  </Stack>
);
Spacing.storyName = 'Spacing';

const widthCode = `<Switch width={240} label="Fixed 240px wide" />
<Switch width="100%" label="Full width" />`;
const minMaxCode = `<Switch minWidth={160} maxWidth={200} label="minWidth 160, maxWidth 200" />`;

export const Sizing: Story = () => (
  <Stack>
    <Sample title="Fixed and relative width — a number means pixels" code={widthCode}>
      <div style={dashedColumn}>
        <Switch width={240} label="Fixed 240px wide" />
        <Switch width="100%" label="Full width" />
      </div>
    </Sample>

    <Sample title="Min / max constraints" code={minMaxCode}>
      <Switch minWidth={160} maxWidth={200} label="minWidth 160, maxWidth 200" />
    </Sample>
  </Stack>
);
Sizing.storyName = 'Sizing';

const responsiveSpacingCode = `// Resize the window: padding grows with the breakpoint.
// Always include \`default\` — breakpoints without a value fall back to the browser default.
<Switch p={{ default: 'sm', md: 'lg', xl: '3xl' }} label="Padding changes per breakpoint" />`;
const responsiveWidthCode = `// Full width on small screens, fixed width from md up.
<Switch width={{ default: '100%', md: 240 }} label="Width changes per breakpoint" />`;
const responsiveDisplayCode = `// Hidden below md, shown (as inline-flex) from md up.
<Switch display={{ default: 'none', md: 'inline-flex', lg: 'inline-flex', xl: 'inline-flex' }} label="Visible from md up" />`;

export const Responsive: Story = () => (
  <Stack>
    <ResponsiveBreakpointsNote />
    <Sample title="Responsive spacing" code={responsiveSpacingCode}>
      <Switch p={responsivePadding} label="Padding changes per breakpoint" />
    </Sample>

    <Sample title="Responsive width" code={responsiveWidthCode}>
      <Switch width={responsiveWidth} label="Width changes per breakpoint" />
    </Sample>

    <Sample title="Responsive display" code={responsiveDisplayCode}>
      <Switch display={responsiveDisplay} label="Visible from md up" />
    </Sample>
  </Stack>
);
Responsive.storyName = 'Responsive';

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
import type { CSSProperties } from 'react';

import { ResponsiveBreakpointsNote } from '../../stories/ResponsiveBreakpointsNote';
import { Sample, Stack } from '../../stories/Sample';
import type { Responsive as ResponsiveValue } from '../system/responsive';
import type { SpacingToken } from '../system/spacing';
import type { Size, Status } from '../types';
import { TextField } from './TextField';

const sizes: Size[] = ['xs', 'sm', 'md', 'lg'];
const statuses: Array<Status | undefined> = [undefined, 'error', 'warning', 'success', 'info'];

const dashed: CSSProperties = { border: '1px dashed var(--perses-border-default)', padding: '1rem' };
const dashedColumn: CSSProperties = { ...dashed, display: 'flex', flexDirection: 'column', gap: '0.5rem' };
const columnStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1rem' };
const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: `repeat(${sizes.length}, max-content)`,
  gap: '1rem',
};

const responsivePadding: ResponsiveValue<SpacingToken> = { default: 'sm', md: 'lg', xl: '3xl' };
const responsiveWidth: ResponsiveValue<CSSProperties['width']> = {
  default: '12rem',
  sm: '16rem',
  md: '24rem',
  lg: '32rem',
  xl: '40rem',
};
const responsiveDisplay: ResponsiveValue<CSSProperties['display']> = {
  default: 'none',
  md: 'inline-flex',
  lg: 'inline-flex',
  xl: 'inline-flex',
};

const searchIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
    <line x1="11" y1="11" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const percentAdornment = <span>%</span>;
const dollarAdornment = <span>$</span>;

const basicCode = `<TextField label="Name" placeholder="Type here" />`;

export const Basic: Story = () => (
  <Stack>
    <p>
      <code>TextField</code> is a text input with a label and helper text. It accepts responsive style props — spacing (
      <code>p</code>, <code>m</code>), sizing (<code>width</code>…) and display (<code>display</code>) — which apply to
      the root element. Native input attributes go to the input.
    </p>
    <Sample title="Minimal usage" code={basicCode}>
      <TextField label="Name" placeholder="Type here" />
    </Sample>
  </Stack>
);
Basic.storyName = 'Basic';

const variantsCode = `// size:   'xs' | 'sm' | 'md' | 'lg'
// status: 'error' | 'warning' | 'success' | 'info'
<TextField label="Email" size="lg" status="error" helperText="This field has error status" />`;
const adornmentsCode = `<TextField label="Search" placeholder="Search..." startAdornment={<SearchIcon />} />
<TextField label="Amount" placeholder="0" startAdornment={<span>$</span>} endAdornment={<span>%</span>} />`;
const multilineCode = `<TextField label="Comment" multiline rows={4} placeholder="Write a longer response..." fullWidth />`;

export const SizesAndStatuses: Story = () => (
  <Stack>
    <Sample title="Sizes and statuses" code={variantsCode}>
      <div style={gridStyle}>
        {statuses.map((status) =>
          sizes.map((size) => (
            <TextField
              key={`${status ?? 'default'}-${size}`}
              label={`${status ?? 'default'} / ${size}`}
              status={status}
              size={size}
              helperText={status ? `This field has ${status} status` : undefined}
              placeholder="Type here"
            />
          )),
        )}
      </div>
    </Sample>

    <Sample title="Adornments" code={adornmentsCode}>
      <div style={columnStyle}>
        <TextField label="Search" placeholder="Search..." startAdornment={searchIcon} />
        <TextField label="Amount" placeholder="0" endAdornment={percentAdornment} startAdornment={dollarAdornment} />
      </div>
    </Sample>

    <Sample title="Multiline" code={multilineCode}>
      <TextField label="Comment" multiline rows={4} placeholder="Write a longer response..." fullWidth />
    </Sample>
  </Stack>
);
SizesAndStatuses.storyName = 'Variants';

const helperCode = `<TextField label="Name" helperText="Shown to other members of your team" />`;
const disabledCode = `<TextField label="Disabled" disabled defaultValue="Cannot be edited" />`;

export const States: Story = () => (
  <Stack>
    <Sample title="Helper text" code={helperCode}>
      <TextField label="Name" helperText="Shown to other members of your team" />
    </Sample>

    <Sample title="Disabled" code={disabledCode}>
      <TextField label="Disabled" disabled defaultValue="Cannot be edited" />
    </Sample>
  </Stack>
);
States.storyName = 'States';

const paddingCode = `// p accepts any spacing token: 0, xs, sm, md, lg, xl, 2xl, 3xl, 4xl
<TextField p="xl" label="Extra padding" />`;
const paddingDirCode = `<TextField px="3xl" py="xs" label="horizontal 3xl, vertical xs" />`;
const marginCode = `<TextField mx="xl" my="md" label="offset from its container" />`;

export const Spacing: Story = () => (
  <Stack>
    <Sample title="Padding (p)" code={paddingCode}>
      <TextField p="xl" label="Extra padding" />
    </Sample>

    <Sample title="Directional padding (px, py)" code={paddingDirCode}>
      <TextField px="3xl" py="xs" label="horizontal 3xl, vertical xs" />
    </Sample>

    <Sample title="Directional margin (mx, my)" code={marginCode}>
      <div style={dashed}>
        <TextField mx="xl" my="md" label="offset from its container" />
      </div>
    </Sample>
  </Stack>
);
Spacing.storyName = 'Spacing';

const widthCode = `<TextField width={240} label="Fixed 240px wide" />
<TextField width="100%" label="Full width" />`;
const minMaxCode = `<TextField minWidth={160} maxWidth={200} label="minWidth 160, maxWidth 200" />`;

export const Sizing: Story = () => (
  <Stack>
    <Sample title="Fixed and relative width — a number means pixels" code={widthCode}>
      <div style={dashedColumn}>
        <TextField width={240} label="Fixed 240px wide" />
        <TextField width="100%" label="Full width" />
      </div>
    </Sample>

    <Sample title="Min / max constraints" code={minMaxCode}>
      <TextField minWidth={160} maxWidth={200} label="minWidth 160, maxWidth 200" />
    </Sample>
  </Stack>
);
Sizing.storyName = 'Sizing';

const responsiveSpacingCode = `// Resize the window: padding grows with the breakpoint.
// Always include \`default\` — breakpoints without a value fall back to the browser default.
<TextField p={{ default: 'sm', md: 'lg', xl: '3xl' }} label="Padding changes per breakpoint" />`;
const responsiveWidthCode = `// The field grows with the viewport.
<TextField width={{ default: '12rem', sm: '16rem', md: '24rem', lg: '32rem', xl: '40rem' }} label="Responsive width" />`;
const responsiveDisplayCode = `// Hidden below md, shown (as inline-flex) from md up.
<TextField display={{ default: 'none', md: 'inline-flex', lg: 'inline-flex', xl: 'inline-flex' }} label="Visible from md up" />`;

export const Responsive: Story = () => (
  <Stack>
    <ResponsiveBreakpointsNote />
    <Sample title="Responsive spacing" code={responsiveSpacingCode}>
      <TextField p={responsivePadding} label="Padding changes per breakpoint" />
    </Sample>

    <Sample title="Responsive width" code={responsiveWidthCode}>
      <TextField width={responsiveWidth} label="Responsive width" placeholder="Grows with the viewport" />
    </Sample>

    <Sample title="Responsive display" code={responsiveDisplayCode}>
      <TextField display={responsiveDisplay} label="Visible from md up" />
    </Sample>
  </Stack>
);
Responsive.storyName = 'Responsive';

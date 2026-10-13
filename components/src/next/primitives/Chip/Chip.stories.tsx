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
import { useCallback, useState } from 'react';
import type { CSSProperties, ReactElement } from 'react';

import { ResponsiveBreakpointsNote } from '../../stories/ResponsiveBreakpointsNote';
import { Sample, Stack } from '../../stories/Sample';
import type { Responsive as ResponsiveValue } from '../system/responsive';
import type { SpacingToken } from '../system/spacing';
import type { Status } from '../types';
import { Chip } from './Chip';
import type { ChipColor, ChipSize, ChipVariant } from './Chip';

const colors: Array<ChipColor | Status> = ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'];
const statuses: Status[] = ['success', 'warning', 'error', 'info'];
const sizes: ChipSize[] = ['sm', 'md'];
const variants: ChipVariant[] = ['solid', 'outline'];

function isStatus(value: ChipColor | Status): value is Status {
  return (statuses as Array<ChipColor | Status>).includes(value);
}

function TagIcon(): ReactElement {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path
        d="M2.5 2.5H8l5.5 5.5-5.5 5.5-5.5-5.5V2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="5.25" cy="5.25" r="0.75" fill="currentColor" />
    </svg>
  );
}
const columnStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '2rem' };
const variantColumnStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '0.5rem' };
const rowStyle: CSSProperties = { display: 'flex', gap: '0.5rem', alignItems: 'center' };
const wrapRowStyle: CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' };
const sizeHeadingStyle: CSSProperties = { marginBottom: '0.5rem' };
const variantLabelStyle: CSSProperties = { width: '4rem', fontSize: '0.75rem' };
const tagIcon = <TagIcon />;
const noop = (): void => {};
const dashed: CSSProperties = { border: '1px dashed var(--perses-border-default)', padding: '1rem' };
const dashedColumn: CSSProperties = { ...dashed, display: 'flex', flexDirection: 'column', gap: '0.5rem' };

const basicCode = `<Chip>environment: production</Chip>`;

export const Basic: Story = () => (
  <Stack>
    <p>
      <code>Chip</code> is a compact element for an attribute, filter or action. It accepts responsive style props —
      spacing (<code>p</code>, <code>m</code>, <code>gap</code>), sizing (<code>width</code>…) and display (
      <code>display</code>) — plus any native <code>div</code> attribute. <code>maxWidth</code> limits the label width
      instead.
    </p>
    <Sample title="Minimal usage" code={basicCode}>
      <Chip>environment: production</Chip>
    </Sample>
  </Stack>
);
Basic.storyName = 'Basic';

const variantsCode = `// variant: 'solid' | 'outline'
// color:   'default' | 'primary' | 'secondary'; status: 'success' | 'warning' | 'error' | 'info'
// size:    'sm' | 'md'
<Chip variant="outline" status="error" size="md">failed</Chip>`;

export const AllVariantsAndColors: Story = () => (
  <Stack>
    <Sample title="Variants, colors and sizes" code={variantsCode}>
      <div style={columnStyle}>
        {sizes.map((size) => (
          <div key={size}>
            <h3 style={sizeHeadingStyle}>Size: {size}</h3>
            <div style={variantColumnStyle}>
              {variants.map((variant) => (
                <div key={variant} style={rowStyle}>
                  <span style={variantLabelStyle}>{variant}</span>
                  {colors.map((color) => (
                    <Chip
                      key={color}
                      variant={variant}
                      size={size}
                      color={isStatus(color) ? undefined : color}
                      status={isStatus(color) ? color : undefined}
                    >
                      {color}
                    </Chip>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Sample>
  </Stack>
);
AllVariantsAndColors.storyName = 'Variants';

const disabledCode = `<Chip disabled>Filled disabled</Chip>
<Chip variant="outline" disabled>Outlined disabled</Chip>
<Chip disabled onClose={onClose}>Removable disabled</Chip>`;

export const Disabled: Story = () => (
  <Stack>
    <Sample title="Disabled" code={disabledCode}>
      <div style={wrapRowStyle}>
        <Chip disabled>Filled disabled</Chip>
        <Chip variant="outline" disabled>
          Outlined disabled
        </Chip>
        <Chip disabled onClose={noop}>
          Removable disabled
        </Chip>
      </div>
    </Sample>
  </Stack>
);
Disabled.storyName = 'States';

interface RemovableChipProps {
  label: string;
  onClose: (label: string) => void;
}

function RemovableChip({ label, onClose }: RemovableChipProps): ReactElement {
  const handleClose = useCallback(() => onClose(label), [label, onClose]);

  return (
    <Chip startElement={tagIcon} onClose={handleClose}>
      {label}
    </Chip>
  );
}

const removableCode = `<Chip startElement={<TagIcon />} onClose={() => removeFilter(id)}>
  region: us-east-1
</Chip>`;

export const Removable: Story = () => {
  const [labels, setLabels] = useState(['environment: production', 'region: us-east-1', 'service: api']);
  const removeLabel = useCallback((label: string) => {
    setLabels((current) => current.filter((item) => item !== label));
  }, []);

  return (
    <Stack>
      <Sample title="Removable chips with a leading icon" code={removableCode}>
        <div style={wrapRowStyle}>
          {labels.map((label) => (
            <RemovableChip key={label} label={label} onClose={removeLabel} />
          ))}
        </div>
      </Sample>
    </Stack>
  );
};
Removable.storyName = 'Removable';

const paddingCode = `// p accepts any spacing token: 0, xs, sm, md, lg, xl, 2xl, 3xl, 4xl
<Chip p="xl">Extra padding</Chip>`;
const paddingDirCode = `<Chip px="3xl" py="xs">horizontal 3xl, vertical xs</Chip>`;
const marginCode = `<Chip mx="xl" my="md">offset from its container</Chip>`;
const gapCode = `// gap is the space between the start element and the label
<Chip startElement={<TagIcon />} gap="xl">Spaced</Chip>`;

export const Spacing: Story = () => (
  <Stack>
    <Sample title="Padding (p)" code={paddingCode}>
      <Chip p="xl">Extra padding</Chip>
    </Sample>

    <Sample title="Directional padding (px, py)" code={paddingDirCode}>
      <Chip px="3xl" py="xs">
        horizontal 3xl, vertical xs
      </Chip>
    </Sample>

    <Sample title="Directional margin (mx, my)" code={marginCode}>
      <div style={dashed}>
        <Chip mx="xl" my="md">
          offset from its container
        </Chip>
      </div>
    </Sample>

    <Sample title="Gap between start element and label" code={gapCode}>
      <Chip startElement={tagIcon} gap="xl">
        Spaced
      </Chip>
    </Sample>
  </Stack>
);
Spacing.storyName = 'Spacing';

const widthCode = `<Chip width={240}>Fixed 240px wide</Chip>
<Chip width="100%">Full width</Chip>`;
const minCode = `<Chip minWidth={160}>minWidth 160</Chip>`;
const labelMaxCode = `// maxWidth limits the label and truncates it with an ellipsis
<Chip maxWidth={120}>A very long label that gets truncated</Chip>`;

export const Sizing: Story = () => (
  <Stack>
    <Sample title="Fixed and relative width — a number means pixels" code={widthCode}>
      <div style={dashedColumn}>
        <Chip width={240}>Fixed 240px wide</Chip>
        <Chip width="100%">Full width</Chip>
      </div>
    </Sample>

    <Sample title="Min constraint" code={minCode}>
      <Chip minWidth={160}>minWidth 160</Chip>
    </Sample>

    <Sample title="maxWidth limits the label" code={labelMaxCode}>
      <Chip maxWidth={120}>A very long label that gets truncated</Chip>
    </Sample>
  </Stack>
);
Sizing.storyName = 'Sizing';

const responsivePadding: ResponsiveValue<SpacingToken> = { default: 'sm', md: 'lg', xl: '3xl' };
const responsiveWidth: ResponsiveValue<CSSProperties['width']> = { default: '100%', md: 240 };
const responsiveDisplay: ResponsiveValue<CSSProperties['display']> = {
  default: 'none',
  md: 'inline-flex',
  lg: 'inline-flex',
  xl: 'inline-flex',
};

const responsiveSpacingCode = `// Resize the window: padding grows with the breakpoint.
// Always include \`default\` — breakpoints without a value fall back to the browser default.
<Chip p={{ default: 'sm', md: 'lg', xl: '3xl' }}>Padding changes per breakpoint</Chip>`;
const responsiveWidthCode = `// Full width on small screens, fixed width from md up.
<Chip width={{ default: '100%', md: 240 }}>Width changes per breakpoint</Chip>`;
const responsiveDisplayCode = `// Hidden below md, shown (as inline-flex) from md up.
<Chip display={{ default: 'none', md: 'inline-flex', lg: 'inline-flex', xl: 'inline-flex' }}>Visible from md up</Chip>`;

export const Responsive: Story = () => (
  <Stack>
    <ResponsiveBreakpointsNote />
    <Sample title="Responsive spacing" code={responsiveSpacingCode}>
      <Chip p={responsivePadding}>Padding changes per breakpoint</Chip>
    </Sample>

    <Sample title="Responsive width" code={responsiveWidthCode}>
      <Chip width={responsiveWidth}>Width changes per breakpoint</Chip>
    </Sample>

    <Sample title="Responsive display" code={responsiveDisplayCode}>
      <Chip display={responsiveDisplay}>Visible from md up</Chip>
    </Sample>
  </Stack>
);
Responsive.storyName = 'Responsive';

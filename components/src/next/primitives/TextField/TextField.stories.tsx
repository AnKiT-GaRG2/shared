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

import type { Size, Status } from '../types';
import { TextField } from './TextField';

const sizes: Size[] = ['xs', 'sm', 'md', 'lg'];
const statuses: Array<Status | undefined> = [undefined, 'error', 'warning', 'success', 'info'];

export const SizesAndStatuses: Story = () => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, max-content)`, gap: '1rem' }}>
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
);
SizesAndStatuses.storyName = 'Sizes and Statuses';

export const WithHelperText: Story = () => <TextField label="Name" helperText="Shown to other members of your team" />;

export const Disabled: Story = () => <TextField label="Disabled" disabled defaultValue="Cannot be edited" />;

const responsiveWidth = { default: '12rem', sm: '16rem', md: '24rem', lg: '32rem', xl: '40rem' };

const breakpointColors = `
  .story-responsive-tf .ps-TextField__wrapper { border-width: 2px; border-color: crimson; }
  @media (min-width: 600px) { .story-responsive-tf .ps-TextField__wrapper { border-color: darkorange; } }
  @media (min-width: 900px) { .story-responsive-tf .ps-TextField__wrapper { border-color: seagreen; } }
  @media (min-width: 1200px) { .story-responsive-tf .ps-TextField__wrapper { border-color: royalblue; } }
  @media (min-width: 1536px) { .story-responsive-tf .ps-TextField__wrapper { border-color: darkviolet; } }
`;

const breakpointRows = [
  { breakpoint: 'default (xs)', screen: '< 600px', width: '12rem', color: 'crimson' },
  { breakpoint: 'sm', screen: '600–899px', width: '16rem', color: 'darkorange' },
  { breakpoint: 'md', screen: '900–1199px', width: '24rem', color: 'seagreen' },
  { breakpoint: 'lg', screen: '1200–1535px', width: '32rem', color: 'royalblue' },
  { breakpoint: 'xl', screen: '≥ 1536px', width: '40rem', color: 'darkviolet' },
].map((row) => ({
  ...row,
  colorCellStyle: { border: '1px solid #ccc', padding: '0.25rem 0.75rem', color: row.color, fontWeight: 600 },
}));

const cellStyle = { border: '1px solid #ccc', padding: '0.25rem 0.75rem', textAlign: 'left' as const };

export const ResponsiveWidth: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
    <style>{breakpointColors}</style>
    <TextField
      className="story-responsive-tf"
      label="Responsive width"
      width={responsiveWidth}
      helperText="Resize the browser: the field grows and the border color changes at each breakpoint"
      placeholder="Grows with the viewport"
    />
    <table style={{ borderCollapse: 'collapse', fontSize: '0.875rem' }}>
      <thead>
        <tr>
          <th style={cellStyle}>Breakpoint</th>
          <th style={cellStyle}>Screen width</th>
          <th style={cellStyle}>TextField width</th>
          <th style={cellStyle}>Border color</th>
        </tr>
      </thead>
      <tbody>
        {breakpointRows.map((row) => (
          <tr key={row.breakpoint}>
            <td style={cellStyle}>{row.breakpoint}</td>
            <td style={cellStyle}>{row.screen}</td>
            <td style={cellStyle}>{row.width}</td>
            <td style={row.colorCellStyle}>{row.color}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
ResponsiveWidth.storyName = 'Responsive Width';

export const Multiline: Story = () => (
  <TextField label="Comment" multiline rows={4} placeholder="Write a longer response..." fullWidth />
);

export const WithAdornments: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <TextField
      label="Search"
      placeholder="Search..."
      startAdornment={
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="11" y1="11" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      }
    />
    <TextField label="Amount" placeholder="0" endAdornment={<span>%</span>} startAdornment={<span>$</span>} />
  </div>
);

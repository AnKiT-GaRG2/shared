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

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { CSSProperties } from 'react';

import type { Size } from '../types';
import { Switch } from './Switch';

const RESPONSIVE_WIDTH = { default: 100, md: 200 };
const WIDTH_OVERRIDE = { '--ps-width': '50px' } as CSSProperties;

if (typeof window.PointerEvent === 'undefined') {
  window.PointerEvent = window.MouseEvent as unknown as typeof PointerEvent;
}

describe('Switch', () => {
  it('renders a role="switch" element with the ps-Switch class', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} />);
    const control = screen.getByRole('switch');
    expect(control).toBeInTheDocument();
    expect(control).toHaveClass('ps-Switch');
  });

  it('reflects the checked state via aria-checked', () => {
    const { rerender } = render(<Switch checked={false} onCheckedChange={() => {}} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

    rerender(<Switch checked onCheckedChange={() => {}} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onCheckedChange with the new boolean value and event details when toggled', async () => {
    const handleChange = vi.fn();
    render(<Switch checked={false} onCheckedChange={handleChange} />);

    await userEvent.click(screen.getByRole('switch'));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it('does not call onCheckedChange when disabled and prevents interaction', async () => {
    const handleChange = vi.fn();
    render(<Switch checked={false} onCheckedChange={handleChange} disabled />);

    const control = screen.getByRole('switch');
    await userEvent.click(control);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('exposes the disabled state via data-disabled and aria-disabled (not toBeDisabled, since the root renders a span)', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} disabled />);
    const control = screen.getByRole('switch');
    expect(control.tagName).toBe('SPAN');
    expect(control).toHaveAttribute('data-disabled');
    expect(control).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not set data-disabled or aria-disabled when not disabled', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} />);
    const control = screen.getByRole('switch');
    expect(control).not.toHaveAttribute('data-disabled');
    expect(control).not.toHaveAttribute('aria-disabled');
  });

  it('supports readOnly, blocking toggling while keeping the control interactive for focus', async () => {
    const handleChange = vi.fn();
    render(<Switch checked={false} onCheckedChange={handleChange} readOnly />);

    const control = screen.getByRole('switch');
    expect(control).toHaveAttribute('aria-readonly', 'true');
    expect(control).toHaveAttribute('data-readonly');

    await userEvent.click(control);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it.each<Size>(['sm', 'md', 'lg'])('sets data-size to %s', (size) => {
    render(<Switch checked={false} onCheckedChange={() => {}} size={size} />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-size', size);
  });

  it('defaults size to md when not provided', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-size', 'md');
  });

  it('renders a label wired to the control via a wrapping label element', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} label="Enable feature" />);
    expect(screen.getByText('Enable feature')).toBeInTheDocument();
    expect(screen.getByText('Enable feature')).toHaveClass('ps-Switch__label');

    const wrapper = screen.getByText('Enable feature').closest('label');
    expect(wrapper).toHaveClass('ps-Switch__wrapper');
    expect(wrapper).toContainElement(screen.getByRole('switch'));
  });

  it('toggles via onCheckedChange exactly once when the label text is clicked, not the switch itself', async () => {
    const handleChange = vi.fn();
    render(<Switch checked={false} onCheckedChange={handleChange} label="Enable feature" />);

    await userEvent.click(screen.getByText('Enable feature'));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it('does not render a wrapper when no label is provided', () => {
    const { container } = render(<Switch checked={false} onCheckedChange={() => {}} />);
    expect(container.querySelector('.ps-Switch__wrapper')).not.toBeInTheDocument();
  });

  it('merges additional className with ps-Switch', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} className="custom" />);
    const control = screen.getByRole('switch');
    expect(control).toHaveClass('ps-Switch');
    expect(control).toHaveClass('custom');
  });

  it('spreads ...rest props onto the root, e.g. onBlur from a react-hook-form field spread', async () => {
    const handleBlur = vi.fn();
    render(
      <>
        <Switch checked={false} onCheckedChange={() => {}} onBlur={handleBlur} />
        <button type="button">Next</button>
      </>,
    );

    await userEvent.click(screen.getByRole('switch'));
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('forwards a ref to the root element', () => {
    const ref = { current: null as HTMLElement | null };
    render(<Switch checked={false} onCheckedChange={() => {}} ref={ref} />);
    expect(ref.current).toBe(screen.getByRole('switch'));
  });

  it('applies a caller-provided id to the visible switch element', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} id="my-switch" />);
    expect(screen.getByRole('switch')).toHaveAttribute('id', 'my-switch');
  });

  describe('style props', () => {
    it('applies style props to the switch when there is no label', () => {
      render(<Switch aria-label="Feature" m="md" width={RESPONSIVE_WIDTH} />);

      const control = screen.getByRole('switch') as HTMLElement;
      expect(control).toHaveClass('ps-m', 'ps-width');
      expect(control.style.getPropertyValue('--ps-width')).toBe('100px');
      expect(control.style.getPropertyValue('--ps-width-md')).toBe('200px');
    });

    it('applies style props to the label wrapper when a label is rendered', () => {
      render(<Switch label="Feature" m="md" />);

      const control = screen.getByRole('switch');
      expect(control).not.toHaveClass('ps-m');
      expect(control.closest('.ps-Switch__wrapper')).toHaveClass('ps-m');
    });

    it('lets the style prop override computed variables', () => {
      render(<Switch aria-label="Feature" width={100} style={WIDTH_OVERRIDE} />);
      expect(screen.getByRole('switch')).toHaveStyle({ '--ps-width': '50px' });
    });

    it('does not leak style props to the DOM', () => {
      render(<Switch aria-label="Feature" m="sm" />);
      expect(screen.getByRole('switch')).not.toHaveAttribute('m');
    });
  });
});

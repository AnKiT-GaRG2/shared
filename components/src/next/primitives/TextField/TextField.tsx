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

import { Field } from '@base-ui/react/field';
import clsx from 'clsx';
import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

import { displayProps } from '../system/display';
import type { DisplayProps } from '../system/display';
import { sizingProps } from '../system/sizing';
import type { SizingProps } from '../system/sizing';
import { spacingProps } from '../system/spacing';
import type { SpacingProps } from '../system/spacing';
import { applyStyleProps, compileStyleProps } from '../system/styleProps';
import type { Size, Status } from '../types';

import './textField.css';
import '../system/layout.css';
import '../system/spacing.css';

const TEXT_FIELD_STYLE_PROPS = compileStyleProps([spacingProps, sizingProps, displayProps]);

export interface TextFieldProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'width' | 'height'>,
    SpacingProps,
    SizingProps,
    DisplayProps {
  label?: ReactNode;
  helperText?: ReactNode;
  status?: Status;
  fullWidth?: boolean;
  size?: Size;
  multiline?: boolean;
  rows?: number;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  'data-testid'?: string;
}

/**
 * Spacing, sizing and display props are responsive and apply to the root element. When you pass a responsive object,
 * include `default`. Breakpoints with no value fall back to the browser's default, not the component's own styling.
 */
export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(function TextField(
  {
    label,
    helperText,
    status,
    fullWidth,
    size = 'md',
    multiline = false,
    rows,
    startAdornment,
    endAdornment,
    className,
    style,
    id,
    'data-testid': dataTestId,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const {
    className: styleClassName,
    style: computedStyle,
    rest: inputProps,
  } = applyStyleProps(rest, TEXT_FIELD_STYLE_PROPS, style);

  return (
    <Field.Root
      className={clsx('ps-TextField', styleClassName, className)}
      style={computedStyle}
      data-testid={dataTestId}
      data-size={size}
      data-status={status}
      data-full-width={fullWidth || undefined}
      data-multiline={multiline || undefined}
    >
      {label && (
        <Field.Label className="ps-TextField__label" htmlFor={inputId}>
          {label}
        </Field.Label>
      )}
      <div className="ps-TextField__wrapper">
        {startAdornment && (
          <span className="ps-TextField__adornment ps-TextField__adornment--start">{startAdornment}</span>
        )}
        <Field.Control
          ref={ref}
          id={inputId}
          className="ps-TextField__input"
          render={multiline ? <textarea rows={rows} /> : undefined}
          {...inputProps}
        />
        {endAdornment && <span className="ps-TextField__adornment ps-TextField__adornment--end">{endAdornment}</span>}
      </div>
      {helperText && <Field.Description className="ps-TextField__helper">{helperText}</Field.Description>}
    </Field.Root>
  );
});

'use client';

import { useState, useRef } from 'react';

interface FloatingInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
}

export function FloatingInput({
  id,
  name,
  label,
  type = 'text',
  required = false,
  error,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isActive = focused || hasValue;
  const hasError = !!error;

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type={type}
        id={id}
        name={name}
        required={required}
        aria-required={required}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? `${id}-error` : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className={`peer w-full bg-transparent border-0 border-b-2 px-0 pt-5 pb-2 text-sm text-charcoal dark:text-dark-text focus:outline-none transition-colors duration-300 ${
          hasError
            ? 'border-red-500 dark:border-red-400'
            : 'border-border dark:border-dark-border focus:border-terracotta'
        }`}
      />
      <label
        htmlFor={id}
        onClick={() => inputRef.current?.focus()}
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          isActive
            ? `top-0 text-xs ${hasError ? 'text-red-500 dark:text-red-400' : 'text-terracotta'}`
            : 'top-5 text-sm text-warm-gray dark:text-dark-text-muted'
        }`}
      >
        {label}
      </label>
      {/* Focus underline animation */}
      <span
        className={`absolute bottom-0 left-1/2 h-[2px] transition-all duration-300 ${
          hasError ? 'bg-red-500' : 'bg-terracotta'
        } ${
          focused ? 'w-full -translate-x-1/2' : 'w-0 -translate-x-1/2'
        }`}
      />
      {/* Error message */}
      {hasError && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface FloatingTextareaProps {
  id: string;
  name: string;
  label: string;
  rows?: number;
  required?: boolean;
  error?: string;
}

export function FloatingTextarea({
  id,
  name,
  label,
  rows = 5,
  required = false,
  error,
}: FloatingTextareaProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isActive = focused || hasValue;
  const hasError = !!error;

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        id={id}
        name={name}
        rows={rows}
        required={required}
        aria-required={required}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? `${id}-error` : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className={`peer w-full bg-transparent border-0 border-b-2 px-0 pt-5 pb-2 text-sm text-charcoal dark:text-dark-text focus:outline-none transition-colors duration-300 resize-y ${
          hasError
            ? 'border-red-500 dark:border-red-400'
            : 'border-border dark:border-dark-border focus:border-terracotta'
        }`}
      />
      <label
        htmlFor={id}
        onClick={() => textareaRef.current?.focus()}
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          isActive
            ? `top-0 text-xs ${hasError ? 'text-red-500 dark:text-red-400' : 'text-terracotta'}`
            : 'top-5 text-sm text-warm-gray dark:text-dark-text-muted'
        }`}
      >
        {label}
      </label>
      <span
        className={`absolute bottom-0 left-1/2 h-[2px] transition-all duration-300 ${
          hasError ? 'bg-red-500' : 'bg-terracotta'
        } ${
          focused ? 'w-full -translate-x-1/2' : 'w-0 -translate-x-1/2'
        }`}
      />
      {hasError && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface FloatingSelectProps {
  id: string;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
}

export function FloatingSelect({
  id,
  name,
  label,
  options,
  required = false,
  error,
}: FloatingSelectProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = focused || hasValue;
  const hasError = !!error;

  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        required={required}
        aria-required={required}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? `${id}-error` : undefined}
        defaultValue=""
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className={`peer w-full bg-transparent border-0 border-b-2 px-0 pt-5 pb-2 text-sm text-charcoal dark:text-dark-text focus:outline-none transition-colors duration-300 appearance-none ${
          hasError
            ? 'border-red-500 dark:border-red-400'
            : 'border-border dark:border-dark-border focus:border-terracotta'
        }`}
      >
        <option value="" disabled />
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          isActive
            ? `top-0 text-xs ${hasError ? 'text-red-500 dark:text-red-400' : 'text-terracotta'}`
            : 'top-5 text-sm text-warm-gray dark:text-dark-text-muted'
        }`}
      >
        {label}
      </label>
      {/* Chevron */}
      <svg
        className="absolute right-0 top-5 w-4 h-4 text-warm-gray pointer-events-none"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span
        className={`absolute bottom-0 left-1/2 h-[2px] transition-all duration-300 ${
          hasError ? 'bg-red-500' : 'bg-terracotta'
        } ${
          focused ? 'w-full -translate-x-1/2' : 'w-0 -translate-x-1/2'
        }`}
      />
      {hasError && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

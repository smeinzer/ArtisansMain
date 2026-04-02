'use client';

import { useState, useRef } from 'react';

interface FloatingInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}

export function FloatingInput({
  id,
  name,
  label,
  type = 'text',
  required = false,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isActive = focused || hasValue;

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type={type}
        id={id}
        name={name}
        required={required}
        aria-required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className="peer w-full bg-transparent border-0 border-b-2 border-border dark:border-dark-border px-0 pt-5 pb-2 text-sm text-charcoal dark:text-dark-text focus:outline-none focus:border-terracotta transition-colors duration-300"
      />
      <label
        htmlFor={id}
        onClick={() => inputRef.current?.focus()}
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          isActive
            ? 'top-0 text-xs text-terracotta'
            : 'top-5 text-sm text-warm-gray dark:text-dark-text-muted'
        }`}
      >
        {label}
      </label>
      {/* Focus underline animation */}
      <span
        className={`absolute bottom-0 left-1/2 h-[2px] bg-terracotta transition-all duration-300 ${
          focused ? 'w-full -translate-x-1/2' : 'w-0 -translate-x-1/2'
        }`}
      />
    </div>
  );
}

interface FloatingTextareaProps {
  id: string;
  name: string;
  label: string;
  rows?: number;
  required?: boolean;
}

export function FloatingTextarea({
  id,
  name,
  label,
  rows = 5,
  required = false,
}: FloatingTextareaProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isActive = focused || hasValue;

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        id={id}
        name={name}
        rows={rows}
        required={required}
        aria-required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className="peer w-full bg-transparent border-0 border-b-2 border-border dark:border-dark-border px-0 pt-5 pb-2 text-sm text-charcoal dark:text-dark-text focus:outline-none focus:border-terracotta transition-colors duration-300 resize-y"
      />
      <label
        htmlFor={id}
        onClick={() => textareaRef.current?.focus()}
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          isActive
            ? 'top-0 text-xs text-terracotta'
            : 'top-5 text-sm text-warm-gray dark:text-dark-text-muted'
        }`}
      >
        {label}
      </label>
      <span
        className={`absolute bottom-0 left-1/2 h-[2px] bg-terracotta transition-all duration-300 ${
          focused ? 'w-full -translate-x-1/2' : 'w-0 -translate-x-1/2'
        }`}
      />
    </div>
  );
}

interface FloatingSelectProps {
  id: string;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
}

export function FloatingSelect({
  id,
  name,
  label,
  options,
  required = false,
}: FloatingSelectProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = focused || hasValue;

  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        required={required}
        aria-required={required}
        defaultValue=""
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className="peer w-full bg-transparent border-0 border-b-2 border-border dark:border-dark-border px-0 pt-5 pb-2 text-sm text-charcoal dark:text-dark-text focus:outline-none focus:border-terracotta transition-colors duration-300 appearance-none"
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
            ? 'top-0 text-xs text-terracotta'
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
        className={`absolute bottom-0 left-1/2 h-[2px] bg-terracotta transition-all duration-300 ${
          focused ? 'w-full -translate-x-1/2' : 'w-0 -translate-x-1/2'
        }`}
      />
    </div>
  );
}

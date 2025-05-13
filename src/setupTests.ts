
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Automatic cleanup after each test
afterEach(() => {
  cleanup();
});

// Test file for utility functions

import {
     formatDate,
     slugify,
     validateEmail,
     validatePhone,
     truncateText,
} from '@/utils';

describe('Utility Functions', () => {
     describe('formatDate', () => {
          it('should format date correctly', () => {
               const date = new Date('2023-07-27');
               const formatted = formatDate(date);
               expect(formatted).toContain('2023');
          });
     });

     describe('slugify', () => {
          it('should convert text to slug', () => {
               expect(slugify('Hello World')).toBe('hello-world');
               expect(slugify('Test & Special Characters!')).toBe(
                    'test-special-characters'
               );
          });
     });

     describe('validateEmail', () => {
          it('should validate email correctly', () => {
               expect(validateEmail('test@example.com')).toBe(true);
               expect(validateEmail('invalid-email')).toBe(false);
               expect(validateEmail('')).toBe(false);
          });
     });

     describe('validatePhone', () => {
          it('should validate phone correctly', () => {
               expect(validatePhone('+994 65 407 27 27')).toBe(true);
               expect(validatePhone('123')).toBe(false);
               expect(validatePhone('')).toBe(false);
          });
     });

     describe('truncateText', () => {
          it('should truncate text correctly', () => {
               const longText =
                    'This is a very long text that should be truncated';
               expect(truncateText(longText, 20)).toBe(
                    'This is a very long...'
               );
               expect(truncateText('Short', 20)).toBe('Short');
          });
     });
});

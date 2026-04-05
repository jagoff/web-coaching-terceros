# Form Validation Specification

## Overview
Comprehensive form validation system ensuring data integrity, user feedback, and security across all form interactions.

## Validation Architecture

### Validation Layers
1. **Client-Side Validation**: Immediate user feedback
2. **Server-Side Validation**: Security and data integrity
3. **Real-Time Validation**: As user types
4. **Submission Validation**: Final check before processing

### Validation Pipeline
```typescript
interface ValidationPipeline {
  sanitize: (input: string) => string;
  validate: (input: string, rules: ValidationRule[]) => ValidationResult;
  sanitize: (input: string) => string;
  report: (result: ValidationResult) => void;
}
```

## Validation Rules

### String Validators
```typescript
interface StringValidationRule {
  type: 'string';
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  whitelist?: string[];
  blacklist?: string[];
  trim?: boolean;
}

// Examples
const nameRule: StringValidationRule = {
  type: 'string',
  required: true,
  minLength: 2,
  maxLength: 50,
  pattern: /^[a-zA-Z\s]+$/,
  trim: true
};

const messageRule: StringValidationRule = {
  type: 'string',
  required: true,
  minLength: 10,
  maxLength: 500,
  blacklist: ['<script>', 'javascript:', 'data:'],
  trim: true
};
```

### Email Validators
```typescript
interface EmailValidationRule {
  type: 'email';
  required?: boolean;
  allowDisposable?: boolean;
  domainWhitelist?: string[];
  domainBlacklist?: string[];
  mxCheck?: boolean;
}

const emailRule: EmailValidationRule = {
  type: 'email',
  required: true,
  allowDisposable: false,
  domainBlacklist: ['10minutemail.com', 'tempmail.org'],
  mxCheck: true
};
```

### Phone Validators
```typescript
interface PhoneValidationRule {
  type: 'phone';
  required?: boolean;
  countryCodes?: string[];
  format?: 'E164' | 'INTERNATIONAL' | 'NATIONAL';
  mobileOnly?: boolean;
}

const phoneRule: PhoneValidationRule = {
  type: 'phone',
  required: false,
  countryCodes: ['+54', '+1', '+52', '+55', '+34'],
  format: 'INTERNATIONAL',
  mobileOnly: true
};
```

## Error Handling

### Error Types
```typescript
interface ValidationError {
  field: string;
  code: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  params?: Record<string, any>;
}

// Standard error codes
const ERROR_CODES = {
  REQUIRED: 'REQUIRED',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_PHONE: 'INVALID_PHONE',
  TOO_SHORT: 'TOO_SHORT',
  TOO_LONG: 'TOO_LONG',
  INVALID_FORMAT: 'INVALID_FORMAT',
  BLOCKED_DOMAIN: 'BLOCKED_DOMAIN',
  DISPOSABLE_EMAIL: 'DISPOSABLE_EMAIL'
} as const;
```

### Error Messages
```typescript
interface ErrorMessageConfig {
  [key: string]: string | ((params: any) => string);
}

const errorMessages: ErrorMessageConfig = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  TOO_SHORT: ({ minLength }) => `Must be at least ${minLength} characters`,
  TOO_LONG: ({ maxLength }) => `Must be no more than ${maxLength} characters`,
  INVALID_FORMAT: 'Please check the format and try again',
  BLOCKED_DOMAIN: 'Email domain is not allowed',
  DISPOSABLE_EMAIL: 'Please use a permanent email address'
};
```

## Real-Time Validation

### Debounced Validation
```typescript
interface ValidationConfig {
  debounce: number; // milliseconds
  validateOnBlur: boolean;
  validateOnChange: boolean;
  validateOnSubmit: boolean;
}

const defaultConfig: ValidationConfig = {
  debounce: 300,
  validateOnBlur: true,
  validateOnChange: false,
  validateOnSubmit: true
};
```

### Validation States
```typescript
type ValidationState = 
  | 'idle'      // No validation yet
  | 'validating' // Validation in progress
  | 'valid'     // Field is valid
  | 'invalid'   // Field has errors
  | 'warning'   // Field has warnings
  | 'disabled'; // Field is disabled

interface FieldValidation {
  state: ValidationState;
  errors: ValidationError[];
  warnings: ValidationError[];
  lastValidated: Date;
}
```

## Form Integration

### Form Context
```typescript
interface FormContext {
  values: Record<string, any>;
  errors: Record<string, ValidationError[]>;
  warnings: Record<string, ValidationError[]>;
  touched: Record<string, boolean>;
  dirty: Record<string, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  submitCount: number;
}

// React Hook Form integration
const useFormValidation = (schema: ValidationSchema) => {
  const [formState, setFormState] = useState<FormContext>();
  
  const validateField = useCallback((field: string, value: any) => {
    // Validation logic
  }, [schema]);
  
  const validateForm = useCallback(() => {
    // Form-wide validation
  }, [formState.values]);
  
  return {
    ...formState,
    validateField,
    validateForm,
    register,
    handleSubmit,
    reset
  };
};
```

### Component Integration
```typescript
interface ValidatedInputProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  validation: ValidationRule[];
  showError?: boolean;
  showWarning?: boolean;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  name,
  label,
  validation,
  showError = true,
  showWarning = true,
  ...props
}) => {
  const { errors, warnings, register } = useFormValidation();
  
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name, validation)}
        {...props}
        className={cn(
          'form-input',
          errors[name] && 'error',
          warnings[name] && 'warning'
        )}
      />
      {showError && errors[name]?.map(error => (
        <div key={error.code} className="error-message">
          {error.message}
        </div>
      ))}
      {showWarning && warnings[name]?.map(warning => (
        <div key={warning.code} className="warning-message">
          {warning.message}
        </div>
      ))}
    </div>
  );
};
```

## Security Considerations

### Input Sanitization
```typescript
interface SanitizationRule {
  type: 'html' | 'sql' | 'xss' | 'script';
  action: 'escape' | 'remove' | 'encode' | 'block';
}

const sanitizationRules: SanitizationRule[] = [
  {
    type: 'xss',
    action: 'escape'
  },
  {
    type: 'script',
    action: 'remove'
  },
  {
    type: 'sql',
    action: 'block'
  }
];

const sanitizeInput = (input: string, rules: SanitizationRule[]): string => {
  return rules.reduce((sanitized, rule) => {
    switch (rule.action) {
      case 'escape':
        return escapeHtml(sanitized);
      case 'remove':
        return removeDangerousContent(sanitized);
      case 'encode':
        return encodeEntities(sanitized);
      case 'block':
        if (containsBlockedContent(sanitized)) {
          throw new SecurityError('Blocked content detected');
        }
        return sanitized;
      default:
        return sanitized;
    }
  }, input);
};
```

### Rate Limiting
```typescript
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests: boolean;
  skipFailedRequests: boolean;
}

const formRateLimit: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,           // 5 submissions per window
  skipSuccessfulRequests: false,
  skipFailedRequests: true
};
```

## Accessibility

### Screen Reader Support
```typescript
interface AccessibilityConfig {
  announceErrors: boolean;
  announceSuccess: boolean;
  liveRegion: boolean;
  focusOnError: boolean;
}

const accessibilityConfig: AccessibilityConfig = {
  announceErrors: true,
  announceSuccess: true,
  liveRegion: true,
  focusOnError: true
};

// ARIA attributes
const getAriaProps = (field: string, validation: FieldValidation) => ({
  'aria-invalid': validation.state === 'invalid',
  'aria-describedby': `${field}-help ${field}-error`,
  'aria-live': validation.state === 'validating' ? 'polite' : undefined
});
```

### Keyboard Navigation
```typescript
interface KeyboardConfig {
  submitOnEnter: boolean;
  navigateOnTab: boolean;
  escapeToReset: boolean;
}

const keyboardConfig: KeyboardConfig = {
  submitOnEnter: false,    // Let user control submission
  navigateOnTab: true,     // Standard tab navigation
  escapeToReset: true     // Escape clears field
};
```

## Testing

### Unit Tests
```typescript
describe('Form Validation', () => {
  describe('Email Validation', () => {
    it('should validate valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });
    
    it('should reject invalid emails', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
    
    it('should block disposable emails', () => {
      expect(validateEmail('test@10minutemail.com')).toBe(false);
    });
  });
  
  describe('Phone Validation', () => {
    it('should validate international formats', () => {
      expect(validatePhone('+54 9 11 1234-5678')).toBe(true);
    });
    
    it('should reject invalid formats', () => {
      expect(validatePhone('123')).toBe(false);
    });
  });
});
```

### Integration Tests
```typescript
describe('Form Integration', () => {
  it('should validate complete form', async () => {
    const result = await validateForm({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 555-123-4567',
      message: 'Test message'
    });
    
    expect(result.isValid).toBe(true);
  });
  
  it('should show appropriate errors', async () => {
    const result = await validateForm({
      name: '',
      email: 'invalid-email',
      phone: '123',
      message: 'short'
    });
    
    expect(result.errors).toHaveLength(4);
    expect(result.errors[0].code).toBe('REQUIRED');
  });
});
```

## Performance Optimization

### Validation Caching
```typescript
interface ValidationCache {
  get: (key: string) => ValidationResult | null;
  set: (key: string, result: ValidationResult) => void;
  clear: () => void;
}

const validationCache: ValidationCache = {
  get: (key) => cache.get(key) || null,
  set: (key, result) => cache.set(key, result),
  clear: () => cache.clear()
};
```

### Debounced Validation
```typescript
const useDebouncedValidation = (
  validateFn: Function,
  delay: number = 300
) => {
  const debouncedFn = useMemo(
    () => debounce(validateFn, delay),
    [validateFn, delay]
  );
  
  return debouncedFn;
};
```

## Error Monitoring

### Error Tracking
```typescript
interface ValidationErrorEvent {
  type: 'validation_error';
  field: string;
  errorCode: string;
  userInput: string;
  timestamp: Date;
  userAgent: string;
  sessionId: string;
}

const trackValidationError = (event: ValidationErrorEvent) => {
  // Send to analytics/monitoring service
  analytics.track('validation_error', event);
};
```

### Performance Metrics
```typescript
interface ValidationMetrics {
  validationTime: number;
  formCompletionRate: number;
  errorRate: number;
  abandonmentRate: number;
}

const collectValidationMetrics = (): ValidationMetrics => {
  // Collect and return validation performance data
};

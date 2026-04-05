## MODIFIED Requirements

### Requirement: Mobile-first responsive layout
The system SHALL prioritize mobile experience while maintaining desktop functionality.

#### Scenario: Mobile-specific components
- **WHEN** viewport width is less than 768px
- **THEN** mobile section indicator displays in top-right corner
- **THEN** desktop navigation remains hidden on mobile
- **THEN** mobile hamburger menu continues to function normally

#### Scenario: Desktop behavior preservation
- **WHEN** viewport width is 768px or greater
- **THEN** mobile section indicator is hidden
- **THEN** desktop navigation displays normally
- **THEN** existing hover states and interactions remain unchanged

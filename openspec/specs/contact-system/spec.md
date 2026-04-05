## ADDED Requirements

### Requirement: Contact form functionality
The system SHALL provide functional contact forms.

#### Scenario: Contact submission
- **WHEN** user submits contact form
- **THEN** form validation checks required fields
- **THEN** email format validation occurs
- **THEN** submission is processed via Resend API
- **THEN** success confirmation is displayed to user

#### Scenario: Form validation
- **WHEN** user interacts with form fields
- **THEN** real-time validation feedback is provided
- **THEN** error messages are clear and helpful
- **THEN** invalid submissions are prevented

### Requirement: Newsletter signup
The system SHALL provide newsletter subscription functionality.

#### Scenario: Newsletter registration
- **WHEN** user subscribes to newsletter
- **THEN** email address is validated
- **THEN** subscription is processed
- **THEN** confirmation message is displayed
- **THEN** user receives welcome email if configured

#### Scenario: Privacy compliance
- **WHEN** newsletter form is displayed
- **THEN** privacy policy is referenced
- **THEN** consent checkboxes are required where applicable
- **THEN** data handling is transparent

### Requirement: Calendar integration
The system SHALL integrate with Cal.com for booking.

#### Scenario: Booking widget
- **WHEN** user wants to schedule consultation
- **THEN** Cal.com embed loads properly
- **THEN** available time slots are displayed
- **THEN** booking process is seamless
- **THEN** confirmations are sent automatically

#### Scenario: Widget customization
- **WHEN** Cal.com widget renders
- **THEN** branding matches site design
- **THEN** available services are configured
- **THEN** timezone handling is appropriate

### Requirement: Contact information display
The system SHALL display comprehensive contact information.

#### Scenario: Contact details
- **WHEN** contact section is viewed
- **THEN** business phone number is displayed
- **THEN** email address is displayed
- **THEN** business hours are shown
- **THEN** location information is provided

#### Scenario: Social media links
- **WHEN** social media section is displayed
- **THEN** LinkedIn profile is linked
- **THEN** other relevant social profiles are linked
- **THEN** icons are recognizable and accessible

### Requirement: Form security and reliability
The system SHALL ensure secure and reliable form processing.

#### Scenario: Rate limiting
- **WHEN** forms receive multiple submissions
- **THEN** rate limiting prevents abuse
- **THEN** bot protection is implemented
- **THEN** legitimate submissions are not blocked

#### Scenario: Error handling
- **WHEN** form submission fails
- **THEN** user-friendly error message is displayed
- **THEN** retry options are provided
- **THEN** fallback contact methods are suggested

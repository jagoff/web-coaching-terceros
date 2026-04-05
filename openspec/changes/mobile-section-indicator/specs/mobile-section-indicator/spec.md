## ADDED Requirements

### Requirement: Mobile section indicator display
The system SHALL display a visual indicator showing the current section on mobile devices.

#### Scenario: Section indicator visibility
- **WHEN** user accesses site on mobile device (viewport width < 768px)
- **THEN** section indicator appears in top-right corner
- **THEN** indicator shows current section name in abbreviated format
- **THEN** indicator uses glassmorphism design with backdrop-blur effect

#### Scenario: Section indicator positioning
- **WHEN** indicator renders on mobile
- **THEN** position is fixed at top-right with 16px margin
- **THEN** indicator has 32px height and auto width
- **THEN** z-index is 40 to appear above content but below navigation

### Requirement: Scroll-based section tracking
The system SHALL automatically detect and update the current section based on scroll position.

#### Scenario: Intersection Observer detection
- **WHEN** user scrolls through page sections
- **THEN** Intersection Observer monitors all main sections
- **THEN** section updates when 50% of section is visible
- **THEN** tracking uses smooth transitions between sections

#### Scenario: Section mapping
- **WHEN** new section becomes visible
- **THEN** indicator updates to show abbreviated section name
- **THEN** mapping uses predefined section names (Hero, Services, Prices, FAQ, etc.)
- **THEN** updates support both ES and EN languages

### Requirement: Smooth animation transitions
The system SHALL provide smooth visual transitions when section indicator updates.

#### Scenario: Section change animation
- **WHEN** current section changes
- **THEN** indicator animates with fade-in/fade-out effect
- **THEN** animation duration is 300ms using Framer Motion
- **THEN** easing function is ease-in-out for natural feel

#### Scenario: Loading state animation
- **WHEN** page initially loads
- **THEN** indicator fades in after 500ms delay
- **THEN** initial animation uses slide-in from right effect
- **THEN** animation respects user prefers-reduced-motion setting

### Requirement: Accessibility compliance
The system SHALL ensure section indicator is accessible to all users.

#### Scenario: Screen reader support
- **WHEN** screen reader encounters section indicator
- **THEN** element has proper ARIA label "Current section: [section name]"
- **THEN** role is set to "status" for live region announcements
- **THEN** announcements are concise and non-disruptive

#### Scenario: Keyboard navigation
- **WHEN** user navigates with keyboard
- **THEN** indicator is focusable when visible
- **THEN** focus indicator has 2px solid blue outline
- **THEN** Enter key scrolls to top of current section

### Requirement: Performance optimization
The system SHALL maintain optimal performance during scroll tracking.

#### Scenario: Efficient scroll detection
- **WHEN** user scrolls rapidly
- **THEN** Intersection Observer throttles updates to 60fps
- **THEN** single observer instance monitors all sections
- **THEN** memory usage remains constant regardless of scroll speed

#### Scenario: Mobile battery optimization
- **WHEN** indicator is active on mobile
- **THEN** scroll detection uses passive event listeners
- **THEN** animations use CSS transforms for GPU acceleration
- **THEN** component unmounts properly when navigating away

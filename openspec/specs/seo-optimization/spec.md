## ADDED Requirements

### Requirement: JSON-LD structured data
The system SHALL implement JSON-LD schemas for rich snippets.

#### Scenario: LocalBusiness schema
- **WHEN** homepage renders
- **THEN** LocalBusiness schema includes business name, address, phone
- **THEN** schema includes business hours and service areas
- **THEN** schema validates against Schema.org standards

#### Scenario: Person schema
- **WHEN** about page renders
- **THEN** Person schema includes coach name and credentials
- **THEN** schema includes social media profiles
- **THEN** schema includes areas of expertise

#### Scenario: FAQPage schema
- **WHEN** FAQ page renders
- **THEN** FAQPage schema includes all questions and answers
- **THEN** each question-answer pair is properly structured
- **THEN** schema enables rich snippets in search results

### Requirement: Meta tags optimization
The system SHALL provide optimized meta tags for each page.

#### Scenario: Title tags
- **WHEN** any page renders
- **THEN** title tag is unique and descriptive
- **THEN** title includes brand name "ELEVA CONSULTORIA"
- **THEN** title length is optimal for search display (50-60 characters)

#### Scenario: Meta descriptions
- **WHEN** any page renders
- **THEN** meta description is unique and compelling
- **THEN** description includes relevant keywords
- **THEN** description length is optimal for search display (150-160 characters)

#### Scenario: Open Graph tags
- **WHEN** page is shared on social media
- **THEN** og:title displays page title
- **THEN** og:description displays page description
- **THEN** og:image displays appropriate preview image
- **THEN** og:url displays canonical URL

### Requirement: Sitemap generation
The system SHALL generate comprehensive sitemaps for search engines.

#### Scenario: Dynamic sitemap
- **WHEN** search engines request /sitemap.xml
- **THEN** sitemap includes all public pages
- **THEN** each URL includes lastmod timestamp
- **THEN** each URL includes priority and changefreq

#### Scenario: Multi-language sitemap
- **WHEN** sitemap is generated
- **THEN** both ES and EN versions are included
- **THEN** hreflang relationships are properly defined
- **THEN** language-specific URLs are correctly prioritized

### Requirement: Robots.txt configuration
The system SHALL provide proper robots.txt directives.

#### Scenario: Crawler directives
- **WHEN** search robots request /robots.txt
- **THEN** appropriate directories are allowed/disallowed
- **THEN** sitemap location is specified
- **THEN** crawl delay is optimized for server load

# JSON-LD Schema Implementation Specification

## Overview
Implementation of structured data markup for rich snippets and enhanced SEO visibility across all pages.

## Schema Types

### LocalBusiness Schema
**Location**: Homepage (`/`)
**Purpose**: Business information for local search results

**Properties**:
- Business name, description, address
- Opening hours and contact information
- Service areas and geographical coverage
- Social media profiles

### Person Schema
**Location**: `/sobre-mi`
**Purpose**: Professional profile for personal branding

**Properties**:
- Name, job title, professional experience
- Education and certifications
- Social media links and professional profiles
- Areas of expertise

### FAQPage Schema
**Location**: `/faq`
**Purpose**: Rich snippets for frequently asked questions

**Properties**:
- Question-answer pairs (4 items)
- Structured format for Google FAQ rich results
- Category grouping for better organization

### Review Schema
**Location**: `/testimonios`
**Purpose**: Customer review aggregation for trust signals

**Properties**:
- Customer reviews with ratings (5-star system)
- Review dates and customer information
- Aggregate rating calculations
- Service-specific reviews

### WebPage Schema
**Location**: All pages
**Purpose**: Basic page metadata and navigation

**Properties**:
- Breadcrumb navigation
- Page titles and descriptions
- Last modified dates
- Content categories

## Implementation Details

### Component Structure
```typescript
// Schema component integration
interface SchemaProps {
  type: 'LocalBusiness' | 'Person' | 'FAQPage' | 'Review' | 'WebPage';
  data: object;
  page: string;
}
```

### Data Sources
- Business information from constants
- Personal data from About section
- FAQ content from FAQ page
- Reviews from testimonials data
- Dynamic metadata per page

### Validation Rules
- Schema.org specification compliance
- Required fields validation
- Data type consistency
- Rich snippets eligibility

## Performance Considerations

### Server-Side Rendering
- Schemas generated at build time
- No client-side JavaScript dependency
- Minimal impact on page load speed
- Cache-friendly implementation

### File Size Impact
- Average schema size: 2-5KB per page
- Gzip compression applied
- No render-blocking resources
- Critical path optimization

## Maintenance

### Update Requirements
- Business information changes
- New FAQ items added
- Review updates
- Service modifications

### Automated Testing
- Schema validation in CI/CD
- Rich snippets testing
- SEO score monitoring
- Performance impact tracking

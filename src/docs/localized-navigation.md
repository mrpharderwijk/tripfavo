# Localized Navigation System

This document explains how to implement localized pathname translation in your Next.js application using NextIntl without its routing system.

## Overview

The localized navigation system allows you to translate pathnames based on the current locale. For example:
- English: `/property/[propertyId]`
- Dutch: `/verhuur/[propertyId]`
- French: `/propriete/[propertyId]`

## Setup

### 1. Route Configuration

Add localized paths to your route configuration in `src/constants/routes.ts`:

```typescript
export const routes: RoutesObject = {
  property: {
    path: '/property',
    localizedPaths: {
      en: '/property',
      nl: '/verhuur',
      fr: '/propriete',
    },
  },
  // ... other routes
}
```

### 2. Utility Functions

The system provides several utility functions in `src/utils/get-route.ts`:

- `getLocalizedRoutePathByRouteName(routeName, locale, exact)`: Get localized path for a route
- `translatePathname(pathname, fromLocale, toLocale)`: Translate a pathname between locales

### 3. Custom Hook

Use the `useLocalizedNavigation` hook for easy access to localized navigation:

```typescript
import { useLocalizedNavigation } from '@/hooks/use-localized-navigation'

function MyComponent() {
  const { 
    locale, 
    getLocalizedPath, 
    translateCurrentPath, 
    navigateToLocalizedPath,
    navigateToLocalizedProperty 
  } = useLocalizedNavigation()

  // Get localized path for a route
  const propertyPath = getLocalizedPath('property') // Returns '/verhuur' for Dutch

  // Navigate to localized property
  navigateToLocalizedProperty('123') // Navigates to '/verhuur/123' for Dutch

  // Translate current path to another locale
  const frenchPath = translateCurrentPath('fr')
}
```

## Components

### LocalizedLink

Use `LocalizedLink` for automatic path translation:

```typescript
import { LocalizedLink } from '@/components/molecules/localized-link/localized-link'

<LocalizedLink routeName="property" exact>
  View Properties
</LocalizedLink>
```

### LocalizedPropertyLink

Use `LocalizedPropertyLink` specifically for property links:

```typescript
import { LocalizedPropertyLink } from '@/components/molecules/localized-property-link/localized-property-link'

<LocalizedPropertyLink propertyId="123">
  View Property Details
</LocalizedPropertyLink>
```

### LanguageSwitcher

Use `LanguageSwitcher` to handle pathname translation when switching languages:

```typescript
import { LanguageSwitcher } from '@/components/molecules/language-switcher/language-switcher'

<LanguageSwitcher currentLocale={locale} />
```

## Usage Examples

### 1. Basic Navigation

```typescript
import { useLocalizedNavigation } from '@/hooks/use-localized-navigation'

function NavigationExample() {
  const { navigateToLocalizedPath } = useLocalizedNavigation()

  return (
    <button onClick={() => navigateToLocalizedPath('property')}>
      View Properties
    </button>
  )
}
```

### 2. Property Links

```typescript
import { LocalizedPropertyLink } from '@/components/molecules/localized-property-link/localized-property-link'

function PropertyList({ properties }) {
  return (
    <div>
      {properties.map(property => (
        <LocalizedPropertyLink key={property.id} propertyId={property.id}>
          <div>{property.title}</div>
        </LocalizedPropertyLink>
      ))}
    </div>
  )
}
```

### 3. Language Switching with Path Translation

```typescript
import { LanguageSwitcher } from '@/components/molecules/language-switcher/language-switcher'

function Header({ currentLocale }) {
  return (
    <header>
      <LanguageSwitcher currentLocale={currentLocale} />
    </header>
  )
}
```

## How It Works

1. **Route Configuration**: Routes are defined with their localized paths for each supported locale.

2. **Path Translation**: The `translatePathname` function matches the current path against defined routes and replaces the path segments with their localized equivalents.

3. **Dynamic Parameters**: Dynamic parameters (like `[propertyId]`) are preserved during translation.

4. **Fallback**: If no localized path is found, the original path is returned.

## Supported Locales

The system supports the following locales:
- `en` (English)
- `nl` (Dutch)
- `fr` (French)

## Best Practices

1. **Always use the provided components** (`LocalizedLink`, `LocalizedPropertyLink`) instead of hardcoding paths.

2. **Define localized paths for all routes** that should be translated.

3. **Test path translation** when switching between languages.

4. **Use the `useLocalizedNavigation` hook** for programmatic navigation.

5. **Handle edge cases** where a route might not have a localized version.

## Migration Guide

To migrate existing hardcoded paths:

1. Replace `href="/property/123"` with `LocalizedPropertyLink`
2. Replace `router.push('/property/123')` with `navigateToLocalizedProperty('123')`
3. Update route definitions to include `localizedPaths`
4. Test all navigation flows in different locales 
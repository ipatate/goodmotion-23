# Press Wind

WordPress Theme base with Tailwind CSS and Vite JS.

## Concept

This theme is build for work with gutenberg.
Is thinked for use concept of pattern.
A example of pattern is in ```patterns``` directory.

## PHP files

This theme has just the minimal php file.
With gutenberg blocks, it's normally sufficient

## Dependencies

- [PostCSS](https://postcss.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [ViteJS](https://vitejs.dev/)


## Requirement

- Node JS (16)
- Npm ou yarn

## Quick Start

In the root of press-wind theme

Install dependencies
```
yarn
```

In your ```wp-config.php``` file, add :
```
# for dev
define('WP_ENV', 'development');
# for production
define('WP_ENV', 'production');
```

## Scripts

Launch dev mode
```
yarn dev
```

Launch dev mode with editor file for admin
```
yarn dev:editor
```

Build the assets
```
yarn build
```

## Enqueue Scripts and Styles

The script and the style are automatically enqueued in theme.
The "assets" code is in file : ```inc > assets.php```


## CSS writing style

You must use ```@apply``` method for create the CSS style
It's better for reusability of your code and the readability.

Example :
```
.site-header {
  @apply flex my-4 lg:my-10 lg:items-center lg:flex-row flex-col;
}
```

**But you can use the method by the class attribute, if you prefer. Be careful to keep maintainable project.**

---
title: "Getting Started with Astro"
description: "A quick intro to building static sites with Astro and Content Collections"
pubDate: 2024-01-15
featured: true
tags: ["astro", "static-site", "web"]
---

Welcome to your first post! This is a test post to show how your blog works.

## Why Static Sites?

Static sites are fast, secure, and easy to deploy. Astro makes it simple to build them with modern tooling while keeping the output minimal.

## Adding Images

Store images in `public/blog/getting-started/` and reference them in markdown like this:

```markdown
![Alt text](./pixel.png)
```
![Alt text](./pixel.png)


For organized posts with multiple images:

```
src/assets/blog/
├── getting-started/
│   ├── hero.png
│   └── diagram.png
├── my-second-post/
│   └── screenshot.png
```

Then reference in markdown:

```markdown
![Hero](/blog/getting-started/hero.png)
![Diagram](/blog/getting-started/diagram.png)
```

Images are automatically optimized during build.

## Content Collections

Your blog posts live in `src/content/blog/` as markdown files. Each one needs frontmatter at the top:

```yaml
---
title: "Post Title"
description: "Short description"
pubDate: 2024-01-15
featured: false
tags: ["tag1", "tag2"]
---
```

## The Setup

- **Posts**: Go in `src/content/blog/` as `.md` files
- **Images**: Go in the post's directory and paste the image 
- **Homepage**: Shows featured post + recent list
- **Theme**: Tokyo Night retro-arcade with Courier New monospace
- **Output**: Fully static HTML, ready to deploy

## Next Steps

1. Create more `.md` files in `src/content/blog/`
2. Create subfolders in `src/assets/blog/` for each post
3. Add images to those folders
4. Reference with `![alt](/blog/folder/image.png)`
5. Set `featured: true` on a post to highlight it
6. Run `npm run dev` to preview locally
7. Deploy with `npm run build`

Enjoy your blog!

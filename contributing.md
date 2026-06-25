
Welcome to your first post!  Here we go through how you can easily post a Human Readable content!

## clone the repo
```
git clone https://github.com/CS-Astronaut/Human-Readable
```

## make a directory
make a directory under `/src/content/blog/` with a name related to your post , and all your post content will go there!


## make your post

make a `your-post.md` file in your directory & make sure that the `post-name` and the `directory-name` are exactly the same.

first you should paste and fill in a heading like this in your markdown post:
```yaml
---
title: "Post Title"
description: "Short description"
pubDate: 2024-01-15
featured: false
tags: ["tag1", "tag2"]
cover: ./hero.png
---
```

and if you are writing in Farsi and want RTL :
```yml
---

lang: "fa" #append this to the heading
---
```


## Adding Images to your post

make sure you provide the `hero.png`for your post so that when you share the post the image pops up on your link! 

Store images in post's directory and reference them in markdown like this:

```markdown
![Alt text](./pixel.png)
```

For organized posts with multiple images:

```
src
├── content
│   └── blog
│       ├── getting-started
│       │   ├── getting-started.md
│       │   ├── hero.png
│       │   └── pixel.png
│       ├── PCA-in-face-recognition
│       │   ├── hero.png
│       │   └── PCA-in-face-recognition.md

```

Then reference in markdown:

```markdown
![Hero](/blog/getting-started/hero.png)
![Diagram](/blog/getting-started/diagram.png)
```

Images are automatically optimized during build.

> you can also use an external link for images.
## The Setup

- **Posts**: Go in `src/content/blog/` as `.md` files
- **Images**: Go in the post's directory and paste the image 
- **Homepage**: Shows featured post + recent list
- **Theme**: Tokyo Night retro-arcade with Courier New monospace
- **Output**: Fully static HTML, ready to deploy

---
Thanks for your contribution !

---
title: 'Building Dokusho: A Lightweight Manga Reader for Modern Systems'
description: >-
  A behind-the-scenes look at creating a cross-platform manga reader that
  combines performance and elegance using Tauri, React, and modern web
  technologies.
author: Uday
pubDatetime: 2025-04-19T15:23:13.715Z
slug: building-dokusho-manga-reader
featured: true
tags:
  - tauri
  - development
  - app
---

As a manga fan, I've long been dismayed that there aren't elegant manga readers on macOS. Most solutions were clunky, outdated, or platform-specific. That's why I created Dokusho (Japanese for "reading") – a contemporary, cross-platform manga reader native to any operating system.

![](https://res.cloudinary.com/dmqn4aaos/image/upload/v1745076155/blog/SCR-20250419-kicb_jnoccx.avif)

## The Problem

Upon surveying the landscape of manga readers, I found:

* Outdated UIs with no native feel
* Poor performance in handling large collections
* No support for main features like library management
* Minimal to no customization for different reading styles

## The Solution: Dokusho

Dokusho solves these issues with a minimal and sleek design and a focus on performance and usability. In alpha currently with a beta release scheduled for May 22, 2025.

### Main Features

* **Deep Library Management**: Organize manga with customizable categories
* **Multi-reading Modes**: Support for various reading directions and styles
* **Format Support**: Folder-based manga and CBZ archives both
* **Customizable Experience**: Customizable layout, zoom, padding, etc.
* **Cross-Platform**: Runs on Windows, macOS, and Linux with same experience

## Behind the Tech Stack

I based Dokusho on Tauri, and it's a lifesaver. Tauri creates amazingly lean apps (3-10MB vs Electron's 100MB+) that tap into the native webview of the system for performance. It has a Rust backend with phenomenal performance and security with capability-based permissions that lock down users while allowing deep integration with the system. Dokusho's original binary size is just 4.3MB, in contrast to similar Electron-based apps, which usually go over 120MB.

For state management, Jotai's atomic approach was perfect – it's lightweight, reduces unnecessary re-renders, and plays nice with Tauri for saving user settings. I can express state from small fragments without the boilerplate of more complex state managers. As an example, my settings atom implementation is really clean:

```javascript
const settingsAtom = atom(defaultSettings);

const readingModeAtom = focusAtom(settingsAtom, optic => optic.prop("reading_mode"));
const readerPageLayoutAtom = focusAtom(settingsAtom, optic => optic.prop("reading_page_layout"));
const readerZoomAtom = focusAtom(settingsAtom, optic => optic.prop("reader_zoom"));
```

This renders reading settings persistence easy to do while achieving first-rate component-level reusability.

On the UI front, shadcn/ui components give me complete control and flexibility. These are not imported from a library but copied into the project, where they can be completely customized under a shared design language. This has reduced the bundle size by 40% compared to importing a whole component library, but still gives me the flexibility to create components like my custom `MangaReader` that precisely meet the needs of the app.

## Development Challenges

The journey was not without its share of challenges. Building an intuitive drag-and-drop-enabled library management system required the addition of a custom DraggableMenuBar component to handle keyboard and pointer events. Not only did the component have to handle category reordering through drag-and-drop, but it also had to maintain the visual indicator of the currently selected category, which was very challenging to achieve.

Learning Rust to unlock the potential of Tauri was a steep learning curve. I had to introduce file system operations to the manga import feature, including creating directories, copying files, and extracting metadata. Rust's strong typing and ownership model was difficult to learn but ultimately resulted in stable, error-free code that runs smoothly even with large collections of manga.

State management across the application presented challenges in planning, especially with the reader component that needs to accommodate multiple modes of reading, page configurations, and navigation styles. The different reading modes (webtoon, right-to-left, left-to-right) will have different key bindings and gestures to manage them, but follow a consistent pattern of user experience. Performance benchmarks showed a performance improvement of 30% on page turning using my previous approach compared to the original implementation.

Perhaps the greatest challenge has been designing the extension system architecture. I'm building a plugin system with capability-based permissions for security and flexibility. The fine-grained permission system provides security while allowing extensions to access resources they require.

## The Road Ahead

The alpha release demonstrates the core functionality, but before the May 22nd beta release, I'm refining:

1. **Finishing the Extension System**: For accessing more content sources
2. **Performance Optimization**: For large libraries (targeting 50ms page loads for even 10,000+ page collections)
3. **Synchronization**: Sync'ing reading progress between devices
4. **Polishing UI**: Final touches on design

Current benchmarks show Dokusho uses approximately 120MB of memory when using a 50-title manga library, compared to competitor apps at 300-500MB. I'd like to keep being as efficient as this while introducing more features.

## Why This Matters

For too long, manga readers have been inconsistent between platforms. Dokusho is my attempt to create not just another reader, but an app that truly offers a premium experience regardless of what operating system you're on.

The project is open-source and hosted on [GitHub](https://github.com/dokushoapp/dokusho) – I welcome contributions and feedback as we move towards the beta release!

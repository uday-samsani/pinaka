---
title: 'Why I Stopped Renting My AI'
description: >-
  I hit Claude's rate limit mid-Rust debugging session. That night, I spun up a €6
  VPS and installed OpenClaw. Here's why I now run my own AI agent.
author: Uday
pubDatetime: 2026-02-11T13:00:00.000Z
slug: why-i-stopped-renting-my-ai
featured: true
tags:
  - openclaw
  - self-hosting
  - ai
  - vps
---

I was three hours into a Claude conversation about memory management in Rust when I hit the rate limit. Again. Seven bucks a month for "Pro" and I'm cooling my thumbs because I think too much.

That was the night I spun up a €6 Hetzner box and installed OpenClaw.

Look, I'm not a self-hosting maximalist. I still use ChatGPT for quick lookups. But for the stuff that matters — the ongoing projects, the context that builds up over weeks, the things I want to remember — I wanted something that doesn't vanish when the subscription lapses.

## What OpenClaw Actually Is

It's hard to explain. It's not just "ChatGPT on your server." It's more like a framework for giving an AI a persistent identity. I named mine TheFool, after this character in a novel who pretends to be foolish but is actually three moves ahead. Suits my whole thing.

The setup was almost anticlimactic. One command, some JSON, suddenly I'm messaging my own bot on Telegram. It remembers things because it writes them to Markdown files I can actually read. When I tell it "I'm proud of my Lambton College PG, not my bachelor's," that fact goes into a file and stays there.

## The Three Masks

The best part? I set up three folders: work, dev, personal. Same AI, different vibes.

**Work mode** knows about the 5K Obsidian users, the CTF progression, the $20K I saved Codewave. When I paste a job description, it doesn't ask "what's Node.js?" It knows Node is my native tongue.

**Dev mode** is where we break things. This is the context that knows about Dokusho, that suggests I try new tech, that gets excited about CTF challenges.

**Personal mode** is... quieter. Sometimes I just need to think out loud without an agenda.

## The Real Question

Is it cheaper? Marginally. Is it better? Different.

I own the conversation history. I can read what it remembers about me. When OpenAI changes their terms again, I get to shrug.

That feels worth €6.

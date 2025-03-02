---
title: 'My first ever CTF at AtHackCTF25, Montreal'
description: >-
  At ATHack2024 in Montreal, I participated in my first CTF at Concordia
  University, tackling challenges in PWN, Stegno, Web, and Crypto. I earned my
  first flag
author: Uday
pubDatetime: 2025-03-02T18:55:20.134Z
slug: my-first-ever-ctf-athack25
featured: true
---

# TL;DR:

At **ATHack2024** in **Montreal**, I had an amazing experience attending the CTF event at Concordia University. It was my first CTF, and I got the chance to compete in a variety of challenges across modules like **PWN**, **Stegno**, **Web**, and **Crypto**.

I solved my first-ever flag early on, and despite facing some tough challenges, including a **buffer overflow** and **Vim prison**, I made steady progress and earned points. The thrill of cracking flags, especially in **steganography** and **exploits**, kept me motivated. By the end of the event, my team was in the **top 15** out of 60 teams, which was a huge accomplishment!

Interac provided great advice about career growth, and I was able to network with talented individuals. The pizza, camaraderie, and learning experience made it all worth it. I’m already excited about participating in more CTFs and applying everything I learned.

# **Day 1**

## **3:00 PM**

I attended a career fair where Interac had a stall. I had a great conversation with all the members there and received valuable advice regarding my career and which certifications I should pursue.

## **4:00 PM**

Interac hosted a workshop on packet injection and password cracking using Airmon. I initially thought it would be about sniffing passwords in a network with Wireshark and cracking them, but I was disappointed to find that the workshop was focused on wireless packet monitoring and password cracking.

## **5:45 PM - 6:30 PM**

I started the CTF at around 6:00 PM. First, I checked the source code and then began scanning the subpages and robots.txt. After a few minutes of inspecting things in the dev tools, I found a clue in the source code, which I followed to get my first-ever flag, earning 50 points.

## **7:00 PM**

I thought this was a simple PHP script with additional image bits, so I uploaded it with a renamed file path. However, after 30 to 45 minutes of frustration, I couldn’t make any progress. On Day 2, I realized what went wrong.

## **9:00 PM**

After trying two XSS challenges and spending hours in agony on an easy box, I decided to check out the steganography module. I was given an image and tasked with extracting a flag. I quickly checked for strings in the image and suspected that files may have been zipped inside. I used `binwalk -e` to extract them, but all I got were two songs.

I applied the same process to the image without progress, and after 15 minutes, I decided to decode the .wav files. Using Audacity, which I had prior experience with, I found the flag hidden in the heatmap. The flag was encoded, and after trying several decoders, I finally decoded it with `rot3`.

## **9:30 PM**

We were treated to pizza by the volunteers at AtHack, and we assessed our team’s progress. My teammates also tackled a few challenges, bringing us to 800 points. We were pleased to be in the top 15 out of 60 teams, but we still aimed to do more and increase our standing.

## **10:00 PM - 1:15 AM**

At this point, things started to slow down. I tried several challenges in the PWN, Forensics, Stegno, Web, and Crypto modules, but I wasn’t able to complete any.

## **1:25 AM**

Three new challenges were added, and I quickly checked them out. One challenge, named “CWE,” caught my attention. It turned out to be a simple buffer overflow attack to change the is\_auth variable to 1, bypassing validation and revealing the flag. I successfully exploited the vulnerability and earned 150 points.

## **1:45 AM**

I began another challenge that involved exploiting a system with SSH access but got stuck in a Vim prison. I considered checking the shadow file for root access but couldn’t get anywhere. I then tried to create a reverse shell, which was not possible. After 30 minutes, I started examining the directory structure of the home user for clues. Unfortunately, the container disconnected, and after 30 minutes of trying to reconnect, I decided to leave it for the morning and went home in a cab (my wallet crying in the corner of my room).

# **Day 2**

## **\~10:00 AM**

I woke up late and missed my scheduled timeline to reach Concordia by 9:00 AM. However, I managed to arrive by 10:00 AM. Upon arrival, my teammate and I dove into a few more challenges, but I wasn’t able to complete any.

## **\~1:30 PM**

I remembered the Vim prison challenge I had left unfinished the day before. With just 30 minutes before the submission deadline, I quickly revisited it. I checked the `bashrc` file, and with help from my teammate Cyres, we inspected the Vim environment with, `:echo $`, where we found the flag.

With all this, we finally reached our final score of 1300 points. Taking us in the top 15 of all 60 teams.
That’s our CTF experience in a nutshell!

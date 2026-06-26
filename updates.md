---
layout: default
title: Updates
permalink: /updates/
---

# Updates

The latest on Valence &mdash; releases, fixes, and what we're building.

<ul class="post-list">
{% for post in site.posts %}
  <li>
    <span class="date">{{ post.date | date: "%B %-d, %Y" }}</span>
    <div class="title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></div>
    <p class="excerpt">{{ post.excerpt | strip_html | truncate: 170 }}</p>
  </li>
{% endfor %}
</ul>

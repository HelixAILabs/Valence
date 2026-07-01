---
layout: default
title: News
permalink: /news/
---

# News

Plans, videos, announcements, and the thinking behind Valence. Looking for release notes and downloads? See [Updates]({{ '/updates/' | relative_url }}).

<ul class="post-list">
{% for post in site.posts %}{% if post.category == 'news' %}
  <li>
    <span class="date">{{ post.date | date: "%B %-d, %Y" }}</span>
    <div class="title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></div>
    <p class="excerpt">{{ post.excerpt | strip_html | truncate: 170 }}</p>
  </li>
{% endif %}{% endfor %}
</ul>

---
layout: page
nav: updates
title: Updates
lede: "Every Valence build, newest first. Grouped by platform and version: open a family to see its releases."
permalink: /updates/
description: Every Valence release, grouped by platform and version family, with dates, summaries and full release notes.
---

{% assign rel = site.data.releases.releases %}
{% assign families = rel | map: "family" | uniq %}

{% assign shipped = rel | where_exp: "r", "r.notice != true" %}

<p class="rel-count"><strong>{{ shipped | size }} releases</strong> between
{{ rel.last.date | date: "%B %-d, %Y" }} and {{ rel.first.date | date: "%B %-d, %Y" }}.</p>

<div class="rel-list">
{% for fam in families %}
  {% assign items = rel | where: "family", fam %}
  {% assign shipped_items = items | where_exp: "r", "r.notice != true" %}
  {% assign platform = items.first.platform | default: "Windows" %}
  {% if forloop.first %}{% assign open = "true" %}{% else %}{% assign open = "false" %}{% endif %}
  <div class="rel dl" data-dl data-open="{{ open }}">
    <button class="dl-head" type="button" aria-expanded="{{ open }}" aria-controls="fam-{{ fam | slugify }}">
      <span class="dl-plat">{{ fam }}.x &middot; <span class="rel-os">{{ platform }}</span></span>
      <span class="dl-status">{{ shipped_items | size }} release{% if shipped_items.size != 1 %}s{% endif %} &middot;
        {% if items.size > 1 and items.last.date != items.first.date %}{{ items.last.date | date: "%b %-d" }} – {{ items.first.date | date: "%b %-d, %Y" }}{% else %}{{ items.first.date | date: "%b %-d, %Y" }}{% endif %}</span>
      <svg class="dl-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
    </button>
    <div class="dl-body" id="fam-{{ fam | slugify }}"><div class="dl-inner">
      <ul class="rel-rows">
      {% for r in items %}
        <li{% if r.notice %} class="is-notice"{% endif %}>
          <a class="rel-ver" href="{{ r.url | relative_url }}">{{ r.version }}</a>
          <span class="rel-date">{{ r.date | date: "%b %-d, %Y" }}</span>
          <span class="rel-sum">{{ r.summary }}{% if r.notice %} <em>, historical notice</em>{% endif %}</span>
        </li>
      {% endfor %}
      </ul>
    </div></div>
  </div>
{% endfor %}
</div>

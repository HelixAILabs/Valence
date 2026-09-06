source "https://rubygems.org"

# Pinned so the built output is reproducible. Without this file the gem set is
# whatever happens to be installed on the machine doing the build, and the three
# plugins below are hard build dependencies, not optional extras:
#   jekyll-redirect-from  emits /Valence.html, the URL the app and old links use
#   jekyll-seo-tag        emits the canonical + OG tags every page's <head> expects
#   jekyll-sitemap        emits /sitemap.xml, referenced by robots.txt
# If any is missing the build still "succeeds" and silently ships a broken site.
gem "jekyll", "~> 4.4"
gem "jekyll-redirect-from", "~> 0.16"
gem "jekyll-seo-tag", "~> 2.9"
gem "jekyll-sitemap", "~> 1.4"

const { DateTime } = require("luxon");
const { removeTrailingSlash } = require("./filters");

module.exports = (eleventyConfig, options = {}) => {
  // borrowed from Eleventy Rss feed plugin
  function absoluteUrl(url, base) {
    try {
      return new URL(url, base).toString();
    } catch (e) {
      console.log(`Failed on ${url} ${base}`);
      return url;
    }
  }

  // borrowed from Eleventy Rss feed plugin
  function isoDate(dateObj) {
    return DateTime.fromJSDate(dateObj).toISO({
      includeOffset: true,
      suppressMilliseconds: true,
    });
  }

  function generateExcerpt(templateContent) {
    if (!templateContent) {
      return "";
    }
    // kind of a hacky way to generate a meta description
    // relies on a specific content pattern
    const content = templateContent
      .replace(/(\r\n|\n|\r)/gm, "")
      .replace(/<h1>.+<\/h1><p(.|\n)+<\/time>(.|\n)?<\/p>/gm, "")
      .replace(/<p><img.+<\/p>/, "") //remove images
      .replace(/<sup.+<\/sup>/, "") // remove footnotes
      .replace(/<pre.+<\/pre>/, ""); // remove code blocks
    const excerptIndex = content.indexOf("<!--more-->");
    if (excerptIndex > -1) {
      return content.substring(0, excerptIndex).trim();
    } else if (content.length <= 140) {
      return content.trim();
    }

    const excerptEnd = findExcerptEnd(content);
    return content.substring(0, excerptEnd).trim();
  }

  function findExcerptEnd(content) {
    if (content === "") {
      return 0;
    }

    return content.indexOf("</p>") + 4;
  }

  eleventyConfig.addNunjucksTag("seo", function (nunjucksEngine) {
    return new (function () {
      this.tags = ["seo"];

      this.parse = function (parser, nodes, _) {
        var tok = parser.nextToken();
        var args = parser.parseSignature(null, true);

        // fake it until you make it!
        // https://github.com/mozilla/nunjucks/issues/158#issuecomment-34919343
        if (args.children.length === 0) {
          args.addChild(new nodes.Literal(0, 0, ""));
        }

        parser.advanceAfterBlockEnd(tok.value);
        return new nodes.CallExtensionAsync(this, "run", args);
      };

      this.run = function (context, _, callback) {
        const {
          page,
          date,
          excerpt,
          description,
          keywords,
          previewImage,
          og_image,
          og_image_alt,
          featured_image,
          featured_image_alt,
          image,
          image_alt,
          type,
          title,
          content,
        } = context["ctx"];

        const site =
          typeof options.site === "object"
            ? options.site
            : context["ctx"][options.site || "site"];

        const seo =
          typeof options.seo === "object"
            ? options.seo
            : context["ctx"][options.seo || "seo"];

        // note to future self - inline so that seo & site do
        // not need to be arguments
        const pullWithBackup = (key, defaultValue = null) => {
          return (seo && seo[key]) || (site && site[key]) || defaultValue;
        };
        const pageTitle = title || site.title;
        const metaDescription = (
          description ||
          excerpt ||
          generateExcerpt(content)
        ).replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi, "");
        const local = pullWithBackup("local", "en_US");
        const metaKeywords = keywords || pullWithBackup("keywords");
        const baseUrl = process.env.URL || pullWithBackup("url");
        const pageUrl = `${baseUrl}${removeTrailingSlash(page.url)}`;
        const publishedTime = isoDate(date);
        const siteTitle = pullWithBackup("title", title);
        const twitter = `@${pullWithBackup("twitter")}`.replace(/^@@/, "@");
        const rawImage = og_image || featured_image || previewImage || image;
        const alt = og_image_alt || featured_image_alt || image_alt;
        const resolvedOgImage = rawImage
          ? absoluteUrl(rawImage, baseUrl)
          : null;
        const typeOfContent =
          type || (page.url === "/" ? "website" : "article");
        const typeOfTwitterCard = pullWithBackup("twitterCardType", "summary");

        const structuredData = {
          description: metaDescription,
          headline: title,
          "@type": "WebSite",
          image: resolvedOgImage,
          url: pageUrl,
          name: siteTitle,
          "@context": "https://schema.org",
        };
        const template = `
          <link rel="canonical" href="{{ pageUrl }}">
          <meta property="og:title" content="{{ pageTitle }}" />
          <meta property="og:locale" content="{{local}}" />
          <meta name="description" content="{{metaDescription}}">
          <meta name="keywords" content="{{metaKeywords}}">
          <meta property="og:url" content="{{ pageUrl }}" />
          <meta property="og:site_name" content="{{ siteTitle }}" />
          <meta property="og:type" content="{{typeOfContent}}" />
          <meta property="article:published_time" content="{{publishedTime}}" />
          <meta property="twitter:title" content="{{ pageTitle }}" />
          <meta name="twitter:site" content="{{twitter}}" />
          {% if resolvedOgImage %}
            <meta property="og:image" content="{{resolvedOgImage}}" />
            <meta property="og:image:alt" content="{{alt}}" />
            <meta property="twitter:image" content="{{resolvedOgImage}}" />
            <meta property="twitter:image:alt" content="{{alt}}" />
            <meta name="twitter:card" content="{{typeOfTwitterCard}}" />
          {% endif %}
          <script type="application/ld+json">
            {{structuredData | safe}}
          </script>
        `.replace(/^\s+/gm, "");

        const output = nunjucksEngine.renderString(template, {
          pageTitle,
          local,
          metaDescription,
          metaKeywords,
          pageUrl,
          siteTitle,
          typeOfContent,
          publishedTime,
          resolvedOgImage,
          alt,
          typeOfTwitterCard,
          twitter,
          structuredData: JSON.stringify(structuredData),
        });

        let ret = new nunjucksEngine.runtime.SafeString(output);
        callback(null, ret);
      };
    })();
  });
};

import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
  featured?: boolean;
}

export default function Card({
  href,
  frontmatter,
  secHeading = true,
  featured = false,
}: Props) {
  const { title, pubDatetime, modDatetime, description, tags } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: `font-serif font-semibold tracking-tight group-hover:text-primary-600 transition-colors duration-300 ${
      featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
    }`,
  };

  return (
    <li className={`group ${featured ? "my-8" : "my-6"}`}>
      <article
        className={`relative ${
          featured
            ? "bg-skin-card border border-skin-line rounded-2xl p-6 sm:p-8 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-primary-500/30 hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1"
            : ""
        }`}
      >
        {featured && (
          <div className="absolute -top-3 left-6 sm:left-8">
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-primary-500 text-white rounded-full shadow-sm">
              Featured
            </span>
          </div>
        )}

        <a
          href={href}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-skin-fill rounded-lg"
        >
          <div className="space-y-3">
            <Datetime
              pubDatetime={pubDatetime}
              modDatetime={modDatetime}
              size={featured ? "lg" : "sm"}
            />

            {secHeading ? (
              <h2 {...headerProps}>{title}</h2>
            ) : (
              <h3 {...headerProps}>{title}</h3>
            )}

            <p
              className={`text-skin-base-muted leading-relaxed ${
                featured ? "text-base sm:text-lg" : "text-sm sm:text-base"
              }`}
            >
              {description}
            </p>

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-3">
                {tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-skin-fill-muted text-skin-base-muted rounded-full transition-all duration-200 group-hover:bg-primary-500/10 group-hover:text-primary-600 border border-transparent group-hover:border-primary-500/20"
                  >
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M16.018 3.815 15.232 8h-4.966l.716-3.815-1.964-.37L8.232 8H4v2h3.857l-.751 4H3v2h3.731l-.714 3.805 1.965.369L8.766 16h4.966l-.714 3.805 1.965.369.783-4.174H20v-2h-3.859l.751-4H21V8h-3.733l.716-3.815-1.965-.37z" />
                    </svg>
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-skin-base-muted">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </a>
      </article>
    </li>
  );
}

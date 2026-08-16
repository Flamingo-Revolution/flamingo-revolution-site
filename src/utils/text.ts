/**
 * Splits a page title into exactly two lines for the site's h1 treatment
 * (each line rendered as its own white-on-black block, stacked). Splits on
 * the first space only, so a three-word title like "Historiku i Protestave"
 * becomes ["Historiku", "i Protestave"] rather than one span per word.
 */
export const splitTitleLines = (title: string): string[] =>
  title.split(/ (.+)/).filter(Boolean);

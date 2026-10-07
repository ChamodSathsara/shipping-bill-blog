import { HOME_KEYWORDS, HOME_KEYWORD_FALLBACKS } from "../keywords";

const PLACEHOLDER = /^\s*\{\{.*\}\}\s*$/;

export function homeKeyword(index: number): string {
  const value = HOME_KEYWORDS[index];
  if (value && !PLACEHOLDER.test(value)) return value;
  return HOME_KEYWORD_FALLBACKS[index] ?? "";
}

export function allHomeKeywords(): string[] {
  return HOME_KEYWORD_FALLBACKS.map((_, i) => homeKeyword(i)).filter(Boolean);
}

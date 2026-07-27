import teams from "@/data/teams.json";
import standings from "@/data/standings.json";
import schedule from "@/data/schedule.json";

export type Team = (typeof teams)[number];
export type StandingRow = (typeof standings.teams)[number];

/**
 * A single game. `home`/`away` reference team slugs; for playoff games whose
 * seeds aren't set yet, `homeLabel`/`awayLabel` carry a placeholder ("Seed 3").
 */
export interface Game {
  id: string;
  date: string; // YYYY-MM-DD (local)
  startTime?: string; // display string, e.g. "7:30 PM" (scheduled games)
  home?: string;
  away?: string;
  homeLabel?: string;
  awayLabel?: string;
  arena: string;
  type: "regular" | "playoff";
  status: "final" | "scheduled";
  homeScore?: number;
  awayScore?: number;
  ot?: boolean;
}

const games = schedule.games as Game[];

/** All teams, sorted alphabetically by name. */
export const allTeams: Team[] = [...teams].sort((a, b) =>
  a.name.localeCompare(b.name)
);

/** Look up a single team by its slug. */
export function getTeam(slug?: string): Team | undefined {
  return slug ? teams.find((t) => t.slug === slug) : undefined;
}

/** Team display name from a slug (falls back to the slug if not found). */
export function teamName(slug: string): string {
  return getTeam(slug)?.name ?? slug;
}

/** Resolved display info for one side of a game. */
export function gameSide(game: Game, side: "home" | "away") {
  const slug = side === "home" ? game.home : game.away;
  const label = side === "home" ? game.homeLabel : game.awayLabel;
  const score = side === "home" ? game.homeScore : game.awayScore;
  const team = getTeam(slug);
  return { team, slug, score, name: team?.name ?? label ?? slug ?? "TBD" };
}

/** Standings in official league rank order. */
export function sortedStandings(): (StandingRow & {
  team: Team | undefined;
  diff: number;
})[] {
  return [...standings.teams]
    .map((row) => ({ ...row, team: getTeam(row.slug), diff: row.gf - row.ga }))
    .sort((a, b) => a.rank - b.rank);
}

export const standingsMeta = { updated: standings.updated, note: standings.note };

/** Parse a YYYY-MM-DD string as a local date (avoids UTC off-by-one). */
function parseLocalDate(date: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

/** Sort key that orders by calendar date. */
function dateKey(g: Game): number {
  return parseLocalDate(g.date).getTime();
}

/** Upcoming (scheduled) games, soonest first. */
export function upcomingGames(limit?: number): Game[] {
  const list = games
    .filter((g) => g.status === "scheduled")
    .sort((a, b) => dateKey(a) - dateKey(b) || a.id.localeCompare(b.id));
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Completed games, most recent first. */
export function recentResults(limit?: number): Game[] {
  const list = games
    .filter((g) => g.status === "final")
    .sort((a, b) => dateKey(b) - dateKey(a) || b.id.localeCompare(a.id));
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** All games involving a given team, chronologically. */
export function gamesForTeam(slug: string): Game[] {
  return games
    .filter((g) => g.home === slug || g.away === slug)
    .sort((a, b) => dateKey(a) - dateKey(b) || a.id.localeCompare(b.id));
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

export function formatGameDate(date: string): string {
  return dateFmt.format(parseLocalDate(date));
}

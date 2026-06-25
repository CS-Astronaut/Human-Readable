import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const repoRoot = process.cwd();
const readmePath = path.join(repoRoot, "README.md");
const blogRoot = path.join(repoRoot, "src", "content", "blog");

function getCommitDate(relPath) {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cs", "--", relPath],
      { encoding: "utf8" }
    ).trim();
    return out || "unknown";
  } catch {
    return "unknown";
  }
}

function getPosts() {
  return fs
    .readdirSync(blogRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b));
}

const readme = fs.readFileSync(readmePath, "utf8");
const posts = getPosts();

const postsHeadingIndex = readme.indexOf("## Posts");
if (postsHeadingIndex === -1) {
  throw new Error('Could not find "## Posts" section in README.md');
}

// Find the next heading or end of file
const nextHeadingMatch = readme.slice(postsHeadingIndex + 9).match(/\n(#{1,2}\s+)/);
const sectionEndIndex = nextHeadingMatch
  ? postsHeadingIndex + 9 + nextHeadingMatch.index
  : readme.length;

const section = readme.slice(postsHeadingIndex, sectionEndIndex).trim();
const nextHeading = nextHeadingMatch ? nextHeadingMatch[1] : "";

const existingRows = [...section.matchAll(/^\|\s*\d+\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$/gm)]
  .map((m) => {
    const postCell = m[1].trim();
    // Extract folder name from markdown link [name](url) or plain text
    const linkMatch = postCell.match(/\[([^\]]+)\]/);
    const name = linkMatch ? linkMatch[1] : postCell;
    return {
      name,
      date: m[2].trim()
    };
  });

const existingNames = existingRows.map(r => r.name);
const newPosts = posts.filter((p) => !existingNames.includes(p));

if (newPosts.length === 0) {
  console.log("No new posts found.");
  process.exit(0);
}

// Fetch commit dates for new posts and sort by date (oldest first, newest last)
const newPostsWithDates = newPosts
  .map((post) => {
    const relPath = path.posix.join("src/content/blog", post);
    const date = getCommitDate(relPath);
    return { name: post, date };
  })
  .sort((a, b) => {
    // If either date is "unknown", sort by name
    if (a.date === "unknown" || b.date === "unknown") {
      return a.name.localeCompare(b.name);
    }
    // Sort by date ascending (oldest first, newest last)
    return a.date.localeCompare(b.date);
  });

let tableLines = section
  .split("\n")
  .filter((line) => line.trim().startsWith("|"));

// If there is no table yet, create one
if (tableLines.length === 0) {
  tableLines = [
    "| Row | Post name | Commit date |",
    "| --- | --- | --- |",
  ];
}

const dataLines = tableLines.filter((line) => /^\|\s*\d+\s*\|/.test(line));
const nextRowNum = dataLines.length + 1;

const baseUrl = "https://cs-astronaut.github.io/Human-Readable/blog";

// Add new posts in sorted order
for (let i = 0; i < newPostsWithDates.length; i++) {
  const { name, date } = newPostsWithDates[i];
  const postLink = `[${name}](${baseUrl}/${name}/)`;
  dataLines.push(`| ${nextRowNum + i} | ${postLink} | ${date} |`);
}

const updatedTable = [
  "## Posts",
  "",
  tableLines[0],
  tableLines[1] || "| --- | --- | --- |",
  ...dataLines,
].join("\n");

const updatedReadme = readme.slice(0, postsHeadingIndex) + updatedTable + "\n" + (nextHeading ? "\n" + nextHeading : "") + readme.slice(sectionEndIndex + nextHeading.length);
fs.writeFileSync(readmePath, updatedReadme);

console.log(`Added ${newPostsWithDates.length} new post(s) to README.md (sorted by commit date)`);
newPostsWithDates.forEach(({ name, date }) => {
  console.log(`  - ${name} (${date})`);
});

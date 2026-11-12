# The Daemon in the Machine: Plutarch × Westworld
Honors 241 team portfolio site.

## What's in here
| File | What it is |
|---|---|
| `index.html` | Home page (DeepDream background, welcome, member cards) |
| `team.html` | "Simmias' House", the team builds page: Build 2 intro + bibliography, team illustrations, Build 6 conclusion |
| `members/varsha.html`, `justin.html`, etc. (6 pages) | One page per member: journal, Build 7 writings, Build 8 illustration |
| `characters.html` + `characters.js` | Interactive character map. **Edit `characters.js`** to change who's on it, their descriptions, and their Westworld echoes |
| `maze.html` | Scroll-driven maze that links to every page (member stops come from `site.js` automatically) |
| `glossary.js` | Hover definitions. Add or edit terms here |
| `images/` | Put all pictures here |
| `site.js` | **Site name and member names live here.** Change them once and every menu updates |
| `style.css` | Colors and fonts (top of the file) |

## Putting it online with GitHub Pages (free, about 10 minutes)
1. Go to github.com and sign in. Click the **+** at the top right, then **New repository**.
2. Name it something like `daemon-in-the-machine`. Set it to **Public**. Click **Create repository**.
3. On the new page, click **uploading an existing file**. Drag in **everything in this folder**
   (`index.html`, `team.html`, `style.css`, `site.js`, and the `members` and `images` folders).
   Click **Commit changes**.
4. Go to **Settings**, then **Pages** in the left sidebar. Under "Branch", choose **main** and **/ (root)**, then click **Save**.
5. Wait 1–2 minutes and refresh. Your link will appear at the top:
   `https://YOUR-USERNAME.github.io/daemon-in-the-machine/`. That's the link for Canvas.

## Editing later (no coding tools needed)
- Open any file on github.com, click the **pencil icon**, edit, then **Commit changes**. The live site updates in about a minute.
- **Add teammates:** Settings, then Collaborators, then **Add people** (they need free GitHub accounts). After that they can edit their own page the same way.
- **Add an image:** open the `images` folder, click **Add file**, then **Upload files**. Then in the page, replace the
  placeholder `<div class="placeholder-img">…</div>` with `<img src="../images/NAME.jpg" alt="description">`
  (on `team.html` and `index.html`, leave out the `../`).
- **DeepDream background:** upload your image to `images/` and name it exactly `deepdream.jpg`.

## Formatting cheat sheet
- Paragraph: `<p>Your text</p>`
- Highlighted quote: `<blockquote>The quote <cite>Build 3</cite></blockquote>`
- Divider: `<hr>`
- Italics (book titles): `<em>Lives</em>`
- Journal entry: copy a whole `<div class="journal-entry"> … </div>` block
- If your text contains `<` or `&`, write `&lt;` or `&amp;` instead.

## Analysis mode margin notes
Add a note that only shows in Analysis mode by putting this right before a paragraph:
`<aside class="note"><span class="mono">Label</span>Your note</aside>`

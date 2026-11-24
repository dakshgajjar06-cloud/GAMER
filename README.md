# DAKSH GAMING × GAJJAR GAMERZ

Static website: HTML5, CSS3, vanilla JS. No build step, no paid services.

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000.

## Edit content
- **Videos:** `VIDEOS` list at the top of `script.js` (title, link, thumbnail path).
- **Games:** edit the `GAMES` list at the top of `script.js`. Put artwork named like the `img` values (e.g. `gta5.jpg`) in `assets/games/`; use images you have rights to. Add more games by copying one line.
- **Profile photo:** replace the placeholder box in `index.html` (section "Behind the controller") with `<img src="assets/profile.jpg" alt="DAKSH">`.
- **Instagram:** replace the `href="#"` link in the Community section and remove `data-todo`. Discord is already linked.
- **Stats:** change `data-count` values in the hero. **News:** edit the demo cards.
- **Colors:** CSS variables at the top of `style.css`.

## Host free on GitHub Pages
1. Create a GitHub account and a new public repository (e.g. `daksh-gaming`).
2. Upload all files from this folder (keep `index.html` in the root).
3. Repo **Settings > Pages**, under Source choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/daksh-gaming/`.

Fan site: not affiliated with or endorsed by any game publisher. Game names belong to their owners.

# Stay Home - Crisis Simulation Game

An interactive narrative game where you guide three characters through a crisis by making choices through social media and text conversations.

## Quick Start

### Windows
```bash
start.bat
```
Double-click `start.bat` or run it from terminal. That's it!

### Mac/Linux
```bash
./start.sh
```
Or run manually:
```bash
npm install
npm run dev
```

The game will open at: **http://localhost:5173**

---

## What This Game Does

- **Social Feed**: Read posts about an unfolding crisis
- **Chat System**: Talk to three characters (Mom, Boyfriend, Best Friend)
- **Choice-Driven**: Your responses affect character anxiety levels
- **Multiple Endings**: Characters can survive, be traumatized, or worse
- **3-Day Story**: Progress through three days of escalating events

---

## Edit Game Content

All game content is in **CSV files** - edit them with Excel, Google Sheets, or any text editor!

### CSV Files (in `public/data/`)

- **`posts.csv`** - Social media feed posts
- **`chats.csv`** - Character conversations and dialogue options
- **`endings.csv`** - Character ending scenarios

### Images (in `public/assets/`)

- All game images (social posts, character portraits)
- Just drop new images here and reference in CSV

**Changes appear immediately** when you refresh the browser!

---

## Deploy Online

Want to share your game? See **[DEPLOYMENT.md](DEPLOYMENT.md)** for step-by-step guides:

- **Netlify** (2 minutes, drag & drop)
- **GitHub Pages** (5 minutes, auto-deploy on push)
- **Vercel** (3 minutes, auto-deploy)

**All completely free!** Images and everything work perfectly.

---

## Project Structure

```
├── public/
│   ├── data/          # CSV files (game content)
│   │   ├── posts.csv
│   │   ├── chats.csv
│   │   └── endings.csv
│   └── assets/        # Images
├── src/
│   ├── components/    # UI components
│   ├── contexts/      # CSV data provider
│   └── pages/         # Game page
├── start.bat          # Windows quick start
├── start.sh           # Mac/Linux quick start
└── DEPLOYMENT.md      # Deployment guide
```

---

## Development Commands

| Command | What It Does |
|---------|--------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |

---

## CSV Format Examples

### posts.csv
```csv
ID,Day,Publisher,Post_Text,Media,Source,FC_Src
1,1,Dept. of Health,Follow these steps...,image.jpg,https://...,Verified source
```

### chats.csv
```csv
ID,Char,Day,Message_Text,Option_A,Anx_A,Lethal_A,Option_B,Anx_B,Lethal_B,Next_ID
mom_1_1,Mom,1,How are you?,I'm fine,5,FALSE,Worried,10,FALSE,mom_1_2
```

### endings.csv
```csv
character_id,isDead_condition,anxietyLevel_condition,headline_content,text_content
mom,FALSE,X>75,Mom is ALIVE AND WELL,She made it safely...
```

---

## Technology Stack

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Papa Parse** - CSV parsing
- **Framer Motion** - Animations

---

## Features

✅ Fully standalone (no external dependencies)
✅ 100% client-side (no server needed)
✅ Easy content editing (CSV files)
✅ Responsive design (works on mobile)
✅ Retro CRT aesthetic
✅ Sound effects and ambient music
✅ Multiple endings based on choices
✅ Progressive disclosure (posts unlock over time)

---

## License

This is your game - do whatever you want with it! Edit it, share it, deploy it, fork it, modify it. No restrictions.

---

## Need Help?

- **Won't start?** Make sure Node.js is installed ([nodejs.org](https://nodejs.org))
- **CSV issues?** Check file format matches examples above
- **Build fails?** Run `npm install` first
- **Deployment?** See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## Credits

- Game concept and content: You!
- Built with Claude Code
- Migrated from Base44 platform

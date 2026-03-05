# Cybersecurity Tabletop Exercise

An interactive role-playing game that simulates a ransomware attack incident response. Players take on one of several cybersecurity roles while AI agents handle the other positions, creating a realistic tabletop exercise environment.

## Features
- **Role Selection**: Choose from 6 cybersecurity roles (CEO, CTO, CISO, IT Manager, HR, SOC Analyst)
- **Realistic Scenario**: Simulated ransomware attack with detailed incident description
- **AI Agents**: Intelligent AI responses with diverse, contextually appropriate dialogue
- **Real-time Timeline**: Timestamped log of all communications and actions
- **Interactive Elements**: Typing animations, sound effects, and visual feedback
- **Master Clock**: Tracks exercise duration
- **Download Logs**: Save detailed records of the exercise
- **Educational Completion**: Professional finish screen with key lessons learned

## How to Play
1. Select your role from the available positions
2. Read the ransomware attack scenario
3. Interact with AI agents by typing responses in your role's text area
4. Watch the timeline build as the exercise progresses
5. Use the "Download Log" button to save records
6. Click "Finish Exercise" when done to see the completion screen

## Technical Details
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Audio**: Web Audio API for sound effects (no external dependencies)
- **Responsive**: Works on desktop and mobile devices
- **No Server Required**: Pure client-side application

## Local Development
```bash
# Start local server
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

## Deployment
This application can be deployed to any static web host including:
- GitHub Pages (recommended for free hosting)
- Netlify
- Vercel
- Any traditional web hosting service
- AI responses are predefined for simulation; in a real implementation, integrate with an LLM API.
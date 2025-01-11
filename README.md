# Video Chat Application

A real-time video chat application built with React, Agora SDK, and TailwindCSS. This application enables users to create or join video chat rooms with multiple participants and includes a text chat feature.

![Video Chat App](https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80&w=1000)

## Features

- 🎥 Real-time video and audio communication
- 💬 Text chat functionality
- 🔗 Shareable room codes
- 🎛️ Audio/Video controls (mute/unmute, video on/off)
- 📱 Responsive grid layout for multiple participants
- 🔒 Secure room-based communication

## Live Demo

Check out the live demo: [Video Chat App](https://elaborate-buttercream-3df282.netlify.app)

## Technologies Used

- React 18
- TypeScript
- Agora RTC SDK
- Agora RTM SDK
- TailwindCSS
- Vite
- Lucide React Icons
- Zustand (State Management)

## Prerequisites

Before you begin, ensure you have:
- Node.js (v16 or higher)
- An Agora account and App ID
- npm or yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/video-chat-app.git
cd video-chat-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Agora App ID:
```env
VITE_AGORA_APP_ID=your_agora_app_id_here
```

4. Start the development server:
```bash
npm run dev
```

## Usage

1. Open the application in your browser
2. Enter your name
3. Create a new room or join an existing one with a room code
4. Share the room code with others to invite them
5. Use the control buttons to toggle audio/video
6. Use the chat panel to send messages to other participants

## Project Structure

```
src/
├── components/        # React components
├── hooks/            # Custom hooks
├── store/            # Zustand store
├── types/            # TypeScript types
├── config/           # Configuration files
└── main.tsx          # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Agora.io](https://www.agora.io/) for their excellent SDKs
- [TailwindCSS](https://tailwindcss.com/) for the styling utilities
- [Lucide](https://lucide.dev/) for the beautiful icons

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/video-chat-app](https://github.com/yourusername/video-chat-app)
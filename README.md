# Next.js Firebase MetaMask Authentication

This project is a Next.js application integrated with Firebase Authentication and Ethereum's MetaMask for user authentication. It also utilizes Tailwind CSS for styling.

## Features

- **Firebase Authentication:** Utilize Firebase Authentication for user authentication, including email/password, Google sign-in, and MetaMask sign-in.
- **MetaMask Integration:** Allow users to sign in using their MetaMask wallet, enabling secure and decentralized authentication.
- **Next.js:** Benefit from the advantages of Next.js, including server-side rendering, easy API routes, and excellent developer experience.
- **Tailwind CSS:** Rapidly style your components using Tailwind CSS utility classes, enabling fast and responsive UI development.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm or Yarn package manager
- MetaMask browser extension

## Getting Started

1. Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/nextjs-firebase-metamask-auth.git
```

2. Navigate to the project directory:

```bash
cd nextjs-firebase-metamask-auth
```

3. Install dependencies using npm or Yarn:

```bash
npm install
# or
yarn install
```

4. Set up Firebase:
   - Create a Firebase project on the Firebase Console (https://console.firebase.google.com/).
   - Enable Email/Password and Google authentication providers.
   - Set up a Firebase Web App and obtain your Firebase configuration.
   - Replace the Firebase configuration in `src/firebase.js` with your own.

5. Set up MetaMask:
   - Install the MetaMask extension in your browser (https://metamask.io/).
   - Ensure you have a MetaMask account with Ethereum available.

6. Start the development server:

```bash
npm run dev
# or
yarn dev
```

7. Open your browser and navigate to `http://localhost:3000`.

8. Test the authentication functionality by signing in with email/password, Google, or MetaMask.

## Deployment

Before deploying your application, ensure to configure Firebase for production:

1. Set up Firebase Hosting or your preferred hosting provider.
2. Build your Next.js application for production:

```bash
npm run build
# or
yarn build
```

3. Deploy your application:

```bash
npm run deploy
# or
yarn deploy
```

4. Follow the deployment instructions for your chosen hosting provider.

## Contributing

Contributions are welcome! If you have suggestions for improvement, open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

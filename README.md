This is a [RainbowKit](https://rainbowkit.com) + [wagmi](https://wagmi.sh) + [Next.js](https://nextjs.org/) project bootstrapped with [`create-rainbowkit`](https://github.com/rainbow-me/rainbowkit/tree/main/packages/create-rainbowkit).

# Election dApp

![Tech stack](https://img.shields.io/badge/Tech%20Stack-React%20%7C%20TypeScript%20%7C%20Tailwind%20CSS%20%7C%20Solidity-blue)

An Election dApp where the user can vote for their candidate leveraging the power of Blockchain technology. The smart contract is deployed to the Polygon Mumbai testnet, and the app uses Rainbowkit, Wagmi, TypeScript, and Tailwind CSS. The app also uses Alchemy for the API key for Polygon Mumbai.

## Advantages of a Decentralized Voting System

- Increased Transparency: Decentralized voting systems can increase transparency, as all voters can view the results in real-time.

- Immutable Records: Decentralized voting systems are based on blockchain technology, which means that the records are immutable and cannot be altered.

- Increased Security: Decentralized voting systems are highly secure, as they use cryptographic algorithms to protect the data.

- Reduced Costs: Decentralized voting systems can reduce the costs associated with traditional voting systems, as they eliminate the need for physical ballot boxes and personnel to count the votes.

- Increased Accessibility: Decentralized voting systems can increase accessibility for voters, as they can be accessed from anywhere with an internet connection.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Solidity

## Installation

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Create a `.env` file with the following variables:
   - `REACT_APP_ALCHEMY_KEY`: Your Alchemy API key for Polygon Mumbai.
   - `REACT_APP_CONTRACT_ADDRESS`: The address of the deployed smart contract.
   - `REACT_APP_CONTRACT_ABI`: The ABI of the deployed smart contract.
4. Run `npm start` to start the app.

## Usage

1. Connect your wallet using the Connect button.
2. Add candidates using the "Add Candidate" button.
3. Vote for a candidate using the "Vote" button.
4. View the results on the home screen.



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

import React from 'react';
import { Candidate } from '../pages/index';

type VotingProps = {
  setScreen: (screen: string) => void;
  vote: (candidateId: number) => Promise<void>;
  candidates: Candidate[];
};

function getSumOfVotes(candidates: Candidate[]): number {
    let sumOfVotes = 0;
    for (let i = 0; i < candidates.length; i++) {
      sumOfVotes += candidates[i].votes;
    }
    return sumOfVotes;
  }
  

export default function Voting({ setScreen, vote, candidates }: VotingProps) {
	return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
            <button className="absolute top-24 left-10 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full" onClick={() => setScreen('home')}>Back</button>
            <h1 className="text-4xl font-extrabold py-5">Voting System</h1>
            <div className="flex flex-row gap-8 items-center justify-center">
                {candidates.map((candidate, i) => {
                    return (
                        <div key={i} className="flex flex-col gap-4 items-center justify-center">
                            <img src={candidate.imageUri} alt="Candidate" className="w-40 h-40 rounded-lg" />
                            <h1 className="text-2xl font-bold">{candidate.name}</h1>
                            <h2>Votes: {candidate.votes} / {getSumOfVotes(candidates)}</h2>
                            <button onClick={() => vote(i+1)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Vote</button>
                        </div>
                    )
                })}
            </div>
        </div>
	);
}

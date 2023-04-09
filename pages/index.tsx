import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAccount, useContract, useSigner } from "wagmi";
import { useCallback, useEffect, useState } from "react";
import AddCandidate from "../Components/AddCandidate";
import Voting from "../Components/Voting";

import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./CONTRACT";
import dynamic from "next/dynamic";

export type Candidate = {
  id: number;
  name: string;
  party: string;
  imageUri: string;
  votes: number;
};

const Home: NextPage = () => {

  const { address } = useAccount();
  const [screen, setScreen] = useState("home"); //can be home. AddCandidate or Vote.
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  // const [totalVotes, setTotalVotes] = useState<number>(0);

  const { data: signer } = useSigner();

  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    signerOrProvider: signer,
  });


  const RenderScreen = () => {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
        {screen === "addCandidate" ? (
          <AddCandidate setScreen={setScreen} addCandidate={addCandidate} />
        ) : (
          <Voting setScreen={setScreen} candidates={candidates} vote={vote} />
        )}
      </div>
    );
  };

  //CONTRACT FUNCTIONS

  

 const getTotalVotes = useCallback(async () => {
  try {
    // Fetches the total number of votes and sets the state with the count.
    const count = await contract!.totalVotes();
    console.log("Total Votes ", count.toString());
    // setTotalVotes(count.toNumber());
    return count.toNumber();
  } catch (err) {
    console.log(err);
    return 0;
  }
}, [contract]);


  const getCandidates = useCallback(async () => {
    try {
      // Fetches the total number of candidates and loops over each candidate to create a candidate object and store them in an array.
      const count = await contract!.candidateCount();
      console.log("Candidate Count ", count.toString());
      let candidatesArr: Candidate[] = [];
      for (let i = 1; i <= count; i++) {
        const candidate = await contract!.candidates(i);
        const votes = await contract!.votes(i);
        console.log(candidate);
        let candidate_obj: Candidate = {
          id: i,
          name: candidate[0],
          party: candidate[1],
          imageUri: candidate[2],
          votes: votes.toNumber(),
        };
        candidatesArr.push(candidate_obj);
      }
      // Sets the candidates array state with the candidate objects array.
      setCandidates(candidatesArr);
    } catch (err) {
      console.log(err);
      return [];
    }
  }, [contract]);

  

  // console.log(contract);

  const addCandidate = async (name: any, party: any, imageUri: any) => {
    try {
      // Adds a new candidate to the contract with the given name, party, and image URI and waits for the transaction to be confirmed.
      const tx = await contract!.addCandidate(name, party, imageUri);
      await tx.wait();
      console.log(tx);
      console.log("Candidate Added");
    } catch (err) {
      console.log(err);
    }
  };

  const [voteCount, setVoteCount] = useState(0);

  const vote = async (candidateId: any) => {
    try {
      const tx = await contract!.vote(candidateId);
      await tx.wait();
      console.log(tx);
      console.log("Voted");
      setVoteCount(voteCount + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchTotalVotes = async () => {
      const count = await getTotalVotes();
      // setTotalVotes(count);
    };
  
    if (contract) {
      // Runs `getCandidates()` and `getTotalVotes()` on the initial render and when the contract changes.
      getCandidates();
      fetchTotalVotes();
    }
  }, [contract, getCandidates, getTotalVotes]);

  // console.log(candidates)

  //FUNCTIONALITY

  return (
    <div className="bg-black text-white">
      <div className="flex items-center justify-between flex-row px-6 py-4">
        
        <h1 className="text-2xl font-bold">Decentralized Election App</h1>
        <ConnectButton />
      </div>
      {screen == "home" ? (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
          <h1 className="text-4xl font-extrabold px-4">Indian Demo Election</h1>

          {address ? (
            <div className="flex flex-row gap-4 items-center justify-center">
              <button
                onClick={() => setScreen("addCandidate")}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow"
              >
                Add Candidate
              </button>
              <button
                onClick={() => setScreen("vote")}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow"
              >
                Vote
              </button>
            </div>
          ) : (
            <ConnectButton />
          )}
        </div>
      ) : (
        <RenderScreen />
      )}
    </div>
  );
};

export default dynamic (() => Promise.resolve(Home), {ssr: false})


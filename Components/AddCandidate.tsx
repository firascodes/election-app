import React, { useState } from 'react';

type AddCandidateProps = {
  setScreen: (screen: string) => void;
  addCandidate: (name: string, party: string, imageUri: string) => Promise<void>;
};

export default function AddCandidate({ setScreen, addCandidate }: AddCandidateProps) {

    const [name, setName] = useState('')
    const [party, setParty] = useState('')
    const [imageUri, setImageUri] = useState('')
    

    const candidateAdd = async(e: { preventDefault: () => void; }) => {
        e.preventDefault()
        console.log(name, party, imageUri)
        try {
            if(name === '' || party === '' || imageUri === '') {
                alert('Please fill all the fields')
                return
            }
            await addCandidate(name, party, imageUri) //adds the candidate.
            setScreen('home')
        } catch (error) {
            console.log(error)
        }
    }

	return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
            <button className="absolute top-24 left-10 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full" onClick={() => setScreen('home')}>Back</button>
            <h1 className="text-4xl font-extrabold">Add Candidate</h1>
            <form onSubmit={(e) => candidateAdd(e)} className="flex flex-col gap-4 items-center justify-center">
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} className="bg-gray-800 text-white px-4 py-2 rounded-lg" />
                <input type="text" placeholder="Party" onChange={(e) => setParty(e.target.value)} className="bg-gray-800 text-white px-4 py-2 rounded-lg" />
                <input type="text" placeholder="Image url" onChange={(e) => setImageUri(e.target.value)} className="bg-gray-800 text-white px-4 py-2 rounded-lg" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Candidate</button>
            </form>
        </div>
	);
}

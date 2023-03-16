import { useState } from 'react';

export default function SnapshotSelector({snapshots, setSnapshot}) {

    const [selectedSnapshot, setSelectedSnapshot] = useState("");

    const displayTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toDateString();
    }

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        setSnapshot(formJson.selectedSnapshot);

    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <label>
                <h1 className='dark:text-white mb-3'>pick a snapshot</h1>
                <div className='flex flex-row'>
                <select className='bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-md border-2 border-backgroundc-200 dark:border-white' name="selectedSnapshot" value={selectedSnapshot} onChange={e => setSelectedSnapshot(e.target.value)}>
                    {snapshots.map((snapshot, index) => 
                        <option key={index} value={index}>{displayTime(snapshot.timestamp)}</option>
                    )}
                </select>
                <button className='hover:opacity-80 bg-gradient-to-r from-peach-200 to-peach-500 text-white px-4 py-2 rounded-md mb-3 mx-3' type="submit">display</button>
                </div>
            </label>
        </form>
    );
  }
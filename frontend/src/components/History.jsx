import HistoryStats from '../components/HistoryStats';

export default function History({snapshots}) {

    const displayTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toDateString();
    }

    return (
        <>
            {snapshots.map((snapshot, index) => 
                <div key={index}>
                    <h1 className='dark:text-white text-2xl my-2'>this snapshot was made on {displayTime(snapshot.timestamp)}.</h1>
                    <div className='min-w-full flex xs:flex-wrap space-x-4'>
                        {snapshot.tracks && <HistoryStats list={snapshot.tracks} listType="top tracks"/>}
                        {snapshot.artists && <HistoryStats list={snapshot.artists} listType="top artists"/>}
                        {snapshot.recentlyPlayed && <HistoryStats list={snapshot.recentlyPlayed} listType="recently played"/>}
                    </div>
                </div>
            )}
        </>
    )
}
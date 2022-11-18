import './App.css';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { usersRef } from './Database/Firebase';


function App() {

  const [allUser, isLoadingAllUser, isErrorAllUser] = useCollectionData(usersRef, {
    idField: 'id',
  });

  return (
    <div className="App">
      {allUser ? <pre>{JSON.stringify(allUser)}</pre> : <p>No Data</p>}
    </div>
  );
}

export default App;

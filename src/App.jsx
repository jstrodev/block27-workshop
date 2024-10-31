import { useState } from 'react';
import SignUpForm from './components/SignUpForm';
import Authenticate from './components/Authenticate';

function App() {
  const [token, setToken] = useState(null);

  return (
    <>       
      <SignUpForm />   
      <Authenticate token={token} setToken={setToken} />  
    </>
  );
}

export default App;


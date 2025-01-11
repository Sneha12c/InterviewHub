import './App.css'
import Approute from './routes/Approutes.jsx';
import { UserProvider } from './context/user.context.jsx';

function App() {
  
  return (
      <UserProvider>
        <Approute/>
      </UserProvider>
  )
}

export default App

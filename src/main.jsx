import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster 
        position='top-right'
      />
    </Provider>
  </StrictMode>,
)

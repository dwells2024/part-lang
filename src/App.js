import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import Settings from './components/Settings';
import Generator from './components/Generator';
import Profile from './components/Profile';
import { ROUTES } from './utils/routes';
import { loadData } from './utils/localStorage';

function App() {
  const [page, setPage] = useState();
  const [openAIKey, setOpenAIKey] = useState("test");

  useEffect(() => {
    const fetchLocalData = async () => {
      const fetchAIKey = await loadData("openAIKey");

      setOpenAIKey(fetchAIKey);
    }

    fetchLocalData();
  })

  switch (page) {
    case ROUTES.GENERATOR:
      return <Generator setPage={setPage} openAIKey={openAIKey} />
    case ROUTES.PROFILE:
      return <Profile setPage={setPage} openAIKey={openAIKey} setOpenAIKey={setOpenAIKey} />
    case ROUTES.HOME:
      return <Home setPage={setPage} />
    case ROUTES.SETTINGS:
      return <Settings setPage={setPage} openAIKey={openAIKey} setOpenAIKey={setOpenAIKey} />
    default:
      return <Home setPage={setPage} />
  }
}

export default App;

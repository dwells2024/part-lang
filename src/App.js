import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import Settings from './components/Settings';
import AnalyzeWriting from './components/AnalyzeWriting';
import { ROUTES } from './utils/routes';
import { loadData } from './utils/localStorage';

function App() {
  const [page, setPage] = useState();
  const [openAIKey, setOpenAIKey] = useState();
  const [pageTextContent, setPageTextContent] = useState();

  useEffect(() => {
    const fetchLocalData = async () => {
      const fetchText = await loadData("pageTextContent");
      setPageTextContent(fetchText);

      const fetchAIKey = await loadData("openAIKey");
      setOpenAIKey(fetchAIKey);
    }

    fetchLocalData();
  })

  switch (page) {
    case ROUTES.HOME:
      return <Home setPage={setPage} pageTextContent={pageTextContent} openAIKey={openAIKey} />
    case ROUTES.SETTINGS:
      return <Settings setPage={setPage} openAIKey={openAIKey} setOpenAIKey={setOpenAIKey} />
    case ROUTES.ANLYSWRITING:
      return <AnalyzeWriting openAIKey={openAIKey} setPage={setPage} />
    default:
      return <Home setPage={setPage} pageTextContent={pageTextContent} openAIKey={openAIKey} />
  }
}

export default App;

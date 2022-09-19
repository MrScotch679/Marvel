import { useState } from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/singleComicPage/SingleComicPage"));
const SingleCharacterLayout = lazy(() => import("../pages/singleCharacterPage/SingleCharacterPage"));

const App = () => {
  const [foundChar, setFoundedChar] = useState({});

  const onFoundChar = (char) => {
    setFoundedChar(char);
  };

  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <main>
          <Suspense fallback={<Spinner/>}>
            <Routes>
              <Route path="/" element={<MainPage onFoundChar={onFoundChar}/>}/>
              <Route path="/characters/:characterName" element={<SingleCharacterLayout foundChar={foundChar} />}/>
              <Route path="/comics" element={<ComicsPage/>}/>
              <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
              <Route path="*" element={<Page404/>}/>
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  )
}

export default App;
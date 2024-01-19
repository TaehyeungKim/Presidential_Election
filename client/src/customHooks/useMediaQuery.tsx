
import { useEffect, useState } from 'react';

const UseMediaQuery = (query: string) => {
  const mediaMatch = matchMedia(query);
  const [matches, setMatches] = useState(mediaMatch.matches);
  

  const mediaHandler = (e: MediaQueryListEvent) => setMatches(e.matches);

  const addBrowserResizeListener = () => mediaMatch.addEventListener('change', mediaHandler);

  const removeBrowserResizeListener = () => mediaMatch.removeEventListener('change', mediaHandler);

  useEffect(() => {
    addBrowserResizeListener();
    return () => removeBrowserResizeListener();
  });

  return matches;
};

export default UseMediaQuery;
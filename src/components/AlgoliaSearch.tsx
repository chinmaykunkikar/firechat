import useDemoUser from "@/utils/isDemoUser";
import { AuthContext } from "@contexts/AuthContext";
import algoliasearch from "algoliasearch/lite";
import { useContext } from "react";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import ChatContactPreview from "./ChatContactPreview";

const { VITE_ALGOLIA_APP_ID, VITE_ALGOLIA_API_KEY, VITE_ALGOLIA_INDEX_NAME } =
  import.meta.env;

function EmptyQueryBoundary({ children, fallback }: any) {
  const { indexUiState } = useInstantSearch();

  if (!indexUiState.query) {
    return fallback;
  }

  return children;
}

export default function AlgoliaSearch() {
  const searchClient = algoliasearch(VITE_ALGOLIA_APP_ID, VITE_ALGOLIA_API_KEY);

  const { currentUser }: any = useContext(AuthContext);

  const isDemoUser = useDemoUser();

  return (
    <div className="flex w-full">
      <InstantSearch
        searchClient={searchClient}
        indexName={VITE_ALGOLIA_INDEX_NAME}
      >
        <div>
          <Configure hitsPerPage={1} distinct />
          <SearchBox searchAsYouType={false} />
          <EmptyQueryBoundary fallback={null}>
            <Hits hitComponent={ChatContactPreview} />
          </EmptyQueryBoundary>
        </div>
      </InstantSearch>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { fetchEvents } from "../../util/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import EventItem from "./EventItem";

// 현재 events search는 search가 변경되면 재전송하게 되어 있어서 페이지를 벗어났다가 돌아와도 계속 요청을 하지 않는다.
export default function FindEventSection() {
  const [searchTerm, setSearchTerm] = useState();
  const searchElement = useRef();

  // queryKey를 동적으로 변경함으로써 키가 변경되면 queryFn를 실행시켜 새로운 값을 가져온다.
  // useQuery는 데이터를 가져올때만 사용한다.
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["events", { searchTerm: searchTerm }],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
    enabled: searchTerm !== undefined,
  });
  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let content = <p>Please enter a search term and to find events.</p>;

  if (isFetching) {
    content = <LoadingIndicator />;
  }
  if (isError) {
    content = (
      <ErrorBlock
        title={"an error occured"}
        message={error.info?.message || "Failed to fetch events"}
      />
    );
  }
  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}

import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { fetchEvents } from "../../util/http.js";

export default function NewEventsSection() {
  // useQuery는 query키를 이용해서 로드할때 중복된 키가 있는지 확인하고 캐시를 사용할지 결정한다.
  // queryFn는 프로미스를 반환하는 함수를 받으며 함수의 결과값을 data로 반환한다.
  // staleTime으로 전송주기를 설정하고 gctime으로 가비지 컬렉터 시간을 설정할 수 있다.
  const { data, isLoading, isError, error } = useQuery({
    // { max: 3 }를 통해서 게시 이벤트를 3개만 가져오는 고유키를 만들어준다.
    queryKey: ["events", { max: 3 }],
    // queryFn인자로 queryKey를 받을 수 있는데 이 안에 queryKey의 데이터가 담겨 있기 때문에
    // 객체의 ...queryKey[1] 1번에 접근해서 max: 3을 받아온다.
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
    // queryFn: ({ signal }) => fetchEvents({ signal, max: 3 }),
    staleTime: 5000,
  });
  let content;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
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
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}

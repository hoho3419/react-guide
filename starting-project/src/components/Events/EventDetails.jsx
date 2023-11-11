import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../Header.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEvent, fetchEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const [isModal, setIsModal] = useState(false);
  const { id } = useParams();
  const nav = useNavigate();

  // 실행되는 요청에 대한 캐시는 전부 달라야 하기 때문에 querykey를 따로 설정해줘야 한다.
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: async ({ signal }) => await fetchEvent({ id, signal }),
  });
  // queryClient에 invalidateQueries를 설정하게 되면 전부다 무효화해서 다시 실행되는데
  // refetchType를 하게되면 무효화하지만 첫번째 요청은 보내지 않도록 한다.
  const {
    mutate,
    isLoading: isDeleting,
    isError: isDeletingErr,
    error: deleteErr,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: "events",
        refetchType: "none",
      });
      nav("/events");
    },
  });
  const deleteHanler = () => {
    mutate({ id });
  };
  const startDeleteHandler = () => {
    setIsModal(true);
  };
  const stopDeleteHandler = () => {
    setIsModal(false);
  };
  let content;

  if (isLoading) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetching event data...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title={"Filed to event loading.."}
          message={
            error.info?.message ||
            "Failed to fetch event data, please try again later"
          }
        ></ErrorBlock>
      </div>
    );
  }
  if (data) {
    // const formattedDatae = new Date(data.date).toLocaleDateString("ko",{});

    content = (
      <>
        <header>
          <h1>{data?.title}</h1>
          <nav>
            <button onClick={startDeleteHandler}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`${data.date}${data.time}`}>
                {data.date} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isModal && (
        <Modal onClose={stopDeleteHandler}>
          <h2>정말 삭제?</h2>
          <p>정말 이벤트를 삭제하기 원하냐? 이 작업은 취소할 수 없습니다.</p>
          <div className="form-actions">
            {isDeleting && <p>Deleting, please wait...</p>}
            {!isDeleting && (
              <>
                <button onClick={stopDeleteHandler} className="button-text">
                  Cancel
                </button>
                <button onClick={deleteHanler} className="button">
                  Delete
                </button>
              </>
            )}
            {isDeletingErr && (
              <ErrorBlock
                title={"Failed to event deleting..."}
                message={
                  deleteErr.info?.message ||
                  "Failed to delete event data, please try again later"
                }
              />
            )}
          </div>
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}

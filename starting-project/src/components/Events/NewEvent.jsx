import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation } from "@tanstack/react-query";
import { createNewEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function NewEvent() {
  const navigate = useNavigate();

  //  useMutation는 useQuery처럼 자동으로 요청이 전송되는게 아니기 때문에 mutate을 받아서 직접 언제 실행할지 결정한다.
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['events']})
      navigate("/events");
    },
  });

  function handleSubmit(formData) {
    console.log(formData);
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        <>
          {isLoading ? (
            "Submitting.."
          ) : (
            <>
              <Link to="../" className="button-text">
                Cancel
              </Link>
              <button type="submit" className="button">
                Create
              </button>
            </>
          )}
        </>
      </EventForm>
      {isError && (
        <ErrorBlock
          title={"Failed to create event"}
          message={error.info?.message}
        />
      )}
    </Modal>
  );
}

import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editEvent, fetchEvent, queryClient } from "../../util/http.js";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const submit = useSubmit();
  const { state } = useNavigation();

  // 처음 페이지에 들어올때 로드한 캐시는 전부 다르기 때문에 querykey를 다르게 설정해줘야 한다.
  // staleTime은 데이터가 이전데이터가 10초 보다 이상 지나지 않았으면 재요청을 보내지 않는다.
  const { data, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: async ({ signal }) => await fetchEvent({ id, signal }),
    staleTime: 10000,
  });

  // 낙관적 업데이트를 통해 수정을 요청을 보내는데 백엔드의 응답을 기다리지 않고
  // 프론트에 데이터를 먼저 바뀐뒤 만약 실패한다면 롤백한다.
  const { mutate, data: updateData } = useMutation({
    mutationFn: editEvent,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["events", id],
    //   });
    // },
    onMutate: async (data) => {
      console.log(data);
      // cancelQueries로 해당키에 맞는 쿼리를 중단하고 setQueryData로 데이터를 변경한다.
      await queryClient.cancelQueries({ queryKey: ["events", id] });
      // 낙관적 업데이트를 하면 백엔드에 결과에 상관없이 데이터를 바꾸기 때문에 에러처리를 해줘야한다.
      // 미리 수정하기전에 previousEvent로 이전 데이터를 받아놓고 return 한다.
      const previousEvent = queryClient.getQueryData(["events", id]);
      queryClient.setQueryData(["events", id], data);
      return { previousEvent };
    },
    onError: (error, data, context) => {
      // onMutate에서 return 을 하게 되면 context로 데이터에 접근할 수 있기 때문에 이전 데이터로 다시 수정한다.
      queryClient.setQueryData(["events", id], context.previousEvent);
    },
    onSettled: () => {
      // 마지막으로 요청을 보내거나 에러가 나도 실행하는 구문으로 클라이언트 데이터와 백엔드 데이터가
      // 같을 수 있게 하는 구문이다.
      queryClient.invalidateQueries(["events", id]);
    },
  });
  console.log(updateData);
  function handleSubmit(formData) {
    // action 함수를 실행시키기 위한 전송됐는지 감지할 수 있게하는 리라돔 훅
    // submit(formData, { method: "PUT" });
    mutate({ ...formData, id });
    navigate(`../`);
  }

  function handleClose() {
    navigate("../");
  }
  let content;

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
        <EventForm inputData={data} onSubmit={handleSubmit}>
          {state === "submitting" ? (
            <p>Sending data...</p>
          ) : (
            <>
              <Link to="../" className="button-text">
                Cancel
              </Link>
              <button type="submit" className="button">
                Update
              </button>
            </>
          )}
        </EventForm>
      </>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

// loader 는 해당 페이지에 들어가기전에 미리 요청을 보내고 받은 데이터를 전송할 수 있는 방법이다.
// 이 방법을 사용하게 되면 데이터가 불러와지지않게 되면 페이지에 못들어간다.
export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["events", params.id],
    queryFn: async ({ signal }) => await fetchEvent({ id: params.id, signal }),
  });
}
// action은 현재 컴포넌트가 form을 전송했는지 감지하는 함수
// request는 submit 함수가 전달한 값으로 데이터를 추출한다음 데이터를 전송한다.
export async function action({ request, params }) {
  const formData = await request.formData();
  console.log(request);
  console.log(formData);
  const updatedEventData = Object.fromEntries(formData);
  await editEvent({ id: params.id, ...updatedEventData });
  await queryClient.invalidateQueries();
  return redirect("../");
}

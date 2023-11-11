import { useState } from "react";

import ImagePicker from "../ImagePicker.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchSelectableImages } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EventForm({ inputData, onSubmit, children }) {
  const [selectedImage, setSelectedImage] = useState(inputData?.image);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events-images"],
    queryFn: fetchSelectableImages,
  });

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // event.target으로 form안에 있는 정보들을 new FormData를 이용해 새로운 객체를 만들면서 전부 수집한다
    // formData 객체로 데이터를 모은 것들을 Object.fromEntries를 사용해서 자바스크립트 객체로 변환한다.
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    // for (const obj of formData.entries()) { console.log(obj); } formData.entries() 로 속성들을 뽑으면 key와 value 형식 배열로 출력된다. [key,value]
    // console.log(formData);
    // console.log(event.target);
    // console.log(data);

    onSubmit({ ...data, image: selectedImage });
  }

  return (
    <form id="event-form" onSubmit={handleSubmit}>
      <p className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={inputData?.title ?? ""}
        />
      </p>
      {isLoading && <p>Loading Selectable images...</p>}
      {isError && (
        <ErrorBlock
          title={"Failed to events images.."}
          message={error.info?.message}
        />
      )}
      {data && (
        <div className="control">
          <ImagePicker
            images={data}
            onSelect={handleSelectImage}
            selectedImage={selectedImage}
          />
        </div>
      )}

      <p className="control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? ""}
        />
      </p>

      <div className="controls-row">
        <p className="control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={inputData?.date ?? ""}
          />
        </p>

        <p className="control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            defaultValue={inputData?.time ?? ""}
          />
        </p>
      </div>

      <p className="control">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={inputData?.location ?? ""}
        />
      </p>

      <p className="form-actions">{children}</p>
    </form>
  );
}

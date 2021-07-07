import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "./postsSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export const CreatePost = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const [uploadedAsset, setUploadedAsset] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.user.currentUser);
  const status = useSelector((state) => state.posts.addStatus);
  const error = useSelector((state) => state.posts.error);

  const createPost = async (e) => {
    try {
      e.preventDefault();
      const resultAction = await dispatch(
        addPost({
          text,
          token,
          asset: uploadedAsset ? uploadedAsset.secure_url : undefined,
        })
      );
      unwrapResult(resultAction);
      setText("");
      setUploadedAsset(null);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dmbkyiuvw",
        uploadPreset: "dhrutham",
        cropping: true,
        multiple: false,
        maxVideoFileSize: 5000000,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setUploadedAsset(result.info);
        }
      }
    );
  };
  return (
    <section className=" create-post flex-horizontal gray-border margin-top bg-white">
      <div className="img-margin">
        <img
          className="round-img img-size-small"
          src={currentUser.photoUrl}
          alt="profile-pic"
        />
      </div>
      <div className="full-width ">
        <form onSubmit={createPost} className="flex-column">
          <textarea
            className="post-text-area"
            placeholder="Share your thoughts"
            onChange={(e) => setText(e.target.value)}
            value={text}
          ></textarea>

          <div className="margin-top ">
            <button
              type="button"
              className="icon-btn full-height text-gray cursor-pointer"
              onClick={uploadImage}
            >
              <span class="material-icons-outlined icon-size-30">
                insert_photo
              </span>
            </button>
            <button
              className="btn btn-primary-contained post-btn"
              disabled={text.length === 0 || status === "loading"}
              type="submit"
            >
              POST
            </button>
          </div>
        </form>
        {uploadedAsset && (
          <img src={uploadedAsset?.thumbnail_url} alt="uploaded" />
        )}
      </div>

      {/* <div className="flex-horizontal">{status === "failed" && error}</div> */}
    </section>
  );
};

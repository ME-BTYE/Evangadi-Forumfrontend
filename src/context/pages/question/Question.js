import React, { useContext, useEffect, useState } from "react";
import "./Question.css";
// import LandingPage from "../LandingPage/LandingPage";
// import Header from "../Header/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

function Question() {
  const [form, setForm] = useState({});
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);

  //importing global state from context
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // console.log("ask question>>> form data is being registered");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("ask question>>> -1");
    setForm(() => {
      return { ...form, userId: userData.user.id };
    });
    // console.log("[[[[[[[[[ Values to be post ", userData.user?.id);
    // console.log(
    //   "[[[[[[[[[ Values to be post ",
    //   form.title,
    //   form.description,
    //   userData.user.id
    // );

    try {
      // console.log("ask question>>> 0");
      console.log(form);

      //sending data to be registered in database
      await axios.post(`${process.env.REACT_APP_base_url}/api/questions/`, {
        question: form.title,
        description: form.description,
        user_id: userData.user.id,
      });
      // console.log("ask question>>> 1");

      //navigate to homepage once the question is posted
      navigate("/");
      // console.log("ask question>>> 2");
    } catch (error) {
      console.log("problem ==>", error.response.data.msg);
      console.log("oops>>>...watchout");
    }
  };

  // document.getElementById("email").value = userData.user?.display_name;
  return (
    <div className="container">
      <div className="askcover">
        <div className="askcover__steps">
          <h3 className="font-semibold m-4">Steps to Write a good question</h3>
          <ul className="m-4">
            <li>1.Summarize in a one-line title</li>
            <li>2.Describe in more detail</li>
            <li>3.Describe what you expect to happen</li>
            <li>4.Review your question and post</li>
          </ul>
        </div>
        <div className="askcover_question">
          <div className="askcover_ask">
            <h3>Ask question</h3>
            <Link to="/" className="text-xs">
              Go to question page
            </Link>
          </div>
          <div className="askcover__input">
            <div className="form_container">
              <form onSubmit={handleSubmit} action="submit">
                <input
                  name="title"
                  type="text"
                  className="askcover__qtitle p-3 mb-1"
                  placeholder="Title"
                  onChange={handleChange}
                />
                <br />
                <textarea
                  className="p-3"
                  name="description"
                  placeholder="Question Description"
                  onChange={handleChange}
                  style={{
                    border: "1px solid rgb(191, 191, 191)",
                    borderRadius: "5px ",
                    width: "93%",
                    resize: "none",
                    height: "150px",
                  }}
                ></textarea>
                <button className="btnpost">Post Your Question</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Question;

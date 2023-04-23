import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import FormTextInput from "../../components/FormTextInput";
import FormRadio from "../../components/FormRadio";
import FormTextArea from "../../components/FormTextArea";
import SubmitButton from "../../components/SubmitButton";
import LinkButton from "../../components/LinkButton";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import PageHeading from "../../components/PageHeading";
import jwt_decode from "jwt-decode";

const CHECKIN_URL = "/checkin";

const WorkLifeBalance = () => {
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [other, setOther] = useState(true);
  const radioRef = useRef();
  const { auth } = useAuth();

  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const username = decoded?.UserInfo.username || [];

  function enableOther() {
    setOther(false);
    setTimeout(() => {
      radioRef.current.focus();
    }, 0);
  }
  function disableOther() {
    setOther(true);
  }

  useEffect(() => {
    document.title = "GeoCave - Check In";
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    payload.user = username;
    console.log(JSON.stringify(payload));

    try {
      const response = await axios.post(CHECKIN_URL, JSON.stringify(payload), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        withCredentials: true,
      });
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        console.log(err.response.data);
        setErrMsg(`Submission Failed. ${err.response.data.message}`);
      }
    }
  }
  return (
    <>
      {success ? (
        <div className="flex flex-col items-center h-full justify-center">
          <h1 className="animate-fadeIn text-2xl text-green-500 font-medium">
            Check in form successfully submitted!
          </h1>
          <div className="flex flex-col md:flex-row p-6 gap-4">
            <LinkButton path={"dash"} name={"Dashboard"} />
            <LinkButton
              path={"dash/checkin"}
              name={"Back to form"}
              onClick={() => setSuccess(false)}
            />
          </div>
        </div>
      ) : (
        <div className="animate-fadeIn" id="scroller">
          <PageHeading heading={"Work/Life Balance Check In"} />

          <form
            onSubmit={handleSubmit}
            className="border-2 border-primary md:w-3/4 xl:w-1/2 m-auto rounded-lg p-6"
          >
            <p className="p-2">
              Please complete the form below. <br />
              Tell us about your current workload and how you are feeling.
            </p>
            <div className="flex flex-col p-3 gap-2">
              <label
                htmlFor="weeksOutForFieldWorkNonLocal"
                className="text-left italic text-neutral-200 font-bold"
              >
                How many weeks have you been out for field work? (Non Local)
              </label>

              <select
                name="weeksOutForFieldWorkNonLocal"
                className="rounded bg-primary cursor-pointer"
                required
              >
                <option value="">Please select</option>
                <option name="1 Week">1 Week</option>
                <option name="2 Weeks">2 Weeks</option>
                <option name="3 Weeks">3 Weeks</option>
                <option name="4+ Weeks">4+ Weeks</option>
                <option name="N/A">N/A</option>
              </select>
            </div>
            <div className="flex flex-col p-3 gap-2">
              <label
                htmlFor="hoursLastWeek"
                className="text-left italic text-neutral-200 font-bold"
              >
                How many hours did you work last week?
              </label>

              <select name="hoursLastWeek" className="rounded bg-primary cursor-pointer" required>
                <option value="">Please select</option>
                <option name="Less than 30">Less than 30</option>
                <option name="30 to 35">30 to 35</option>
                <option name="36 to 40">36 to 40</option>
                <option name="41 to 45">41 to 45</option>
                <option name="46 to 50">46 to 50</option>
                <option name="51 to 55">51 to 55</option>
                <option name="56+">56+</option>
                <option name="N/A">N/A Took days off</option>
              </select>
            </div>
            <div className="flex flex-col p-3 gap-2">
              <label
                htmlFor="hoursThisWeek"
                className="text-left italic  text-neutral-200 font-bold"
              >
                About how many hours will you have by the end of this week?
              </label>

              <select name="hoursThisWeek" className="rounded bg-primary cursor-pointer" required>
                <option value="">Please select</option>
                <option name="Less than 30">Less than 30</option>
                <option name="30 to 35">30 to 35</option>
                <option name="36 to 40">36 to 40</option>
                <option name="41 to 45">41 to 45</option>
                <option name="46 to 50">46 to 50</option>
                <option name="51 to 55">51 to 55</option>
                <option name="56+">56+</option>
                <option name="N/A">N/A Took days off</option>
              </select>
            </div>
            <div className="flex flex-col items-start p-3 gap-1">
              <label htmlFor="happyHours" className="text-left italic text-neutral-200 font-bold">
                Are you happy with the number of hours you are working?
              </label>
              <FormRadio title={"Yes"} group={"happyHours"} />
              <FormRadio title={"No, It's less than what I want"} group={"happyHours"} />
              <FormRadio title={"No, It's more than what I want"} group={"happyHours"} />
            </div>
            <div className="flex flex-col items-start p-3 gap-1">
              <label htmlFor="needBreak" className="text-left italic text-neutral-200 font-bold">
                Would you like a break and switch off between field, office, or lab work?
              </label>
              <FormRadio title={"No, I'm fine"} group={"needBreak"} />
              <FormRadio title={"Yes, I want to switch off next week"} group={"needBreak"} />
              <FormRadio title={"Yes, in a couple of weeks"} group={"needBreak"} />
              <FormRadio title={"N/A"} group={"needBreak"} />
            </div>

            <div className="flex flex-col items-start p-3 gap-1">
              <label
                htmlFor="currentWorkload"
                className="text-left italic text-neutral-200 font-bold"
              >
                How are you feeling about your current workload?
              </label>
              <FormRadio title={"Good"} group={"currentWorkload"} onClick={disableOther} />
              <FormRadio
                title={"Busy, but doing okay"}
                group={"currentWorkload"}
                onClick={disableOther}
              />
              <FormRadio
                title={"Too much is going on, I need a breather or more help"}
                group={"currentWorkload"}
                onClick={disableOther}
              />
              <div className="text-left">
                <label>
                  <input
                    type="radio"
                    value="Other"
                    name="currentWorkload"
                    className="bg-secondary"
                    required
                    onChange={enableOther}
                  />
                  <span className="p-2">Other</span>
                  <input
                    className="rounded-md pt-0 pb-0 mt-2 md:mt-0 text-secondary bg-black outline-none ring-1"
                    type="text"
                    name="currentWorkload"
                    placeholder="Current workload"
                    autoComplete="off"
                    disabled={other}
                    ref={radioRef}
                    required
                  />
                </label>
              </div>
            </div>
            <FormTextArea
              label={
                "Are there any issues, suggestions, or needs (supplies, equipment, etc.) you'd like to discuss?"
              }
              payloadName={"summary"}
              placeholder={"Tell us more or you can type in no or N/A"}
            />
            <SubmitButton />
            <div className="relative">
              <p
                className={
                  errMsg
                    ? "animate-fadeIn rounded-lg absolute top-full w-4/5 md:w-full bg-red-500 left-1/2 -translate-x-1/2"
                    : "absolute left-full"
                }
                aria-live="assertive"
              >
                {errMsg}
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default WorkLifeBalance;

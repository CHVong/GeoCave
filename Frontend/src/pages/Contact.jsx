import { useState, useEffect } from "react";
import PageHeading from "../components/PageHeading";
import SubmitButton from "../components/SubmitButton";
import LinkButton from "../components/LinkButton";
import mountainbgIcon from "../assets/images/mountainbgfavicon2.svg";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSubmitted(null);
      setErrorMessage("");
    }, 7500);

    return () => clearTimeout(timer);
  }, [submitted]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);

    fetch(event.target.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Thanks for your submission!");
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
          setErrorMessage(
            "Your message has been successfully submitted. Thanks for contacting us!"
          );
          setSubmitted(true);
        } else {
          response.json().then((data) => {
            setSubmitted(false);
            setErrorMessage("There was an issue submitting your message, please try again!");
            if (Object.hasOwn(data, "errors")) {
              console.log(data["errors"].map((error) => error["message"]).join(", "));
            } else {
              console.log(data, "Oops! There was a problem submitting your form");
            }
          });
        }
      })
      .catch((error) => {
        console.log(error, "Oops! There was a problem submitting your form");
        setErrorMessage("There was an issue submitting your message, please try again!");
        setSubmitted(false);
      });
  };

  return (
    <div className="animate-fadeIn p-4">
      <img
        src={mountainbgIcon}
        alt="SVG image of a mountain top"
        className="w-14 p-2 cursor-pointer hoverScale hover:bg-primary rounded-lg m-auto mb-4"
        onClick={() => {
          navigate("/dash");
          handleLinkClick();
        }}
      />
      <form
        className="flex flex-col md:w-1/2 xl:w-1/3 m-auto gap-2 border-2 border-primary rounded-lg p-4 relative"
        onSubmit={handleSubmit}
        action="https://formspree.io/f/xrgvvglj"
        method="POST"
      >
        <p
          className={`transition animate-fadeIn rounded-lg absolute w-4/5 md:w-w-11/12 left-1/2 -translate-x-1/2 ${
            submitted === false
              ? "bg-red-600 block animate-fadeOut"
              : submitted === true
              ? "bg-green-700 block animate-fadeOut"
              : "hidden"
          }`}
          aria-live="assertive"
        >
          {errorMessage}
        </p>

        <PageHeading heading={"Contact Us!"} />
        <label htmlFor="name" className="text-left italic">
          Name *
        </label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          placeholder="Enter your name"
          required
          className={`rounded px-8 py-2 bg-black outline-none ring-1`}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="email" className="text-left italic">
          Email *
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="off"
          placeholder="Enter your email"
          required
          className={`rounded px-8 py-2 bg-black outline-none ring-1`}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="subject" className="text-left italic">
          Subject *
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          autoComplete="off"
          placeholder="Enter your subject"
          required
          className={`rounded px-8 py-2 bg-black outline-none ring-1`}
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        />
        <label htmlFor="message" className="text-left italic">
          Message *
        </label>
        <textarea
          rows={5}
          type="textarea"
          name="message"
          id="message"
          autoComplete="off"
          placeholder="Enter your message here..."
          required
          className={`rounded px-8 py-2 bg-black outline-none ring-1`}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <div className="w-full flex flex-col lg:flex-row items-center justify-center">
          <SubmitButton />
          <div className="p-2">
            <LinkButton path={""} name={"Back"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;

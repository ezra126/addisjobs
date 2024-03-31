import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import background from "../assets/background.webp";
import jobseeker from "../assets/Addis-Jobs-about.jpg";
import hiring from "../assets/hiring-ethiopia-jobs-in-addis-ababa.jpg";
import Footer from "../components/Footer";

function AboutPage() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault(); // prevents the page from reloading when you hit “Send”

    emailjs
      .sendForm(
        "service_blwxflg",
        "template_pq2qx08",
        form.current,
        "n89p8vV_iYRStx1d4"
      )
      .then(
        (result) => {
          alert("message sent");
        },
        (error) => {
          alert("error");
          console.log("ero" + error.text);
          // show the user an error
        }
      );
  };
  return (
    <>
      <div className="pt-16 flex flex-col pb-20">
        <div id="bg-image" className="relative shadow-xl">
          <img src={background} style={{ maxHeight: 300, width: "100%" }}></img>
          <h1 className="absolute text-white top-24 xl:top-40 md:px-40 w:2/3 sm:w-1/2 px-14 text-2xl sm:text:3xl md:text-4xl  font-semibold  w-30vw ">
            About us
          </h1>
        </div>
        <div className="flex flex-col gap-2 pt-10 md:w-2/3 px-2 mx-auto text-center">
          <h1 className="text-3xl font-bold">Reach the Right Candidates</h1>
          <p className="text-md">
            AddisJobs is a popular Ethiopian Job search website. With over a
            Million combined social media followers and regular website visitors
            we reach thousands of job seekers and candidates every day. Our
            mission is to bridge the gap between job seekers and employers,
            facilitating connections that lead to successful careers and
            organizational growth. We aim to provide a user-friendly and
            efficient platform that simplifies the job search process and
            empowers both job seekers and employers to make informed decisions.
          </p>
        </div>

        <div className="flex md:flex-row flex-col md:px-40 px-5  mt-10 text-center gap-5">
          <img src={jobseeker} style={{ maxHeight: 250 }}></img>
          <div className="flex flex-col gap-3 pt-10">
            <h1 className="text-3xl font-bold">For Job Seekers</h1>
            <p className="text-md text-start">
              AddisJobs.net offers a comprehensive database of job vacancies in
              various industries and sectors. Our intuitive search and filtering
              options enable you to narrow down your job preferences, allowing
              you to find the perfect fit for your skills, experience, and
              aspirations. We strive to bring you the latest and most relevant
              job opportunities, ensuring that you have access to a diverse
              range of career prospects. In addition to job listings, we provide
              resources and guidance to help you enhance your employability. Our
              blog features insightful articles, tips, and expert advice on
              various aspects of the job search process, including resume
              writing, interview preparation, and career development.
            </p>
          </div>
        </div>

        <div className="flex md:flex-row flex-col md:px-40 px-5  mt-10 text-center gap-5">
          <div className="flex flex-col gap-3 pt-10">
            <h1 className="text-3xl font-bold">For Employers</h1>
            <p className="text-md text-start">
              AddisJobs.net offers a platform to reach a wide pool of qualified
              candidates. Our job posting services allow you to showcase your
              company and job vacancies to a targeted audience of job seekers
              actively looking for opportunities. We provide you with the tools
              and features necessary to manage and track your job postings,
              ensuring a seamless hiring process. We understand that finding the
              right talent is crucial to the success of your organization. That
              is why we strive to connect you with qualified and motivated
              individuals who align with your company’s values and goals. Our
              aim is to facilitate productive and long-term partnerships between
              employers and employees, fostering a positive and thriving work
              environment.
            </p>
          </div>
          <img src={hiring} style={{ maxHeight: 250 }}></img>
        </div>

        <div className="flex flex-col md:w-1/2 w-full px-5 mx-auto mt-10 gap-1">
          <div className="text-center text-3xl font-bold">Contact Us</div>
          <form ref={form} onSubmit={sendEmail}>
            <div className="flex flex-col pb-5">
              <label>Name</label>
              <input type="text" className="p-2" name="user_name" />
            </div>

            <div className="flex flex-col pb-5">
              <label>Email</label>
              <input type="email" className="p-2" name="user_email" />
            </div>

            <div className="flex flex-col pb-5">
              <label>Message</label>
              <textarea name="message" className="h-20 overflow-auto" />
            </div>

            <button className="text-white bg-black py-2 px-3 mx-auto w-full">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;

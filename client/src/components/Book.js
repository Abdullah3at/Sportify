import Calendar from "react-calendar";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { NavLink, Navigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Confirmation from "./Confirmation";

const Book = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isCalender, setIsCalender] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [nameday, setNameDay] = useState("");
  // const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();
  const email = user.email;
  const [details, setDetails] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`./${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleDateChange = (date) => {
    setDate(date);
    setSelectedDate(date.toLocaleDateString());
    setIsCalender(false);
  };

  const handleCalender = () => {
    setIsCalender(true);
  };

  const minDate = new Date();
  console.log(selectedDate);

  const handleTime = () => {
    if (selectedDate && details) {
      const day = new Date(selectedDate);
      // const dayOne = day.getDay();
      const dayName = day
        .toLocaleString("en-us", { weekday: "long" })
        .slice(0, 3)
        .toLowerCase();
      const tap = details.schedule[dayName];
      setSelectedTime("");
      setAvailableTimes(tap);
      setNameDay(dayName);
      console.log(tap);
      // console.log(day);
      // console.log(dayOne);
      // console.log(dayName);
      // console.log(details);
    }
  };
  console.log(selectedTime);
  console.log(selectedTime);
  console.log(availableTimes);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmited(true);
    console.log(selectedTime);
    console.log(selectedTime.indexOf("m"));
    const mLetter = selectedTime.indexOf("m") + 1;
    const startTime = selectedTime.slice(0, mLetter);
    console.log(selectedTime.slice(0, mLetter));
    const data = {
      // date: availableTimes,
      time: startTime,
      id: id,
      day: nameday,
      name: e.target.elements.name.value,
      email: email,
    };
    fetch("/add-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("called");
        console.log("data", data);
      })
      .catch((error) => {
        console.error("There was a problem", error);
      });
  };

  // const index = availableTimes.findIndex(
  //   (obj) => obj.startTime + " To " + obj.endTime === selectedTime
  // );

  // const findObj = availableTimes.find((obj) => obj.startTime === selectedTime);

  let thankYouMessage = null;
  if (isSubmited) {
    thankYouMessage = <Confirmation />;
  }

  return (
    <div>
      {thankYouMessage}
      {!isSubmited && (
        <Form onSubmit={handleSubmit}>
          <FormItem>
            <label>Selected Date:</label>
            <input
              type="text"
              id="date"
              onClick={handleCalender}
              value={selectedDate}
              required
            />
          </FormItem>
          <FormItem>
            <label>Selected Time:</label>
            <Select
              value={selectedTime}
              onChange={(event) => setSelectedTime(event.target.value)}
              onClick={handleTime}
              required
            >
              {availableTimes?.map((timeObj) => {
                const timeAvailable = timeObj.isAvailable;
                console.log(`time obj ${JSON.stringify(availableTimes)}`);
                return (
                  <option disabled={!timeAvailable}>
                    {timeObj.startTime} To {timeObj.endTime}
                  </option>
                );
              })}
            </Select>
          </FormItem>
          <FormItem>
            <label>Name:</label>
            <input type="text" placeholder="Abc" name="name" required />
          </FormItem>
          <FormItem>
            <label>Email:</label>
            <input type="email" name="email" value={email} readOnly />
          </FormItem>
          <Submit type="submit">Submit</Submit>
        </Form>
      )}
      {isCalender && (
        <CalendarContainer>
          <CalendarCustom onChange={handleDateChange} minDate={minDate} />
        </CalendarContainer>
      )}
    </div>
  );
};

const Submit = styled.button`
  background-color: white;
  color: darkgreen;
  padding: 10px 50px;
  margin-top: 30px;
  margin-left: 10px;
  border: 1px solid darkgreen;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  font-family: "Trebuchet MS";
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkgreen;
    color: white;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 5 5px #666;
  }
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Select = styled.select`
  font-size: 1.2rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;

  align-items: center;
  margin-top: 2rem;
  label {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  input {
    font-size: 1.2rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    max-width: 300px;
  }
`;

const CalendarCustom = styled(Calendar)`
  max-width: 500px;
  background-color: #ffffff;
  border: none;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;
`;
const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;
export default Book;

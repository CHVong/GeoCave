import React, { useState, useEffect } from "react";
import moment from "moment";

function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>{moment(time).format("dddd - MMM DD, YYYY - h:mm A")}</p>
    </div>
  );
}

export default CurrentTime;

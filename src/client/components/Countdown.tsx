import React, {
   FC,
   useEffect,
   useState,
   Component,
   PropsWithChildren,
} from 'react';

import { Countdown } from 'react-daisyui';

interface OwnProps {
   start: boolean;
   duration: number;
   timeout?: (val) => unknown;
}

const CountDownExam: FC<PropsWithChildren<OwnProps>> = ({
   start,
   duration,
   timeout,
}) => {
   const [hoursTime, setHoursTime] = useState(0);
   const [minutesTime, setMinutesTime] = useState(0);
   const [secondsTime, setSecondsTime] = useState(0);

   useEffect(() => {
      if (start) {
         countDownTimer();
      }
   }, []);

   let myTimer;
   const countDownTimer = () => {
      myTimer = setInterval(myClock, 1000);
      // let c = 3610; //Initially set to 1 hour
      let c = duration;
      const initMinute = ((c - (c % 60)) / 60) % 60;
      setMinutesTime(initMinute);
      setHoursTime(((c - (c % 60)) / 60 - initMinute) / 60);

      function myClock() {
         --c;
         const seconds = c % 60; // Seconds that cannot be written in minutes
         const secondsInMinutes = (c - seconds) / 60; // Gives the seconds that COULD be given in minutes
         const minutes = secondsInMinutes % 60; // Minutes that cannot be written in hours
         const hours = (secondsInMinutes - minutes) / 60;
         // Now in hours, minutes and seconds, you have the time you need.
         // console.clear();
         // console.log(hours + ':' + minutes + ':' + seconds);
         setSecondsTime(seconds);
         if (seconds == 59) {
            setMinutesTime(minutes);
         }
         if (minutes == 59) {
            setHoursTime(hours);
         }
         if (c == 0) {
            clearInterval(myTimer);
            timeout('time is up');
         }
      }
   };

   return (
      <div className="grid auto-cols-max grid-flow-col gap-5 text-center">
         <div className="rounded-box flex flex-col bg-rose-700 p-2 text-neutral-content">
            <Countdown className="font-mono text-5xl" value={hoursTime} />
            hours
         </div>
         <div className="rounded-box flex flex-col bg-rose-700 p-2 text-neutral-content">
            <Countdown className="font-mono text-5xl" value={minutesTime} />
            min
         </div>
         <div className="rounded-box flex flex-col bg-rose-700 p-2 text-neutral-content">
            <Countdown className="font-mono text-5xl" value={secondsTime} />
            sec
         </div>
      </div>
   );
};

export default CountDownExam;

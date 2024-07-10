export const dateFormatMonth = (dateString) => {
     const arr = dateString.split('-');
     let month;
     let day;

     switch(arr[1]){
          case '1', '01':
               month = "January";
               break;
          case '2', '02':
               month = "February";
               break;
          case '3', '03': 
               month = "March";
               break;
          case '4', '04': 
               month = "April";
               break;
          case '5', '05': 
               month = "May";
               break;
          case '6', '06': 
               month = "June";
               break;
          case '7', '07':
               month = "July";
               break;
          case '8', '08':
               month = "August";
               break;
          case '9', '09':
               month = 'September';
               break;
          case '10':
               month = 'October';
               break;
          case '11':
               month = 'November';
               break;
          case '12':
               month = 'December';
               break;
          default: 
               month = "";
     }

     switch(arr[2]){
          case "01", '1', "21", "31":
               day = `${arr[2]}st`;
               break;
          case "02", '2', "22":
               day = `${arr[2]}nd`;
               break;
          case "03", '3', '23':
               day = `${arr[2]}rd`;
               break;
          default:
               day = `${arr[2]}th`;

     }

     return `${day} ${month} ${arr[0]}`;
}

// export const formatTimeAgo = (dateString) => {
//      const currentDate = new Date();
//      const providedDate = new Date(dateString);

//      const timeDifference = Math.abs(currentDate - providedDate);
//      const seconds = Math.floor(timeDifference / 1000);
//      const minutes = Math.floor(seconds / 60);
//      const hours = Math.floor(minutes / 60);
//      const days = Math.floor(hours / 24);
//      const months = Math.floor(days / 30);
//      const years = Math.floor(days / 365);

//      if (seconds < 60) {
//      return seconds === 1 ? 'a second ago' : `${seconds} seconds ago`;
//      } else if (minutes < 60) {
//      return minutes === 1 ? 'a minute ago' : `${minutes} minutes ago`;
//      } else if (hours < 24) {
//      return hours === 1 ? 'an hour ago' : `${hours} hours ago`;
//      } else if (days < 30) {
//      return days === 1 ? 'a day ago' : `${days} days ago`;
//      } else if (months < 12) {
//      return months === 1 ? 'a month ago' : `${months} months ago`;
//      } else {
//      return years === 1 ? 'a year ago' : `${years} years ago`;
//      }
// }

export const formatTimeAgo = (dateString) => {
     // Convert the provided date string from Rwandan time to local time
     const providedDateRwanda = new Date(dateString);
     const rwandaOffset = providedDateRwanda.getTimezoneOffset() * 60000; // Offset in milliseconds
     const providedDateLocal = new Date(providedDateRwanda - rwandaOffset);

     // Get the current date in the user's local time
     const currentDate = new Date();

     // Calculate the time difference in milliseconds
     const timeDifference = Math.abs(currentDate - providedDateLocal);

     // Convert milliseconds to different units
     const seconds = Math.floor(timeDifference / 1000);
     const minutes = Math.floor(seconds / 60);
     const hours = Math.floor(minutes / 60);
     const days = Math.floor(hours / 24);
     const months = Math.floor(days / 30);
     const years = Math.floor(days / 365);

     // Determine the appropriate time unit to display
     if (seconds < 60) {
          return seconds === 1 ? 'a second ago' : `${seconds} seconds ago`;
     } else if (minutes < 60) {
          return minutes === 1 ? 'a minute ago' : `${minutes} minutes ago`;
     } else if (hours < 24) {
          return hours === 1 ? 'an hour ago' : `${hours} hours ago`;
     } else if (days < 30) {
          return days === 1 ? 'a day ago' : `${days} days ago`;
     } else if (months < 12) {
          return months === 1 ? 'a month ago' : `${months} months ago`;
     } else {
          return years === 1 ? 'a year ago' : `${years} years ago`;
     }
}

export const getTimeNow = () => {
     const dateInRwanda = new Date().toLocaleString("en-US", {timeZone: "Africa/Kigali"});
     const formattedDate = new Date(dateInRwanda).toISOString().slice(0, 19).replace('T', ' ');
     return formattedDate;
}

export const getDateToday = () => {
     const dateInRwanda = new Date().toLocaleString("en-US", { timeZone: "Africa/Kigali" });
     const formattedDate = new Date(dateInRwanda).toISOString().slice(0, 10);
     return formattedDate;
}

export const getRwandaTime = () => {
     const dateInRwanda = new Date().toLocaleString("en-US", {timeZone: "Africa/Kigali"});
     const formattedDate = new Date(dateInRwanda).toISOString().slice(0, 19).replace('T', ' ');
     return formattedDate;
}

export const getTimeNowV2 = () => {
     // Use Date() to get the current date and time as a string
     const currentDateStr = Date();
     
     // Split the date string into its components
     const parts = currentDateStr.split(' ');
     const monthMap = {
          'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
          'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
          'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
     };
     
     const year = parts[3];
     const month = monthMap[parts[1]];
     const day = parts[2];
     const time = parts[4];
 
     // Format the date string as "YYYY-MM-DD HH:MM:SS"
     const formattedDate = `${year}-${month}-${day} ${time}`;
     
     return formattedDate;
 }

export const getNewToday = (arr, dateKey) => {
     if(arr && arr[0]){
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          return arr.filter(item => {
               const itemDate = new Date(item[dateKey]);
               itemDate.setHours(0, 0, 0, 0);
               return itemDate.getTime() === today.getTime();
          }).length;
     }else{
          return 0
     }
}

export const isNewToday = (dateStr) => {
     const today = new Date();
     today.setHours(0,0,0,0);
     const itemDate = new Date(dateStr);
     itemDate.setHours(0,0,0,0);
     return itemDate.getTime() === today.getTime();
}

export const getAddedToday = (items, dateKey) => {
     if(items && items[0]){
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          return items.filter(item => {
               const itemDate = new Date(item[dateKey]);
               itemDate.setHours(0, 0, 0, 0);
               return itemDate.getTime() === today.getTime();
          });
     }else{
          return []
     }
}

export const getAddedThisWeek = (items, dateKey) => {
     if (items && items.length > 0) {
         const today = new Date();
         const dayOfWeek = today.getDay(); // Get the current day of the week (0 = Sunday, 6 = Saturday)
         const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when day is Sunday
 
         const startOfWeek = new Date(today.setDate(diff));
         startOfWeek.setHours(0, 0, 0, 0); // Set start of the week to 00:00:00
 
         return items.filter(item => {
             const itemDate = new Date(item[dateKey]);
             itemDate.setHours(0, 0, 0, 0); // Normalize item date to 00:00:00
 
             return itemDate >= startOfWeek && itemDate <= new Date();
         });
     } else {
         return [];
     }
 };

export const getAddedThisMonth = (items, date_key) => {
     if(items && items[0]){
          const now = new Date();
          const currentYear = now.getFullYear();
          const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0'); // Get current month in MM format
          const currentPrefix = `${currentYear}-${currentMonth}`;
          return items.filter(item => {
               const itemDate = new Date(item[date_key]).toISOString().slice(0, 7); // Get YYYY-MM from date
               return itemDate === currentPrefix;
          });
     }else{
          return []
     }
     
}

export const getAddedThisYear = (items, date_key) => {
     if(items && items[0]){
          const currentYear = new Date().getFullYear();
          return items.filter(item => {
               const itemYear = new Date(item[date_key]).getFullYear();
               return itemYear === currentYear;
          });
     }else{
          return []
     }
}

export const extractDateOnly = (dateTimeString) => {
     const date = new Date(dateTimeString);

     // Extract the year, month, and day
     const year = date.getUTCFullYear();
     const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
     const day = String(date.getUTCDate()).padStart(2, '0');

     // Format the date as YYYY-MM-DD
     const formattedDate = `${day} - ${month} - ${year}`;

     return formattedDate;
}

export const isLaterThan = (currentDate, laterDate) => {
     if(!currentDate){
          return true;
     }
     const currDate = new Date(currentDate);
     const lateDate = new Date(laterDate);

     currDate.setHours(0,0,0,0);
     lateDate.setHours(0,0,0,0);

     return lateDate > currDate;
}

export const aggregateByMonth = (data) => {
     const monthlyData = data.reduce((acc, visit) => {
     const date = new Date(visit.v_date);
     const month = date.toLocaleString('default', { month: 'short' });
     const year = date.getFullYear();
     const key = `${month} ${year}`;

     if (!acc[key]) {
          acc[key] = 0;
          }
          acc[key] += 1;
          return acc;
     }, {});

     const labels = Object.keys(monthlyData);
     const counts = Object.values(monthlyData);

     return { labels, counts };
};

export const getDateOnly =(date) => {
     if (date instanceof Date) {
          return date.toISOString().split('T')[0];
     }
     if (typeof date === 'string') {
          return new Date(date).toISOString().split('T')[0];
     }
     return null;
}
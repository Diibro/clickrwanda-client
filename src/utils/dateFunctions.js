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

export const formatTimeAgo = (dateString) => {
     const currentDate = new Date();
     const providedDate = new Date(dateString);

     const timeDifference = currentDate - providedDate;
     const seconds = Math.floor(timeDifference / 1000);
     const minutes = Math.floor(seconds / 60);
     const hours = Math.floor(minutes / 60);
     const days = Math.floor(hours / 24);
     const months = Math.floor(days / 30);
     const years = Math.floor(days / 365);

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
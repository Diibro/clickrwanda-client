export const toggleForms = (state) => {
     if(state){
          setTimeout(() => {
               const formEle = document.getElementById("admin-forms-container");
               if(formEle != null){
                    formEle.style.right = "0%";
               }
          },500);
     }else{
          const formEle = document.getElementById("admin-forms-container");
          if(formEle != null) {
               formEle.style.right = "-100%";
          }
          setTimeout(() => {}, 1000);
     }
}

export const showNotification = () => {
     setTimeout(() => {
               const notification = document.getElementById("admin-notification");
          if(notification != null) {
               notification.style.top = "10px"
               setTimeout(() => {
                    notification.style.top = "-200px"
               }, 2000)
          }
     }, 300)
     
}

export const showMainNotification = (type, message, cb) => {
     setTimeout(() => {
          const notification = document.getElementById("main-notification-card");
          if(notification != null) {
               notification.classList.add(type);
               notification.innerHTML = message;

               notification.style.top = "10px"
               setTimeout(() => {
                    notification.style.top = "-200px"
                    notification.innerHTML = '',
                    notification.classList.remove(type);
               }, 2000)
               cb();
          }
     }, 50)
     
}
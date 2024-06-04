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
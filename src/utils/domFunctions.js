export const getContainerHeight = (containerId, callback) => {
     const container = document.getElementById(containerId);

     if (!container) {
          console.error(`Element with ID ${containerId} not found`);
          return;
     }

     const height = container.offsetHeight;
     callback(height)
};
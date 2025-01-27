export async function fetchWrapper(url, options) {
     try {
          const response = await fetch(url,{ cache: "force-cache",...options}, );

          if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
          }

          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
               return await response.json();
          }
          return null;
     } catch (error) {
          return null;
     }
}
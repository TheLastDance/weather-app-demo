// const getData = async (location) => {
//   const url = "http://localhost:3000/weather?adress=" + location;
//   try {
//     const res = await fetch(url);
//     const json = await res.json();
//     if (json.error) {
//       console.log(json.error);
//     } else {
//       console.log(json);
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

//

const form = document.querySelector('form');
const input = document.querySelector('input');
const searchedLocation = document.querySelector(".location");
const answer = document.querySelector(".answer");

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = "http://localhost:3000/weather?adress=" + input.value;

  searchedLocation.textContent = '';
  answer.textContent = 'Loading...';

  fetch(url).then((res) => {
    res.json().then((json) => {
      if (json.error) {
        answer.innerHTML = json.error;
      } else {
        searchedLocation.textContent = json.location;
        answer.textContent = json.forecast;
      }
    })
  });
})



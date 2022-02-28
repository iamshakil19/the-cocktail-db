//========== displayJuice 
const foundresult = document.getElementById('found-result')
const searchResultHtml = document.getElementById('search-result')

const loadJuice = () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b'
  fetch(url)
    .then(res => res.json())
    .then(data => displayJuice(data.drinks))
}
loadJuice()
const displayJuice = juices => {
  const parent = document.getElementById('parent')
  juices.forEach(juice => {
    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = `
    <div class="card h-100">
        <img src="${juice.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="d-flex align-items-center justify-content-center">
            <div class="card-body">
            <h5 class="card-title">${juice.strDrink}</h5>
        </div>
        <div>
        <button onclick="juiceDetails('${juice.idDrink}')" class="btn btn-outline-warning me-3"">Details</button>
        </div>
            </div>
    </div>
    `
    parent.appendChild(div)

  })
}

//=============== juiceDetails 

const juiceDetails = id => {
  spinner('block')
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  fetch(url)
    .then(res => res.json())
    .then(data => displayjuiceDetails(data.drinks[0]))
}
const displayjuiceDetails = juice => {
  console.log(juice);
  const detailsParent = document.getElementById('details-parent')
  detailsParent.textContent = '';
  const div = document.createElement('div');
  div.classList.add('text-center')
  div.innerHTML = `
  <h2 class="detail-bg-color text-light text-center font mb-3 border border-2 border-danger d-inline-block py-2 px-4 rounded-pill">Details of ${juice.strDrink}</h2>

  <div class="mx-auto row row-cols-1">
  <div class="text-center col-md-6 my-auto"> 
  <img src="${juice.strDrinkThumb}" class="me-1 img-fluid mb-3">
  </div>
      <div class=" text-light text-center text-md-start col-md-6 my-auto font">
      <h2 class="">Name: ${juice.strDrink}</h2>
      <h3 class="">Alcohol: ${juice.strAlcoholic}</h3>
      <h4 class="">Glass: ${juice.strGlass}</h4>
      <h6 class="">Instructions: ${juice.strInstructions.slice(0, 100)}</h6>
      </div>
</div>
`
  detailsParent.appendChild(div)
  spinner('none')
}



//============== searchResult 

// spinner function 
const spinner = displaystyle => {
  document.getElementById('spinner').style.display = displaystyle
}
// const foundSection = document.getElementById('found-section')
const searchResult = () => {
  const error = document.getElementById('error')
  const inputId = document.getElementById('search-input');
  const inputValue = inputId.value;
  if (inputValue == '') {
    error.innerText = 'Please Enter a Juice Name'
    inputId.value = '';
    searchResultHtml.innerHTML = '';
    foundresult.innerHTML = '';
    return
  }
  else if (inputValue < 0) {
    error.innerText = 'Please Enter a Positive Number or Name'
    inputId.value = '';
    searchResultHtml.innerHTML = '';
    foundresult.innerHTML = '';
    return
  }
  else {
    
    // show spinner 
    spinner('block')
    
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
    fetch(url)
      .then(res => res.json())
      .then(data => displaySearchResult(data.drinks))
    document.getElementById('search-input').value = '';
    error.innerHTML = '';
    // foundSection.innerHTML = '';
    foundresult.innerHTML = '';
    searchResultHtml.innerHTML = '';
  }
}

const displaySearchResult = names => {
  if(!names){
    spinner('none')
    error.innerText = 'Oops! Nothing Found ';
    searchResultHtml.innerHTML = '';
    return
  }

  const found = names.length;


  // searchResultHtml.textContent = '';
  foundresult.innerHTML = `
  <h2 class="text-white text-center mb-4"> 
  Found Items: ${found}
  </h2>
  `;
  names.forEach(name => {

    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = `
    <div class="card h-100">
        <img src="${name.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="d-flex align-items-center justify-content-center">
            <div class="card-body">
            <h5 class="card-title">${name.strDrink}</h5>
        </div>
        <div>
        <button onclick="juiceDetails('${name.idDrink}')" class="btn btn-outline-warning me-3"">Details</button>
        </div>
            </div>
    </div>
    `
    
    searchResultHtml.appendChild(div)
    spinner('none')
  })
  
}
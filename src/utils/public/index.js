async function fetchData () {
  const slotInput = document.getElementById('slotInput').value
  const countInput = document.getElementById('countInput').value
  const apiUrl = 'http://localhost:30001/api/drop'
  const jsonData = { slot: slotInput, count: countInput }

  const dropButton = document.querySelector('.fetch-button')
  dropButton.disabled = true

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData)
    })

    if (!response.ok) throw new Error('Network response was not ok')

    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    dropButton.disabled = false
  }
}

async function fetchAndUpdateData () {
  try {
    const response = await fetch('http://localhost:30001/api/data')
    if (!response.ok) throw new Error('Network response was not ok')
    const data = await response.json()
    updateTable(data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

function updateTable (data) {
  const dataTableBody = document.querySelector('#dataTable tbody')
  dataTableBody.innerHTML = ''

  let slot = 0

  data.forEach(item => {
    const row = dataTableBody.insertRow()
    row.insertCell().textContent = slot++
    Object.entries(item).forEach(([key, value]) => {
      const cell = row.insertCell()
      if (key === 'extra') {
        const button = document.createElement('button')
        button.textContent = 'View Details'
        button.classList.add('view-details-button')
        button.addEventListener('click', () => {
          openForm(value)
        })
        cell.appendChild(button)
      } else {
        cell.textContent = value
      }
    })
  })
}

function openForm (extraData) {
  const form = document.getElementById('extraDataForm')
  form.classList.add('visible')
  populateForm(extraData)
}

function closeForm () {
  const form = document.getElementById('extraDataForm')
  form.classList.remove('visible')
  const formContent = document.getElementById('extraDataFormContent')
  formContent.innerHTML = ''
}

function populateForm (extraData) {
  const formContent = document.getElementById('extraDataFormContent')
  formContent.innerHTML = ''

  Object.entries(extraData).forEach(([key, value]) => {
    const keyLabel = document.createElement('label')
    keyLabel.textContent = key + ':'
    keyLabel.style.color = 'black' // this dum thing made text invis... ( dont remove it future me )
    formContent.appendChild(keyLabel)

    const keyValueInput = document.createElement('input')

    keyValueInput.addEventListener('click', (event) => {
      navigator.clipboard.writeText(keyValueInput.getAttribute('value'))
    })

    keyValueInput.setAttribute('type', 'text')
    keyValueInput.setAttribute('value', JSON.stringify(value))
    keyValueInput.setAttribute('readonly', true)
    formContent.appendChild(keyValueInput)

    formContent.appendChild(document.createElement('br'))
  })
}

fetchAndUpdateData()
setInterval(fetchAndUpdateData, 5000)

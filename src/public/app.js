const materialForm = document.getElementById('materialForm');
const nameInput = document.getElementById('name');
const colorInput = document.getElementById('color');
const materialList = document.getElementById('materialList');

// Helper function to create a material list item
function createMaterialItem(material) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
    <span>${material.name}</span>
    <div class="color" style="background-color: ${material.color}"></div>
    <button data-id="${material.id}" class="edit-button">Edit</button>
    <button data-id="${material.id}" class="delete-button">Delete</button>
  `;
    return listItem;
}

// Function to fetch and display materials
async function fetchMaterials() {
    try {
        const response = await axios.get('/api/materials');
        materialList.innerHTML = '';
        response.data.forEach((material) => {
            const listItem = createMaterialItem(material);
            materialList.appendChild(listItem);
        });
    } catch (error) {
        console.error(error);
    }
}

// Function to add a new material
async function addMaterial(event) {
    event.preventDefault();
    const name = nameInput.value;
    const color = colorInput.value;
    if (name && color) {
        try {
            const response = await axios.post('/api/materials', { name, color });
            const material = response.data;
            const listItem = createMaterialItem(material);
            materialList.appendChild(listItem);
            nameInput.value = '';
            colorInput.value = '#000000';
        } catch (error) {
            console.error(error);
        }
    }
}

// Event listener for material form submission
materialForm.addEventListener('submit', addMaterial);

// Fetch and display materials on page load
fetchMaterials();


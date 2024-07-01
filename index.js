const API_URL = 'http://localhost:8001/houses';

// Fetch method to get all houses
function fetchHouses() {
    $.ajax({
        url: API_URL,
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        success: function(houses) {
            renderHouses(houses);
        },
        error: function(error) {
            console.error('Error fetching houses:', error);
        }
    });
}

// Create new house
$('#create-new-house').on('click', function() {
    const houseName = $('#new-house-name').val();
    if (!houseName) {
        alert('Please enter a house name');
        return;
    }
    $.ajax({
        url: API_URL,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ name: houseName }),
        success: function() {
            $('#new-house-name').val(''); // Clear the input field
            fetchHouses(); // Refresh the list of houses
        },
        error: function(error) {
            console.error('Error creating house:', error);
        }
    });
});

// Add room to a house
$(document).on('click', '.add-room', function () {
    const houseId = $(this).data('house-id');
    const roomName = prompt('Enter room name:');

    if (roomName && roomArea) {
      $.ajax({
        url: `${API_URL}/${houseId}/rooms`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ name: roomName, area: roomArea }),
        success: function () {
          fetchHouses(); // Refresh houses after adding a room
        },
        error: function (error) {
          console.error('Error creating room:', error);
        }
      });
    }
  });
  
// Update house
function updateHouse(id, newName) {
    $.ajax({
        url: `${API_URL}/${id}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ name: newName }),
        success: function() {
            fetchHouses();
        },
        error: function(error) {
            console.error('Error updating house:', error);
        }
    });
}

// Delete house
function deleteHouse(id) {
    $.ajax({
        url: `${API_URL}/${id}`,
        method: 'DELETE',
        success: function() {
            fetchHouses();
        },
        error: function(error) {
            console.error('Error deleting house:', error);
        }
    });
}

// Render houses
function renderHouses(houses) {
    const app = $('#app');
    app.empty();
    houses.forEach(house => {
        const houseDiv = $(`
            <div class="house">
                <h3>${house.name}</h3>
                <button class="btn btn-warning update-house" data-id="${house.id}">Update</button>
                <button class="btn btn-danger delete-house" data-id="${house.id}">Delete</button>
                <button class="btn btn-primary add-room" data-house-id="${house.id}">Add Room</button>
                <div class="rooms-container">
                    ${house.rooms.map(room => `
                        <div class="room">
                            <h6>${room.name}</h6>
                        </div>
                    `).join('')}
                </div>
            </div>
        `);
        app.append(houseDiv);
    });

    // Update house event
    $('.update-house').on('click', function() {
        const id = $(this).data('id');
        const newName = prompt('Enter new house name:');
        if (newName) {
            updateHouse(id, newName);
        }
    });

    // Delete house event
    $('.delete-house').on('click', function() {
        const id = $(this).data('id');
        deleteHouse(id);
    });

    // Add room event
    $('.add-room').on('click', function() {
        const houseId = $(this).data('house-id');
        const roomName = prompt('Enter room name:');
        if (roomName && roomArea) {
            $.ajax({
                url: `${API_URL}/${houseId}/rooms`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ name: roomName, area: roomArea }),
                success: function() {
                    fetchHouses(); // Refresh houses after adding a room
                },
                error: function(error) {
                    console.error('Error creating room:', error);
                }
            });
        }
    });
}

// Initial fetch
fetchHouses();

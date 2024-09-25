// client/script.js
document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
  
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error:', error);
    }
  });
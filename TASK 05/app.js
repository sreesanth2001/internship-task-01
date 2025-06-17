document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Always block until validation is done

  // Reset previous errors
  ['name','email','message'].forEach(id => {
    document.getElementById(id + 'Error').textContent = '';
    document.getElementById(id).classList.remove('error');
  });

  let valid = true;

  // Name validation: letters and spaces only
  const nameVal = document.getElementById('name').value.trim();
  if (!/^[A-Za-z\s]+$/.test(nameVal)) {
    document.getElementById('nameError').textContent = 'Name must contain only letters and spaces.';
    document.getElementById('name').classList.add('error');
    valid = false;
  }

  // Email validation
  const emailVal = document.getElementById('email').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailVal)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address.';
    document.getElementById('email').classList.add('error');
    valid = false;
  }

  // Message validation: required and minimum length
  const msgVal = document.getElementById('message').value.trim();
  if (msgVal.length < 10) {
    document.getElementById('messageError').textContent = 'Message should be at least 10 characters long.';
    document.getElementById('message').classList.add('error');
    valid = false;
  }

  if (valid) {
    alert('Form submitted successfully!');
    this.reset();
  }
});

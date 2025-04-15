<?php
session_start();
if (isset($_SESSION['error'])) {
    echo "<p style='color: red;'>" . $_SESSION['error'] . "</p>";
    unset($_SESSION['error']); 
}
?>

<!DOCTYPE html>
<html>
<head><title>Add Registration</title></head>
<body>
<h1>Add Registration</h1>
<form method="POST" action="/ecommerce-project/public/registrations/store">
    Name: <input type="text" name="name" required><br>
    Email: <input type="email" name="email" required><br>
    <button type="submit">Register</button>
</form>
</body>
</html>

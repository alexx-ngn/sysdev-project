<!DOCTYPE html>
<html>
<head><title>Add Registration</title></head>
<body>
<h1>Add Registration</h1>
<form method="POST" action="/simple-mvc-app/public/registrations/store">
    Name: <input type="text" name="name" required><br>
    Email: <input type="email" name="email" required><br>
    <button type="submit">Register</button>
</form>
</body>
</html>

<!DOCTYPE html>
<html>
<head><title>Add Donation</title></head>
<body>
<h1>Add Donation</h1>
<form method="POST" action="/ecommerce-project/public/donations/store">
    Name: <input type="text" name="name" required><br>
    Amount: <input type="number" name="amount" required step="0.01"><br>
    <button type="submit">Donate</button>
</form>
</body>
</html>

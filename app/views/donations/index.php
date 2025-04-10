<!DOCTYPE html>
<html>
<head><title>All Donations</title></head>
<body>
<h1>All Donations</h1>
<a href="/simple-mvc-app/public/donations/create">Add Donation</a>

<ul>
    <?php foreach ($donations as $don): ?>
        <li><?php echo htmlspecialchars($don['name']) . " donated $" . htmlspecialchars($don['amount']); ?></li>
    <?php endforeach; ?>
</ul>
</body>
</html>

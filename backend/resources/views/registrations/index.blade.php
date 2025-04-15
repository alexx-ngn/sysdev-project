<!DOCTYPE html>
<html>
<head><title>All Registrations</title></head>
<body>
<h1>All Registrations</h1>
<a href="/ecommerce-project/backend/public/registrations/create">Add Registration</a>

<ul>
    <?php foreach ($registrations as $reg): ?>
        <li><?php echo htmlspecialchars($reg['name']) . " - " . htmlspecialchars($reg['email']); ?></li>
    <?php endforeach; ?>
</ul>
</body>
</html>

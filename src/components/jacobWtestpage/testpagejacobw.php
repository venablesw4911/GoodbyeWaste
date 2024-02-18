<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Connection</title>
</head>
<body>
    <h1>Database Connection Test</h1>

    <?php
    // Database connection settings
    $servername = "localhost";
    $username = "adminRole";
    $password = "sharkRadar";
    $database = "goodbyewaste";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Execute a sample query
    $query = "SELECT * FROM ingredient LIMIT 1";
    $result = $conn->query($query);

    // Print the result
    if ($result->num_rows > 0) {
        // Output data of each row
        while($row = $result->fetch_assoc()) {
            echo "ID: " . $row["id"]. " - Name: " . $row["name"]. "<br>";
        }
    } else {
        echo "0 results";
    }

    // Close connection
    $conn->close();
    ?>

</body>
</html>
